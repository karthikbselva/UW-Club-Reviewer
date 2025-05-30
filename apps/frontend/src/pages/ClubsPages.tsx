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
} from "@chakra-ui/react";
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

  useEffect(() => {
    const fetchAllData = async () => {
      if (id) {
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

  return (
    <Box p={0} m={0}>
      {club && (
        <Box bg="blue.900" w="100%" py={6} px={4} boxShadow="md">
          <Container maxW="5xl">
            <Flex
              direction={{ base: "column", md: "row" }}
              align="center"
              justify="space-between"
            >
              <ClubInfo
                title={club.name}
                description={club.description}
                likedPercent={likedPercent}
                ratings={reviewCount}
                skillLevel={club.skillLevel}
                competitionLevel={club.competitionLevel}
                socials={Object.entries(club.social).filter(([key, link]) => (key !== "id" && key !== "clubId" && link !== null))}
              />
            </Flex>
          </Container>
        </Box>
      )}

      <Container maxW="5xl" p={4}>
        <Button
          colorScheme="blue"
          onClick={onOpen}
          mt={4}
          alignSelf="flex-start"
          size="sm"
        >
          Add Review
        </Button>

        <Text fontSize="xl" fontWeight="bold" mt={8} mb={4}>
          Reviews
        </Text>

        {reviews.length === 0 ? (
          <Text>No reviews yet.</Text>
        ) : (
          reviews.map((review, index) => (
            <ReviewDisplay
              key={index}
              comment={review.comment}
              reaction={review.likesClub ? "like" : "dislike"}
            />
          ))
        )}

        <CustomModal
          title="Add Review"
          onConfirm={handleConfirm}
          confirmLabel="Submit"
          isOpen={isOpen}
          onClose={onClose}
        >
          <VStack align="start" spacing={4}>
            <Text>Please enter your comment:</Text>
            <Textarea
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Text>Reaction:</Text>
            <HStack spacing={4}>
              <Button
                colorScheme={reaction === "like" ? "green" : "gray"}
                onClick={() => setReaction("like")}
              >
                👍 Like
              </Button>
              <Button
                colorScheme={reaction === "dislike" ? "red" : "gray"}
                onClick={() => setReaction("dislike")}
              >
                👎 Dislike
              </Button>
            </HStack>
          </VStack>
        </CustomModal>
      </Container>
    </Box>
  );
};

export default ClubsPage;
