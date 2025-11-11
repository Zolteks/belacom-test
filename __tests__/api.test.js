import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fetchRecentCampaigns } from '../src/api.js';

describe("fetchRecentCampaigns", () => {

    it("should fetch campaigns from the API", async () => {
        const result = await fetchRecentCampaigns();
        expect(Array.isArray(result)).toBe(true);
    });

    it("should return an array of objects with the ldate property", async () => {
        const result = await fetchRecentCampaigns();
        expect(Array.isArray(result)).toBe(true);
        if (result.length > 0) {
            expect(typeof result[0]).toBe("object");
            expect(result[0]).toHaveProperty("ldate");
        }
    });

    it("should limit the number of campaigns returned", async () => {
        const limit = 10;
        const result = await fetchRecentCampaigns(30, limit);
        expect(result.length).toBeLessThanOrEqual(limit);
    });
});