import { ConfirmationTemplate } from "@/lib/EmailTemplates/ConfirmationTemplate";
import { NewInquiryTemplate } from "@/lib/EmailTemplates/NewInquiryTemplate";
import { validateContactForm } from "@/lib/Validation/ValidateContactForm";

import nodemailer from 'nodemailer';

export const POST = async (req, res) => {
    try {
        
        const {name, email, subject, message} = await req.json();

        const {error} = validateContactForm({name, email, subject, message});

        if (error) {

            return Response.json({message: error[0]?.message}, {status: 400});

        }

        const transporter = nodemailer.createTransport({
            host: "email-smtp.us-west-2.amazonaws.com", // Change to your AWS SES region
            port: 465, // Use 587 for TLS, 465 for SSL
            secure: true, // Use `true` for port 465, `false` for 587
            auth: {
                user: process.env.MY_AWSMAIL_USER,
                pass: process.env.MY_AWSMAIL_PASS
            }
        });

        const newInquiriryTemplate = NewInquiryTemplate(name, email, subject, message);

        await transporter.sendMail({
            from: 'contact@norxwestdesigns.ca',
            html: newInquiriryTemplate,
            to: 'niko.sage@gmail.com, contact@norxwestdesigns.ca',
            name: name,
            subject: `Nor. X West Desings New Inquriry from ${name}`,
            text: JSON.stringify({email: email, name: name, message: message}),
        })

        const confirmationTemplate = ConfirmationTemplate(name);

        await transporter.sendMail({
            from: 'noreply@norxwestdesigns.ca',
            html: confirmationTemplate,
            to: email,
            subject: "Nor. X West Designs Message Confirmed",
        })

        return Response.json({success: "Email Sent"}, {status: 200});
    } catch (error) {
        console.log(error);
        return Response.json({error: "Fatal Server Error"}, {status: 500});
    }
}