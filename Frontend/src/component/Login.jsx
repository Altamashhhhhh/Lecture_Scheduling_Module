import React from "react";
import { Flex, Input, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const formFields = [
  { type: "email", name: "email", placeholder: "Enter Email Address" },
  { type: "password", name: "password", placeholder: "Enter Password" },
];

const Login = () => {
  const navigate = useNavigate();
  return (
    <Flex w="100%" h="90vh" bg="blue.50" justify="center" align="center">
      <form
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
              placeholder={field.placeholder}
              variant="outline"
              borderColor="gray.300"
              _hover={{ borderColor: "gray.400" }}
              _focus={{ borderColor: "blue.500" }}
              height="40px"
            />
          ))}
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
          >
            Login
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default Login;
