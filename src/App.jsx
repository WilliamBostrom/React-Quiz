import { useEffect, useReducer } from "react";
import Header from "./Header";
import Mains from "./Mains";
import Loader from "./Loader";
import Error from "./Error";

const inititalState = {
  questions: [],
  //loading, error, ready, active, finished
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, question: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Unknown");
  }
}

function App() {
  const [{ question, status }, dispatch] = useReducer(reducer, inititalState);
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Mains>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
      </Mains>
    </div>
  );
}

export default App;
