// Sample application code for environment-variable scanning.
const appName = process.env.APP_NAME;
const databaseUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;

console.log(`Starting ${appName || "demo"}...`);
module.exports = { databaseUrl, apiKey };
