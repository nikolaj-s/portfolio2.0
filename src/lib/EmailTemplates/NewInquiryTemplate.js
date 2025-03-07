

export const NewInquiryTemplate = (name, email, subject, message) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Inquiry from Nor. X West Designs</title>
</head>
<body style="font-family: Arial, sans-serif; color: #fff; background-color: rgb(24, 24, 24); padding: 40px;">
    <div style="max-width: 600px; margin: auto; padding: 30px; border: 1px solid #fff; border-radius: 5px; background-color: rgb(24, 24, 24);">
        <h1 style="font-size: 22px; border-bottom: 2px solid #fff; display: inline-block; padding-bottom: 10px; color: white;">New Message from a Potential Client</h1>
        <p style="font-size: 16px; line-height: 1.6; color: white;"><strong>From:</strong> ${name}</p>
        <p style="font-size: 16px; line-height: 1.6; color: white;"><strong>Email:</strong> ${email}</p>
        <p style="font-size: 16px; line-height: 1.6; color: white;"><strong>Subject:</strong> ${subject}</p>
        <div style="padding: 15px; border-radius: 5px; margin-top: 20px; font-style: italic;">
            <p style="font-size: 16px; line-height: 1.6; color: white;">${message}</p>
        </div>
        <p style="font-size: 16px; line-height: 1.6; color: white;">You can reply directly to this email or reach out to the client via the provided contact details.</p>
        <p style="font-size: 16px; line-height: 1.6; color: white;">- Nor. X West Designs</p>
        <div style="margin-top: 20px; font-size: 12px; color: #ccc;">© 2025 Nor. X West Designs. All rights reserved.</div>
    </div>
</body>
</html>

    `
}