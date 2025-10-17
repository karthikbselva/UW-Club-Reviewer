// src/components/ReviewDisplay.tsx
import React from "react";
import { 
  Box, 
  Text, 
  IconButton, 
  HStack, 
  Flex, 
  Avatar, 
  Card, 
  CardBody,
  Badge,
  VStack,
  Divider,
  Tooltip,
  Icon
} from "@chakra-ui/react";
import { ThumbsUp, ThumbsDown, Calendar, User } from "lucide-react";

type ReviewDisplayProps = {
  comment: string;
  reaction: "like" | "dislike" | null;
};

const ReviewDisplay: React.FC<ReviewDisplayProps> = ({
  comment,
  reaction,
}) => {
  const getReactionColor = () => {
    if (reaction === "like") return "green";
    if (reaction === "dislike") return "red";
    return "gray";
  };

  const getReactionIcon = () => {
    return reaction === "like" ? ThumbsUp : ThumbsDown;
  };

  const getReactionText = () => {
    return reaction === "like" ? "Liked" : "Didn't like";
  };

  return (
    <Card 
      borderRadius="xl" 
      boxShadow="sm" 
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      _hover={{
        boxShadow: "md",
        transform: "translateY(-2px)",
      }}
      transition="all 0.2s"
      overflow="hidden"
    >
      <CardBody p={6}>
        <Flex align="start" gap={4}>
          {/* Avatar Section */}
          <VStack spacing={2} align="center" flexShrink={0}>
            <Avatar 
              src="" 
              size="md" 
              bg="blue.100"
              color="blue.600"
              icon={<Icon as={User} boxSize={6} />}
            />
            <Badge 
              colorScheme={getReactionColor()} 
              variant="subtle"
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="full"
            >
              {getReactionText()}
            </Badge>
          </VStack>

          {/* Content Section */}
          <VStack align="start" spacing={3} flex="1">
            {/* Review Text */}
            <Box w="full">
              <Text 
                color="gray.700" 
                lineHeight="1.6"
                fontSize="md"
                whiteSpace="pre-wrap"
              >
                {comment}
              </Text>
            </Box>

            <Divider borderColor="gray.200" />

            {/* Action Bar */}
            <Flex justify="space-between" align="center" w="full">
              <HStack spacing={2}>
                <Tooltip label="This review was helpful" hasArrow>
                  <IconButton
                    aria-label="Like"
                    icon={<Icon as={getReactionIcon()} />}
                    colorScheme={getReactionColor()}
                    variant={reaction === "like" ? "solid" : "outline"}
                    size="sm"
                    borderRadius="full"
                    _hover={{
                      transform: "scale(1.1)",
                    }}
                    transition="all 0.2s"
                  />
                </Tooltip>
                
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                  {reaction === "like" ? "Positive" : "Negative"} feedback
                </Text>
              </HStack>

              {/* Timestamp (placeholder) */}
              <HStack spacing={1} color="gray.400">
                <Icon as={Calendar} boxSize={3} />
                <Text fontSize="xs">
                  Recently
                </Text>
              </HStack>
            </Flex>
          </VStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ReviewDisplay;
