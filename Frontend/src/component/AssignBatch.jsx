import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructors } from "../redux/userActions";
import { fetchCourses } from "../redux/courseActions";
import { assignBatch } from "../redux/batchActions";
import { Box, Button, Select, Input, useToast } from "@chakra-ui/react";

const AssignBatch = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { token } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.user);
  const { courses } = useSelector((state) => state.course);
  const { status, error } = useSelector((state) => state.batch);

  const [instructorId, setInstructorId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    dispatch(fetchInstructors(token));
    dispatch(fetchCourses(token));
  }, [dispatch, token]);

  const handleAssign = () => {
    if (!instructorId || !courseId || !date) {
      toast({
        title: "All fields are required!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    dispatch(assignBatch({ instructorId, courseId, date, token }))
      .unwrap()
      .then(() => {
        toast({
          title: "Batch Assigned Successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setInstructorId("");
        setCourseId("");
        setDate("");
      })
      .catch((err) =>
        toast({
          title: `Error: ${err}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
  };

  return (
    <Box
      p={5}
      maxW="500px"
      m="50px auto"
      bg="white"
      boxShadow="md"
      p={5}
      borderRadius="lg"
    >
      <Select
        placeholder="Select Instructor"
        onChange={(e) => setInstructorId(e.target.value)}
      >
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </Select>

      <Select
        placeholder="Select Course"
        onChange={(e) => setCourseId(e.target.value)}
        mt={3}
      >
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.name}
          </option>
        ))}
      </Select>

      <Input type="date" onChange={(e) => setDate(e.target.value)} mt={3} />

      <Button
        colorPalette="blue"
        mt={4}
        color="white"
        onClick={handleAssign}
        isLoading={status === "Loading"}
      >
        Assign Batch
      </Button>

      {status === "Failed" && <Box color="red.500">{error}</Box>}
    </Box>
  );
};

export default AssignBatch;
