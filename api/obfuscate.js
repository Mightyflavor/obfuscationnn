import { readFile } from "fs/promises";
import path from "path";

// Function to generate a random obfuscation string
function randomObfuscation(length = 4) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

// Function to obfuscate text
function obfuscateText(text) {
    return text.replace(/([a-zA-Z0-9])/g, "$1&#x200B;"); // Adds zero-width space between characters
}

// API Handler to serve obfuscated HTML
export default async function handler(req, res) {
    try {
        // Read your HTML file (modify this to match your file structure)
        const filePath = path.join(process.cwd(), "index.html"); // Modify based on your main HTML file
        let html = await readFile(filePath, "utf-8");

        // Modify all visible text in the HTML before sending it
        let modifiedHTML = html.replace(/>([^<]+)</g, (match, text) => {
            return ">" + obfuscateText(text) + "<";
        });

        // Send modified HTML
        res.setHeader("Content-Type", "text/html");
        res.send(modifiedHTML);
    } catch (error) {
        res.status(500).send("Error loading HTML file.");
    }
}
