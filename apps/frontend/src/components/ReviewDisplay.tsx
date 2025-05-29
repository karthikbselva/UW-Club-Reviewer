import React, { useState } from "react";
import { Box, Text, Button, HStack } from "@chakra-ui/react";

type ReviewDisplayProps = {
  comment: string;
  reaction: "like" | "dislike" | null;
};

const ReviewDisplay: React.FC<ReviewDisplayProps> = ({
  comment,
  reaction,
}) => {
  const [likes, setLikes] = useState(0);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mt={4}>
      <Text fontWeight="bold" mb={2}>
        Review:
      </Text>
      <Text mb={2}>{comment}</Text>

      <Box mt={2}>
        <Text>
          Reaction:{" "}
          {reaction === "like"
            ? "👍 Liked"
            : reaction === "dislike"
            ? "👎 Disliked"
            : "No reaction"}
        </Text>
      </Box>

      <HStack spacing={4} align="center" mt={2}>
        <Button size="sm" colorScheme="green" onClick={handleLikeClick}>
          👍 Like this review
        </Button>
        <Text>{likes} upvotes</Text>
      </HStack>
    </Box>
  );
};

export default ReviewDisplay;
