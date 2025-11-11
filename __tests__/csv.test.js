import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { generateCSV } from '../src/csv.js';
import { fetchRecentCampaigns } from '../src/api.js';

describe("generateCSV", () => {
    beforeEach(() => {
    });
    afterEach(() => {
    });

    it("should have a header row with these columns", async () => {
        const campaigns = await fetchRecentCampaigns();
        const CSV = generateCSV(campaigns);
        expect(CSV).toMatch(/^campaignId,campaignName,sendDate,ldate,emailsSent,totalOpens,totalClicks,totalBounces,totalUnsubscribes/);
    });
});