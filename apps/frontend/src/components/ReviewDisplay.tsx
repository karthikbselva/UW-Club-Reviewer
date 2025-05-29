// src/components/ReviewDisplay.tsx
import React from "react";
import { Box, Text, IconButton, HStack } from "@chakra-ui/react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

type ReviewDisplayProps = {
  comment: string;
  reaction: "like" | "dislike" | null;
};

const ReviewDisplay: React.FC<ReviewDisplayProps> = ({
  comment,
  reaction,
}) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mt={4}>
      <Text fontWeight="bold" mb={2}>
        Review:
      </Text>
      <Text mb={2}>{comment}</Text>

      <Box mt={2}>
        <HStack spacing={4}>
          <Text>Liked: </Text>
          <IconButton
            aria-label="Like"
            icon={<ThumbsUp />}
            colorScheme={reaction === "like" ? "green" : "gray"}
            variant={reaction === "like" ? "solid" : "outline"}
          />
          <IconButton
            aria-label="Dislike"
            icon={<ThumbsDown />}
            colorScheme={reaction === "dislike" ? "red" : "gray"}
            variant={reaction === "dislike" ? "solid" : "outline"}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ReviewDisplay;
