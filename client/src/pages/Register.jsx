import React, { useState } from "react";
import Input from "../components/Input";
import Toggler from "../components/Toggler";

const Register = () => {
  const [isSeller, setIsSeller] = useState(false);
  return (
    <div className="max-w-[900px] mx-auto">
      <form className="grid md:grid-cols-2 md:gap-10 md:pt-24">
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
            label="Phone"
            type="number"
            name="phone"
          />
          <Input disabled={!isSeller} label="Description" name="description" />
        </div>
      </form>
    </div>
  );
};

export default Register;
