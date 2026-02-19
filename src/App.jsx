import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import TodoList from "./components/TodoList";
import NotFound from "./components/NotFound";

const Home = lazy(() => import("./components/Home"));

function App() {
  return (
    <div>
      <Navigation />

      <Suspense fallback={<div>로딩중...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todoList" element={<TodoList />} />
          <Route href="https://www.naver.com*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
