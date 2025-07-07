import { configureStore } from "@reduxjs/toolkit";
import { leadsSlice } from "./leads/leadsSlice";
import { agentsSlice } from "./agents/agentsSlice";
import { commentSlice } from "./comments/commentSlice";
import { reportSlice } from "./reports/reportsSlice";


export default configureStore({
    reducer: {
        lead: leadsSlice.reducer,
        agent: agentsSlice.reducer,
        comment: commentSlice.reducer,
        report: reportSlice.reducer
    }
})

// import { configureStore } from "@reduxjs/toolkit";
// import { leadsSlice } from "./leads/leadsSlice";
// import { agentsSlice } from "./agents/agentsSlice";
// import { commentSlice } from "./comments/commentSlice";
// import { reportSlice } from "./reports/reportsSlice";

// // ✅ Create and export the store instance
// export const store = configureStore({
//   reducer: {
//     lead: leadsSlice.reducer,
//     agent: agentsSlice.reducer,
//     comment: commentSlice.reducer,
//     report: reportSlice.reducer,
//   },
// });

// // ✅ Export RootState and AppDispatch types for use throughout the app
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
