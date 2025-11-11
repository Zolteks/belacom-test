import { fetchRecentCampaigns } from "./api.js";
import { generateCSV } from "./csv.js";
import { uploadWithSFTP } from "./sftp.js";
import { filterCampaignsByDate } from "./sort.js";

const REFERENCE_DATE = new Date("2025-10-15");
const DATE_LIMIT_DAYS = 28;
const SFTP_REMOTE_PATH = "batch_report.csv";
const SFTP_HOST = "box.belacom.fr";

/**
 * Generates a CSV report with batch statistics for the campaigns that were sent in the last N weeks.
 *
 * This function is intentionally left without an implementation. It is the main task of the technical
 * exercise: connect to the mock ActiveCampaign API, retrieve the relevant campaigns, compute the stats,
 * and persist them to the CSV file.
 *
 * @returns {Promise<void>}
 */
async function generateBatchReport() {
    const campaigns = await fetchRecentCampaigns();
    const recentCampaigns = filterCampaignsByDate(campaigns, REFERENCE_DATE, DATE_LIMIT_DAYS);
    const csvData = generateCSV(recentCampaigns);
    await uploadWithSFTP(
        csvData,
        SFTP_REMOTE_PATH,
        SFTP_HOST,
        process.env.BELACOM_SFTP_USER,
        process.env.BELACOM_SFTP_PASSWORD
    );
}

generateBatchReport().catch(error => {
    console.error('Batch report generation failed:', error);
    process.exit(1);
});