import { useEffect, useState } from "react";

import "./App.css";

const App = () => {
  const initialAnecdotes = [
    { id: 0, text: "If it hurts, do it more often.", votes: 0 },
    {
      id: 1,
      text: "Adding manpower to a late software project makes it later!",
      votes: 0,
    },
    {
      id: 2,
      text: "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      votes: 0,
    },
    {
      id: 3,
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      votes: 0,
    },
    {
      id: 4,
      text: "Premature optimization is the root of all evil.",
      votes: 0,
    },
    {
      id: 5,
      text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      votes: 0,
    },
    {
      id: 6,
      text: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      votes: 0,
    },
    { id: 7, text: "The only way to go fast, is to go well.", votes: 0 },
  ];

  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);
  const [selected, setSelected] = useState(0);
  const [mostVoted, setMostVoted] = useState(0);

  const generateRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(anecdotes[randomIndex].id);
  };

  const voteForAnecdote = () => {
    const updatedAnecdotes = anecdotes.map((anecdote) =>
      anecdote.id === selected
        ? { ...anecdote, votes: anecdote.votes + 1 }
        : anecdote
    );
    setAnecdotes(updatedAnecdotes);
    console.log("Updated anecdotes:", updatedAnecdotes);
  };

  console.log("Selected anecdote:", selected);

  useEffect(() => {
    const mostVoted = anecdotes.reduce(
      (prev, current) => (prev.votes > current.votes ? prev : current),
      anecdotes[0]
    );
    setMostVoted(mostVoted.id);
  }, [anecdotes]);

  return (
    <>
      <div className="card">
        <h1>Anecdote of the Day</h1>
        <h3>{anecdotes[selected].text}</h3>
        <p>has {anecdotes[selected].votes} votes</p>
        <button onClick={() => voteForAnecdote()}>Vote</button>
        <button onClick={() => generateRandomAnecdote()}>Next Anecdote</button>
      </div>
      <div className="card">
        <h2>The Most Voted Anecdote</h2>
        <h3>{anecdotes[mostVoted].text}</h3>
        <p>has {anecdotes[mostVoted].votes} votes</p>
      </div>
    </>
  );
};

export default App;
