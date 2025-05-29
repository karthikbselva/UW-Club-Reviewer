import React, { useState } from "react";
import {
  Button,
  Textarea,
  Text,
  VStack,
  HStack,
  ChakraProvider,
  useDisclosure,
  Box,
  Heading,
} from "@chakra-ui/react";
import CustomModal from "./components/ModalContainer";
import ReviewDisplay from "./components/ReviewDisplay";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [comment, setComment] = useState("");
  const [reaction, setReaction] = useState<"like" | "dislike" | null>(null);

  // Store submitted review to show below modal
  const [submittedReview, setSubmittedReview] = useState<{
    comment: string;
    reaction: "like" | "dislike" | null;
  } | null>(null);

  const handleConfirm = () => {
    console.log("Comment:", comment);
    console.log("Reaction:", reaction);

    setSubmittedReview({ comment, reaction }); // save submitted review
    onClose();

    setComment("");
    setReaction(null);
  };

  return (
    <ChakraProvider>
      <Box p={4}>
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

            <Text>Reaction:</Text>
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

        {/* Display the submitted review below the modal */}
        {submittedReview && (
          <ReviewDisplay
            comment={submittedReview.comment}
            reaction={submittedReview.reaction}
          />
        )}

        {/* Static, hardcoded review display for demonstration */}
        <Heading mt={8} size="md">
          Static Review Card Example
        </Heading>
        <ReviewDisplay
          comment="This is a static review example! Great job!"
          reaction="like"
        />
      </Box>
    </ChakraProvider>
  );
};

export default App;
