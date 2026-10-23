import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginCoffee from "../assets/Image.png";
import Input from "../components/Input";
import Button from "../components/Button";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("coffee-session")) navigate("/home", { replace: true });
  }, [navigate]);

  const signIn = (event) => {
    event.preventDefault();
    localStorage.setItem("coffee-session", JSON.stringify({ email }));
    navigate("/home", { replace: true });
  };

  return (
    <main className="login-screen" style={{ "--login-image": `url("${loginCoffee}")` }}>
      <Link className="login-back" to="/" aria-label="Back to welcome">←</Link>
      <div className="login-panel">
        <p className="eyebrow">WELCOME TO COFFEE HOUSE</p>
        <h1>Let's get you<br />a good cup.</h1>
        <p className="login-subtitle">Sign in to order your favorites.</p>
        <form onSubmit={signIn}>
          <label className="login-label" htmlFor="login-email">Email address</label>
          <Input id="login-email" type="email" autoComplete="email" placeholder="you@example.com" value={email}
            onChange={(event) => setEmail(event.target.value)} required />
          <label className="login-label" htmlFor="login-password">Password</label>
          <Input id="login-password" type="password" autoComplete="current-password" placeholder="Enter your password" value={password}
            onChange={(event) => setPassword(event.target.value)} required minLength={4} />
          <Button block type="submit">Continue</Button>
        </form>
        <p className="login-demo-note">Demo sign-in saves your session on this device.</p>
      </div>
    </main>
  );
}
