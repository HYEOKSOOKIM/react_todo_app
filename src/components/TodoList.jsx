import "./TodoList.css";
import { useState, useEffect } from "react";

const todoList = [
  { id: 1, task: "첫번째할일", isDone: false },
  { id: 2, task: "두번째할일", isDone: true },
  { id: 3, task: "세번째할일", isDone: false },
];

function TodoItem({ todo, isDoneToggle, deleteTodo }) {
  return (
    <li className={todo.isDone ? "completed" : ""}>
      <input
        type="checkbox"
        defaultChecked={todo.isDone}
        onChange={() => {
          isDoneToggle(todo.id);
        }}
      />
      <span>{todo.task}</span>
      <button
        onClick={() => {
          deleteTodo(todo.id);
        }}
      >
        ✖️
      </button>
    </li>
  );
}

function TodoList() {
  // const [todos, setTodos] = useState(todoList);
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [todoValue, setTodoValue] = useState("");

  const addTodo = () => {
    console.log("할일추가");
    if (!todoValue.trim()) return;
    // 할 일을 추가해서 새로운 할일 배열 만들기
    const newTodos = [
      ...todos,
      { id: Date.now(), task: todoValue.trim(), isDone: false },
    ];

    // 기존 할일을 새로운 할일로 바꾸기
    setTodos(newTodos);
    setTodoValue("");
  };

  // 토글 함수
  function isDoneToggle(id) {
    const newTodos = todos.map((todo) =>
      todo.id == id ? { ...todo, isDone: !todo.isDone } : todo,
    );
    setTodos(newTodos);
  }

  // 삭제 함수
  function deleteTodo(id) {
    console.log(id);
    const newTodos = todos.filter((todo) => todo.id != id);
    setTodos(newTodos);
  }

  // 전체 삭제 함수
  function deleteAll(deleteMode) {
    if (deleteMode == "all") setTodos([]);
    else if (deleteMode == "isDone") {
      const newTodos = todos.filter((todo) => !todo.isDone);
      setTodos(newTodos);
    }
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 남은할일 구하기
  function getCompleted() {
    const result = todos.filter((todo) => todo.isDone);
    console.log(result);
  }

  let completeCount = 0;

  return (
    <div className="container">
      <h1>📝 Todo List</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="할 일을 입력하세요."
          value={todoValue}
          onChange={(e) => {
            setTodoValue(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key == "Enter") addTodo();
          }}
        />
        <button onClick={addTodo}>추가</button>
      </div>
      <ul className="todo-list">
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            todo={item}
            isDoneToggle={isDoneToggle}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
      <footer>
        <span>
          남은 할일 : {todos.filter((todo) => !todo.isDone).length}/
          {todos.length}
        </span>
        <div className="btn-group">
          <button onClick={() => deleteAll("isDone")}>완료된 것 삭제</button>
          <button onClick={() => deleteAll("all")}>전체 삭제</button>
        </div>
      </footer>
    </div>
  );
}

export default TodoList;
