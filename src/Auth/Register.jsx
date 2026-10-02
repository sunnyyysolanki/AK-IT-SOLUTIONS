import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { RegisterSchema } from "../Schemas/AuthSchema";
import { useForm } from "react-hook-form";
import api from "../Api/Api";
import { useState } from "react";

const Register = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({ resolver: zodResolver(RegisterSchema) });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (data) => {
    setError("");
    try {
      const response = await api.post("Auth/register", {
        ...data,
      });
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen h-screen w-full">
      <div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(submit)}>
          <p className="flex items-center justify-center">Create Account</p>

          <div className="flex flex-col">
            <label>Full Name</label>
            <input type="text" {...register("fullName")}></input>
            {errors?.fullName && <p>{errors.fullName.message}</p>}
          </div>

          <div className="flex flex-col">
            <label>Username</label>
            <input type="text" {...register("username")}></input>
            {errors?.username && <p>{errors.username.message}</p>}
          </div>

          <div className="flex flex-col">
            <label>Email</label>
            <input type="text" {...register("email")}></input>
            {errors?.email && <p>{errors.email.message}</p>}
          </div>

          <div className="flex flex-col">
            <label>Password</label>
            <input type="password" {...register("password")}></input>
            {errors?.password && <p>{errors.password.message}</p>}
          </div>
          {error && <p>{error}</p>}
          <button className="border-2 w-full flex items-center justify-center">
            Register
          </button>
        </form>

        <div className="flex gap-1 mt-2">
          <p>Already have an account? </p>
          <Link to={"/login"}> Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
