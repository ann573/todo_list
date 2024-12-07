import * as z from 'zod'

export const registerSchema = z.object({
  username: z.string().trim().min(3, { message: "Tối thiểu có 3 ký tự" }),
  password: z.string().trim().min(6, {message: "Password tối thiểu có 6 kí tự"}),
  confirmPassword: z.string().min(6, {message: "Password tối thiểu có 6 kí tự"}),
  email: z.string().email({message: "Nhập đúng định dạng email"})
})
.refine(data => data.password === data.confirmPassword,{
    message:"Password không trùng nhau",
    path: ["confirmPassword"],
})

export const loginSchema = z.object({
  email: z.string().email({message: "Nhập đúng định dạng email"}),
  password: z.string().min(6, {message: "Password tối thiểu có 6 kí tự"}),
})