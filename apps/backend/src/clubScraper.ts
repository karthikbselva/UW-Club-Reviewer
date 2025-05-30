import axios from "axios";
import { load } from "cheerio";
import ClubService from "./services/implementations/clubService";
import IClubService from "./services/interfaces/clubService";
import { SocialType, SocialEnum } from "../types";
const clubService: IClubService = new ClubService();

async function scrapeForClubLinks() {
    try {
        const clubListingsLink = "https://clubs.wusa.ca/club_listings";
        const response = await axios.get(clubListingsLink);
        const html = response.data;
        const $ = load(html);

        // find number of last page
        const pageLinks = $("a.page-link");
        const lastPageLink = pageLinks.filter((_, element) => $(element).text().trim() === 'Last »')
        .attr('href');
        if (!lastPageLink) throw new Error("couldn't find last page link");
        const lastPageStr = lastPageLink.match(/page=(\d+)/);
        if (!lastPageStr) throw new Error("couldn't get last page number");
        const lastPageNum = parseInt(lastPageStr[1], 10); 
        //console.log(lastPageNum);

        const clubPageLinks: string[] = [];
        // loop over all pages from 2...lastPageNum, for each add the page link
        for (let i = 1; i <= lastPageNum; i++) {
            const response = await axios.get(`${clubListingsLink}\?page=${i}`);
            const html = response.data;
            const $ = load(html);
            $(".card > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > a").each((_, element) => {
                const href = $(element).attr("href");
                //console.log(href);
                if (href) clubPageLinks.push(href);
            });
        }
        //console.log(clubPageLinks);
        return clubPageLinks;
    } catch (error) {
        console.error(error);
    }
}

async function scrapeSite(url: string) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = load(html);
        const name = $(".club-name-header").text();
        const description = $("#content > div > div.container.mt-4 > div:nth-child(3) > div.col-12.col-lg-9 > div:nth-child(2) > div:nth-child(2) > #full-text").text();
        const socialsArray = SocialEnum.map(socialType => [socialType as SocialType, null]);
        const socials: Record<SocialType, string | null> = Object.fromEntries(socialsArray);
        const email = $(".contact-button").attr("href");
        if (email) socials["email" as SocialType] = email.slice(8);
        $(".dashboard-icon-container a").each((_, element) => {
            const href = $(element).attr("href");
            if (href) {
                for (const socialType of SocialEnum) {
                    if (href.includes(socialType)) socials[socialType] = href;
                }
            }
        });
        const newClub = await clubService.createClub({
            name: name,
            description: description,
            competitionLevel: 1,
            skillLevel: 1,
            schedule: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
            },
            social: socials,
            categories: [],
        });
        //console.log(`created club ${newClub.name} with id ${newClub.id}`);
    } catch (error) {
        console.error(error);
    }
}

async function createAllClubs() {
    try {
        const mainURL = "https://clubs.wusa.ca";
        const clubRoutes = await scrapeForClubLinks();
        if (!clubRoutes) throw new Error("scraping for all club links failed");
        //console.log(clubRoutes);
        for (const clubRoute of clubRoutes) {
            const fullURL = `${mainURL}${clubRoute}`;
            await scrapeSite(fullURL);
        }
    } catch (error) {
        console.error(error);
    }
}

export { scrapeForClubLinks, scrapeSite, createAllClubs };