// import type { Meta } from "@storybook/react";
// import FormPlaceHolder from "./FormPlaceHolder";
// import { createRemixStub } from "@remix-run/testing/dist/create-remix-stub";
// import { DragDropContext } from "react-beautiful-dnd";

// // export default {
// //   component: FormPlaceHolder,
// //   args: {
// //     show: true,
// //   },
// //   argTypes: {},
// // } satisfies Meta<typeof FormPlaceHolder>;

// export const Default = {
//   args: {},
// };

// export const Hidden = {
//   args: {
//     show: false,
//   },
// };

// let story: Meta<typeof FormPlaceHolder> = {
//   component: FormPlaceHolder,

//   args: {
//     show: true,
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
