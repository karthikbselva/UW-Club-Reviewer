// CourseInfo.tsx
import React from "react";
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
  comments: number;
  ratings: number;
  skillLevel: "Beginner" | "Intermediate" | "Advanced";
  competitionLevel: "Beginner" | "Intermediate" | "Advanced";
};

const ClubInfo: React.FC<ClubInfoProps> = ({
  title,
  description,
  likedPercent,
  comments,
  ratings,
  skillLevel,
  competitionLevel,
}) => {
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
          <Text color="gray.600" fontSize="sm">
            {description}
          </Text>
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
          value={likedPercent}
          color="blue.500"
          size="70px"
          thickness="8px"
        >
          <CircularProgressLabel>
            <VStack spacing="0" lineHeight="1" fontSize="sm">
              <Text>{likedPercent}%</Text>
              <Text>liked</Text>
            </VStack>
          </CircularProgressLabel>
        </CircularProgress>

        <VStack spacing={1} mt={2} fontSize="sm">
          <Text color="blue.500" fontWeight="medium" cursor="pointer">
            {comments} comments
          </Text>
          <Text color="gray.500">{ratings} ratings</Text>
        </VStack>
      </Box>
    </HStack>
  );
};

export default ClubInfo;
