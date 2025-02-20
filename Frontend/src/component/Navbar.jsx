import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", text: "Home" },
  { to: "/course", text: "Courses" },
  { to: "/login", text: "Login" },
  {to : "/register" , text : "Register"}
];

const Navbar = () => {
  return (
    <Box height="80px" width="100%" >
      <Flex
        h="100%"
        w="50%"
        m="0 auto"
        justify="space-around"
        align="center"
        borderBottom={"2px solid teal"}
      >
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            style={({ isActive }) => ({
              color: isActive ? "teal" : "#4A5568", // blue.500 when active, gray.700 when inactive
              borderBottom: isActive ? "2px solid teal" : "none",
              paddingBottom: "4px",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            {link.text}
          </NavLink>
        ))}
      </Flex>
    </Box>
  );
};

export default Navbar;
