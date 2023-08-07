
import { configureStore  } from '@reduxjs/toolkit';
import apiSliceReducer from './apiSliceReducer';
import statusReducer from './statusReducer';
import thunk from 'redux-thunk';
import subscriptionReducer from './subscriptionSlice';
 const store = configureStore({
  reducer: {
    api: apiSliceReducer,
    status: statusReducer,
    subscription: subscriptionReducer,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;