import React from 'react';
import './card.css';
const styles = {
  success: "bg-green-100 border-green-500 text-green-900 animate-fadeIn z-10",
  info: "bg-blue-100 border-blue-500 text-blue-900 animate-fadeIn z-10",
  warning: "bg-yellow-100 border-yellow-500 text-yellow-900 animate-fadeIn z-10",
  error: "bg-red-100 border-red-500 text-red-900 animate-fadeIn z-10",
};

export default function Card({ type = "info", message }) {
  return (
    <div
      role="alert"
      className={`Card border-l-4 w-471 p-3 rounded-lg font-semibold absolute top-20 text-center  ${styles[type]}`}
    >
      {message}
    </div>
  );

}
