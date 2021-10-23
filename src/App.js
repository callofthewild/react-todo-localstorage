import './App.css';
import { useEffect, useState } from "react";


function App() {

  // need state to keep track of todos
  // because localstorage is synchronus - that could slow down the application
  // instead of using just an empty array as the initial state - we can use a function in its place,
  // which will be executed on the initial render
  // reference: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const[todos, setTodos] = useState(() => {
    // get the todos from local storage
    const savedTodos = localStorage.getItem("todos");
    // if there are todos stored
    if (savedTodos) {
      // return the parsed JSON object back to a javascript object
      return JSON.parse(savedTodos);
      // otherwise
    } else {
      // return an empty array
      return [];
    }
  });

  // need state to keep track ov value in the input
  const [todo, setTodo] = useState("");

  // useEffect to run once component mounts
  useEffect(() => {
    // localstorage supports storting strings as keys and values
    // - therefore we cannot store arrays and objects without converting
    // the object to a string first. JSON.stringify will convert the object into a JSON string
    localStorage.setItem("todos", JSON.stringify(todos));
    // add the todos as as a dependency because we want to update
    // localstorage anytime the todo state changes
  }, [todos]);

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

  // function to remove a todo item from the todo array
  function handleDeleteClick(id) {
    // here we are filtering, the idea is to remove an item from todo array on a button click
    const removeItem = todos.filter((todo) => {
      // return the rest of the todos that don't match the item we are trying to remove
      return todo.id !== id;
    });
    // removeItem returns a new array - so now we are setting todos to the new array
    setTodos(removeItem);
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
        // now we are adding a simple button that we can click on 
        <li key = {todo.id}>
          {/* Add the function we created above as the onClick handler
          remember the handleDeleteClick function needs to know which item we want to remove
          so we need to pass the todo.id to the function needs to the function - also a side note,
          notice how we are calling the handleDeleteClick, this makes sure we are not
          running the function on page load, but rather when the button is clicked.
          */}
          {todo.text}{" "}
          <button onClick = {() => handleDeleteClick(todo.id)}>X</button>
          </li>
      ))}
    </ul>

    </div>
  );
}

export default App;
