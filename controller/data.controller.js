import { dataModel } from "../model/data.js";
import xlsx from "xlsx";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { crd } from "./credentials.js";
import { generateCertificateHtml } from "./generateCertificate.js";

const pushData = async (req, res) => {
    try {
        const data = await processData();
        const saved = await dataModel.insertMany(data);

        // Send email to users
        await sendEmails(data);

        if (saved.length === 0) {
            return res.status(400).json({
                message: "No data pushed",
            });
        }
        return res.status(200).json({
            message: "Data pushed successfully",
            saved,
        });
    } catch (error) {
        console.error("Error pushing data: ", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

const sendEmails = async (data) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: { user: crd.user1, pass: crd.pass1 },
    });

    const message = 'We thank you wholeheartedly for the contribution made towards Codewave Go Green. Please find the <br> receipt enclosed. We will be sending an 80G certificate in the month of Mar/April 2023. <br><br> Best regards,Codewave;';

    data.forEach(async (user) => {
        const certificateHtml = generateCertificateHtml(user);
        const mailOptions = {
            from: 'chawhannaman5@gmail.com',
            to: user.email,
            subject: 'Your Subject Here',
            html: message,
            attachments: [{
                filename: 'Certificate.html',
                content: certificateHtml,
            }],
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) throw err;
            console.log(`Invoice Mail sent to ${user.email}`);
        });
    });
};


const getData = async (req, res) => {
    try {
        const saved = await dataModel.find({});
        if (saved.length === 0) {
            return res.status(400).json({
                message: "No data found",
            });
        }

        return res.status(200).json(saved);
    } catch (error) {
        console.error("Error getting data: ", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
const delData = async (req, res) => {
    try {
        const saved = await dataModel.deleteMany({});
        if (saved.length === 0) {
            return res.status(400).json({
                message: "No data deleted",
            });
        }
        return res.status(200).json({
            message: "data deleted successfully",
            saved,
        });
    } catch (error) {
        console.error("Error deleting data: ", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

const processData = async () => {
    const excel_file = "./utils/Book.xlsx"; //hi
    const workbook = xlsx.readFile(excel_file);
    const sheet_name = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheet_name];
    const data = xlsx.utils.sheet_to_json(sheet);

    const processed_data = data.map((one) => {
        const trees = Math.ceil(one["amount"] / 100);
        return {
            ...one,
            no_of_trees: trees,
        };
    });

    return processed_data;
};

export { pushData, getData, delData };
