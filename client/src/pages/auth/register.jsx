import CommonForm from "@/components/ui/common/form";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/store/auth-slice";
import registerformControls from "../../formconfig/index";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const initialState = {
  username: "",
  email: "",
  password: "",
};
const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast("Registration successful!");
        navigate("/login");
      } else {
        toast(data?.payload?.message, {
          duration: 4000,
          style: {
            backgroundColor: "#dc2626", // Tailwind red-600
            color: "white",
            border: "1px solid #b91c1c", // Tailwind red-700
          },
          position: "top-center",
          icon: "❌",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Sign Up
      </h1>
      <p className="text-2xl">
        Already have an account{" "}
        <Link className="text-gray-800 hover:underline" to="/login">
          Login
        </Link>
      </p>
      <CommonForm
        formControls={registerformControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthRegister;
