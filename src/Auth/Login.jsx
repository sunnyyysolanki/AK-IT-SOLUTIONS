import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { LoginSchema } from "../Schemas/AuthSchema";
import { useState } from "react";
import api from "../Api/Api";

const Login = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({ resolver: zodResolver(LoginSchema) });

  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const submit = async (data) => {
    setError("");
    try {
      const response = await api.post("Auth/login", {
        ...data,
      });
      console.log(response);
      localStorage.setItem("token", response?.data?.data?.accessToken);
      navigate("/");
    } catch (err) {
      console.log(err?.response);
      setError(err?.response?.data?.errors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen h-screen w-full">
      <div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(submit)}>
          <p className="flex items-center justify-center">Welcome Back</p>
          <div className="flex flex-col">
            <label>Username</label>
            <input type="text" {...register("username")}></input>
            {errors?.username && <p>{errors.username.message}</p>}
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input type="password" {...register("password")}></input>
            {errors?.password && <p>{errors.password.message}</p>}
          </div>
          {/* {error?.Object((e) => (
            <p>{e.message}</p>
          ))} */}
          <button className="border-2 w-full flex items-center justify-center">
            Sign in
          </button>
        </form>
        <div className="flex gap-1 mt-2">
          <p>Don't have you account? </p>
          <Link to={"/register"}> Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
