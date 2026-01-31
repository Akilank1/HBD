import { getStore } from "@netlify/blobs";

export const handler = async (event, context) => {
    // In Netlify production, this connects to the global store automatically
    const store = getStore("birthday-config");

    const method = event.httpMethod;

    try {
        if (method === "GET") {
            const data = await store.get("names", { type: "json" });
            return {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache" // Ensure users always get the latest names
                },
                body: JSON.stringify(data || {
                    birthdayName: "Nanba",
                    wisherName: "Akil"
                }),
            };
        }

        if (method === "POST") {
            const { birthdayName, wisherName, password } = JSON.parse(event.body);

            if (password !== "Akilan") {
                return {
                    statusCode: 401,
                    body: JSON.stringify({ error: "Invalid Admin Password" }),
                };
            }

            // Save to global storage
            await store.setJSON("names", { birthdayName, wisherName });

            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Updated globally!" }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Database Connection Failed" }),
        };
    }

    return { statusCode: 405, body: "Method Not Allowed" };
};
