import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const DELETE = async (req, res) => {
    try {
        const { key } = await req.json();

        if (!key) {
            return Response.json({ error: "File key is required" }, { status: 400 });
        }

        // Initialize AWS S3 client
        const s3 = new S3Client({
            region: process.env.MY_AWS_REGION,
            credentials: {
                accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
            },
        });

        const bucketName = process.env.MY_AWS_BUCKET_NAME;

        const params = {
            Bucket: bucketName,
            Key: key,
        };

        // Delete object from S3
        await s3.send(new DeleteObjectCommand(params));

        return Response.json(
            { message: "File deleted successfully" },
            {
                status: 200,
                headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
            }
        );
    } catch (error) {
        console.error("Error deleting file:", error);

        return Response.json({ error: "Fatal Error Deleting Email" }, { status: 500 });
    }
};
