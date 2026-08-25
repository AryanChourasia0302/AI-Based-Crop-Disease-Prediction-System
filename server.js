import Groq from "groq-sdk";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const server = http.createServer((req, res) => {

    // =========================
    // OPEN WEBSITE
    // =========================
    if (req.method === "GET" && req.url === "/") {

        const html = fs.readFileSync(
            path.join(__dirname, "index.html"),
            "utf8"
        );

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(html);
        return;
    }

    // =========================
    // AI ADVISORY
    // =========================
    if (req.method === "POST" && req.url === "/api/advice") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", async () => {

            try {

                const data = JSON.parse(body);

                const crop = data.crop || "unknown crop";
                const disease = data.disease;
                const severity = data.severity || "unknown";

                if (!disease) {
                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        error: "Disease information is missing."
                    }));

                    return;
                }

                const prompt = `
You are Verdant, an AI crop management advisor.

Crop: ${crop}
Disease: ${disease}
Severity: ${severity}

Answer these six questions:

1. What caused this?
2. How can I treat it?
3. Can I use an organic treatment?
4. How often should I apply the treatment?
5. How can I prevent it next season?
6. Is this dangerous for my whole crop?

Rules:
- Give practical agricultural advice.
- Keep answers concise and easy to understand.
- Make advice specific to the crop and disease.
- Consider severity.
- Do not invent pesticide doses.
- Tell the user to follow product labels and local agricultural guidance.
- Do not claim certainty when uncertain.
- Return ONLY valid JSON.

Return exactly:

{
  "cause": "...",
  "treatment": "...",
  "organic": "...",
  "frequency": "...",
  "prevention": "...",
  "cropRisk": "..."
}
`;

                const response =
                    await groq.chat.completions.create({

                        model: "openai/gpt-oss-20b",

                        messages: [
                            {
                                role: "system",
                                content:
                                    "You are Verdant, a helpful AI crop management advisor."
                            },
                            {
                                role: "user",
                                content: prompt
                            }
                        ],

                        response_format: {
                            type: "json_object"
                        },

                        temperature: 0.2
                    });

                const text =
                    response.choices[0]?.message?.content || "{}";

                const advice = JSON.parse(text);

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify(advice));

            } catch (error) {

                console.error("AI ERROR:", error);

                res.writeHead(500, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    error: "Could not generate AI advisory.",
                    details: error.message
                }));
            }
        });

        return;
    }

    // =========================
    // NOT FOUND
    // =========================

    res.writeHead(404);
    res.end("Not found");
});

server.listen(3000, () => {

    console.log(
        "🌱 Verdant server running at http://localhost:3000"
    );

});