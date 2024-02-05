// import type { Meta } from "@storybook/react";
// import { createRemixStub } from "@remix-run/testing/dist/create-remix-stub";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";
// import DraggableRowOuter from "./DraggableRow";

// export const Default = {
//   args: {},
//   pseudo: {
//     hover: ["& #droppable-row"],
//   },
// };

// let story: Meta<typeof DraggableRowOuter> = {
//   component: DraggableRowOuter,

//   args: {
//     id: "1",
//     sortOrder: 0,
//     controls: [
//       {
//         id: "firstName",
//         type: "textinput",
//         label: "First Name",
//         options: [],
//         required: true,
//         name: "firstName",
//         sortOrder: 0,
//         colSpan: 6,
//       },
//       {
//         id: "lastName",
//         type: "textinput",
//         label: "Last Name",
//         name: "lastName",
//         options: [],
//         required: true,
//         sortOrder: 1,
//         colSpan: 6,
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
