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
    <Box borderWidth="1px" borderRadius="lg" p={4} mt={4} maxW="885px">
      <Text mb={2}>{comment}</Text>

      <Box mt={2}>
        <HStack spacing={4}>
          <IconButton
            aria-label="Like"
            icon={<ThumbsUp />}
            color="blue.500"
            variant={reaction === "like" ? "solid" : "outline"}
            size="sm"
          />
          <IconButton
            aria-label="Dislike"
            icon={<ThumbsDown />}
            color="blue.500"
            variant={reaction === "dislike" ? "solid" : "outline"}
            size="sm"
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ReviewDisplay;
