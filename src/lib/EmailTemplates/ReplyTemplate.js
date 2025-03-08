
export const ReplyTemplate = (name, originalMessage, reply) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reply from Nor. X West Designs</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: rgb(24, 24, 24); color: #fff; padding: 40px;">
    <div style="max-width: 600px; margin: auto; padding: 30px; border: 1px solid #fff; border-radius: 5px; background-color: rgb(24, 24, 24);">
        <h1 style="font-size: 22px; border-bottom: 2px solid #fff; display: inline-block; padding-bottom: 10px; color: #fff;">Reply from Nor. X West Designs</h1>
        <p style="font-size: 16px; line-height: 1.6; color: white;">Hello ${name}</p>
        <p style="font-size: 16px; line-height: 1.6; color: white;">${reply}</p>
        <div style="padding: 15px; border-radius: 5px; font-style: italic; margin-top: 20px; background-color: rgb(24,24,24);">
            <p style="font-size: 16px; line-height: 1.6; color: white;">Replying to:</p>
            <p style="font-size: 16px; line-height: 1.6; color: white;">${originalMessage}</p>
        </div>
        <p style="font-size: 16px; line-height: 1.6; color: white;">Nikolaj - Nor. X West Designs</p>
        <div style="margin-top: 20px; font-size: 12px; color: #ccc;">© 2025 Nor. X West Designs. All rights reserved.</div>
    </div>
</body>
</html>

`
}