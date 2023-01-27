import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

const Button = ({ text, fn }) => {
  return (
    <button type="button" onClick={fn}>
      {text}
    </button>
  );
};

const Statistic = ({ text, value, isPercentage }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
      {isPercentage ? <td>%</td> : null}
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const getAverage = () => ((good - bad) / (good + neutral + bad)).toFixed(1);
  const getPositive = () => ((good * 100) / (good + neutral + bad)).toFixed(1);

  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={good + neutral + bad} />
          <Statistic text="average" value={getAverage()} />
          <Statistic text="positive" value={getPositive()} isPercentage />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGoodComment = () => setGood(good + 1);
  const addNeutralComment = () => setNeutral(neutral + 1);
  const addBadComment = () => setBad(bad + 1);

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" fn={addGoodComment} />
      <Button text="neutral" fn={addNeutralComment} />
      <Button text="bad" fn={addBadComment} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
