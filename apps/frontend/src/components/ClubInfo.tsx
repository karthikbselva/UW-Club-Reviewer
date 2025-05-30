import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  CircularProgress,
  CircularProgressLabel,
  Link,
} from "@chakra-ui/react";
import LevelBars from "./LevelBar";
import { SocialDTO } from "../../types";

type ClubInfoProps = {
  title: string;
  description: string;
  likedPercent: number;
  ratings: number;
  skillLevel: number;
  competitionLevel: number;
  socials: [string, string][];
};

const ClubInfo: React.FC<ClubInfoProps> = ({
  title,
  description,
  likedPercent,
  ratings,
  skillLevel,
  competitionLevel,
  socials,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const roundedLikedPercent = Math.round(likedPercent);

  return (
    <HStack spacing={4} align="stretch" w="100%">
      {/* Main Card */}
      <Box
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="md"
        w="75%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <VStack align="start" spacing={2} flexGrow={1}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.700">
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
            {description.split('\n').map((para, i) => (
  <p key={i}>{para}</p>
))}
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
        <VStack align="start" spacing={2} mt={4} fontSize="sm" minW="200px">
          <HStack spacing={4} align="center" width="100%">
            <Text color="gray.600" minW="90px" textAlign="left">Skill:</Text>
            <LevelBars level={skillLevel} />
          </HStack>
          <HStack spacing={4} align="center" width="100%">
            <Text color="gray.600" minW="90px" textAlign="left">Competition:</Text>
            <LevelBars level={competitionLevel} />
          </HStack>
          <VStack spacing={1} align="start" width="100%" mt={4}>
      {socials.map(([social, link]) => (
        <HStack key={social} spacing={2}>
          <Text fontWeight="bold" textTransform="capitalize" minW="90px" color="gray.600">
            {social}:
          </Text>
          <Link href={link} color="blue.500" isExternal>
            {link}
          </Link>
        </HStack>
      ))}
    </VStack>

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
        minW="120px"
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
