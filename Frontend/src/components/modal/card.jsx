import React from 'react';

const styles = {
  success: "bg-green-100 border-green-500 text-green-900",
  info: "bg-blue-100 border-blue-500 text-blue-900",
  warning: "bg-yellow-100 border-yellow-500 text-yellow-900",
  error: "bg-red-100 border-red-500 text-red-900",
};

export default function Card({ type = "info", message }) {
  return (
    <div
      role="alert"
      className={`border-l-4 p-3 rounded-lg font-semibold ${styles[type]}`}
    >
      {message}
    </div>
  );

}
