import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../utils/api";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const user = Object.fromEntries(formData.entries());

    api
      .post("auth/login", user)
      .then((res) => {
        // bildirim gönder
        toast.success(res.data.message);
        // kullanıcı bilgilerinin locale kaydet
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // token kaydet
        localStorage.setItem("token", res.data.token);
        // yönlendir
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <div className="pt-24 max-w-[700px] mx-auto sm:min-w-[400px] max-sm:w-full">
      <h1 className="text-xl md:text-2xl font-bold mb-10 text-gray-500">
        Login To Your Account
      </h1>

      <form onSubmit={handleSubmit}>
        <Input label="Name" name="username" isReq={true} />
        <Input label="Password" name="password" type="password" isReq={true} />
        <Button text="Login" className="w-full" />
      </form>

      <p className="mt-5 text-gray-500">
        Don't have an account?{" "}
        <Link className="text-blue-500 ms-2" to="/register">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
