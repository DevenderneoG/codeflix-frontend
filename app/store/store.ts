import { configureStore } from "@reduxjs/toolkit";
import { leadsSlice } from "./leads/leadsSlice";
import { agentsSlice } from "./agents/agentsSlice";
import { commentSlice } from "./comments/commentSlice";
import { reportSlice } from "./reports/reportsSlice";

// export default configureStore({
//     reducer: {
//         lead: leadsSlice.reducer,
//         agent: agentsSlice.reducer,
//         comment: commentSlice.reducer,
//         report: reportSlice.reducer
//     }
// })

export const store = configureStore({
  reducer: {
    lead: leadsSlice.reducer,
    agent: agentsSlice.reducer,
    comment: commentSlice.reducer,
    report: reportSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
