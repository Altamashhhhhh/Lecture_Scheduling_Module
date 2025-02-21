import { Flex, Input, Button, Heading, Text, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/userActions";
import { toaster } from "../components/ui/toaster";

const formFields = [
  { type: "email", name: "email", placeholder: "Enter Email Address" },
  { type: "password", name: "password", placeholder: "Enter Password" },
];

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginData = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (email === "" || password === "") {
      return;
    }
    dispatch(loginUser(loginData));
  };

  useEffect(() => {
    if (status === "Completed") {
      toaster.create({ title: "Login Successful", type: "success" });
      setLoginData({
        email: "",
        password: "",
      });
      navigate("/");
    } else if (status === "Failed" && error) {
      toaster.create({
        type: "error",
        title: `Login failed: ${error}`,
      });
    }
  }, [status, error, navigate]);

  return (
    <Flex w="100%" h="90vh" bg="blue.50" justify="center" align="center">
      <form
        onSubmit={handleLoginSubmit}
        style={{
          maxWidth: "500px",
          width: "50%",
          height: "50vh",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Flex direction="column" gap={4} justify="space-evenly" height="100%">
          <Heading textAlign="center" size="2xl" color="teal.700">
            LOGIN
          </Heading>
          {formFields.map((field, index) => (
            <Input
              key={index}
              name={field.name}
              type={field.type}
              value={loginData[field.name]}
              placeholder={field.placeholder}
              onChange={handleLoginData}
              variant="outline"
              borderColor="gray.300"
              _hover={{ borderColor: "gray.400" }}
              _focus={{ borderColor: "blue.500" }}
              height="40px"
            />
          ))}

          {status === "Loading" && (
            <Flex>
              <Spinner size={"lg"} color={"teal"} />
              <Text>Loading ....</Text>
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
              ? "Login Successful"
              : null}
          </Text>

          <Text textAlign="center" mt={4} cursor={"pointer"}>
            Don't have an account?{" "}
            <span
              style={{ color: "teal" }}
              onClick={() => navigate("/register")}
            >
              Register
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
            Login
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default Login;
