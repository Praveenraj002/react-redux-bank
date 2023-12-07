import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const accountReducer = (state = initialStateAccount, action) => {
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
  return state;
};

const customerReducer = (state = initialStateCustomer, action) => {
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

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

const deposit = (amount) => {
  return { type: "account/deposit", payload: amount };
};
const withdraw = (amount) => {
  return { type: "account/withdraw", payload: amount };
};
const requestLoan = (amount, purpose) => {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  };
};
const payLoan = () => {
  return { type: "account/payLoan" };
};

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(1000, "Buy a Car"));
store.dispatch(payLoan());
console.log(store.getState());

const createCustomer = (fullName, nationalId) => {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toISOString(),
    },
  };
};

const updateName = (fullName) => {
  return { type: "customer/updateName", payload: fullName };
};

store.dispatch(createCustomer("Praveen", "1234"));
store.dispatch(updateName("Praveen Raj"));
console.log(store.getState());
