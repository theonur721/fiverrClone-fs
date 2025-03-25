import { createContext, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const navigate = useNavigate();

  // giriş yap
  const login = (user_data) => {
    api
      .post("/auth/login", user_data)
      .then((res) => {
        // bildirim gönder
        toast.success(res.data.message);
        // kullanıcı bilgilerini state e kaydet
        setUser(res.data.user);
        // kullanıcı bilgilerinin locale kaydet
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // token kaydet
        localStorage.setItem("token", res.data.token);
        // yönlendir
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  // kayıt ol
  const register = (newUser) => {
    // kullanıcı hesabı oluşturmak için api isteği at
    api
      .post("auth/register", newUser)
      .then((res) => {
        toast.success(
          "Your account has been successfully created. You can login..."
        );
        navigate("/login");
      })
      .catch((err) => toast.error(err.message));
  };

  // çıkış yap
  const logout = () => {
    api.post("/auth/logout").then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
