// src/components/ReviewDisplay.tsx
import React from "react";
import { Box, Text, IconButton, HStack, Flex, Avatar } from "@chakra-ui/react";
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
    <Flex align="center" gap={4}>
      {/* Left: Profile circle */}
      <Avatar src={""} size="md" />

      {/* Right: Comment text and buttons */}
      <Box flex="1">
        <Text mb={2}>{comment}</Text>
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
    </Flex>
  </Box>
  );
};

export default ReviewDisplay;
