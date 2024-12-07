import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { loginSchema } from './../schema/auth';
import {zodResolver} from '@hookform/resolvers/zod'
import { UserContext } from './../context/AuthContext';
import { loginAccount } from "../service/auth";
const LoginPage = () => {

  const nav = useNavigate()
  const {handleSubmit, reset, register, formState: {errors}} = useForm({
    resolver: zodResolver(loginSchema)
  })


  const submitForm = async (dataBody) => {
    try {
      const {data} = await loginAccount(dataBody)
      if (data)
      {
        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("user", JSON.stringify(data.user))

        nav("/")
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form className="max-w-[450px] mx-auto border py-2 px-5 mt-[10%]" onSubmit={handleSubmit(submitForm)}>
        <h1 className="font-bold text-3xl text-center mb-3">Đăng nhập</h1>
        <div className="mb-3 flex flex-col">
          <label htmlFor="email">Nhập email:</label>
          <input type="email" placeholder="Abc..." name="email" id="email" className="px-3 py-1 focus:outline-[#6e6e6e] mt-2" {...register("email")}/>
          {errors.email && <p className="text-red-500 italic">{errors.email?.message}</p>}
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="password">Nhập mật khẩu</label>
          <input type="password" placeholder="Password" name="password" id="password" className="px-3 py-1 focus:outline-[#6e6e6e] mt-2" {...register("password")}/>
          {errors.password && <p className="text-red-500 italic">{errors.password?.message}</p>}
        </div>
        <button className="w-full bg-green-500 py-1 mt-5 rounded-lg">
          Login
        </button>

        <p className="my-3">Bạn chưa có tài khoản? <Link to="/register" className="italic underline text-blue-400">Đăng ký ngay</Link></p>
      </form>
    </>
  );
};

export default LoginPage;
