import instance  from ".";

export const addNewTodo = async (dataBody) => {
    try {
        const res = await  instance.post(`/todolist`,dataBody)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getTodo = async (path) => {
    try {
        const res = await  instance.get(path)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const updateTodo = async (path, bodyData) => {
    try {
        const res = await  instance.patch(path,bodyData)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const removeTodo = async (path) => {
    try {
        const res = await  instance.delete(path)
        return res.data
    } catch (error) {
        console.log(error)
    }
}