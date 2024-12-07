import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTodo, removeTodo, updateTodo } from "../service/todo.js";

// /todolist?usersId=${+userId}
const HomePage = () => {
  const [listTodo, setListTodo] = useState([]);
  const [totalCompleted, setTotalCompleted]= useState(0)

  const accessToken = localStorage.getItem("accessToken") || null;
  const user = JSON.parse(localStorage.getItem("user")) || null;
  if(user){
    useEffect(() => {
      (async () => {
        setListTodo(await getTodo(`/todolist?userId=${user.id}`) );
        setTotalCompleted((await getTodo(`/todolist?userId=${user.id}&&status=true`)).length)
      })();
    }, []);
  }

  async function changeStatus(id){
    const findTodo = listTodo.find((item) => item.id === id);
    if (findTodo){
      findTodo.status = !findTodo.status
      try {
        await updateTodo(`/todolist/${id}`, findTodo)
      } catch (error) {
        console.log(error);
      }
      window.location.reload();
    }
  }

  const removeItem = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không?");
    
    if (isConfirmed) {
      try {
        await removeTodo(`/todolist/${id}`);
        window.location.reload(); 
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  return (
    <main>
      {accessToken ? (
        <>
          <Link
            to="/add"
            className="bg-blue-500 px-3 py-1 block w-fit ml-5 mt-3 rounded-lg"
          >
            Thêm công việc
          </Link>
          {listTodo.length === 0 ? (
            <p className="text-center font-bold text-xl">
              Bạn chưa có công việc nào, thêm công việc nhé
            </p>
          ) : (
            <>
              <table className="border border-collapse mx-auto text-center mt-5">
                <thead>
                  <tr>
                    <th className="border p-3">ID</th>
                    <th className="border w-[25%]">Tên công việc</th>
                    <th className="border w-[10%]">Trạng thái</th>
                    <th className="border w-[15%]">Mức độ ưu tiên</th>
                    <th className="border w-[30%]">Mô tả</th>
                    <th className="border w-[15%]">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listTodo.map((item, index)=>{
                      return(
                      <tr key={index}>
                        <td className="border">{item.id}</td>
                        <td className="border capitalize">{item.title}</td>
                        <td className="border p-3 cursor-pointer" onClick={()=>changeStatus(item.id)}>{item.status ? <span className="bg-green-500 p-1 rounded-md">Completed</span> : <span className="bg-yellow-500 p-1 rounded-md">Pending</span>}</td>
                        <td className="border capitalize">{item.priority}</td>
                        <td className="border">{item.description}</td>  
                        <td className="border p-2">
                          <button className="bg-red-500 p-1 rounded-md mr-1" onClick={()=>removeItem(item.id)}>Remove</button>
                          <button className="bg-orange-500 p-1 rounded-md">
                            <Link to={`/update/${item.id}`}>Edit</Link>
                          </button>
                        </td>
                      </tr>)
                    })
                  }
                </tbody>
              </table>
              <p className="text-center mt-4 font-bold">Có tổng cộng {totalCompleted}/{listTodo.length} công việc được hoàn thành</p>
            </>
          )}
        </>
      ) : (
        <p>Hãy đăng nhập để thấy các công việc nhé</p>
      )}
    </main>
  );
};

export default HomePage;
