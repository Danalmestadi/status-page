import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ApiState {
  status: string;
}

const initialState: ApiState = {
  status: 'unknown',
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setApiStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
  },
});

export const { setApiStatus } = apiSlice.actions;

export default apiSlice.reducer;