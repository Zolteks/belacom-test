# Running the solution

## Setup and Environment

### Dependencies
Install NodeJS's dependencies
```bash
npm install
```

### Environment Variables
- BELACOM_SFTP_HOST: address of the host server.
- BELACOM_SFTP_USER: your username.
- BELACOM_SFTP_PASSWORD: your password.

## Execution
Run the OpenAPI mock server before anything else:
```bash
npm run mock:server
```

It is recommended to run test batchs when adjusting fetchRecentCampaigns, filterCampaignsByDate, generateCSV and uploadWithSFTP:
```bash
npm run test
```

Run the main script (generateBatchReport):
```bash
npm run start
```