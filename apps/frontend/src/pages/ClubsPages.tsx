import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  HStack,
  Text,
  Textarea,
  useDisclosure,
  VStack,
  Flex,
  Container,
  Spinner,
  Alert,
  AlertIcon,
  Divider,
  Icon,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { MessageSquarePlus, Star, Users } from "lucide-react";
import ReviewAPIClient from "../APIClients/ReviewAPIClient";
import ClubAPIClient from "../APIClients/ClubAPIClient";
import { ClubFullDTO, ReviewDTO } from "../../types";
import CustomModal from "../components/ModalContainer";
import ReviewDisplay from "../components/ReviewDisplay";
import ClubInfo from "../components/ClubInfo";

interface ReviewInput {
  club_id: number;
  comment: string;
  likes_club: boolean;
}

const ClubsPage = () => {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [comment, setComment] = useState<string>("");
  const [reaction, setReaction] = useState<"like" | "dislike" | null>(null);

  const [club, setClub] = useState<ClubFullDTO | null>(null);
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [likedPercent, setLikedPercent] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      if (id) {
        setIsLoading(true);
        setError(null);
        try {
          const [clubData, reviewsData, reviewSum, likedPercentage] =
            await Promise.all([
              ClubAPIClient.get(Number(id)),
              ReviewAPIClient.get(Number(id)),
              ReviewAPIClient.getReviewSum(Number(id)),
              ReviewAPIClient.getLikedPercentage(Number(id)),
            ]);

          setClub(clubData);
          setReviews(reviewsData);
          setReviewCount(reviewSum);
          setLikedPercent(likedPercentage);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to load club data. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAllData();
  }, [id]);

  const handleConfirm = async () => {
    if (!reaction) {
      console.log("Please select a reaction (like/dislike).");
      return;
    }

    if (!id) {
      console.log("No club id available!");
      return;
    }

    const newReview: ReviewInput = {
      club_id: Number(id),
      comment,
      likes_club: reaction === "like",
    };

    try {
      await ReviewAPIClient.create({
        clubId: newReview.club_id,
        comment: newReview.comment,
        likesClub: newReview.likes_club,
      });

      console.log("Review submitted successfully!");
      // Refresh data after adding a review
      const [reviewsData, reviewSum, likedPercentage] = await Promise.all([
        ReviewAPIClient.get(Number(id)),
        ReviewAPIClient.getReviewSum(Number(id)),
        ReviewAPIClient.getLikedPercentage(Number(id)),
      ]);

      setReviews(reviewsData);
      setReviewCount(reviewSum);
      setLikedPercent(likedPercentage);

      setComment("");
      setReaction(null);
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Container maxW="6xl" py={8}>
          <Flex justify="center" align="center" minH="400px">
            <VStack spacing={4}>
              <Spinner size="xl" color="blue.500" thickness="4px" />
              <Text color="gray.600" fontSize="lg">Loading club information...</Text>
            </VStack>
          </Flex>
        </Container>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Container maxW="6xl" py={8}>
          <Alert status="error" borderRadius="lg" boxShadow="md">
            <AlertIcon />
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Hero Section */}
      {club && (
        <Box 
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
          w="100%" 
          py={12}
          position="relative"
          overflow="hidden"
        >
          {/* Background Pattern */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            opacity={0.1}
            backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxIiBmaWxsPSJ3aGl0ZSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZ3JhaW4pIi8+PC9zdmc+')"
          />
          
          <Container maxW="6xl" position="relative" zIndex={1}>
            <ClubInfo
              title={club.name}
              description={club.description}
              likedPercent={likedPercent}
              ratings={reviewCount}
              skillLevel={club.skillLevel}
              competitionLevel={club.competitionLevel}
              socials={Object.entries(club.social).filter(([key, link]) => (key !== "id" && key !== "clubId" && link !== null))}
            />
          </Container>
        </Box>
      )}

      {/* Main Content */}
      <Container maxW="6xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Reviews Section Header */}
          <Flex 
            justify="space-between" 
            align={{ base: "start", md: "center" }} 
            wrap="wrap" 
            gap={4}
            direction={{ base: "column", md: "row" }}
          >
            <VStack align={{ base: "center", md: "start" }} spacing={2}>
              <Heading 
                size={{ base: "md", md: "lg" }} 
                color="gray.800" 
                display="flex" 
                alignItems="center" 
                gap={2}
                textAlign={{ base: "center", md: "left" }}
              >
                <Icon as={MessageSquarePlus} />
                Reviews & Feedback
              </Heading>
              <HStack spacing={4} wrap="wrap" justify={{ base: "center", md: "start" }}>
                <Badge colorScheme="blue" variant="subtle" fontSize="sm" px={3} py={1}>
                  <Icon as={Star} mr={1} />
                  {reviewCount} reviews
                </Badge>
                <Badge colorScheme="green" variant="subtle" fontSize="sm" px={3} py={1}>
                  <Icon as={Users} mr={1} />
                  {Math.round(likedPercent)}% liked
                </Badge>
              </HStack>
            </VStack>
            
            <Button
              colorScheme="blue"
              onClick={onOpen}
              size={{ base: "sm", md: "md" }}
              leftIcon={<Icon as={MessageSquarePlus} />}
              borderRadius="full"
              px={{ base: 4, md: 6 }}
              py={2}
              fontWeight="semibold"
              boxShadow="md"
              w={{ base: "full", md: "auto" }}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              transition="all 0.2s"
            >
              Write Review
            </Button>
          </Flex>

          <Divider borderColor="gray.300" />

          {/* Reviews List */}
          <VStack spacing={4} align="stretch">
            {reviews.length === 0 ? (
              <Card borderRadius="xl" boxShadow="sm" bg="white">
                <CardBody py={12}>
                  <VStack spacing={4}>
                    <Icon as={MessageSquarePlus} boxSize={12} color="gray.400" />
                    <VStack spacing={2}>
                      <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                        No reviews yet
                      </Text>
                      <Text color="gray.500" textAlign="center" maxW="md">
                        Be the first to share your experience with this club!
                      </Text>
                    </VStack>
                    <Button
                      colorScheme="blue"
                      variant="outline"
                      onClick={onOpen}
                      borderRadius="full"
                      px={6}
                    >
                      Write First Review
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ) : (
              reviews.map((review, index) => (
                <ReviewDisplay
                  key={index}
                  comment={review.comment}
                  reaction={review.likesClub ? "like" : "dislike"}
                />
              ))
            )}
          </VStack>
        </VStack>
      </Container>

      {/* Enhanced Review Modal */}
      <CustomModal
        title="Share Your Experience"
        onConfirm={handleConfirm}
        confirmLabel="Submit Review"
        isOpen={isOpen}
        onClose={onClose}
      >
        <VStack align="stretch" spacing={6}>
          <Text color="gray.600" fontSize="sm">
            Help others by sharing your honest experience with this club.
          </Text>
          
          <VStack align="stretch" spacing={3}>
            <Text fontWeight="semibold" color="gray.700">
              Your Review
            </Text>
            <Textarea
              placeholder="Tell us about your experience... What did you like? What could be improved?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              minH="120px"
              borderRadius="lg"
              borderColor="gray.300"
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px #3182ce",
              }}
            />
          </VStack>

          <VStack align="stretch" spacing={3}>
            <Text fontWeight="semibold" color="gray.700">
              Overall Experience
            </Text>
            <HStack 
              spacing={4} 
              justify="center" 
              wrap="wrap"
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                colorScheme={reaction === "like" ? "green" : "gray"}
                variant={reaction === "like" ? "solid" : "outline"}
                onClick={() => setReaction("like")}
                size={{ base: "md", sm: "lg" }}
                borderRadius="full"
                px={{ base: 6, sm: 8 }}
                w={{ base: "full", sm: "auto" }}
                leftIcon={<Text fontSize="lg">👍</Text>}
                _hover={{
                  transform: "scale(1.05)",
                }}
                transition="all 0.2s"
              >
                Liked It
              </Button>
              <Button
                colorScheme={reaction === "dislike" ? "red" : "gray"}
                variant={reaction === "dislike" ? "solid" : "outline"}
                onClick={() => setReaction("dislike")}
                size={{ base: "md", sm: "lg" }}
                borderRadius="full"
                px={{ base: 6, sm: 8 }}
                w={{ base: "full", sm: "auto" }}
                leftIcon={<Text fontSize="lg">👎</Text>}
                _hover={{
                  transform: "scale(1.05)",
                }}
                transition="all 0.2s"
              >
                Didn't Like
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </CustomModal>
    </Box>
  );
};

export default ClubsPage;
