import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getDb } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static images if requested by backend directly
app.use('/images', express.static('../frontend/public/images'));

// ----------------------------------------------------
// 1. Listings API
// ----------------------------------------------------

// Endpoint: GET /php-backend/api/listings.php & GET /api/listings
const getListingsHandler = async (req: express.Request, res: express.Response) => {
  try {
    const db = await getDb();
    
    // Parse filters from query params
    const { priceRange, roomType, distance, search } = req.query;
    
    let query = 'SELECT * FROM listings WHERE 1=1';
    const params: any[] = [];

    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ? OR location LIKE ?)';
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    if (roomType) {
      query += ' AND type = ?';
      params.push(roomType);
    }

    if (priceRange) {
      if (priceRange === '3000-5000') {
        query += ' AND price >= 3000 AND price <= 5000';
      } else if (priceRange === '5000-7000') {
        query += ' AND price >= 5000 AND price <= 7000';
      } else if (priceRange === '7000-10000') {
        query += ' AND price >= 7000 AND price <= 10000';
      } else if (priceRange === '10000+') {
        query += ' AND price >= 10000';
      }
    }

    if (distance) {
      // Simple tag filter mapping
      if (distance === 'walking') {
        query += ' AND (tags LIKE ? OR tags LIKE ?)';
        params.push('%Walking Distance%', '%2 min from Campus%');
      }
    }

    const rows = await db.all(query, params);
    
    // Parse tags and images from JSON strings
    const listings = rows.map(row => ({
      ...row,
      tags: JSON.parse(row.tags),
      images: JSON.parse(row.images),
      image: JSON.parse(row.images)[0] // legacy support
    }));

    res.json(listings);
  } catch (error) {
    console.error('Listings error:', error);
    res.status(500).json({ error: 'Failed to retrieve listings' });
  }
};

app.get('/php-backend/api/listings.php', getListingsHandler);
app.get('/api/listings', getListingsHandler);

// ----------------------------------------------------
// 2. Authentication API (Login & Register)
// ----------------------------------------------------

// Login handler
const loginHandler = async (req: express.Request, res: express.Response) => {
  try {
    const db = await getDb();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user || user.password_hash !== password) { // Using simple password comparison for demo
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error during login' });
  }
};

app.post('/php-backend/login.php', loginHandler);
app.post('/api/auth/login', loginHandler);

// Register handler
const registerHandler = async (req: express.Request, res: express.Response) => {
  try {
    const db = await getDb();
    const { email, name, password, role } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if user already exists
    const existing = await db.get('SELECT id FROM users WHERE email = ?', [email]);
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const userRole = role || 'student';

    await db.run(
      'INSERT INTO users (email, name, password_hash, role) VALUES (?, ?, ?, ?)',
      [email, name, password, userRole]
    );

    const newUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Internal server error during registration' });
  }
};

app.post('/php-backend/register.php', registerHandler);
app.post('/api/auth/register', registerHandler);

// ----------------------------------------------------
// 3. Flatmate Matchmaker API
// ----------------------------------------------------

const submitFlatmateHandler = async (req: express.Request, res: express.Response) => {
  try {
    const db = await getDb();
    const { name, email, gender, academic_year, cleanliness, sleep_schedule, budget, description } = req.body;

    if (!name || !email || !gender || !academic_year || !cleanliness || !sleep_schedule || !budget) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    const createdAt = new Date().toISOString();

    await db.run(
      `INSERT INTO flatmate_inquiries (name, email, gender, academic_year, cleanliness, sleep_schedule, budget, description, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, gender, academic_year, cleanliness, sleep_schedule, budget, description || '', createdAt]
    );

    // Retrieve all inquiries for matching
    const allInquiries = await db.all('SELECT * FROM flatmate_inquiries WHERE email != ?', [email]);

    // Simple matching algorithm
    const matches = allInquiries.map((inquiry: any) => {
      let score = 0;
      if (inquiry.gender === gender) score += 20;
      if (inquiry.cleanliness === cleanliness) score += 30;
      if (inquiry.sleep_schedule === sleep_schedule) score += 30;
      if (inquiry.budget === budget) score += 20;
      
      return {
        ...inquiry,
        matchPercentage: score
      };
    }).sort((a: any, b: any) => b.matchPercentage - a.matchPercentage);

    res.json({
      success: true,
      message: 'Flatmate inquiry submitted successfully',
      matches: matches.slice(0, 3) // Return top 3 matches
    });
  } catch (error) {
    console.error('Flatmate match error:', error);
    res.status(500).json({ success: false, message: 'Internal server error submitting flatmate request' });
  }
};

app.post('/php-backend/submit-flatmate-inquiry.php', submitFlatmateHandler);
app.post('/api/flatmate', submitFlatmateHandler);

// ----------------------------------------------------
// 4. Contact Form API
// ----------------------------------------------------

const submitContactHandler = async (req: express.Request, res: express.Response) => {
  try {
    const db = await getDb();
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All contact fields are required' });
    }

    const createdAt = new Date().toISOString();

    await db.run(
      'INSERT INTO contact_submissions (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, ?)',
      [name, email, subject, message, createdAt]
    );

    res.json({
      success: true,
      message: 'Your message has been received. Thank you!'
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    res.status(500).json({ success: false, message: 'Internal server error submitting contact message' });
  }
};

app.post('/submit-contact.php', submitContactHandler);
app.post('/api/contact', submitContactHandler);

// ----------------------------------------------------
// 5. Server Run
// ----------------------------------------------------
app.listen(PORT, () => {
  console.log(`ResPlek Express API running on http://localhost:${PORT}`);
});
