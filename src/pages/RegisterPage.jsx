import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema } from "./../schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAccount } from './../service/auth';


const RegisterPage = () => {
  const nav = useNavigate()
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const submitForm = async (dataBody) => {
    dataBody = {...dataBody, "todo": []}
    try {
      const data = await registerAccount(dataBody)
      if (data)
      {
        alert("Đăng ký thành công!")
        nav("/login")
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form
        className="max-w-[450px] mx-auto border py-2 px-5 mt-[10%]"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className="font-bold text-3xl text-center mb-3">Đăng ký</h1>
        <div className="mb-3 flex flex-col">
          <label htmlFor="username">Nhập username:</label>
          <input
            type="text"
            placeholder="Abc..."
            name="username"
            id="username"
            className="px-3 py-1 focus:outline-[#6e6e6e] mt-2"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500 italic">{errors.username?.message}</p>
          )}
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="email">Nhập Email:</label>
          <input
            type="email"
            placeholder="Abc..."
            name="email"
            id="email"
            className="px-3 py-1 focus:outline-[#6e6e6e] mt-2"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 italic">{errors.email?.message}</p>
          )}
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="password">Nhập mật khẩu</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="px-3 py-1 focus:outline-[#6e6e6e] mt-2"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 italic">{errors.password?.message}</p>
          )}
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
          <input
            type="password"
            placeholder="Password"
            name="confirmPassword"
            id="confirmPassword"
            className="px-3 py-1 focus:outline-[#6e6e6e] mt-2"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 italic">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
        <button className="w-full bg-green-500 py-1 mt-5 rounded-lg">
          Đăng ký
        </button>

        <p className="my-3">
          Bạn đã có tài khoản?{" "}
          <Link to="/register" className="italic underline text-blue-400">
            Đăng nhập ngay
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterPage;
