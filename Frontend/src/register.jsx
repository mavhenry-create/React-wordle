
export default function Register() {
  return (
    <div>
      <button
        onClick={() => {
          const returnTo = encodeURIComponent("http://localhost:5173/");

          window.location.href =
          `http://localhost:3000/auth/login?screen_hint=signup&returnTo=${returnTo}`;
        }}
      >
        Create account
      </button>
    </div>
  );
}
