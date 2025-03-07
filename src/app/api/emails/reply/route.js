import { ReplyTemplate } from '@/lib/EmailTemplates/ReplyTemplate';
import nodemailer from 'nodemailer';

export const POST = async (req, res) => {
  try {
    const form = await req.formData();

    const email = form.get('email');

    const subject = form.get('subject');

    const message = form.get('message');

    const reply = form.get('reply');

    const name = form.get('name');

    const files = form.getAll('file');
    console.log(files)
    // Check if all required fields are present
    if (!name || !email || !subject || !message || !reply) {
    return Response.json({ error: 'Invalid Reply Data' }, {status: 500});
    }

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
    host: 'email-smtp.us-west-2.amazonaws.com', // Change to your AWS SES region
    port: 465, // Use 587 for TLS, 465 for SSL
    secure: true, // Use `true` for port 465, `false` for 587
    auth: {
        user: process.env.MY_AWSMAIL_USER,
        pass: process.env.MY_AWSMAIL_PASS,
    },
    });

    // Create the email template
    const replyTemplate = ReplyTemplate(name, message, reply);

    // Prepare the file attachments (if any)
    const attachments = [];

    for (let file of files) {
        // Check if the file is too large (e.g., 3MB limit)
        if (file.size > 3 * 1024 * 1024) {
          return Respose.json({ error: 'File size exceeds 3MB' }, {stauts: 400});
        }
  
        // Prepare the attachment data
        // Convert file to buffer and prepare it for sending
      const fileBuffer = await file.arrayBuffer(); // Get the content as ArrayBuffer
        attachments.push({
        filename: file.name, // The original filename
        content: Buffer.from(fileBuffer), // Convert ArrayBuffer to Buffer for nodemailer
      });
      }

    // Send the email with attachments
    await transporter.sendMail({
    from: 'contact@norxwestdesigns.ca',
    html: replyTemplate,
    to: email,
    replyTo: 'contact@norxwestdesigns.ca',
    subject: `Reply From: Nor. X West Designs`,
    text: JSON.stringify({ name, subject, message, email }),
    attachments: attachments.length ? attachments : undefined, // Attach files if available
    });

    return Response.json({ success: 'Email Sent' }, {status: 200, header: {'Cache-Control': "no-store, no-cache, must-revalidate, proxy-revalidate"}});
  } catch (error) {
    console.log('Error:', error);
    return Response.json({error: "Fatal Error"}, {status: 500});
  }
};
