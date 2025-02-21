import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isLogged, userInfo } = useSelector((state) => state.user);
  const role = userInfo?.role || "";

  const links = useMemo(() => {
    if (role === "admin") {
      return [
        { to: "/", text: "Home" },
        { to: "/create-course", text: "Create Course" },
        { to: "/course", text: "Courses" },
        { to: "/instructors", text: "Instructors" },
      ];
    } else if (role === "instructor") {
      return [
        { to: "/", text: "Home" },
        { to: "/schedule", text: "Schedules" },
      ];
    }
    return [
      { to: "/", text: "Home" },
      { to: "/login", text: "Login" },
    ];
  }, [role]);

  return (
    <Box height="80px" width="100%">
      <Flex
        h="100%"
        w="50%"
        m="0 auto"
        justify="space-around"
        align="center"
        borderBottom="2px solid teal"
      >
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            style={({ isActive }) => ({
              color: isActive ? "teal" : "#4A5568",
              borderBottom: isActive ? "2px solid teal" : "none",
              paddingBottom: "4px",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            {link.text}
          </NavLink>
        ))}

        {isLogged && (
          <Button
            onClick={() => dispatch(logout())}
            colorPalette="yellow" //
          >
            Log Out
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
