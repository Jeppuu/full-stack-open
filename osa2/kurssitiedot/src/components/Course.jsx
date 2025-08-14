const Header = ({ courseName }) => {
  console.log("Header component", courseName);
  return <h2>{courseName}</h2>;
};

const Part = ({ part }) => {
  console.log("Part component", part);
  return (
    <div>
      <h3>{part.name}</h3>
      <p>Exercises: {part.exercises}</p>
    </div>
  );
};

const Content = ({ parts }) => {
  console.log("Content component", parts);
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  console.log("Props from total", parts);
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  console.log(totalExercises);
  return <h4>Total of {totalExercises} exercises</h4>;
};

const Course = ({ course }) => {
  console.log("Course component", course);
  console.log("Course parts", course.parts);
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
