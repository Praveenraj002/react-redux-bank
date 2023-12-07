import { createSlice } from "@reduxjs/toolkit";

// INITIAL STATE
const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;

/*
// REDUCERS
export const customerReducer = (state = initialStateCustomer, action) => {
  if (action.type === "customer/createCustomer") {
    return {
      ...state,
      fullName: action.payload.fullName,
      nationalId: action.payload.nationalId,
      createdAt: action.payload.createdAt,
    };
  }
  if (action.type === "customer/updateName") {
    return {
      ...state,
      fullName: action.payload,
    };
  }
  return state;
};

// ACTION CREATORS
export const createCustomer = (fullName, nationalId) => {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toISOString(),
    },
  };
};

export const updateName = (fullName) => {
  return { type: "customer/updateName", payload: fullName };
};
*/
