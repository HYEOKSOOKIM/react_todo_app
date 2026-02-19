import React from "react";

function Button({ text = "기본", color = "#fff" }) {
  return <button style={{ backgroundColor: color }}>{text}</button>;
}

export default Button;
