import "./App.css";
import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  activeLoan: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        balance: 500,
        isActive: true,
        loan: 0,
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "withdraw":
      return {
        ...state,
        balance: state.balance - 50,
      };
    case "loanRequest":
      if (state.loan === 0) {
        return {
          ...state,
          balance: state.balance + 5000,
          loan: state.loan + 5000,
        };
      } else {
        return {
          ...state,
        };
      }

    case "payLoan":
      if (state.balance >= 5000)
        return {
          ...state,
          balance: state.balance - state.loan,
          loan: state.loan - state.loan,
        };
      else return { ...state };
    case "closeAccount":
      if (state.loan > 0 || state.balance !== 0) return state;
      return initialState;
    default:
      throw new Error("Unknown operation");
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
      <p>
        Loan:{" "}
        {loan !== 0
          ? `${loan} You already taken your loan.`
          : `${loan} You can take loan`}
      </p>

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
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
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
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={isActive === true ? false : true}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          className="button"
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={isActive === true ? false : true}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
