import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  CircularProgress,
  CircularProgressLabel,
  Link,
  Card,
  CardBody,
  Badge,
  Icon,
  Flex,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { ExternalLink, Users, Star, TrendingUp, Award } from "lucide-react";
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
    <Card 
      borderRadius="2xl" 
      boxShadow="xl" 
      bg="white" 
      overflow="hidden"
      border="1px solid"
      borderColor="whiteAlpha.200"
      backdropFilter="blur(10px)"
    >
      <CardBody p={0}>
        <Flex direction={{ base: "column", lg: "row" }} minH="300px">
          {/* Main Content */}
          <Box flex="1" p={8}>
            <VStack align="start" spacing={6} h="full">
              {/* Title and Description */}
              <VStack align="start" spacing={4} flex="1">
                <VStack align="start" spacing={2}>
                  <Text 
                    fontSize={{ base: "2xl", md: "3xl" }} 
                    fontWeight="bold" 
                    color="gray.800"
                    lineHeight="1.2"
                  >
                    {title}
                  </Text>
                  
                  {/* Stats Row */}
                  <HStack spacing={6} wrap="wrap">
                    <HStack spacing={2}>
                      <Icon as={Star} color="yellow.500" boxSize={4} />
                      <Text color="gray.600" fontSize="sm" fontWeight="medium">
                        {ratings} reviews
                      </Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={Users} color="blue.500" boxSize={4} />
                      <Text color="gray.600" fontSize="sm" fontWeight="medium">
                        {roundedLikedPercent}% liked
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>

                {/* Description */}
                <Box
                  color="gray.600"
                  fontSize="md"
                  lineHeight="1.6"
                  sx={
                    !isExpanded
                      ? {
                          display: "-webkit-box",
                          WebkitLineClamp: "4",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }
                      : {}
                  }
                >
                  {description.split('\n').map((para, i) => (
                    <Text key={i} mb={2}>{para}</Text>
                  ))}
                </Box>
                
                {description.length > 0 && (
                  <Text
                    as="span"
                    color="blue.500"
                    cursor="pointer"
                    onClick={toggleDescription}
                    fontWeight="semibold"
                    fontSize="sm"
                    _hover={{ color: "blue.600" }}
                    transition="color 0.2s"
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </Text>
                )}
              </VStack>

              {/* Skills and Social Links */}
              <VStack align="start" spacing={4} w="full">
                <Divider borderColor="gray.300" />
                
                {/* Skill Levels */}
                <VStack align="start" spacing={3} w="full">
                  <HStack spacing={3} align="center">
                    <Icon as={TrendingUp} color="blue.500" boxSize={4} />
                    <Text color="gray.700" fontWeight="semibold" fontSize="sm">
                      Skill Level
                    </Text>
                    <LevelBars level={skillLevel} />
                  </HStack>
                  
                  <HStack spacing={3} align="center">
                    <Icon as={Award} color="purple.500" boxSize={4} />
                    <Text color="gray.700" fontWeight="semibold" fontSize="sm">
                      Competition Level
                    </Text>
                    <LevelBars level={competitionLevel} />
                  </HStack>
                </VStack>

                {/* Social Links */}
                {socials.length > 0 && (
                  <>
                    <Divider borderColor="gray.300" />
                    <VStack align="start" spacing={2} w="full">
                      <Text color="gray.700" fontWeight="semibold" fontSize="sm">
                        Connect with us
                      </Text>
                      <HStack spacing={3} wrap="wrap">
                        {socials.map(([social, link]) => (
                          <Tooltip key={social} label={`Visit our ${social}`} hasArrow>
                            <Link 
                              href={link} 
                              isExternal
                              color="blue.500"
                              _hover={{ 
                                color: "blue.600",
                                textDecoration: "underline"
                              }}
                              fontSize="sm"
                              display="flex"
                              alignItems="center"
                              gap={1}
                              transition="all 0.2s"
                            >
                              <Text textTransform="capitalize" fontWeight="medium">
                                {social}
                              </Text>
                              <Icon as={ExternalLink} boxSize={3} />
                            </Link>
                          </Tooltip>
                        ))}
                      </HStack>
                    </VStack>
                  </>
                )}
              </VStack>
            </VStack>
          </Box>

          {/* Rating Card */}
          <Box 
            bg="whiteAlpha.100" 
            backdropFilter="blur(10px)"
            borderLeft={{ base: "none", lg: "1px solid" }}
            borderTop={{ base: "1px solid", lg: "none" }}
            borderColor="whiteAlpha.200"
            p={8}
            minW="200px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <VStack spacing={4}>
              {/* Circular Progress */}
              <Box position="relative">
                <CircularProgress
                  value={roundedLikedPercent}
                  color="white"
                  size="100px"
                  thickness="6px"
                  trackColor="whiteAlpha.300"
                >
                  <CircularProgressLabel>
                    <VStack spacing={0} lineHeight="1">
                      <Text fontSize="lg" fontWeight="bold" color="white">
                        {roundedLikedPercent}%
                      </Text>
                      <Text fontSize="xs" color="whiteAlpha.800">
                        liked
                      </Text>
                    </VStack>
                  </CircularProgressLabel>
                </CircularProgress>
              </Box>

              {/* Rating Badge */}
              <Badge 
                colorScheme="green" 
                variant="solid" 
                px={3} 
                py={1} 
                borderRadius="full"
                fontSize="sm"
                fontWeight="semibold"
              >
                {ratings} reviews
              </Badge>
            </VStack>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ClubInfo;
