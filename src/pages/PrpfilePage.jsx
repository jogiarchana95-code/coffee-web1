import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScreenContainer from "../components/ScreenContainer";
import Input from "../components/Input";
import Button from "../components/Button";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("coffee-profile")) ?? { name: "", email: "", phone: "" };
    } catch {
      return { name: "", email: "", phone: "" };
    }
  });
  const [saved, setSaved] = useState(false);

  const update = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
    setSaved(false);
  };

  return (
    <ScreenContainer>
      <section className="profile-page">
        <header className="profile-intro">
          <div className="profile-avatar" aria-hidden="true">{profile.name ? profile.name.slice(0, 1).toUpperCase() : "☕"}</div>
          <div className="profile-heading">
            <p className="eyebrow">YOUR COFFEE ACCOUNT</p>
            <h2>{profile.name || "Welcome, coffee lover"}</h2>
            <p>Keep your details ready for your next order.</p>
          </div>
          <span className="profile-member">GREEN MEMBER</span>
        </header>
        <form className="profile-form" onSubmit={(event) => {
          event.preventDefault();
          localStorage.setItem("coffee-profile", JSON.stringify(profile));
          setSaved(true);
        }}>
          <h3>Personal details</h3>
          <div className="profile-fields">
            <label htmlFor="profile-name">Full name</label>
            <Input id="profile-name" name="name" placeholder="Your name" value={profile.name} onChange={update} required />
            <label htmlFor="profile-email">Email address</label>
            <Input id="profile-email" name="email" type="email" placeholder="you@example.com" value={profile.email} onChange={update} required />
            <label htmlFor="profile-phone">Phone number</label>
            <Input id="profile-phone" name="phone" type="tel" placeholder="Your phone number" value={profile.phone} onChange={update} />
          </div>
          <div className="profile-form-footer">
            {saved && <p role="status">Your details are saved on this device.</p>}
            <Button type="submit">{saved ? "Saved" : "Save changes"}</Button>
          </div>
        </form>
        <div className="profile-signout-row">
          <div><h3>Sign out</h3><p>You can sign back in any time.</p></div>
          <Button variant="secondary" onClick={() => {
            localStorage.removeItem("coffee-session");
            navigate("/login");
          }}>Sign out</Button>
        </div>
      </section>
    </ScreenContainer>
  );
}