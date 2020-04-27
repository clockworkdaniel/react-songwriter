// import * as React from "react";
// import { mount, render } from "enzyme";
// import { Provider } from "react-redux";
// import MockRouter from "react-mock-router";

// import setupStore from "../../setupStore";
// import SongsheetContainer from "./SongsheetContainer";
// import mockStructure from "../../../server/mockStructures/RockyRacoon";

// const mockResponse = {
//   isEditable: true,
//   song: {
//     _id: "5c6415032bff251e109178e3",
//     title: "Rocky Racoon",
//     artist: {
//       _id: "5c6415022bff251e109178d4",
//       name: "The Beatles"
//     },
//     user: {
//       _id: "5c6415032bff251e109178db",
//       username: "Han_Solo"
//     },
//     structure: mockStructure,
//     isPublic: true
//   }
// };

// describe("Songsheet integration tests", () => {
//   const match = {
//     isExact: true,
//     params: {
//       id: "c6415032bff251e109178ef"
//     },
//     path: "/song/:id",
//     url: "/song/5c6415032bff251e109178ef"
//   };

//   // const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));
//   let store;

//   beforeEach(() => {
//     fetch.resetMocks();
//   });

//   describe("without dispatching fetch in componentDidMount", () => {
//     store = setupStore();
//     const wrapper = render(
//       <MockRouter>
//         <Provider store={store}>
//           <SongsheetContainer match={match} />
//         </Provider>
//       </MockRouter>
//     );

//     it("should render an empty title", () => {
//       expect(wrapper.find(".ss-title__heading").text()).toBe("");
//     });
//     it("should not render any children within the structure", () => {
//       expect(wrapper.find(".songsheet__structure").children().length).toBe(0);
//     });
//   });

//   describe("as a result of fetch", () => {
//     store = setupStore();

//     fetch.mockResponseOnce(JSON.stringify(mockResponse));

//     const wrapper = mount(
//       <MockRouter>
//         <Provider store={store}>
//           <SongsheetContainer match={match} />
//         </Provider>
//       </MockRouter>
//     );

//     it("should render the structure", () => {
//       wrapper.update();
//       expect(
//         wrapper.find(".songsheet__structure").children().length
//       ).toBeGreaterThan(0);
//     });
//     it("should render the title", () => {
//       wrapper.update();
//       expect(wrapper.find(".ss-title__heading").text()).toBe("Rocky Racoon");
//     });
//   });
// });
