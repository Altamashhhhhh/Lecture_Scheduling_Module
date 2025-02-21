import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCourses } from "../redux/courseActions";
import { Box, Flex, Grid, GridItem, Image, Text, Badge } from "@chakra-ui/react";

const Course = () => {
  const { isLogged, token } = useSelector((state) => state.user);
  const { courses } = useSelector((state) => state.course);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
      return;
    }
    dispatch(fetchCourses(token));
  }, [navigate, isLogged, dispatch, token]);

  return (
    <Box p={4}>
      <Grid templateColumns="repeat(4 , 1fr)" gap={6}>
        {courses?.map((course, index) => (
          <GridItem
            key={index}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            _hover={{ boxShadow: "lg" }}
            p={5}
          >
            <Image minH={"40%"} src={course.image || "https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=" } alt={course.name} objectFit="cover" />

            <Box p={7} minH={"50%"}>
              <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Text fontWeight="bold" fontSize="xl">
                  {course.name}
                </Text>
                <Badge colorPalette="teal" color="white" p={2}>{course.level}</Badge>
              </Flex>
              <Text mb={4}>{course.description}</Text>
              <Text fontWeight="bold" mb={2}>
                Batches:
              </Text>
              <Flex wrap="wrap" gap={2}>
                {course?.batches?.map((batch, idx) => (
                  <Badge p={2} key={idx} color={"white"} colorPalette="purple">
                    {batch}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Course;
