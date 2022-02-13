import { Component } from "react";

import "./styles.css";
import React from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: "Hello Coding jitsu fans",
      newTodo: "",
      todos: [
        {
          task: "learn React",
          id: 1,
          done: false
        },
        {
          task: "learn JSX",
          id: 2,
          done: false
        }
      ]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    function uid() {
      return Math.floor(Math.random() * 569);
    }
    this.setState({
      todos: [
        ...this.state.todos,
        {
          task: this.state.newTodo,
          id: uid(),
          done: false
        }
      ]
    });

    this.setState({
      newTodo: ""
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  delete(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id)
    });
  }

  toggle(id) {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      } else return todo;
    });

    this.setState({ todos: updatedTodos });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="newTodo"></label>
          <input
            id="newTodo"
            name="newTodo"
            placeholder="Add new todo"
            onChange={this.handleChange}
            value={this.state.newTodo}
            required
          />
          <button>Add todo</button>
        </form>

        {this.state.todos.map((todo) => {
          return (
            <ul>
              <input type="checkbox" onChange={() => this.toggle(todo.id)} />
              <li className={todo.done ? "done" : null} key={todo.id}>
                {todo.task}
              </li>
              <button onClick={() => this.delete(todo.id)}>delete</button>
            </ul>
          );
        })}
      </div>
    );
  }
}

export default App;
