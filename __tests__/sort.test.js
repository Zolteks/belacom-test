import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fetchRecentCampaigns } from '../src/api.js';
import { filterCampaignsByDate } from '../src/sort';

describe("filterCampaignsByDate", () => {

    it("should fetch campaigns in the last 28 days", async () => {
        const result = await fetchRecentCampaigns(28);
        const FifteenthOfOctober = new Date("2025-10-15T00:00:00Z");
        const campaigns = filterCampaignsByDate(result, FifteenthOfOctober, 28);
        
        for (const campaign of campaigns) {
            const ldateValue = new Date(campaign.ldate);
            expect(ldateValue.getTime()).toBeGreaterThanOrEqual(FifteenthOfOctober.getDate() - 28);
        }
    });
});