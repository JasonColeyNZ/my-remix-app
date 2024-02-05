 import crypto, { createHmac } from "node:crypto";
// import { webcrypto } from 'node:crypto';

import type { MarketingProvider } from "./marketing-provider";
import type { GetIntegrationType } from "~/models/integration.server";
import {
  createIntegration,
  getIntegration,
  invalidateIntegration,
} from "~/models/integration.server";
import { json, redirect } from "@remix-run/server-runtime";
import { formatAuthorizeUrl } from "../oauth2/tools";
import type { User } from "@supabase/supabase-js";
import { invariantResponse } from "../misc";
import { IntegrationType } from "../types";
import mailchimp from "@mailchimp/mailchimp_marketing";

export class MailchimpProvider implements MarketingProvider {
  constructor(
    sbUser: User,
    requestUrl: URL | null,
    integration: GetIntegrationType | null,
  ) {
    this.sbUser = sbUser;
    this.requestUrl = requestUrl;
    this.integration = integration;
  }
  requestUrl: URL | null;
  sbUser: User;
  integration: GetIntegrationType | null;
  async connect(): Promise<Response> {
    invariantResponse(this.requestUrl, "RequestUrl Missing");

    const state = createHmac(
      "sha256",
      process.env.OAUTH2_STATE_SECRET || "",
    ).digest("hex");

    let integration = await getIntegration(
      IntegrationType.MAILCHIMP,
      this.sbUser,
    );
    //exists, lets check it still works...

    //check validity of integration
    if (integration && !integration.accessToken) {
      //mark integration as invalid
      await invalidateIntegration({ id: integration.id }, this.sbUser);
      this.integration = null;
    } else if (integration && integration.accessToken) {
      mailchimp.setConfig({
        accessToken: integration.accessToken,
        server: (integration.integrationData as any).dc,
      });
      //Check if the integration is still valid
      const pingResult = mailchimp.ping.get();
      console.log("pingResult", pingResult);

      if ((pingResult as any).status === 404) {
        await invalidateIntegration({ id: integration.id }, this.sbUser);
        this.integration = null;
      } else {
        return json({ status: 200, integration } as const);
      }
    }

    if (!integration) {
      this.integration = await createIntegration(
        { integrationType: IntegrationType.MAILCHIMP, state },
        this.sbUser,
      );

      const url = formatAuthorizeUrl(
        process.env.MC_AUTHORIZE_URI,
        process.env.MC_CLIENT_ID,
        `${this.requestUrl.origin}/mailchimp/auth/callback`,
        "",
        state,
        "code",
        {},
      );
      return redirect(url);
    }
    return json({ status: "error" } as const);
    // return;
  }
  async check(): Promise<Response> {
    invariantResponse(this.integration, "Integration not found");
    invariantResponse(this.integration.accessToken, "Integration not found");

    mailchimp.setConfig({
      accessToken: this.integration.accessToken || "",
      server: (this.integration.integrationData as any).dc,
    });

    const pingResult = mailchimp.ping.get();
    // console.log("pingResult", pingResult);

    //check validity of integration
    if ((pingResult as any).status === 404) {
      // if (!data || (data as any).error === "invalid_token") {
      //mark integration as invalid
      await invalidateIntegration({ id: this.integration?.id }, this.sbUser);
      this.integration = null;
      return json({ status: "error" } as const);
    }

    return json({ status: 200, integration: this.integration } as const);
  }
  async disconnect(): Promise<void> {
    return;
  }
  async getLists(): Promise<any> {
    invariantResponse(this.integration, "Integration not found");
    invariantResponse(this.integration.accessToken, "Integration not found");

    mailchimp.setConfig({
      accessToken: this.integration.accessToken || "",
      server: (this.integration.integrationData as any).dc,
    });
    const pingResult = mailchimp.ping.get();
    if ((pingResult as any).status === 404)
      return json({
        status: "error",
        message: "Integration not found",
      } as const);

    const response = await mailchimp.lists.getAllLists({
      fields: ["lists.id", "lists.name", "total_items"],
      includeTotalContacts: true,
      count: 1000,
    });
    if ((response as any).status) {
      return json({
        status: "error",
        message: (response as any).title,
      } as const);
    }
    if ((response as any).lists) {
      const _lists = (response as any).lists.map((list: any) => ({
        id: list.id,
        name: list.name,
      }));
      // console.log("lists", _lists);
      return _lists;
    }
    return null;
  }
  async getTags(): Promise<any> {
    invariantResponse(this.integration, "Integration not found");
    invariantResponse(this.integration.accessToken, "Integration not found");
    invariantResponse(this.integration.lists, "Integration has no lists");

    mailchimp.setConfig({
      accessToken: this.integration.accessToken,
      server: (this.integration.integrationData as any).dc,
    });
    const pingResult = mailchimp.ping.get();
    if ((pingResult as any).status === 404)
      return json({
        status: "error",
        message: "Integration not found",
      } as const);

    const list = this.integration.lists.filter((list) => list.primary);
    invariantResponse(list.length > 0, "No Primary List found");

    const response = await (mailchimp.lists as any).tagSearch(list[0].listId);
    if ((response as any).status) {
      return json({
        status: "error",
        message: (response as any).title,
      } as const);
    }

    if ((response as any).tags) {
      // if (Array.isArray(response && (response as any).tags)) {
      const _tags = (response as any).tags.map((tag: any) => ({
        id: tag.id,
        name: tag.name,
      }));
      // console.log("_tags", _tags);
      return _tags;
    }
    return null;
  }
  async createTag(tagName: string): Promise<any> {
    invariantResponse(this.integration, "Integration not found");
    invariantResponse(this.integration.accessToken, "Integration not found");
    invariantResponse(this.integration.lists, "Integration has no lists");

    mailchimp.setConfig({
      accessToken: this.integration.accessToken,
      server: (this.integration.integrationData as any).dc,
    });
    const pingResult = mailchimp.ping.get();
    if ((pingResult as any).status === 404)
      return json({
        status: "error",
        message: "Integration not found",
      } as const);

    const list = this.integration.lists.filter((list) => list.primary);
    invariantResponse(list.length > 0, "No Primary List found");

    const emailHash = crypto 
      .createHash("md5")
      .update("ems-tag@easymedspa.com")
      .digest("hex"); //4358d43c2491b5d53d17ddeb1ffed6b5
    // console.log("emailHash", emailHash);
    //get member first
    try {
      //get the member, if this fails the catch will create the member
      await mailchimp.lists.getListMember(list[0].listId, emailHash);
      await mailchimp.lists.updateListMemberTags(list[0].listId, emailHash, {
        tags: [{ name: tagName, status: "active" }],
      });
    } catch (err) {
      await mailchimp.lists.addListMember(list[0].listId, {
        email_address: "ems-tag@easymedspa.com",
        status: "unsubscribed",
        merge_fields: {
          FNAME: "Easy",
          LNAME: "MedSpa",
        },
        tags: [tagName],
      });
    }
    await mailchimp.lists.updateListMemberTags(list[0].listId, emailHash, {
      tags: [{ name: tagName, status: "inactive" }],
    });
    try {
      await mailchimp.lists.deleteListMember(list[0].listId, emailHash);
    } catch (err) {
      //console.log("deleteListMember err", err);
    }

    const response = await (mailchimp.lists as any).tagSearch(list[0].listId, {
      name: tagName,
    });

    if ((response as any).status) {
      return json({
        status: "error",
        message: (response as any).title,
      } as const);
    }

    if ((response as any).tags) {
      const _tags = (response as any).tags.map((tag: any) => ({
        id: tag.id + "",
        name: tag.name,
      }));
      if (_tags.length === 1) return _tags[0];
      return _tags;
    }
    return null;
  }
}
