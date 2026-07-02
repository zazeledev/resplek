import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export async function getDb(): Promise<Database> {
  if (db) return db;

  const dbPath = path.resolve(__dirname, '../resplek.db');
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await initDb(db);
  return db;
}

async function initDb(database: Database) {
  // Create tables
  await database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'student'
    );

    CREATE TABLE IF NOT EXISTS listings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      location TEXT NOT NULL,
      price REAL NOT NULL,
      type TEXT NOT NULL,
      tags TEXT NOT NULL, -- JSON string array
      images TEXT NOT NULL, -- JSON string array
      status TEXT NOT NULL DEFAULT 'Available'
    );

    CREATE TABLE IF NOT EXISTS flatmate_inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      gender TEXT NOT NULL,
      academic_year TEXT NOT NULL,
      cleanliness TEXT NOT NULL,
      sleep_schedule TEXT NOT NULL,
      budget TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  // Seed data if empty
  const listingsCount = await database.get('SELECT COUNT(*) as count FROM listings');
  if (listingsCount?.count === 0) {
    const defaultListings = [
      {
        title: "Two Bedroom Apartment at Bergzicht Plaza",
        description: "Modern student residence featuring spacious rooms, high-speed internet, and comprehensive student support services. Right next to Eikestad Mall and Stellenbosch campus.",
        location: "Stellenbosch",
        price: 12000.0,
        type: "private",
        tags: JSON.stringify(["Furnished", "Private", "Secure Complex", "2 min from Campus", "1 min from Eikestad Mall"]),
        images: JSON.stringify(["/images/Enterance.JPG", "/images/Bedroom Bergzicht.png", "/images/Upperview.png", "/images/Parking spot.png"]),
        status: "Taken for 2026"
      },
      {
        title: "Die Berke",
        description: "Comfortable student housing located close to campus with secure facilities, beautiful bathrooms, and included utilities. Perfect for study groups.",
        location: "Stellenbosch",
        price: 3500.0,
        type: "private",
        tags: JSON.stringify(["Furnished", "Walking Distance", "Private"]),
        images: JSON.stringify(["/images/Die Berke.jpg", "/images/Bathtub.JPG"]),
        status: "Fully Booked for 2026"
      },
      {
        title: "Shared Room in Cape Town",
        description: "Cozy shared student room located in Cape Town near public transport lines and university shuttle routes. Fully equipped communal kitchen.",
        location: "Cape Town",
        price: 6500.0,
        type: "shared",
        tags: JSON.stringify(["Shared Room", "Cape Town", "Walking Distance", "Furnished"]),
        images: JSON.stringify(["/images/112+-+1.jpg", "/images/306-2.jpg"]),
        status: "Available"
      },
      {
        title: "Private Room in Johannesburg",
        description: "Comfortable private room in a secure garden studio in JHB. Features private study area, peaceful environment, and high-speed Wi-Fi.",
        location: "Johannesburg",
        price: 4500.0,
        type: "private",
        tags: JSON.stringify(["Private Room", "Garden Studio", "Secure", "JHB"]),
        images: JSON.stringify(["/images/GARDEN+STUDIO.jpg", "/images/45+Studio+2+(1).jpeg"]),
        status: "Available"
      },
      {
        title: "Luxury Suite in Durban",
        description: "Premium luxury student suite in Durban close to campuses. Includes shared entertainment lounge, pool access, study spaces and top-tier security.",
        location: "Durban",
        price: 8500.0,
        type: "luxury",
        tags: JSON.stringify(["Luxury Suite", "Durban", "Pool Access", "En-suite Bath"]),
        images: JSON.stringify(["/images/Twinshare+.jpg", "/images/Studio+1+(1).jpg", "/images/411+Studio+4+(2).jpg"]),
        status: "Available"
      }
    ];

    for (const listing of defaultListings) {
      await database.run(
        `INSERT INTO listings (title, description, location, price, type, tags, images, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [listing.title, listing.description, listing.location, listing.price, listing.type, listing.tags, listing.images, listing.status]
      );
    }
    console.log('Listings database pre-populated with seed data.');
  }

  // Seed default admin user
  const usersCount = await database.get('SELECT COUNT(*) as count FROM users');
  if (usersCount?.count === 0) {
    // Plain text or standard hash. Since we are revamping, we will support a simple password hash.
    // For simplicity of demonstration, we'll hash/save password 'student123'
    await database.run(
      `INSERT INTO users (email, name, password_hash, role) VALUES (?, ?, ?, ?)`,
      ['student@resplek.com', 'Thuso Pejane', 'student123', 'student']
    );
    console.log('Users database seeded.');
  }
}
