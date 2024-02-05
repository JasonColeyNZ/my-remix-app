// import { createRemixStub } from "@remix-run/testing/dist/create-remix-stub.js";
// import type { Meta } from "@storybook/react";

// import DraggableFormEditor from "./DraggableFormEditor.tsx";

// let story: Meta<typeof DraggableFormEditor> = {
//   component: DraggableFormEditor,

//   args: {},
//   decorators: [
//     (storyFn, context) => {
//       //const [args, updateArgs] = useArgs();
//       const RemixStub = createRemixStub([
//         {
//           element: storyFn(context),
//           path: "/",

//           loader: () => {
//             const formDefinition = {
//               rows: [
//                 {
//                   sortOrder: 0,
//                   controls: [
//                     {
//                       field: {
//                         type: "textinput",
//                         label: "First Name",
//                         name: "firstName",
//                         colSpan: 6,
//                         sortOrder: 0,
//                         validation: {
//                           required: true,
//                         },
//                       },
//                     },
//                     {
//                       field: {
//                         type: "textinput",
//                         label: "Last Name",
//                         name: "lastName",
//                         colSpan: 6,
//                         sortOrder: 1,
//                         validation: {
//                           required: true,
//                         },
//                       },
//                     },
//                   ],
//                 },
//                 {
//                   sortOrder: 1,
//                   controls: [
//                     {
//                       field: {
//                         type: "textinput",
//                         label: "User Field2",
//                         name: "userField2",
//                         colSpan: 6,
//                         sortOrder: 0,
//                         validation: {
//                           required: true,
//                         },
//                       },
//                     },
//                   ],
//                 },
//               ],
//               fieldsUsed: ["firstName", "lastName", "userField2"],
//             };
//             const sectionFields = [
//               {
//                 field: {
//                   type: "textinput",
//                   label: "First Name",
//                   name: "firstName",
//                   validation: {
//                     required: true,
//                   },
//                 },
//               },
//               {
//                 field: {
//                   type: "textinput",
//                   label: "Last Name",
//                   name: "lastName",
//                   validation: {
//                     required: true,
//                   },
//                 },
//               },
//               {
//                 field: {
//                   type: "datetime",
//                   label: "Date of Birth",
//                   name: "dateOfBirth",
//                   validation: {
//                     required: true,
//                   },
//                 },
//               },
//               {
//                 field: {
//                   type: "select",
//                   label: "Marital Status",
//                   name: "maritalStatus",
//                   validation: {
//                     required: true,
//                   },
//                 },
//               },
//               {
//                 field: {
//                   type: "textarea",
//                   label: "Address",
//                   name: "address",
//                   validation: {
//                     required: true,
//                   },
//                 },
//               },
//             ];

//             const sectionCustomFields = [
//               {
//                 field: {
//                   type: "textinput",
//                   label: "User Field1",
//                   name: "userField1",
//                   validation: {
//                     required: true,
//                   },
//                 },
//               },
//               {
//                 field: {
//                   type: "textinput",
//                   label: "User Field2",
//                   name: "userField2",
//                   validation: {
//                     required: true,
//                   },
//                 },
//               },
//               {
//                 id: "womanOrigin",
//                 field: {
//                   label:
//                     "Is the woman of Aboriginal or Torres Strait Islander origin?",
//                   name: "womanOrigin",
//                   type: "checklist",
//                   colSpan: 6,
//                   options:
//                     '[{"text":"Yes, Aboriginal","value":2},{"text":"Yes, Torres Strait Islander","value":4},{"text":"No","value":1}]',
//                   validation: {
//                     required: true,
//                     minValue: 0,
//                     maxValue: 0,
//                     minLength: 0,
//                     maxLength: 0,
//                   },
//                 },
//               },
//             ];

//             return {
//               formDefinition,
//               sectionFields,
//               sectionCustomFields,
//             };
//           },
//           action: async ({ request }) => {
//             return {}; //{ top_products: [], super_deal_products: [] };
//           },
//         },
//       ]);

//       return (
//         <RemixStub
//         //initialLoaderData={[{ 'dashboard/client/1234': args}]}
//         //initialEntries={["dashboard.client.$clientId"]}
//         />
//       );
//     },
//   ],
// };

// export default story;

// // export default {
// //   component: DraggableFormEditor,

// //   args: {},
// //   argTypes: {},
// // } satisfies Meta<typeof DraggableFormEditor>;

// export const Primary = {
//   args: {},
// };
