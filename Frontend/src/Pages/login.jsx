import { useState, useEffect } from "react";

export default function Login() {
  return (
    <div>
      <button
        onClick={() => {
          const returnTo = encodeURIComponent("http://localhost:5173/");

          window.location.href =
            `http://localhost:3000/auth/login?returnTo=${returnTo}`;
        }}
      >
        Continue with Auth0
      </button>
    </div>
  );
}


