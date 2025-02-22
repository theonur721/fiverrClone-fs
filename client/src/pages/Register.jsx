import React, { useState } from "react";
import Input from "../components/Input";
import Toggler from "../components/Toggler";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";
const Register = () => {
  const [isSeller, setIsSeller] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // bir formdata örneği oluştur
    const formData = new FormData(e.target);

    // bütün inputlardaki verileri nesne haline getir
    const newUser = Object.fromEntries(formData.entries());

    // satıcı hesabı ise nesne içine bunu kaydet
    newUser.isSeller = isSeller;

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

  return (
    <div className="max-w-[900px] mx-auto">
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 md:gap-10 md:pt-24"
      >
        <div>
          <h1 className="text-xl md:text-2xl text-gray-500 font-bold mb-5">
            Create New Account
          </h1>
          <Input label="Name" isReq={true} name="username" />
          <Input label="Email" isReq={true} name="email" />
          <Input label="Photo" isReq={true} name="photo" type="file" />
          <Input label="Country" isReq={true} name="country" />
          <Input
            label="Password"
            isReq={true}
            name="password"
            type="password"
          />
        </div>

        {/* I Want To Be A Seller ve Toggler kısmı */}
        <div className="flex flex-col gap-2 mt-5">
          <h1 className="font-bold text-xl md:text-2xl text-gray-500 whitespace-nowrap">
            I Want To Be A Seller
          </h1>
          <div>
            <Toggler setIsSeller={setIsSeller} />
          </div>

          <Input
            disabled={!isSeller}
            isReq={isSeller}
            label="Phone"
            type="number"
            name="phone"
          />
          <Input disabled={!isSeller} label="Description" name="description" />
          <Button text="Sign Up" />

          <p className="mt-2 text-gray-500">
            Do you have an account?{" "}
            <Link className="text-blue-500" to="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
