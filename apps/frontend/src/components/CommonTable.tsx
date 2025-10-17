import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  HStack,
  VStack,
  Card,
  CardBody,
  Flex,
  Badge,
  Icon,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Divider,
  Tooltip,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ClubSearchDTO } from "../../types";
import LevelBars from "./LevelBar";
import { Search, Star, Users, TrendingUp, Award, ChevronLeft, ChevronRight } from "lucide-react";

type ProductTableProps = {
  clubs: ClubSearchDTO[];
};

const ClubTable: React.FC<ProductTableProps> = ({ clubs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "ratings" | "likedPercent">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const rowsPerPage = 12;

  // Filter and sort clubs
  const filteredClubs = clubs
    .filter(club => 
      club.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;
      
      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "ratings":
          aValue = a.ratings;
          bValue = b.ratings;
          break;
        case "likedPercent":
          aValue = a.likedPercent;
          bValue = b.likedPercent;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const totalPages = Math.ceil(filteredClubs.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredClubs.slice(indexOfFirstRow, indexOfLastRow);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSort = (field: "name" | "ratings" | "likedPercent") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Search and Filter Controls */}
      <Card borderRadius="xl" boxShadow="sm" bg="white">
        <CardBody p={6}>
          <Stack 
            direction={{ base: "column", md: "row" }} 
            spacing={4} 
            align={{ base: "stretch", md: "center" }}
          >
            <InputGroup flex="1">
              <InputLeftElement pointerEvents="none">
                <Icon as={Search} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search clubs..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                borderRadius="lg"
                borderColor="gray.300"
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px #3182ce",
                }}
              />
            </InputGroup>
            
            <HStack spacing={3}>
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                Sort by:
              </Text>
              <Select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as "name" | "ratings" | "likedPercent");
                  setCurrentPage(1);
                }}
                size="sm"
                borderRadius="lg"
                borderColor="gray.300"
                w="140px"
              >
                <option value="name">Name</option>
                <option value="ratings">Reviews</option>
                <option value="likedPercent">Rating</option>
              </Select>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                borderRadius="lg"
                px={3}
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </Button>
            </HStack>
          </Stack>
          
          {searchTerm && (
            <Text fontSize="sm" color="gray.500" mt={3}>
              Showing {filteredClubs.length} of {clubs.length} clubs
            </Text>
          )}
        </CardBody>
      </Card>

      {/* Clubs Grid */}
      {currentRows.length === 0 ? (
        <Card borderRadius="xl" boxShadow="sm" bg="white">
          <CardBody py={12}>
            <VStack spacing={4}>
              <Icon as={Search} boxSize={12} color="gray.400" />
              <VStack spacing={2}>
                <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                  No clubs found
                </Text>
                <Text color="gray.500" textAlign="center" maxW="md">
                  Try adjusting your search terms or filters
                </Text>
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {currentRows.map((club) => (
            <Card 
              key={club.id}
              borderRadius="xl" 
              boxShadow="sm" 
              bg="white"
              border="1px solid"
              borderColor="gray.100"
              _hover={{
                boxShadow: "lg",
                transform: "translateY(-4px)",
                borderColor: "blue.200",
              }}
              transition="all 0.3s"
              overflow="hidden"
            >
              <CardBody p={6}>
                <VStack spacing={4} align="stretch">
                  {/* Club Name */}
                  <Link to={`/clubs/${club.id}`}>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color="blue.600"
                      _hover={{ 
                        color: "blue.700",
                        textDecoration: "underline"
                      }}
                      transition="all 0.2s"
                      lineHeight="1.3"
                    >
                      {club.name}
                    </Text>
                  </Link>

                  {/* Stats Row */}
                  <HStack justify="space-between" align="center">
                    <VStack spacing={1} align="start">
                      <HStack spacing={1}>
                        <Icon as={Star} boxSize={4} color="yellow.500" />
                        <Text fontSize="sm" color="gray.600">
                          {club.ratings} reviews
                        </Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Icon as={Users} boxSize={4} color="green.500" />
                        <Text fontSize="sm" color="gray.600">
                          {club.likedPercent}% liked
                        </Text>
                      </HStack>
                    </VStack>

                    {/* Rating Circle */}
                    <CircularProgress
                      value={club.likedPercent}
                      color="blue.500"
                      size="60px"
                      thickness="6px"
                      trackColor="gray.200"
                    >
                      <CircularProgressLabel>
                        <Text fontSize="xs" fontWeight="bold" color="gray.700">
                          {club.likedPercent}%
                        </Text>
                      </CircularProgressLabel>
                    </CircularProgress>
                  </HStack>

                  <Divider borderColor="gray.200" />

                  {/* Skill Levels */}
                  <VStack spacing={3} align="stretch">
                    <HStack justify="space-between" align="center">
                      <HStack spacing={2}>
                        <Icon as={TrendingUp} boxSize={4} color="blue.500" />
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">
                          Skill Level
                        </Text>
                      </HStack>
                      <LevelBars level={club.skillLevel} />
                    </HStack>
                    
                    <HStack justify="space-between" align="center">
                      <HStack spacing={2}>
                        <Icon as={Award} boxSize={4} color="purple.500" />
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">
                          Competition Level
                        </Text>
                      </HStack>
                      <LevelBars level={club.competitionLevel} />
                    </HStack>
                  </VStack>

                  {/* Action Button */}
                  <Link to={`/clubs/${club.id}`}>
                    <Button
                      colorScheme="blue"
                      variant="outline"
                      size="sm"
                      w="full"
                      borderRadius="lg"
                      _hover={{
                        bg: "blue.50",
                        borderColor: "blue.300",
                      }}
                      transition="all 0.2s"
                    >
                      View Details
                    </Button>
                  </Link>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <Card borderRadius="xl" boxShadow="sm" bg="white">
          <CardBody py={4}>
            <Flex 
              justify="space-between" 
              align="center" 
              wrap="wrap" 
              gap={4}
              direction={{ base: "column", sm: "row" }}
            >
              <Text fontSize="sm" color="gray.600">
                Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredClubs.length)} of {filteredClubs.length} clubs
              </Text>
              
              <HStack spacing={2}>
                <Button
                  onClick={handlePrev}
                  isDisabled={currentPage === 1}
                  size="sm"
                  variant="outline"
                  borderRadius="lg"
                  leftIcon={<Icon as={ChevronLeft} boxSize={4} />}
                  _hover={{
                    bg: "blue.50",
                    borderColor: "blue.300",
                  }}
                  transition="all 0.2s"
                >
                  Previous
                </Button>
                
                <HStack spacing={1}>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        size="sm"
                        variant={currentPage === pageNum ? "solid" : "outline"}
                        colorScheme={currentPage === pageNum ? "blue" : "gray"}
                        borderRadius="lg"
                        minW="40px"
                        _hover={{
                          bg: currentPage === pageNum ? "blue.600" : "gray.50",
                        }}
                        transition="all 0.2s"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </HStack>
                
                <Button
                  onClick={handleNext}
                  isDisabled={currentPage === totalPages}
                  size="sm"
                  variant="outline"
                  borderRadius="lg"
                  rightIcon={<Icon as={ChevronRight} boxSize={4} />}
                  _hover={{
                    bg: "blue.50",
                    borderColor: "blue.300",
                  }}
                  transition="all 0.2s"
                >
                  Next
                </Button>
              </HStack>
            </Flex>
          </CardBody>
        </Card>
      )}
    </VStack>
  );
};

export default ClubTable;
