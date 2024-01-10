// import { jsonFile } from "./utils";

const baseURL = 'https://api.guildwars2.com/v2';
const reqConfig = {
	headers: {
		'Content-Type': 'application/json'
	}
};

export default function achievements() {
    async function fetchNExport() {
        const achievements = await getGroups();
        // console.log('achievements', achievements.length, achievements);

        for (const idx in achievements) {
            /**
             * Populate groups
             */
            achievements[idx] = await getGroupById(achievements[idx]);

            /**
             * Populate categories
             */
            achievements[idx].categories = await getCategoryById(achievements[idx].categories.join(','));

            /**
             * Populate achievements
             */
            for (const cId in achievements[idx].categories) {
                achievements[idx].categories[cId].achievements = await getById(achievements[idx].categories[cId].achievements.join(','));
            }
        }

        // jsonFile.save(achievements, 'data/achievements.json');
    }

    async function getGroups() {
        const resp = await fetch(`${baseURL}/achievements/groups`, reqConfig);
        return await resp.json();
    };

    async function getGroupById(groupId: number|string) {
        const resp = await fetch(`${baseURL}/achievements/groups/${groupId}`, reqConfig);
        return await resp.json();
    };

    async function getCategoryById(cId: number|string) {
        const resp = await fetch(`${baseURL}/achievements/categories?ids=${cId}`, reqConfig);
        return await resp.json();
    };

    async function getById(aId: number|string) {
        if (!aId) {
            /**
             * On emprty aId directly returns an empty array to avoid useless api calls
             */
            return []
        }
        const resp = await fetch(`${baseURL}/achievements?ids=${aId}`, reqConfig);
        return await resp.json();
    };

}
