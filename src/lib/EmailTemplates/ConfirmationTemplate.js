export const ConfirmationTemplate = (name) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Message Received - Nor. X West Designs</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: rgb(24, 24, 24); color: #fff; text-align: center; padding: 40px;">
    <div style="max-width: 600px; margin: auto; padding: 30px; border: 1px solid #fff; border-radius: 5px; background-color: rgb(24, 24, 24);">
        <h1 style="font-size: 24px; border-bottom: 2px solid #fff; display: inline-block; padding-bottom: 10px; color: white;">Thank You ${name} for Reaching Out</h1>
        <p style="font-size: 16px; line-height: 1.6; color: white;">Your message has been received.</p>
        <p style="font-size: 16px; line-height: 1.6; color: white;">I will be in touch within <strong>1 to 2 business days</strong>.</p>
        <p style="font-size: 16px; line-height: 1.6; color: white;">Looking forward to connecting with you.</p>
        <p style="font-size: 16px; line-height: 1.6; color: white;">- Nor. X West Designs</p>
        <div style="margin-top: 20px; font-size: 12px; color: #ccc;">© 2025 Nor. X West Designs. All rights reserved.</div>
    </div>
</body>
</html>`
}
