import { useEffect } from "react";
import { OAUTH_RESPONSE } from "./constants";
import {
  checkState,
  isWindowOpener,
  openerPostMessage,
  queryToObject,
} from "./tools";

type Props = {
  Component?: React.ReactElement;
};

export const OAuthPopup = ({
  Component = (
    <div style={{ margin: "12px" }} data-testid="popup-loading">
      Loading...
    </div>
  ),
}: Props) => {
  useEffect(() => {
    const payload = {
      ...queryToObject(window.location.search.split("?")[1]),
      ...queryToObject(window.location.hash.split("#")[1]),
    };
    const state = payload?.state;
    const error = payload?.error;
    const opener = window?.opener;

    if (isWindowOpener(opener)) {
      console.log("opener", opener);
      const stateOk = state && checkState(opener.sessionStorage, state);
      console.log("stateOk", stateOk);
      if (!error && stateOk) {
        openerPostMessage(opener, {
          type: OAUTH_RESPONSE,
          payload,
        });
      } else {
        const errorMessage = error
          ? decodeURI(error)
          : !stateOk
          ? "OAuth error: State mismatch."
          : "OAuth error: An error has occured.";
        openerPostMessage(opener, {
          type: OAUTH_RESPONSE,
          error: errorMessage,
        });
      }
    } else {
      throw new Error("No window opener");
    }
  }, []);

  return Component;
};
