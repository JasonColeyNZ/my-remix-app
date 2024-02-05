import { MdOutlineRefresh, MdAddLink } from "react-icons/md/index.js";
import { Badge } from "~/components/ui/badge.tsx";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import type { loader } from "../route";
import type {
  loader as MCListloader,
  action as MCListSubmit,
} from "~/routes/services/mailchimp/listtags/route";
import { serialize } from "object-to-formdata";
import { MailchimpTagLinkIntent } from "~/routes/services/mailchimp/listtags/tagLinkSchema";
import { cn } from "~/utils/shadcn.utils";

type ProviderTag = {
  id: string;
  name: string;
  selected: boolean;
};

const MailchimpTags = () => {
  const { tag } = useLoaderData<typeof loader>();
  const loadFetcher = useFetcher<typeof MCListloader>();
  const submitFetcher = useFetcher<typeof MCListSubmit>();
  const [tags, setTags] = useState<ProviderTag[] | null>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string>("");

  const refreshSelectedTag = () => {
    const newTags = tags?.map((providerTag: ProviderTag) => {
      providerTag.selected = tag.integrationTagId === providerTag.id + "";
      // console.log("MailchimpTags: tag: ", tag, providerTag);
      return providerTag;
    });
    setTags(newTags);
  };

  useEffect(() => {
    if (loaded) return;
    if (loadFetcher.state !== "idle") return;
    // console.log("MailchimpTags: tagFetcher.load: ");
    setLoaded(true);
    loadFetcher.load("/services/mailchimp/listtags");
  }, [loaded, loadFetcher, tags]);

  useEffect(() => {
    if (loadFetcher.data) {
      if (loadFetcher.data.error) {
        setError(loadFetcher.data.error);
        loadFetcher.data.tags = null;
        return;
      }
      const tags = loadFetcher.data.tags || [];

      tags.forEach((_tag: any) => {
        _tag.selected = tag.integrationTagId === _tag.id + "";
      });
      // console.log("MailchimpTags: tagFetcher.data: ", tags, tag);
      setTags(tags);
      loadFetcher.data.tags = null;
    }
  }, [loadFetcher, tag]);

  //Refresh selected MC Link on Tag navigate
  useEffect(() => {
    if ((tags && tags.length === 0) || !tag) return;
    // console.log("MailchimpTags: tag: ", tag);
    refreshSelectedTag();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  //Refresh MC List
  const handleRefreshClick = () => {
    setLoaded(false);
  };

  //Link MS and EMS Tag
  const handleLinkClick = (providerTagId: string) => {
    submitFetcher.submit(
      serialize({
        intent: MailchimpTagLinkIntent.TAGLINK,
        providerTagId,
        tagId: tag.id,
      }),
      {
        method: "POST",
        action: "/services/mailchimp/listtags",
      },
    );
    if (tag.integrationTagId === providerTagId + "")
      tag.integrationTagId = null;
    else tag.integrationTagId = providerTagId + "";
    refreshSelectedTag();
  };

  //Create new MC Tag
  const handleNewTagClick = () => {
    submitFetcher.submit(
      serialize({
        intent: MailchimpTagLinkIntent.TAGCREATE,
        tagId: tag.id,
        tagName: tag.name,
      }),
      {
        method: "POST",
        action: "/services/mailchimp/listtags",
      },
    );
  };

  //MC TAGCREATE returns new tag
  useEffect(() => {
    if (
      submitFetcher.data &&
      submitFetcher.data.submission.payload.intent ===
        MailchimpTagLinkIntent.TAGCREATE
    ) {
      const newTag = submitFetcher.data.newTag || null;
      console.log("MailchimpTags: submitFetcher.data: ", submitFetcher.data);
      tag.integrationTagId = newTag?.id || null;
      handleRefreshClick();
      // submitFetcher.data.submission = null;
    }
  }, [submitFetcher, tag]);

  return (
    <>
      <div className="flex items-baseline">
        <div className="text-lg font-medium">Mailchimp Tag Link</div>
        <Button
          variant="secondary"
          className="ml-auto h-5 text-xs pl-2"
          onClick={handleRefreshClick}
        >
          <MdOutlineRefresh className="mr-1" />
          Refresh Tags
        </Button>
      </div>
      <div className=" my-2 text-xs">
        Mailchimp uses tags to group Audience members for different mailing
        lists within Mailchimp
        <br />
        Easy MedSpa allows linking a <b>Client Tag</b> to a <b>Mailchimp tag</b>
        .
        <br />
        If an Easy MedSpa tag is linked to Mailchimp, it will become a mailing
        list identifier.
        <br />
        <br />
        <span className="font-medium">
          Select a Mailchimp tag below to link to this tag.
        </span>
      </div>
      {error && (
        <div className="flex flex-wrap p-3 rounded-md border-[1px] border-gray-400 bg-gray-300 shadow-md">
          {error && <div className="text-red-500 text-xs">{error}</div>}
        </div>
      )}

      {tags && (
        <div className="flex flex-wrap p-3 rounded-md border-[1px] border-gray-400 bg-gray-300 shadow-md">
          {tags.map(
            (providerTag: { id: string; name: string; selected: boolean }) => (
              <div
                key={providerTag.id}
                className="flex mx-1 p-1 items-center border-[1px] border-gray-700 rounded-md justify-between gap-2"
              >
                <Badge className="h-5 rounded-xl bg-yellow-300 font-normal text-black border-primary">
                  {providerTag.name}
                </Badge>
                <Button
                  className={cn(
                    "ml-auto p-1 h-6",
                    providerTag.selected &&
                      "bg-primary text-white border-primary-9",
                  )}
                  variant="outline"
                  onClick={() => handleLinkClick(providerTag.id)}
                >
                  <MdAddLink />
                </Button>
              </div>
            ),
          )}
        </div>
      )}
      <div className="text-xs my-2 font-medium">
        or create a new Mailchimp tag for linking.
      </div>
      <Button
        className="text-xs"
        variant="secondary"
        onClick={() => handleNewTagClick()}
        disabled={
          tag.integrationTagId !== null ||
          submitFetcher.state === "submitting" ||
          !loaded ||
          error !== ""
        }
      >
        {`Create and link '${tag.name}' tag in Mailchimp`}
      </Button>
    </>
  );
};

export default MailchimpTags;
