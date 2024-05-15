import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice'; // Replace with your slice file path
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

    
const authPersistConfig = {
  key: "tasks",
  storage: storage,
  whitelist: ["tasks"],
};

const rootReducer = combineReducers({
    tasks: persistReducer(authPersistConfig, tasksReducer),
  });
export  const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the type of the store
export type AppDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store)

export default store;
