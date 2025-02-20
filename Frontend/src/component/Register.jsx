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
import { registerUser } from "../redux/userActions";
import { toaster } from "../components/ui/toaster";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, isLogged } = useSelector((state) => state.user);

  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const formFields = [
    { type: "text", name: "name", placeholder: "Enter Full Name" },
    { type: "email", name: "email", placeholder: "Enter Email Address" },
    {
      type: "select",
      name: "role",
      placeholder: "Select Role",
      options: ["Instructor", "Admin"],
    },
    { type: "password", name: "password", placeholder: "Enter Password" },
  ];

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, role, password } = formInput;
    if (name === "" || email === "" || password === "" || role === "") {
      toaster.create({ title: "All field are required", type: "error" });
      return;
    }
    dispatch(registerUser(formInput));
    if (status === "Completed") {
      toaster.create({
        title: "User Registration Successful",
        type: "success",
      });
      setFormInput({
        name: "",
        email: "",
        role: "",
        password: "",
      });
      navigate("/login");
    }
  };

  useEffect(() => {
    if (status === "Failed" && error) {
      toaster.create({
        type: "error",
        title: `Registration failed : ${error}`,
      });
    }
  }, [status, error,  navigate]);

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
          <Heading textAlign="center" size="2xl" color="teal.600">
            REGISTER
          </Heading>
          {formFields.map((field, index) => {
            if (field.type === "select") {
              return (
                <chakra.select
                  key={index}
                  name={field.name}
                  value={formInput[field.name]}
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
                value={formInput[field.name]}
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
            <Flex>
              <Spinner size={"lg"} color={"teal"} />
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
              ? "Registration Successful"
              : null}
          </Text>

          <Text textAlign="center" mt={4} cursor="pointer">
            Already have an account?{" "}
            <span style={{ color: "teal" }} onClick={() => navigate("/login")}>
              Login
            </span>
          </Text>
          <Button
            type="submit"
            w="150px"
            m="0 auto"
            colorPalette="teal"
            color="white"
            mt={4}
            disabled={status === "Loading"}
          >
            Register
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default Register;
