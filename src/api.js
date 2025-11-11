/**
* @returns {Promise<any[]>} A promise that resolves to an array of campaign data.
**/
export async function fetchRecentCampaigns(ldate=1, limit=500) {
    const response = await fetch(`http://localhost:3100/api/3/campaigns?orders[ldate]=${ldate}&limit=${limit}`, {
        method: "GET",
        headers: {
            "Api-Token": "mock-api-token"
        }
    });
    const data = await response.json();
    return data.campaigns;
}