import { Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutClient from "./components/layout/LayoutClient";
import UserContextProvider from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddTodo from './pages/AddTodo';
import UpdateTodo from './pages/UpdateTodo';

function App() {

  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<LayoutClient />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/add" element={<AddTodo />} />
          <Route path="/update/:id" element={<UpdateTodo />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
