import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Club = {
  id: number,
  name: string;
  ratings: number;
  likedPercent: number;
};

type ProductTableProps = {
  clubs: Club[];
};

const ClubTable: React.FC<ProductTableProps> = ({ clubs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  const totalPages = Math.ceil(clubs.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = clubs.slice(indexOfFirstRow, indexOfLastRow);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Box
      bg="white"
      p={4}
      borderRadius="md"
      boxShadow="md"
      w="80%"
      ml={0}
      mt={4}
    >
      <Table variant="simple" w="100%">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Ratings</Th>
            <Th>Liked %</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentRows.map((club, idx) => (
            <Tr key={idx}>
              <Td>
                <Link to={`/clubs/${club.id}`}>
                  <Text
                    fontWeight="medium"
                    color="blue.600"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {club.name}
                  </Text>
                </Link>
              </Td>
              <Td>
                <Text color="gray.600">{club.ratings}</Text>
              </Td>
              <Td>
                <Text color="gray.600">{club.likedPercent}%</Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Pagination Controls */}
      <HStack justifyContent="flex-start" mt={4} ml="4">
        <Button
          onClick={handlePrev}
          isDisabled={currentPage === 1}
          size="sm"
          colorScheme="blue"
        >
          Previous
        </Button>
        <Text fontSize="sm">
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={handleNext}
          isDisabled={currentPage === totalPages}
          size="sm"
          colorScheme="blue"
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default ClubTable;
