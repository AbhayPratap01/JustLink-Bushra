const fs = require("node:fs");
const path = require("node:path");

const renderApiUrl = (process.env.RENDER_API_URL || "").trim().replace(/\/+$/, "");
let parsedApiUrl;

try {
  parsedApiUrl = new URL(renderApiUrl);
} catch {
  throw new Error("Set RENDER_API_URL to the deployed Render service URL.");
}

if (parsedApiUrl.protocol !== "https:" || !parsedApiUrl.hostname) {
  throw new Error("RENDER_API_URL must be an HTTPS URL.");
}

const templatePath = path.join(__dirname, "frontend", "index.html");
const template = fs.readFileSync(templatePath, "utf8");
const marker = "const API_BASE_URL = '__RENDER_API_URL__';";

if (template.split(marker).length !== 2) {
  throw new Error("Expected exactly one Render API URL placeholder in frontend/index.html.");
}

const builtHtml = template.replace(
  marker,
  `const API_BASE_URL = ${JSON.stringify(renderApiUrl)};`,
);
const outputDirectory = path.join(__dirname, "dist");

fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(path.join(outputDirectory, "index.html"), builtHtml, "utf8");
