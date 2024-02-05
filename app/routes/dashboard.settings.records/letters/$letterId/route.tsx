import type { ShouldRevalidateFunction } from "@remix-run/react";
import { Form } from "@remix-run/react";
// import { Editor } from "@tinymce/tinymce-react";
import { json } from "@remix-run/cloudflare";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { useRef } from "react";
// import { ClientOnly } from "remix-utils/client-only";
// import type { Editor as TinyMCEEditor } from "tinymce";
import { Card, CardContent } from "~/components/ui/card.tsx";
import { SETTINGS_LETTER_SELECTED } from "~/const.ts";
// import { getLetterById } from "~/models/letter.server.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";
// import { AppContext } from "~/store/context.tsx";
// import { NavigationTypes } from "~/store/navigationReducer.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";
import { cn } from "~/utils/shadcn.utils";

// import { updateLetterSchema } from "./updateLetterValidation.tsx";

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentParams,
  nextParams,
}) => {
  if (currentParams.letterId !== nextParams.letterId) return true;
  return false;
};
export async function action({ request }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  let formData = await request.formData();

  switch (formData.get("intent")) {
    case "save-text": {
      // const result = await updateLetterSchema.validate(formData);
      // if (result.error) {
      //   return validationError(result.error);
      // }
      // return json({
      //   letter: await updateTextLetter(result.data, sbUser),
      // });
    }
    default:
      return json({});
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  const { letterId } = params;
  invariantResponse(letterId, "letterId is required");

  // const letter = await getLetterById({ id: letterId }, sbUser);

  const session = await getSession(request);

  session.set(SETTINGS_LETTER_SELECTED, letterId);
  return json(
    // { letter },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

// const LetterContainer = styled.div`
//   display: flex;
//   width: 100%;
//   & > div > div:last-child {
//     padding-bottom: 0.2px !important;
//   }
//   & > div > div > form {
//     display: flex;
//     width: 100%;
//     flex: 1 1 0;
//   }
//   & > div > div > form > div {
//     display: flex;
//     width: 100%;
//     height: 100% !important;
//     border-radius: 0 !important;
//     border: 0 !important;
//   }
// `;

const Letter = () => {
  // const editorRef = useRef<TinyMCEEditor | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  // const submit = useSubmit();
  // const [editorValue, setEditorValue] = useState("");
  // const { letter } = useLoaderData<typeof loader>();
  // const { state, dispatch } = useContext(AppContext);

  //Save Clicked Effect
  // useEffect(() => {
  //   if (!state.navigation.saveClicked) return;
  //   const editor = editorRef.current;
  //   if (!editor) return;
  //   editor.save();
  //   editor.setDirty(false);
  //   submit(formRef.current!);
  //   dispatch({
  //     type: NavigationTypes.saveClicked,
  //     payload: {
  //       clicked: false,
  //     },
  //   });
  //   dispatch({
  //     type: NavigationTypes.saveEnabled,
  //     payload: {
  //       enabled: false,
  //     },
  //   });

  //   //setSaveClicked(false);
  //   //setSaveEnabled && setSaveEnabled(false);
  // }, [dispatch, state.navigation.saveClicked, submit]);

  // useEffect(() => {
  //   if (!letter) return;
  //   setEditorValue(letter.text);
  //   dispatch({
  //     type: NavigationTypes.editMode,
  //     payload: {
  //       enabled: true,
  //     },
  //   });
  //   dispatch({
  //     type: NavigationTypes.saveEnabled,
  //     payload: {
  //       enabled: false,
  //     },
  //   });
  // }, [dispatch, letter]);

  return (
    <div className="flex flex-1 w-full p-2" id="records-letter-outer">
      <Card className="flex w-full overflow-clip">
        <CardContent className="flex w-full p-0">
          <Form
            ref={formRef}
            id="letter-editor"
            method="POST"
            className={cn(
              "w-full",
              // tox tox-tinymce
              "[&_.tox]:flex [&_.tox]:w-full [&_.tox]:flex-1 [&_.tox]:!h-full",
              "[&_.tox]:!border-0 [&_.tox]:!rounded-md",
              "[&_.tox-tbtn:not(.tox-tbtn--select)]:!w-[30px]",
              "[&_.tox-tbtn--select]:!w-[40px]",
              "[&_.tox-tinymce-aux]:z-50",
              String.raw`[&_.tox-toolbar\_\_group]:!px-1.5`,
            )}
          >
            <input type="hidden" name="intent" value="save-text" />
            {/* <input type="hidden" name="id" value={letter.id} /> */}
            {/* <ClientOnly>
              {() => (
                <Editor
                  tinymceScriptSrc={"/tinymce/tinymce.min.js"}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onDirty={() => {
                    dispatch({
                      type: NavigationTypes.saveEnabled,
                      payload: {
                        enabled: true,
                      },
                    });

                    // if (!setSaveEnabled) return;
                    // setSaveEnabled(true);
                  }}
                  textareaName="text"
                  initialValue={editorValue}
                  init={{
                    //height: 500,

                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "autoresize",
                      "typography",
                      //"link",
                      "charmap",
                      "fullscreen",
                      "table",
                      "help",
                      "wordcount",
                    ],
                    //theme: "advanced",
                    statusbar: false,
                    resize: false,
                    theme_advanced_buttons3_add: "fullscreen",
                    fullscreen_new_window: true,
                    fullscreen_settings: {
                      theme_advanced_path_location: "top",
                    },

                    //min-height:
                    toolbar:
                      "fontsize | fontfamily | typography |" +
                      "undo redo | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "table | fullscreen",
                    toolbar_mode: "wrap",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; overflow-y:auto !important; }",
                  }}
                />
              )}
            </ClientOnly> */}
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Letter;
