import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorBatches } from "../redux/batchActions";
import {
  Box,
  Table,
  Text,
  Spinner,
} from "@chakra-ui/react";

const Schedules = () => {
  const dispatch = useDispatch();
  const { instructorBatches, status, error } = useSelector((state) => state.batch);
  const { token, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo?.role === "instructor") {
      dispatch(fetchInstructorBatches(token));
    }
  }, [dispatch, token, userInfo]);

  return (
    <Box p={5} maxW="80%" m="50px auto">
      <Text fontSize="2xl" fontWeight="bold" mb={5} textAlign="center">
        Your Assigned Batches
      </Text>
 
      {status === "Loading" && (
        <Box textAlign="center">
          <Spinner size="lg" color="blue.500" />
        </Box>
      )}
 
      {status === "Failed" && (
        <Text textAlign="center" color="red.500" fontSize="lg">
          {error}
        </Text>
      )}
 
      {status === "Completed" && instructorBatches.length === 0 && (
        <Text textAlign="center" fontSize="lg" color="gray.600">
          No assigned batches yet.
        </Text>
      )}
 
      {status === "Completed" && instructorBatches.length > 0 && (
        <Table.Root w="100%" interactive>
          <Table.Headers>
            <Table.Row bg="gray.200">
              <Table.Cell as="th">Course Name</Table.Cell>
              <Table.Cell as="th">Description</Table.Cell>
              <Table.Cell as="th">Batch Date</Table.Cell>
            </Table.Row>
          </Table.Headers>
          <Table.Body>
            {instructorBatches.map((batch) => (
              <Table.Row key={batch._id}>
                <Table.Cell>{batch.course?.name || "Unknown Course"}</Table.Cell>
                <Table.Cell>{batch.course?.description || "No Description"}</Table.Cell>
                <Table.Cell>{new Date(batch.date).toLocaleDateString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Box>
  );
};

export default Schedules;
