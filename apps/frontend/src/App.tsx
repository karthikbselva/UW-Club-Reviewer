import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, Button, VStack, HStack, Textarea, Text, useDisclosure } from "@chakra-ui/react";
import CustomModal from "./components/ModalContainer";
import ReviewDisplay from "./components/ReviewDisplay";
import ProductInfo from "./components/ClubDisplayCard";
import CourseInfo from "./components/ClubInfo";
import ClubTable from "./components/CommonTable";
import ClubsPage from "./pages/ClubsPages";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [comment, setComment] = React.useState("");
  const [reaction, setReaction] = React.useState<"like" | "dislike" | null>(null);

  const handleConfirm = () => {
    console.log("Comment:", comment);
    console.log("Reaction:", reaction);
    onClose();
    setComment("");
    setReaction(null);
  };

  const sampleClubs = [
    { id: 1, name: "Club A", ratings: 120, likedPercent: 85 },
    { id: 2, name: "Club B", ratings: 98, likedPercent: 72 },
    { id: 3, name: "Club C", ratings: 45, likedPercent: 90 },
  ];

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Button colorScheme="blue" onClick={onOpen}>
                  Open Modal
                </Button>

                <CustomModal
                  title="Add Review"
                  onConfirm={handleConfirm}
                  confirmLabel="Submit"
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <VStack align="start" spacing={4}>
                    <Text>Please enter your comment:</Text>
                    <Textarea
                      placeholder="Write your comment here..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Text>Liked:</Text>
                    <HStack spacing={4}>
                      <Button
                        colorScheme={reaction === "like" ? "green" : "gray"}
                        onClick={() => setReaction("like")}
                      >
                        👍 Like
                      </Button>
                      <Button
                        colorScheme={reaction === "dislike" ? "red" : "gray"}
                        onClick={() => setReaction("dislike")}
                      >
                        👎 Dislike
                      </Button>
                    </HStack>
                  </VStack>
                </CustomModal>

                <ReviewDisplay
                  comment="This is a great club!"
                  reaction="like"
                />

                <ProductInfo title="Club A" numRatings={120} percentLiked={85} />
              
                <CourseInfo
                  title="UW Blueprint"
                  description="Goated club"
                  likedPercent={88}
                  comments={231}
                  ratings={1024}
                  skillLevel="Beginner"
                  competitionLevel="Intermediate"
                />

                <ClubTable clubs={sampleClubs} />
              </>
            }
          />
          <Route path="/clubs/:id" element={<ClubsPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
