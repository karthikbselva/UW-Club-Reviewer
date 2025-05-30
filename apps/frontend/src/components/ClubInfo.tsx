// CourseInfo.tsx
import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import LevelBars from "./LevelBar";

type ClubInfoProps = {
  title: string;
  description: string;
  likedPercent: number;
  ratings: number;
  skillLevel: "Beginner" | "Intermediate" | "Advanced";
  competitionLevel: "Beginner" | "Intermediate" | "Advanced";
};

const ClubInfo: React.FC<ClubInfoProps> = ({
  title,
  description,
  likedPercent,
  ratings,
  skillLevel,
  competitionLevel,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Round the likedPercent to the nearest whole number
  const roundedLikedPercent = Math.round(likedPercent);

  return (
    <HStack spacing={2} align="stretch">
      {/* Main Card */}
      <Box
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="md"
        w="60%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <VStack align="start" spacing={2} flexGrow={1}>
          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            {title}
          </Text>
          <Box
            color="gray.600"
            fontSize="sm"
            sx={
              !isExpanded
                ? {
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }
                : {}
            }
          >
            {description}
          </Box>
          {description.length > 0 && (
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              onClick={toggleDescription}
              fontWeight="semibold"
              mt={1}
            >
              {isExpanded ? "See less" : "See more"}
            </Text>
          )}
        </VStack>

        {/* Bottom info */}
        <VStack align="start" spacing={2} mt={4} fontSize="sm">
          <HStack spacing={2} align="center">
            <Text color="gray.600">Skill: {skillLevel}</Text>
            <LevelBars level={skillLevel} />
          </HStack>
          <HStack spacing={2} align="center">
            <Text color="gray.600">Competition: {competitionLevel}</Text>
            <LevelBars level={competitionLevel} />
          </HStack>
        </VStack>
      </Box>

      {/* Liked Box */}
      <Box
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="md"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minW="140px"
        flexShrink="0"
      >
        <CircularProgress
          value={roundedLikedPercent}
          color="blue.500"
          size="70px"
          thickness="8px"
        >
          <CircularProgressLabel>
            <VStack spacing="0" lineHeight="1" fontSize="sm">
              <Text>{roundedLikedPercent}%</Text>
              <Text>liked</Text>
            </VStack>
          </CircularProgressLabel>
        </CircularProgress>

        <VStack spacing={1} mt={2} fontSize="sm">
          <Text color="gray.500">{ratings} ratings</Text>
        </VStack>
      </Box>
    </HStack>
  );
};

export default ClubInfo;