"use client"

import { transporter, mailOptions } from "@/helpers/mailer";
import { useState } from "react";
export default function Results() {
    const subject = "This is the subject";

    const handleEmail = async () => {
        try {
            // Send email
            await transporter.sendMail({
                ...mailOptions,
                subject: subject,
                text: "This is the email body.",
                html: "<b>This is a test title using HTML</b>",
            });

            // Set emailSent to true after successful email sending
        } catch (error) {
            console.error("Error sending email:", error);
        }
    }

    return (
        <div>
            <h1>RESULTS</h1>
            <button onClick= {() => handleEmail}>Send Email</button>
        </div>
    );
}
