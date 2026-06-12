import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
};

// Create a pool for better performance
const pool = mysql.createPool(dbConfig);

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const apiRouter = express.Router();

// GET /features - Keeping compatibility
apiRouter.get('/features', (req, res) => {
  const features = [
    { title: "The Star Beacon", text: "12 towers defining the world's first Mercedes-Benz branded city." },
    { title: "Sensual Purity", text: "Design language evolved from automotive excellence to cityscape." },
    { title: "Grand Promenade", text: "12 distinct lifestyle experiences curated for discovery." },
    { title: "Nad Al Sheba", text: "Affluent district renowned for equestrian excellence." }
  ];
  res.json(features);
});

// POST /lead - Saving to database and sending email
apiRouter.post('/lead', async (req, res) => {
  const { name, email, phone, unit, message } = req.body;
  
  try {
    // Check if email or phone already exists
    const checkQuery = `SELECT id FROM leads WHERE email = ? OR (phone = ? AND phone IS NOT NULL AND phone != '')`;
    const [existingLeads] = await pool.execute(checkQuery, [email, phone]);

    if (existingLeads.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: 'You have already submitted an inquiry. Please wait for our team to contact you.' 
      });
    }

    const query = `
      INSERT INTO leads (name, email, phone, unit, message, is_read) 
      VALUES (?, ?, ?, ?, ?, 0)
    `;
    
    await pool.execute(query, [name, email, phone, unit, message]);
    console.log('New lead saved to database:', { name, email });

    // Send Email to Manager
    const mailOptions = {
      from: `"MB City Web Service" <${process.env.EMAIL_USER}>`,
      to: process.env.MANAGER_EMAIL,
      subject: `New Inquiry: ${name} - ${unit}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Interest Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Preferred Unit:</strong> ${unit}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; color: #555;">
            ${message || 'No message provided.'}
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">Received at: ${new Date().toLocaleString()}</p>
        </div>
      `,
    };

    // We don't await email to send response faster to user, 
    // but we log the result
    transporter.sendMail(mailOptions)
      .then(info => console.log('Email sent to manager:', info.messageId))
      .catch(err => console.error('Email error:', err));

    res.status(200).json({ success: true, message: 'Lead received and saved successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ success: false, message: 'Error saving to database' });
  }
});

app.use('/api', apiRouter);

// Static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Connected to database: ${dbConfig.database}`);
});
