import "./App.css";
import { useEffect, useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: true,
  activeLoan: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return {
        isActive: true,
        balance: 500,
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + 150,
      };
    case "withdraw":
      return {
        ...state,
        balance: state.balance - 50,
      };
    case "loanRequest":
      return {
        ...state,
        balance: state.balance + 5000,
      };
    case "payLoan":
      if (state.balance >= 5000)
        return {
          ...state,
          balance: state.balance - 5000,
        };
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <h3>
        Account status: {isActive === true ? "Active" : "No Active Account"}
      </h3>
      <p>Balance: {balance}</p>
      <p>Loan: X</p>

      <p>
        <button
          className="button"
          onClick={() => dispatch({ type: "openAccount", payload: "true" })}
          disabled={isActive === true ? true : false}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          className="button"
          onClick={() => dispatch({ type: "deposit" })}
          disabled={isActive === true ? false : true}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          className="button"
          onClick={() => dispatch({ type: "withdraw" })}
          disabled={isActive === true ? false : true}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          className="button"
          onClick={() => dispatch({ type: "loanRequest" })}
          disabled={isActive === true ? false : true}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          className="button"
          onClick={() => {}}
          disabled={isActive === true ? false : true}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          className="button"
          onClick={() => {}}
          disabled={isActive === true ? false : true}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
