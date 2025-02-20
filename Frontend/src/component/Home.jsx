import { Box, Button, Flex, Heading, Text, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Flex
      align="center"
      justify="center"
      height="90vh"
      bgGradient="linear(to-br, #7928CA, #FF0080)"
    >
      <Box
        p={10}
        maxW={{ base: "90%", md: "50%" }}
        w="full"
        bg="whiteAlpha.900"
        borderRadius="2xl"
        boxShadow="2xl"
        backdropFilter="blur(10px)"
        textAlign="center"
        border="1px solid rgba(255, 255, 255, 0.3)"
      >
        <Stack spacing={6}>
          <Heading size="xl" color="purple.700">
            Welcome to Lecture Scheduler
          </Heading>
          <Text fontSize="lg" color="gray.700">
            Discover an effortless way to manage lectures and courses.
            Streamline your academic planning and empower your teaching with our
            smart scheduling tools.
          </Text>
          <Flex justify="center" gap={4}>
            <Button
              onClick={() => navigate("/login")}
              colorPalette="purple"
              size="lg"
              color={"white"}
              px={8}
              _hover={{ transform: "scale(1.05)" }}
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/course")}
              colorPalette="teal"
              variant="solid"
              size="lg"
              px={8}
              _hover={{ transform: "scale(1.05)", color: "white" }}
            >
              See Courses & Lectures
            </Button>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Home;
