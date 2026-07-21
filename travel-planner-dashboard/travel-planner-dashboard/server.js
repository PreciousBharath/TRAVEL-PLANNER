import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://pantech:mad420%23%40@travel.6ftn710.mongodb.net/travelPlanner';

app.use(express.json());

const seedTrips = [
  {
    city: 'Barcelona',
    country: 'Spain',
    status: 'Booked',
    budget: '₹185000',
    departureCity: 'London',
    tripType: 'Leisure',
    transport: 'Economy',
    meals: 'Breakfast Included',
    stayType: 'Hotel',
    experience: 'Cultural Tour',
    travelStyle: 'Relaxed',
    companions: 'Couple',
    visa: 'Not Required',
    roomType: 'Standard'
  },
  {
    city: 'Kyoto',
    country: 'Japan',
    status: 'Planning',
    budget: '₹220000',
    departureCity: 'Singapore',
    tripType: 'Adventure',
    transport: 'Premium Economy',
    meals: 'Half Board',
    stayType: 'Resort',
    experience: 'Adventure Pack',
    travelStyle: 'Fast-paced',
    companions: 'Friends',
    visa: 'ETA',
    roomType: 'Deluxe'
  }
];

const seedUsers = [
  {
    name: 'Ava Patel',
    email: 'traveler@example.com',
    password: 'travelx123',
    role: 'traveler'
  }
];

async function seedCollections() {
  const db = mongoose.connection.db;

  const collections = ['trips', 'users', 'destinations'];
  for (const name of collections) {
    const exists = await db.listCollections({ name }).next();
    if (!exists) {
      await db.createCollection(name);
    }
  }

  const tripCount = await db.collection('trips').countDocuments();
  if (tripCount === 0) {
    await db.collection('trips').insertMany(seedTrips);
  }

  const userCount = await db.collection('users').countDocuments();
  if (userCount === 0) {
    await db.collection('users').insertMany(seedUsers);
  } else {
    await db.collection('users').updateMany(
      { password: { $exists: false } },
      { $set: { password: 'travelx123' } }
    );
  }

  const destinationCount = await db.collection('destinations').countDocuments();
  if (destinationCount === 0) {
    await db.collection('destinations').insertMany([
      { name: 'Santorini', country: 'Greece', highlights: ['Sunset views', 'Blue domes'] },
      { name: 'Marrakech', country: 'Morocco', highlights: ['Markets', 'Rooftop dining'] }
    ]);
  }
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', database: 'travelPlanner', mongoUri: mongoUri.replace(/:[^:@]+@/, ':***@') });
});

app.get('/api/trips', async (_req, res) => {
  try {
    const db = mongoose.connection.db;
    const trips = await db.collection('trips').find({}).toArray();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch trips', details: error.message });
  }
});

app.put('/api/trips', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const trips = Array.isArray(req.body) ? req.body : [];
    await db.collection('trips').deleteMany({});
    if (trips.length > 0) {
      await db.collection('trips').insertMany(trips);
    }
    res.json({ success: true, count: trips.length });
  } catch (error) {
    res.status(500).json({ error: 'Unable to save trips', details: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const db = mongoose.connection.db;
    const user = await db.collection('users').findOne({ email: String(email).trim().toLowerCase() });

    if (!user || user.password !== String(password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ error: 'Unable to authenticate user', details: error.message });
  }
});

app.get('/api/collections', async (_req, res) => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    res.json(collections.map((collection) => collection.name));
  } catch (error) {
    res.status(500).json({ error: 'Unable to list collections', details: error.message });
  }
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    await seedCollections();

    console.log('MongoDB connected successfully');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port} without database connection`);
    });
  }
}

startServer();
