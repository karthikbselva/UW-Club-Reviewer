import IReviewService from "./services/interfaces/reviewService";
import ReviewService from "./services/implementations/reviewService";
import ClubService from "./services/implementations/clubService";
import IClubService from "./services/interfaces/clubService";
const clubService: IClubService = new ClubService();

const reviewService: IReviewService = new ReviewService();

async function seedReviews() {
    try {
        const clubs = await clubService.getClubs();
        for (const club of clubs) {
            const reviews = [];
            const numReviews = Math.floor(Math.random() * 10) + 1;
            const dummyComment = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
            for (let i = 0; i < numReviews; i++) {
                const dummyLike = Math.random() < 0.5;    
                reviews.push({
                    clubId: club.id,
                    comment: dummyComment,
                    likesClub: dummyLike,
                });
            }
            await Promise.all(
                reviews.map((review) => reviewService.createReview(review))
            );
        }
    } catch (error) {
        console.error(error);
    }
}

async function seedClubAttributes() {
    const BATCH_SIZE = 3;
    try {
        const clubs = await clubService.getClubs();
        for (let i = 0; i < clubs.length; i += BATCH_SIZE) {
            const batch = clubs.slice(i, i + BATCH_SIZE);
            await Promise.all(
              batch.map(club => {
                const dummySkillLevel = Math.floor(Math.random() * 3) + 1;
                const dummyCompetitionLevel = Math.floor(Math.random() * 3) + 1;
                return clubService.updateClub(club.id, {
                    name: null,
                    description: null,
                    skillLevel: dummySkillLevel,
                    competitionLevel: dummyCompetitionLevel,
                    isActive: null,
                    bannerPhoto: null,
                    schedule: null,
                    social: null,
                    categories: null,
                });
              })
            );
          } 
    } catch (error) {
        console.error(error);
    }
}

export { seedReviews, seedClubAttributes };