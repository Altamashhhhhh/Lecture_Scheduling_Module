import { useState, useEffect } from "react";
import {
  Flex,
  Input,
  Button,
  chakra,
  Heading,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toaster } from "../components/ui/toaster";
import { createCourse } from "../redux/courseActions";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLogged , token } = useSelector((state) => state.user);
  const { status, error } = useSelector((state) => state.course);

  const [courseDetails, setCourseDetails] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const formFields = [
    { type: "text", name: "name", placeholder: "Enter Book Name" },
    {
      type: "text",
      name: "description",
      placeholder: "Enter Book Description",
    },
    {
      type: "select",
      name: "level",
      placeholder: "Select level",
      options: ["beginner", "intermediate", "advanced"],
    },
    { type: "text", name: "image", placeholder: "Enter Image Url" },
    { type: "text", name: "batches", placeholder: "Enter Batches" },
  ];

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, level, image, batches  } = courseDetails;
    if (
      name === "" ||
      description === "" ||
      level === "" ||
      image === "" ||
      batches === ""
    ) {
      toaster.create({ title: "All field are required", type: "error" });
      return;
    }
     
    const courseData = {
      name , description  , level , image , batches : batches.split(",")
    }
    dispatch(createCourse({ courseData, token }));
    if (status === "Completed") {
      toaster.create({
        title: "Book Created Successful",
        type: "success",
      });
      setCourseDetails({
        name: "",
        description: "",
        level: "",
        image: "",
        batches: "",
      });
    }
  };

  useEffect(() => {
    if (status === "Failed" && error) {
      toaster.create({
        type: "error",
        title: `Course Creation failed : ${error}`,
      });
    }
    if (!isLogged) {
      toaster.create({ title: "Please Login First", type: "error" });
      navigate("/login");
    }
  }, [status, error, isLogged ,  navigate]);

  return (
    <Flex w="100%" h="90vh" bg="blue.50" justify="center" align="center">
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          width: "50%",
          height: "70vh",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Flex direction="column" gap={4} justify="space-evenly" height="100%">
          <Heading textAlign="center" size="xl" color="blue.600">
            Create Course
          </Heading>
          {formFields.map((field, index) => {
            if (field.type === "select") {
              return (
                <chakra.select
                  key={index}
                  name={field.name}
                  value={courseDetails[field.name]}
                  onChange={handleFormInput}
                  bg="white"
                  style={{
                    borderWidth: "1px",
                    borderColor: "lightgray",
                    borderRadius: "4px",
                    padding: "8px",
                    height: "40px",
                  }}
                >
                  <option value="" disabled>
                    {field.placeholder}
                  </option>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option.toLowerCase()}>
                      {option}
                    </option>
                  ))}
                </chakra.select>
              );
            }
            return (
              <Input
                key={index}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={courseDetails[field.name]}
                onChange={handleFormInput}
                variant="outline"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{ borderColor: "blue.500" }}
                height="40px"
              />
            );
          })}
          {status === "Loading" && (
            <Flex w="50%" m="0 auto">
              <Spinner size={"lg"} color={"teal"} />
              <Text>Loading ...</Text>
            </Flex>
          )}

          <Text
            color={
              status === "Failed"
                ? "red"
                : status === "Completed"
                ? "green"
                : null
            }
            fontWeight={"bold"}
            textAlign={"center"}
          >
            {status === "Failed"
              ? error
              : status === "Completed"
              ? "Course Created Successful"
              : null}
          </Text>

          <Button
            type="submit"
            w="150px"
            m="0 auto"
            colorPalette="blue"
            color="white"
            mt={4}
            disabled={status === "Loading"}
          >
            Create Course
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default CreateCourse;
