import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REGISTER,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import todoSlice from "../features/todos/todoSlice";

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, todoSlice);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: true
});

export const persistor = persistStore(store);