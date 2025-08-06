const Header = (props) => {
  console.log(props);
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  console.log(props.part);
  return (
    <div>
      <p>{props.part.name}</p>
      <p>Exercises: {props.part.exercises}</p>
    </div>
  );
};

const Content = (props) => {
  console.log(props);
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  );
};

const Total = (props) => {
  // calcute the total number of exercises
  const total = props.total.reduce((sum, part) => sum + part.exercises, 0);
  console.log(total);
  return <p>Total number of exercises: {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>
  );
};

export default App;
