import { getStore } from "@netlify/blobs";

export const handler = async (event, context) => {
    // Store names in a blob called 'birthday-config'
    const store = getStore({
        name: "birthday-config",
        // In production, these are automatically provided by Netlify
        // For local dev, they might need Netlify CLI
        siteID: process.env.SITE_ID,
        token: process.env.NETLIFY_PURGE_API_TOKEN || process.env.NETLIFY_AUTH_TOKEN
    });

    const method = event.httpMethod;

    try {
        if (method === "GET") {
            let data;
            try {
                data = await store.get("names", { type: "json" });
            } catch (e) {
                console.error("Error fetching from blobs:", e);
            }

            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data || {
                    birthdayName: "Nanba",
                    wisherName: "Akil"
                }),
            };
        }

        if (method === "POST") {
            const body = JSON.parse(event.body);
            const { birthdayName, wisherName, password } = body;

            // Simple password check
            if (password !== "Akilan") {
                return {
                    statusCode: 401,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ error: "Unauthorized" }),
                };
            }

            await store.setJSON("names", { birthdayName, wisherName });

            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: "Updated successfully" }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }

    return {
        statusCode: 405,
        body: "Method Not Allowed",
    };
};
