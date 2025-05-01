import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import feedbackRoutes from './feedback.js';

dotenv.config();

const app = express();
app.use(express.json()); 

console.log(process.env.EMAIL_PASS);
console.log(process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email (from .env)
        pass: process.env.EMAIL_PASS  // Your email password (from .env)
    }
});

// Function to generate mail content
const mailCode = (i) => {
    if (i == 1) {
        return { subject: "Task Completed", message: "A member has completed a task please  navigate to portal." };
    } else if (i == 2) {
        return { subject: "New Enrollment", message: "A new user has enrolled." };
    }else if(i == 4){
        return { subject: "Enrollment Done", message: "thanks for enrolling in event." };
    } else if (i == 3) {
        return { subject: "Task Updated", message: "Admin has been notified for the task." };
    } else if ( i == 4) {
        return { subject : "User has been allocated a taskk" , message: "Admin has assigned you a task check portal."  }
    }else if(i==6){
        return { subject : "User your donation req has been assigned" , message: "User your donation req has been assigned  , we'll reach you soon"  }
    }
    else {
        return { subject: "Invalid Code", message: "Unknown mail code provided." };
    }
};

// Email Sending Route (HTML Support)
app.post('/send-mail', async (req, res) => {
    const { mailto, mailcode } = req.body;

    if (!mailto || !mailcode) {
        return res.status(400).json({ error: "Missing mailto or mailcode" });
    }

    const mailContent = mailCode(parseInt(mailcode));

    // Email Options (HTML version)
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: mailto,
        subject: mailContent.subject,
        html: `<html>
                <body style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h2 style="color: #333;">${mailContent.subject}</h2>
                    <p style="font-size: 18px; color: #555;">${mailContent.message}</p>
                    <a href="http://localhost:5173.com" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">Visit Our Website</a>
                </body>
               </html>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "HTML Email sent successfully", mailContent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Email sending failed", error });
    }
});


app.use('/feedback' , feedbackRoutes)
app.listen(5007, () => {
    console.log("Server live on port 5007");
});

