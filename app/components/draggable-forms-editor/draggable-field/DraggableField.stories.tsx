// import type { Meta } from "@storybook/react";
// import { createRemixStub } from "@remix-run/testing/dist/create-remix-stub";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";
// import DraggableField from "./DraggableField";

// export const Default = {
//   args: {
//     formField: {
//       field: {
//         type: "textinput",
//         label: "First Name",
//         options: "",
//         validation: {
//           required: true,
//         },
//         name: "firstName",
//       },
//       sortOrder: 0,
//       colSpan: 6,
//     },
//   },
//   pseudo: {},
// };

// let story: Meta<typeof DraggableField> = {
//   component: DraggableField,

//   args: {},
//   decorators: [
//     (storyFn, context) => {
//       //const [args, updateArgs] = useArgs();
//       const RemixStub = createRemixStub([
//         {
//           element: storyFn(context),
//           path: "/",

//           loader: () => {
//             return {};
//           },
//           action: async ({ request }) => {
//             return {}; //{ top_products: [], super_deal_products: [] };
//           },
//         },
//       ]);

//       return (
//         <DragDropContext onDragEnd={() => {}}>
//           <Droppable droppableId="control-toolbar" isDropDisabled={true}>
//             {(provided) => (
//               <RemixStub
//               //initialLoaderData={[{ 'dashboard/client/1234': args}]}
//               //initialEntries={["dashboard.client.$clientId"]}
//               />
//             )}
//           </Droppable>
//         </DragDropContext>
//       );
//     },
//   ],
// };

// export default story;

// export const Number = {
//   args: {
//     formField: {
//       field: {
//         id: "number",
//         type: "number", // <NumberIcon /> is the default
//         label: "Number",
//         validation: {
//           required: true,
//         },
//       },
//     },
//   },
// };
// export const DateTime = {
//   args: {
//     formField: {
//       field: {
//         id: "datetime",
//         type: "datetime",
//         label: "Date time",
//         validation: {
//           required: true,
//         },
//       },
//     },
//   },
// };
// export const TextInput = {
//   args: {
//     formField: {
//       field: {
//         id: "textinput",
//         type: "textinput",
//         label: "Text field",
//         validation: {
//           required: true,
//         },
//       },
//     },
//   },
// };
// export const TextArea = {
//   args: {
//     formField: {
//       field: {
//         id: "textarea",
//         type: "textarea",
//         label: "Text area",
//         validation: {
//           required: true,
//         },
//       },
//     },
//   },
// };
// export const Checkbox = {
//   args: {
//     formField: {
//       field: {
//         id: "checkbox",
//         type: "checkbox",
//         label: "Checkbox",
//         validation: {
//           required: true,
//         },
//       },
//     },
//   },
// };
// export const Checklist = {
//   args: {
//     formField: {
//       field: {
//         id: "checklist",
//         type: "checklist",
//         label: "Checklist",
//         validation: {
//           required: true,
//         },
//         options:
//           '[{"text":"Yes, Aboriginal","value":2},{"text":"Yes, Torres Strait Islander","value":4},{"text":"No","value":1}]',
//       },
//     },
//   },
// };
// export const Radio = {
//   args: {
//     formField: {
//       field: {
//         id: "radio",
//         type: "radio",
//         label: "Radio",
//         validation: {
//           required: true,
//         },
//       },
//     },
//   },
// };
// export const RadioList = {
//   args: {
//     formField: {
//       field: {
//         id: "radiolist",
//         type: "radiolist",
//         label: "Radio List",
//         validation: {
//           required: true,
//         },
//         options: "[]",
//       },
//     },
//   },
// };
// export const Select = {
//   args: {
//     id: "select",
//     formField: {
//       field: {
//         type: "select",
//         label: "Select",
//         validation: {
//           required: true,
//         },
//       },
//     },
//   },
// };
// export const Taglist = {
//   args: {
//     formField: {
//       field: {
//         id: "taglist",
//         type: "taglist",
//         label: "Tag list",
//         validation: {
//           required: true,
//         },
//       },
//     },
//   },
// };
// export const Image = {
//   args: {
//     formField: {
//       field: {
//         id: "image",
//         type: "image",
//         label: "Image view",
//         validation: {
//           required: true,
//         },
//       },
//     },
//   },
// };
// export const TextView = {
//   args: {
//     formField: {
//       field: {
//         id: "text",
//         type: "text",
//         label: "Text view",
//         validation: {
//           required: true,
//         },
//       },
//     },
//   },
// };
// export const Button = {
//   args: {
//     formField: {
//       field: {
//         id: "button",
//         type: "button",
//         label: "Button",
//         validation: {
//           required: true,
//         },
//       },
//     },
//   },
// };
