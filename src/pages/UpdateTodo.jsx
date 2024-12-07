import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "./../schema/todo";
import { getTodo, updateTodo } from "./../service/todo";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTodo = () => {
  const nav = useNavigate();
  const {id} = useParams()
  const [dataTodo, setDataTodo] = useState([])
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
  });
  useEffect(()=>{
    (async () =>{
      try {
        const data = await getTodo(`/todolist/${id}`)
        setDataTodo(data)
        reset(data)
      } catch (error) {
        console.log(error);
      }
    })()
  },[])
  const submitForm = async (dataBody) => {
    dataBody = { ...dataBody, status: dataTodo.status, userId: dataTodo.userId };
    try {
      const data  = await updateTodo(`/todolist/${id}`,dataBody);
      if (data) {
        confirm("Bạn có muốn sang trang chủ không") && nav("/");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="max-w-[450px] mx-auto border rounded-md p-5 shadow-lg mt-10"
    >
      <h1 className="text-center font-bold text-xl">Cập nhật công việc</h1>
      <div className="my-4 flex flex-col gap-2">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          placeholder="Title...."
          className="py-1 px-3 border border-[#666666] rounded"
          name="title"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 italic">{errors.title?.message}</p>
        )}
      </div>

      <div className="my-4 flex flex-col gap-2">
        <label htmlFor="priority">Chọn độ ưu tiên:</label>
        <select
          name="priority"
          id="priority"
          className="border border-[#666666] rounded py-1 px-3 cursor-pointer"
          {...register("priority")}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="my-4 flex flex-col gap-2">
        <label htmlFor="description">
          Mô tả công việc{" "}
          <span className="text-xs italic text-red-800">(không bắt buộc)</span>
        </label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          className="border border-[#666666] rounded py-1 px-3 resize-none"
          placeholder="Đây là sản phẩm..."
          {...register("description")}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 italic">{errors.description?.message}</p>
        )}
      </div>

      <button className="text-center bg-green-500 w-full py-2 font-bold rounded-lg">
        Cập nhật
      </button>
    </form>
  );
};

export default UpdateTodo;
