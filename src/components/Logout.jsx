import React from "react";
import { useNavigate } from "react-router";
import { auth } from "/public/config/firebaseinit";
import { signOut } from "firebase/auth";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("logged out");
      navigate("/"); // Redirect to Home
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  React.useEffect(() => {
    handleLogout(); //! LogsOut on path reach // when button is clicked //
  }, []);
}
