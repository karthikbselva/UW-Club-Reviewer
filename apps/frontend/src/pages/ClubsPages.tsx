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
} from "@chakra-ui/react";
import ReviewAPIClient from "../APIClients/ReviewAPIClient";
import { ClubDTO, ReviewDTO } from "../../types";
import CustomModal from "../components/ModalContainer";
import ReviewDisplay from "../components/ReviewDisplay";
import ClubAPIClient from "../APIClients/ClubAPIClient";
import ClubInfo from "../components/ClubInfo";

const ClubsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState("");
  const [reaction, setReaction] = useState<"like" | "dislike" | null>(null);

  const { id } = useParams();
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);
  const [club, setClub] = useState<ClubDTO>();

  const fetchReviews = async () => {
    if (id != null) {
      try {
        const response = await ReviewAPIClient.get(Number(id));
        setReviews(response);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
  };

  const fetchClubById = async () => {
    if (id != null) {
      try {
        const response = await ClubAPIClient.get(Number(id));
        setClub(response);
      } catch (error) {
        console.error("Error fetching club:", error);
      }
    }
  };

  interface ReviewInput {
    club_id: number;
    comment: string;
    likes_club: boolean;
  }

  const addReview = async (review: ReviewInput): Promise<void> => {
    try {
      const response = await ReviewAPIClient.create({
        clubId: review.club_id,
        comment: review.comment,
        likesClub: review.likes_club,
      });
      console.log("Review added:", response);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchClubById();
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
      comment: comment,
      likes_club: reaction === "like",
    };

    try {
      await addReview(newReview);
      console.log("Review submitted successfully!");
      // 🔥 Fetch updated reviews list instead of reloading the page
      await fetchReviews();
      setComment("");
      setReaction(null);
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <Box p={4}>
      {club && (
        <ClubInfo
          title={club.name}
          description={club.description}
          likedPercent={90} // Placeholder - replace with actual data if needed
          ratings={50} // Placeholder - replace with actual data if needed
          skillLevel="Intermediate"
          competitionLevel="Beginner"
        />
      )}
      <Box mt={4}>
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

        <Button colorScheme="blue" onClick={onOpen} mt={4}>
          Add Review
        </Button>

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
            <Text>Liked:</Text>
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
      </Box>
    </Box>
  );
};

export default ClubsPage;
