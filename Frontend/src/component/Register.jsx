import React from "react";
import { Flex, Input, Button, chakra, Heading, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

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

const Register = () => {
  const navigate = useNavigate();
  return (
    <Flex w="100%" h="90vh" bg="blue.50" justify="center" align="center">
      <form
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
          <Heading textAlign="center" size={"2xl"} color="teal.600">
            REGISTER
          </Heading>
          {formFields.map((field, index) => {
            if (field.type === "select") {
              return (
                <chakra.select
                  key={index}
                  name={field.name}
                  bg="white"
                  defaultValue=""
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
                variant="outline"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{ borderColor: "blue.500" }}
                height="40px"
              />
            );
          })}
          <Text textAlign="center" mt={4} cursor={"pointer"}>
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
          >
            Register
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default Register;
