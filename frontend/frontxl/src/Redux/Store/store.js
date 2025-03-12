import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Slices/UserSlice/userSlice";
export const store = configureStore({
  reducer: {
    user:userSlice
    
  },
});



// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // Uses localStorage by default
// import userReducer from "../Slices/UserSlice/userSlice";

// // Configure Persist for userSlice
// const persistConfig = {
//   key: "user",
//   storage,
//   whitelist: ["user"], // Only persist the user slice
// };

// // Combine Reducers
// const rootReducer = combineReducers({
//   user: userReducer, // Persisting only user slice
// });

// // Wrap Reducer with persistReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure Store
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           "persist/PERSIST",
//           "persist/REHYDRATE",
//           "persist/REGISTER",
//         ],
//       },
//     }),
// });

// // Create Persistor
// export const persistor = persistStore(store);
