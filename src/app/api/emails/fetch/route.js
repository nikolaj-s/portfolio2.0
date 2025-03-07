
import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";

import { simpleParser } from "mailparser";

export const GET = async (req, res) => {
    try {
        // Get the page and limit from query parameters
        const url = new URL(req.url).searchParams;
        const page = Number(url.get("page") || 1);
        const limit = Number(url.get("limit") || 10);

        // Initialize AWS S3 client
        const s3 = new S3Client({
            region: process.env.MY_AWS_REGION,
            credentials: {
                accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
            },
        });

        const bucketName = process.env.MY_AWS_BUCKET_NAME;
        const folderName = "norxwestemails/";

        const params = {
            Bucket: bucketName,
            Prefix: folderName, // Specify the folder (prefix)
        };

        // List objects in the specified folder
        const data = await s3.send(new ListObjectsV2Command(params));

        if (!data.Contents || data.Contents.length === 0) {
            return Response.json({ emails: [], message: "No emails found" }, { status: 200 });
        }

        const sortedEmails = data.Contents.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));

        // Pagination logic
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const emailsToFetch = sortedEmails.slice(startIndex, endIndex);

        // Fetch and parse emails
        const emails = await Promise.all(
            emailsToFetch.map(async (email) => {
                const emailParams = {
                    Bucket: bucketName,
                    Key: email.Key, // File name
                };

                // Get the email object from S3
                const emailData = await s3.send(new GetObjectCommand(emailParams));

                // Convert the email body to a string
                const emailBody = await emailData.Body.transformToString();

                // Parse the email content using mailparser
                const parsedEmail = await simpleParser(emailBody);

                // Return parsed email details
                return {
                    subject: parsedEmail.subject,
                    name: parsedEmail.from?.value?.[0]?.name || "Unknown",
                    from: parsedEmail.from?.value?.[0]?.address || "Unknown",
                    to: parsedEmail.to?.text || "Unknown",
                    cc: parsedEmail.cc?.text || "Unkown",
                    date: parsedEmail.date || "Unknown",
                    replyTo: parsedEmail.replyTo?.text || "Unknown",
                    message: parsedEmail.text || "",
                    html: parsedEmail.html || "",
                    attachments: parsedEmail.attachments || [],
                    key: email.Key, // File key in S3
                };
            })
        );

        // Return the paginated emails as a response
        return Response.json(
            { emails, hasMore: endIndex < data.Contents.length },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store, max-age=0, must-revalidate",
                },
            }
        );
    } catch (error) {
        console.error("Error fetching emails:", error);
        return Response.json({ error: "Fatal Server Error" }, { status: 500 });
    }
};
