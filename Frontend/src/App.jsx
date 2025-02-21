import Home from "./component/Home";
import "./App.css";
import Login from "./component/Login";
import Register from "./component/Register";
import Navbar from "./component/Navbar";
import Course from "./component/Course";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import CreateCourse from "./component/CreateCourse";
import Instructors from "./component/Instructors";
import Schedules from "./component/Schedules";
import ProtectedRoute from "./component/ProtectedRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/course"
          element={
            <ProtectedRoute
              element={<Course />}
              allowedRoles={["admin", "instructor"]}
            />
          }
        />
        <Route
          path="/create-course"
          element={
            <ProtectedRoute
              element={<CreateCourse />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/instructors"
          element={
            <ProtectedRoute
              element={<Instructors />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute
              element={<Schedules />}
              allowedRoles={["instructor"]}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
