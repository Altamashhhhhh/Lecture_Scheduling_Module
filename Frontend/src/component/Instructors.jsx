import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructors, updateInstructor } from "../redux/userActions";
import { assignBatch } from "../redux/batchActions";  
import { fetchCourses } from "../redux/courseActions";
import { Box, Button, Table, Input } from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";

const Instructors = () => {
  const dispatch = useDispatch();
 
  const { users } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);
  const { courses } = useSelector((state) => state.course);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    dispatch(fetchInstructors(token));
    dispatch(fetchCourses(token));
  }, [dispatch, token]);
 
  const handleAssignTask = (instructorId) => {
    if (!selectedCourse || !selectedDate) {
      toaster.create({ 
        title: "Please select a course and date.",
        type: "error" 
      });
      return;
    }

    dispatch(
      assignBatch({
        instructorId,
        courseId: selectedCourse,
        date: selectedDate,
        token,
      })
    )
      .unwrap()
      .then(() => {
        toaster.create({
          title: "Batch Assigned Successfully!",
          type: "success",
        });
      })
      .catch((error) =>
        toaster.create({
          title: `Error: ${error}`,
          type: "error",
        })
      );
  };
 
  const handleUpdate = (userId , data ) => {
    const name = prompt("Update Name" , data.name) || data.name
    const email = prompt("Update Email" , data.email) || data.email
    const role = prompt("Update Role" , data.role) || data.role
    const updatedData = {
      name , email , role 
    }
    console.log(`Update with ID: ${userId}`);
    dispatch(updateInstructor({id : userId , updatedData , token }))
  };

  return (
    <Box p={4} w="100%" h="auto">
      <Table.Root w="80%" m="20px auto" interactive>
        <Table.Header>
          <Table.Row bg="gray.200">
            <Table.Cell as="th">Name</Table.Cell>
            <Table.Cell as="th">Role</Table.Cell>
            <Table.Cell as="th">Assign Batch</Table.Cell>
            <Table.Cell as="th">Actions</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user._id} bg="white">
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>
                <select
                  style={{ backgroundColor: "white", padding: "10px" }}
                  placeholder="Select Course"
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <input
                  style={{ backgroundColor: "white", padding: "10px" }}
                  type="date"
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <Button
                  colorPalette="blue"
                  size="sm"
                  mt={2}
                  onClick={() => handleAssignTask(user._id)}
                >
                  Assign
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  colorPalette="teal"
                  size="sm"
                  onClick={() => handleUpdate(user._id , user)}
                >
                  Update
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default Instructors;
