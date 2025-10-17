import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Text,
  useDisclosure,
  Container,
  VStack,
  HStack,
  Icon,
  Badge,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { Users, Star, TrendingUp } from "lucide-react";
import ClubTable from "./components/CommonTable";
import ClubsPage from "./pages/ClubsPages";
import ClubAPIClient from "./APIClients/ClubAPIClient";
import { ClubSearchDTO } from "../types";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [clubs, setClubs] = useState<ClubSearchDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClubs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ClubAPIClient.getAll();
      setClubs(response);
    } catch (error) {
      console.error("Error fetching clubs:", error);
      setError("Failed to load clubs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const ClubsListPage = () => {
    // Loading state
    if (isLoading) {
      return (
        <Box minH="100vh" bg="gray.50">
          <Container maxW="6xl" py={8}>
            <Flex justify="center" align="center" minH="400px">
              <VStack spacing={4}>
                <Spinner size="xl" color="blue.500" thickness="4px" />
                <Text color="gray.600" fontSize="lg">Loading clubs...</Text>
              </VStack>
            </Flex>
          </Container>
        </Box>
      );
    }

    // Error state
    if (error) {
      return (
        <Box minH="100vh" bg="gray.50">
          <Container maxW="6xl" py={8}>
            <Alert status="error" borderRadius="lg" boxShadow="md">
              <AlertIcon />
              {error}
            </Alert>
          </Container>
        </Box>
      );
    }

    return (
      <Box minH="100vh" bg="gray.50">
        {/* Hero Section */}
        <Box 
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
          w="100%" 
          py={16}
          position="relative"
          overflow="hidden"
        >
          {/* Background Pattern */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            opacity={0.1}
            backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxIiBmaWxsPSJ3aGl0ZSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZ3JhaW4pIi8+PC9zdmc+')"
          />
          
          <Container maxW="6xl" position="relative" zIndex={1}>
            <VStack spacing={6} textAlign="center" color="white">
              <Heading 
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} 
                fontWeight="bold"
                textShadow="0 2px 4px rgba(0,0,0,0.3)"
              >
                UW Club Reviewer
              </Heading>
              <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                color="whiteAlpha.900"
                maxW="2xl"
                lineHeight="1.6"
              >
                Discover and review clubs at the University of Waterloo. Find your perfect community!
              </Text>
              
              {/* Stats */}
              <HStack spacing={8} wrap="wrap" justify="center" mt={4}>
                <VStack spacing={1}>
                  <Icon as={Users} boxSize={8} color="whiteAlpha.800" />
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    {clubs.length}
                  </Text>
                  <Text fontSize="sm" color="whiteAlpha.800">
                    Active Clubs
                  </Text>
                </VStack>
                <VStack spacing={1}>
                  <Icon as={Star} boxSize={8} color="yellow.300" />
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    {clubs.reduce((sum, club) => sum + club.ratings, 0)}
                  </Text>
                  <Text fontSize="sm" color="whiteAlpha.800">
                    Total Reviews
                  </Text>
                </VStack>
                <VStack spacing={1}>
                  <Icon as={TrendingUp} boxSize={8} color="green.300" />
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    {Math.round(clubs.reduce((sum, club) => sum + club.likedPercent, 0) / clubs.length)}%
                  </Text>
                  <Text fontSize="sm" color="whiteAlpha.800">
                    Avg. Satisfaction
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxW="6xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Page Header */}
            <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
              <VStack align={{ base: "center", md: "start" }} spacing={2}>
                <Heading 
                  size={{ base: "md", md: "lg" }} 
                  color="gray.800"
                  textAlign={{ base: "center", md: "left" }}
                >
                  All Clubs
                </Heading>
                <HStack spacing={4} wrap="wrap" justify={{ base: "center", md: "start" }}>
                  <Badge colorScheme="blue" variant="subtle" fontSize="sm" px={3} py={1}>
                    {clubs.length} clubs available
                  </Badge>
                  <Badge colorScheme="green" variant="subtle" fontSize="sm" px={3} py={1}>
                    {clubs.filter(club => club.ratings > 0).length} with reviews
                  </Badge>
                </HStack>
              </VStack>
            </Flex>

            <Divider borderColor="gray.300" />

            {/* Clubs Table */}
            <ClubTable clubs={clubs} />
          </VStack>
        </Container>
      </Box>
    );
  };

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClubsListPage />} />
          <Route path="/clubs/:id" element={<ClubsPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
