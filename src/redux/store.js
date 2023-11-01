
// // import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
// // import createSagaMiddleware from "redux-saga";
// // import {reduxBatch} from "@manaflair/redux-batch";
// // import {persistStore} from "redux-persist";
// // import {rootReducer, rootSaga} from "./rootReducer";

// // const sagaMiddleware = createSagaMiddleware();
// // const middleware = [
// //   ...getDefaultMiddleware({
// //     immutableCheck: false,
// //     serializableCheck: false,
// //     thunk: true
// //   }),
// //   sagaMiddleware
// // ];

// // const store = configureStore({
// //   reducer: rootReducer,
// //   middleware,
// //   devTools: process.env.NODE_ENV !== "production",
// //   enhancers: [reduxBatch]
// // });

// // export const persistor = persistStore(store);

// // sagaMiddleware.run(rootSaga);

// // export default store;
// // import React from 'react';
// import {persistStore,persistReducer } from "redux-persist";
// import { createWrapper } from "next-redux-wrapper";
// const store = createStore(companyReducer)

// const persistedReducer = persistReducer(persistConfig, rootReducer)
// export const persistor = persistStore(store);
// const makeStore = () => store;

// export const wrapper = createWrapper(makeStore);

//old technique
import { createStore, compose } from 'redux'
import { rootReducer } from './rootReducer';
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store = createStore(
  rootReducer, {}, composeEnhancers()
);

//presist redux

// import { createStore } from "redux";
// // import  from "./reducers/authReducer";
// import rootReducer from "./reducers";
// import { persistStore, persistReducer } from "redux-persist";
// import sessionStorage from "redux-persist/es/storage/session";
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: "root",
//   storage: storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(persistedReducer);
// let persistor = persistStore(store);

// export default store;
// export { persistor };