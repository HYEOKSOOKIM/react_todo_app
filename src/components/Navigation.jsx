import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/TodoList">TodoList</NavLink>
      <NavLink to="https://www.naver.com">네이버</NavLink>
    </nav>
  );
}

export default Navigation;
