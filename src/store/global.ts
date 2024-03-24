import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UnitsState {
  tempUnit: string;
  forecastUnit: string;
}

const initialState: UnitsState = {
  tempUnit: "C",
  forecastUnit: "Hourly",
};

const globalReducer = createSlice({
  name: "global_reducer",
  initialState,
  reducers: {
    changeTempUnit: (state, action: PayloadAction<string>) => {
      state.tempUnit = action.payload;
    },
    changeforecastUnit: (state, action: PayloadAction<string>) => {
      state.forecastUnit = action.payload;
    },
  },
});

export const { changeTempUnit, changeforecastUnit } = globalReducer.actions;
export default globalReducer.reducer;
