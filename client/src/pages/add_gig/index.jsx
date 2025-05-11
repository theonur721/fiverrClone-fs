import React from "react";
import Input from "../../components/Input";
import { inputs } from "../../utils/constants";

const AddGig = () => {
  return (
    <div>
      {inputs.map((props) => (
        <Input {...props} />
      ))}
    </div>
  );
};

export default AddGig;
