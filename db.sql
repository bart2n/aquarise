-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS mb_city;

-- Use the database
USE mb_city;

-- Create the leads table for user submissions
CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    unit VARCHAR(100),
    message TEXT,
    is_read TINYINT(1) DEFAULT 0, -- 0 for unread, 1 for read
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
