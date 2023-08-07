import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApiState {
  status: string;
}

const initialState: ApiState = {
  status: "",
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setApiStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export const { setApiStatus } = apiSlice.actions;

export default apiSlice.reducer;