import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import welcomeCoffee from "../assets/Image Onboarding.png";

export default function WelcomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("coffee-session")) navigate("/home", { replace: true });
  }, [navigate]);

  return (
    <main className="welcome-screen" style={{ "--welcome-image": `url("${welcomeCoffee}")` }}>
      <div className="welcome-shade" />
      <header className="welcome-brand"><span aria-hidden="true">CO</span> COFFEE HOUSE</header>
      <section className="welcome-copy">
        <p className="eyebrow">YOUR DAILY RITUAL</p>
        <h1>Find your<br />coffee moment.</h1>
        <p>Good coffee, made fresh and delivered with care.</p>
        <Link className="welcome-cta" to="/login">Get started <span aria-hidden="true">→</span></Link>
        <p className="welcome-login">Already have an account? <Link to="/login">Log in</Link></p>
      </section>
      <span className="welcome-index">01 / 03</span>
    </main>
  );
}
