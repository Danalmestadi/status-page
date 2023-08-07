import { createSlice } from '@reduxjs/toolkit';

interface SubscriptionState {
  isSubscribed: boolean;
}

const initialState: SubscriptionState = {
  isSubscribed: false,
};

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    subscribe: (state) => {
      state.isSubscribed = true;
    },
    unsubscribe: (state) => {
      state.isSubscribed = false;
    },
  },
});

export const { subscribe, unsubscribe } = subscriptionSlice.actions;


export default subscriptionSlice.reducer;