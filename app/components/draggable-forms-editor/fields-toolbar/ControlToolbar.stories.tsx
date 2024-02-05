// import type { Meta } from "@storybook/react";
// import { createRemixStub } from "@remix-run/testing/dist/create-remix-stub";
// import { DragDropContext } from "react-beautiful-dnd";
// import ControlToolbar from "./ControlToolbar";

// export const Default = {
//   args: {},
//   pseudo: {
//     hover: ["& #droppable-row"],
//   },
// };

// let story: Meta<typeof ControlToolbar> = {
//   component: ControlToolbar,

//   args: {
//     sectionFields: [
//       {
//         id: "textinput",
//         field: {
//           id: "textinput",
//           type: "textinput",
//           label: "First Name",
//           name: "firstName",
//           validation: {
//             required: false,
//           },
//           colSpan: 0,
//           options: "",
//           sortOrder: 0,
//         },
//       },
//       {
//         id: "textinput",
//         field: {
//           id: "textinput",
//           type: "textinput",
//           label: "Last Name",
//           name: "lastName",
//           validation: {
//             required: false,
//           },
//           colSpan: 0,
//           options: "",
//           sortOrder: 0,
//         },
//       },
//       {
//         id: "datetime",
//         field: {
//           id: "datetime",
//           type: "datetime",
//           label: "Date of Birth",
//           name: "dateOfBirth",
//           validation: {
//             required: false,
//           },
//           colSpan: 0,
//           options: "",
//           sortOrder: 0,
//         },
//       },
//       {
//         id: "select",
//         field: {
//           id: "select",
//           type: "select",
//           label: "Marital Status",
//           name: "maritalStatus",
//           validation: {
//             required: false,
//           },
//           colSpan: 0,
//           options: "",
//           sortOrder: 0,
//         },
//       },
//       {
//         id: "textarea",
//         field: {
//           id: "textarea",
//           type: "textarea",
//           label: "Address",
//           name: "address",
//           validation: {
//             required: false,
//           },
//           colSpan: 0,
//           options: "",
//           sortOrder: 0,
//         },
//       },
//     ],
//     customFields: [
//       {
//         id: "textinput",
//         field: {
//           id: "textinput",
//           type: "textinput",
//           label: "User Field 1",
//           name: "userField1",
//           validation: {
//             required: false,
//           },
//           colSpan: 0,
//           options: "",
//           sortOrder: 0,
//         },
//       },
//     ],
//   },
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
//           <RemixStub
//           //initialLoaderData={[{ 'dashboard/client/1234': args}]}
//           //initialEntries={["dashboard.client.$clientId"]}
//           />
//         </DragDropContext>
//       );
//     },
//   ],
// };

// export default story;
