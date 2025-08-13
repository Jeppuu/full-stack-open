import { useState } from "react";

const Statistics = ({ feedback }) => {
  console.log(feedback);
  const { good, neutral, bad } = feedback;
  const totalFeedback = good + neutral + bad;
  const averageFeedback = (good - bad) / totalFeedback || 0;
  const positiveFeedback = (good / totalFeedback) * 100 || 0;

  if (totalFeedback < 1) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total amount" value={totalFeedback} />
          <StatisticLine text="Average" value={averageFeedback} />
          <StatisticLine text="Positive" value={positiveFeedback} />
        </tbody>
      </table>
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const feedback = { good, neutral, bad };

  const giveFeedback = (type) => {
    if (type === "good") {
      setGood(good + 1);
    } else if (type === "neutral") {
      setNeutral(neutral + 1);
    } else if (type === "bad") {
      setBad(bad + 1);
    }
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => giveFeedback("good")} text={"Good"} />
      <Button onClick={() => giveFeedback("neutral")} text={"Neutral"} />
      <Button onClick={() => giveFeedback("bad")} text={"Bad"} />
      <Statistics feedback={feedback} />
    </div>
  );
};

export default App;
