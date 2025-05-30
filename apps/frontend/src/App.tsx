import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ClubTable from "./components/CommonTable";
import ClubsPage from "./pages/ClubsPages";
import ClubAPIClient from "./APIClients/ClubAPIClient";
import { ClubSearchDTO } from "../types";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [clubs, setClubs] = useState<ClubSearchDTO[]>([]);

  const fetchClubs = async () => {
    try {
      const response = await ClubAPIClient.getAll();
      setClubs(response);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Box
                p={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Text
                  fontSize="xl"
                  fontWeight="medium"
                  color="gray.600"
                  mb={4}
                  textAlign="center"
                >
                  List of Clubs
                </Text>
                <ClubTable clubs={clubs} />
              </Box>
            }
          />
          <Route path="/clubs/:id" element={<ClubsPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
