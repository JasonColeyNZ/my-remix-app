// import { renderHook } from "@testing-library/react-hooks";
// import { useSelectedCellData } from "./useSelectedCellData";

// describe("useSelectedCellData", () => {
//   const locationId = "1";
//   const hours = [
//     {
//       id: "1",
//       dayOfWeek: "mon",
//       from: 9,
//       to: 17,
//       include: true,
//     },
//     {
//       id: "2",
//       dayOfWeek: "tue",
//       from: 9,
//       to: 17,
//       include: true,
//     },
//   ];

//   it("should return selected cell data", () => {
//     const { result } = renderHook(() => useSelectedCellData(locationId, hours));

//     expect(result.current.selectedCellData).toBeNull();

//     result.current.setSelectedCellData([
//       {
//         startDate: new Date("2022-01-01T09:00:00"),
//         endDate: new Date("2022-01-01T10:00:00"),
//         groups: {},
//         allDay: false,
//         groupIndex: 0,
//       },
//     ]);

//     expect(result.current.selectedCellData).toEqual([
//       {
//         startDate: new Date("2022-01-01T09:00:00"),
//         endDate: new Date("2022-01-01T10:00:00"),
//         groups: {},
//         allDay: false,
//         groupIndex: 0,
//       },
//     ]);
//   });

//   it("should add hours", () => {
//     const { result } = renderHook(() => useSelectedCellData(locationId, hours));

//     result.current.setSelectedCellData([
//       {
//         startDate: new Date("2022-01-01T09:00:00"),
//         endDate: new Date("2022-01-01T10:00:00"),
//         groups: {},
//         allDay: false,
//         groupIndex: 0,
//       },
//       {
//         startDate: new Date("2022-01-02T09:00:00"),
//         endDate: new Date("2022-01-02T10:00:00"),
//         groups: {},
//         allDay: false,
//         groupIndex: 0,
//       },
//     ]);

//     result.current.addHours("addOpen");

//     // expect(result.current.hours).toEqual([
//     //   {
//     //     id: "1",
//     //     dayOfWeek: "sat",
//     //     from: 9,
//     //     to: 10,
//     //     include: true,
//     //   },
//     //   {
//     //     id: "2",
//     //     dayOfWeek: "sun",
//     //     from: 9,
//     //     to: 10,
//     //     include: true,
//     //   },
//     //   {
//     //     id: "",
//     //     dayOfWeek: "mon",
//     //     from: 9,
//     //     to: 10,
//     //     include: true,
//     //   },
//     //   {
//     //     id: "",
//     //     dayOfWeek: "tue",
//     //     from: 9,
//     //     to: 10,
//     //     include: true,
//     //   },
//     // ]);
//   });

//   it("should remove hours", () => {
//     const { result } = renderHook(() => useSelectedCellData(locationId, hours));

//     result.current.setSelectedCellData([
//       {
//         startDate: new Date("2022-01-01T09:00:00"),
//         endDate: new Date("2022-01-01T10:00:00"),
//         groups: {},
//         allDay: false,
//         groupIndex: 0,
//       },
//       {
//         startDate: new Date("2022-01-02T09:00:00"),
//         endDate: new Date("2022-01-02T10:00:00"),
//         groups: {},
//         allDay: false,
//         groupIndex: 0,
//       },
//     ]);

//     result.current.addHours("addClosed");

//     // expect(result.current.hours).toEqual([
//     //   {
//     //     id: "1",
//     //     dayOfWeek: "mon",
//     //     from: 9,
//     //     to: 17,
//     //     include: true,
//     //   },
//     //   {
//     //     id: "2",
//     //     dayOfWeek: "tue",
//     //     from: 9,
//     //     to: 17,
//     //     include: true,
//     //   },
//     // ]);
//   });
// });
