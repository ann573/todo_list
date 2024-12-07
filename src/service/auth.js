import instance from ".";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const registerAccount = async (dataBody) =>{
    try {
        const data = await instance.post("/register", dataBody)
    return data
    } catch (error) {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
    }
}

export const loginAccount = async (dataBody) =>{
    try {
        const data = await instance.post("/login", dataBody)
        return data
    } catch (error) {
        if (error.response?.status === 400) {
            toast.error("Tài khoản hoặc mật khẩu không đúng");
          } else {
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
          }
    }
}