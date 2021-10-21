import './App.css';
import { useState } from "react";


function App() {

  // need state to keep track of todos
  const[todos, setTodos] = useState([]);

  // need state to keep track ov value in the input
  const [todo, setTodo] = useState("");

  // function to get value of the input and set the new state
  function handleInputChange(e) {
    // set the new value to what is currently in the input box
    setTodo(e.target.value);
  }

  // function to create a ew object on form submit
  function handleFormSubmit(e) {
    // prevent the browser default behavior or refreshing the page on submit
    e.preventDefault();

    // don't submit if the input string is empty
    if(todo !== "") {
      // set the new todo state (array)
      setTodos([
        //copy the current values in state
        ...todos,
        {
          // setting a basic id to identify the object
          id: todos.length + 1,
          // set a text property to the value of the todo state and
          // trim the whitespace from the input
          text: todo.trim()
        }
      ]);
    }

    // clear out the input box
    setTodo("");
  }

  return (
    <div className = "App">
      {/* create a form element ad pass the handleFormSubmit function to the form
      using the onSubmit prop*/}
      <form onSubmit={handleFormSubmit}>
        {/* create an input element - make sure to add the value prop
        with state value passed in and the onChane prop to update the state every time
        something is typed in the inpput */}
        <input
          name = "todo"
          type = "text"
          placeholder = "Create a new todo"
          value = {todo}
          onChange = {handleInputChange}
        />
      </form>

    {/* create a ul list to hold all the todo items */}
    <ul className = "todo-list">

      {/* map over the todos array which creates a new li element for every todo 
      make sure to add the "key" prop using the unique todo.id value to teh li element
      remember this is an array of objects - so we need to access the property "text"
      to get the value we want to display
      */}
      {todos.map((todo) => (
        <li key = {todo.id}>{todo.text}</li>
      ))}
    </ul>

    </div>
  );
}

export default App;
