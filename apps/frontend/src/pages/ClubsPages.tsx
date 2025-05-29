import React from "react";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

const ClubsPage = () => {
  const { id } = useParams();

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Here is club page
      </Text>
      <Text mt={2}>You clicked on club: {id}</Text>
    </Box>
  );
};

export default ClubsPage;
