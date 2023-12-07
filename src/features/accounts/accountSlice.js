import { createSlice } from "@reduxjs/toolkit";

// INITIAL STATE
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: {
            amount,
            purpose,
          },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export const deposit = (amount, currency) => {
  if (currency === "USD")
    return { type: "account/deposit", payload: amount, isLoading: false };

  return async (dispatch, getState) => {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: converted });
  };
};

export default accountSlice.reducer;

/* CLASSIC REDUX
// REDUCER
export const accountReducer = (state = initialState, action) => {
  if (action.type === "account/deposit") {
    return { ...state, balance: state.balance + action.payload };
  }
  if (action.type === "account/withdraw") {
    return { ...state, balance: state.balance - action.payload };
  }
  if (action.type === "account/requestLoan") {
    if (state.loan > 0) return state;
    return {
      ...state,
      loan: action.payload.amount,
      loanPurpose: action.payload.purpose,
      balance: state.balance + action.payload.amount,
    };
  }
  if (action.type === "account/payLoan") {
    return {
      ...state,
      loan: 0,
      loanPurpose: "",
      balance: state.balance - state.loan,
    };
  }
  if (action.type === "account/convertingCurrency") {
    return { ...state, isLoading: true };
  }
  return state;
};

// ACTION CREATORS
export const deposit = (amount, currency) => {
  if (currency === "USD")
    return { type: "account/deposit", payload: amount, isLoading: false };

  return async (dispatch, getState) => {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: converted });
  };
};
export const withdraw = (amount) => {
  return { type: "account/withdraw", payload: amount };
};
export const requestLoan = (amount, purpose) => {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  };
};
export const payLoan = () => {
  return { type: "account/payLoan" };
};
*/
