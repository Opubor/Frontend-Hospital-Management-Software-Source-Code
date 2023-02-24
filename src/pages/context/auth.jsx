import axios from "../../services/axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Preloader from "../../components/Preloader";

export const loginContext = createContext(null);

export function LoginProvider({ children }) {
  const token = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(token);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getUser() {
    try {
      const response = await axios.get("/me");
      setUser(response.data);
    } catch (error) {
      setLoggedIn(false);
      localStorage.removeItem("token");
      setUser(null);
      return console.log(error);
    }
  }

  useEffect(function () {
    getUser().then(() => setLoading(false));
  }, []);

  async function login(email, password) {
    try {
      const response = await axios.post("/login", { email, password });
      localStorage.setItem("token", response.data);
      setLoggedIn(true);
      getUser();
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  function logout() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    getUser().then(() => {
      setUser(null);
    });
  }

  return (
    <loginContext.Provider value={{ loggedIn, login, logout, user }}>
      {!loading ? children : <Preloader />}
    </loginContext.Provider>
  );
}
