// import './App.css'
import InputTodo from './todo/input.todo'

function App() {

  const todos = ["todo1", "todo2", "todo3", "todo4", "todo5", "todo6", "todo7"]

  return (
    <>
      <InputTodo />
      <ul>
        {todos.map((item, index) => {
          return (
            <li key={index}>{item}</li>
          )
        })}
      </ul>
    </>
  )
}

export default App
