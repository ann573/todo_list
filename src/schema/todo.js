import * as z from 'zod'
export const todoSchema = z.object({
    title: z.string().min(6,{message: "Tối thiểu 6 ký tự"}),
    priority: z.enum(["low", "medium", "high"], { message: "Chọn độ ưu tiên" }),  // 
    description: z.string().optional()
})