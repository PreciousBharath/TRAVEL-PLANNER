
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaBell, FaRocket, FaCalendarAlt, FaHotel, FaDownload } from 'react-icons/fa'
import Sidebar from './components/Sidebar'
import Cards from './components/Cards'
import ExpenseChart from './components/ExpenseChart'
import LoginPage from './pages/LoginPage'

const menuItems = ['Dashboard', 'Trips', 'Analytics', 'Budget', 'Settings']

const initialTrips = [
  { id: 1, city: 'Barcelona', date: 'Jun 12 - Jun 19', status: 'Booked', country: 'Spain', budget: '₹185000', departureCity: 'London', tripType: 'Leisure', transport: 'Economy', meals: 'Breakfast Included', stayType: 'Hotel', experience: 'Cultural Tour', travelStyle: 'Relaxed', companions: 'Couple', visa: 'Not Required', roomType: 'Standard' },
  { id: 2, city: 'Kyoto', date: 'Jul 02 - Jul 10', status: 'Planning', country: 'Japan', budget: '₹220000', departureCity: 'Singapore', tripType: 'Adventure', transport: 'Premium Economy', meals: 'Half Board', stayType: 'Resort', experience: 'Adventure Pack', travelStyle: 'Fast-paced', companions: 'Friends', visa: 'ETA', roomType: 'Deluxe' },
  { id: 3, city: 'Reykjavik', date: 'Sep 05 - Sep 12', status: 'Confirmed', country: 'Iceland', budget: '₹310000', departureCity: 'Oslo', tripType: 'Luxury', transport: 'Business Flight', meals: 'All Inclusive', stayType: 'Villa', experience: 'Luxury Escape', travelStyle: 'Luxury', companions: 'Couple', visa: 'Not Required', roomType: 'Suite' }
]

const initialRecommendations = [
  { destination: 'Maldives', note: 'Beach escape with premium resorts' },
  { destination: 'Lisbon', note: 'City culture and sunrise cafes' },
  { destination: 'Santorini', note: 'Romantic sunset views' }
]

const quickActions = [
  { label: 'Create Trip', icon: <FaRocket /> },
  { label: 'Search Flight', icon: <FaSearch /> },
  { label: 'Book Stay', icon: <FaHotel /> },
  { label: 'Schedule', icon: <FaCalendarAlt /> }
]

const travelToolkit = [
  { title: 'Itinerary planner', detail: 'Create day-by-day schedules with live updates' },
  { title: 'Visa & docs', detail: 'Store passport, visa, and insurance essentials' },
  { title: 'Payments in INR', detail: 'Track deposits, balances, and refunds easily' },
  { title: '24/7 concierge', detail: 'Get support for changes, upgrades, and delays' }
]

const budgetBreakdown = [
  { label: 'Flights', amount: '₹5,200', percent: 78 },
  { label: 'Stay', amount: '₹3,100', percent: 64 },
  { label: 'Food & local', amount: '₹1,860', percent: 46 }
]

const settingOptions = [
  { key: 'alerts', label: 'Trip alerts', description: 'Receive location, flight, and hotel reminders' },
  { key: 'darkMode', label: 'Dark mode', description: 'Use the premium low-light dashboard experience' },
  { key: 'emailSummary', label: 'Email summary', description: 'Get a compact weekly travel recap' },
  { key: 'autoSync', label: 'Auto sync', description: 'Sync plans across devices automatically' },
  { key: 'travelAssistant', label: 'Travel assistant', description: 'Get smart suggestions before every trip' },
  { key: 'multiCurrency', label: 'Multi-currency', description: 'Display spending in local and INR values' }
]

const photoPool = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1499856871958-5b6d0f0c5c4d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1527631746610-bca00a040d0b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1509921381810-c51ffc8d885a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1578305034054-6372f4caa6bb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522383150241-6974f11f6433?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1472531641664-5b4ce4f3ad0f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80'
]

const featuredDestination = {
  title: 'Swiss Alpine Escape',
  description: 'A 6-day retreat with train routes, mountain views, and cozy chalets.',
  badge: 'Most booked this week',
  image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80'
}

const destinationShowcase = [
  {
    name: 'Taj Mahal',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80',
    description: 'A timeless marble monument framed by Mughal gardens and sunrise light.',
    highlights: ['Sunrise visit', 'Garden walk', 'Cultural heritage']
  },
  {
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80',
    description: 'Cliffside villages, blue domes, and sea-view terraces for a romantic escape.',
    highlights: ['Caldera views', 'Sunset dinner', 'Private villas']
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
    description: 'Temple gardens, lantern streets, and quiet tea houses in a serene city.',
    highlights: ['Temple tours', 'Tea ceremony', 'Bamboo groves']
  },
  {
    name: 'Marrakech',
    country: 'Morocco',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80',
    description: 'Vibrant souks, rooftop dining, and desert evenings under a star-filled sky.',
    highlights: ['Riad stay', 'Market exploration', 'Desert dinner']
  },
  {
    name: 'Queenstown',
    country: 'New Zealand',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
    description: 'Lake views, alpine trails, and adventure-filled days in the Southern Alps.',
    highlights: ['Adventure sports', 'Lakeside cabins', 'Scenic cruises']
  },
  {
    name: 'Reykjavik',
    country: 'Iceland',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
    description: 'Northern lights, geothermal lagoons, and dramatic coastlines in a cinematic setting.',
    highlights: ['Aurora hunt', 'Blue lagoon', 'Glacier tours']
  }
]

const itinerarySteps = [
  { time: '09:30', title: 'Check-in at glacier lodge' },
  { time: '13:00', title: 'Scenic train ride to Interlaken' },
  { time: '18:30', title: 'Sunset dinner reservation' }
]

const statusOptions = ['Booked', 'Planning', 'Confirmed']

const countryPlaces = {
  India: [
    {
      name: 'Taj Mahal',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80',
      description: 'Iconic white marble monument in Agra with timeless Mughal architecture and gardens.'
    },
    {
      name: 'Charminar',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80',
      description: 'Historic Hyderabad landmark known for its grand arches, bazaars, and vibrant culture.'
    },
    {
      name: 'Goa Beaches',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80',
      description: 'Sun-drenched coastline with golden sands, water sports, beach clubs, and sunset views.'
    },
    {
      name: 'Kerala Backwaters',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
      description: 'Peaceful houseboat journeys through emerald canals, coconut groves, and lush villages.'
    },
    {
      name: 'Jaipur',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=80',
      description: 'The Pink City filled with stunning forts, palaces, markets, and rich Rajasthani heritage.'
    },
    {
      name: 'Varanasi',
      image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?auto=format&fit=crop&w=900&q=80',
      description: 'Sacred city on the Ganges with ancient temples, spiritual ghats, and rituals.'
    },
    {
      name: 'Rishikesh',
      image: 'https://images.unsplash.com/photo-1564310503-46ab007112c5?auto=format&fit=crop&w=900&q=80',
      description: 'Yoga capital nestled in Himalayan foothills with ashrams, meditation, and adventure.'
    },
    {
      name: 'Ladakh',
      image: 'https://images.unsplash.com/photo-1585409677528-13a56a55a222?auto=format&fit=crop&w=900&q=80',
      description: 'High-altitude desert landscape with monasteries, Leh palace, and stunning mountain passes.'
    }
  ],
  Turkey: [
    {
      name: 'Cappadocia',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80',
      description: 'Fairy chimneys, hot air balloons at sunrise, and ancient cave hotels.'
    },
    {
      name: 'Istanbul',
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=900&q=80',
      description: 'Romantic blend of history, bazaars, Bosphorus views, and Ottoman architecture.'
    },
    {
      name: 'Pamukkale',
      image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=80',
      description: 'White travertine terraces and thermal pools in stunning natural formations.'
    },
    {
      name: 'Ephesus',
      image: 'https://images.unsplash.com/photo-1570394699667-e6cf8c95a3f3?auto=format&fit=crop&w=900&q=80',
      description: 'Ancient Greek ruins including the library of Celsus and Temple of Artemis.'
    },
    {
      name: 'Troy',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=80',
      description: 'Legendary ancient city with UNESCO World Heritage archaeological sites.'
    }
  ],
  France: [
    {
      name: 'Paris',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80',
      description: 'Eiffel Tower, museums, Seine cruises, and iconic landmarks in the City of Light.'
    },
    {
      name: 'Nice',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      description: 'Mediterranean glamour with promenades, beaches, and Provençal charm.'
    },
    {
      name: 'Provence',
      image: 'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=900&q=80',
      description: 'Lavender fields, hilltop villages, and countryside escapes in natural beauty.'
    },
    {
      name: 'Versailles',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      description: 'Grand palace with ornate gardens, fountains, and royal grandeur.'
    },
    {
      name: 'Mont-Saint-Michel',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
      description: 'Iconic island abbey perched on a tidal island with medieval charm.'
    }
  ],
  Japan: [
    {
      name: 'Kyoto',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
      description: 'Temple gardens, lantern-lit streets, bamboo groves, and geisha districts.'
    },
    {
      name: 'Tokyo',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80',
      description: 'Neon cityscapes, sushi streets, Tokyo Tower, and futuristic architecture.'
    },
    {
      name: 'Hakone',
      image: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=900&q=80',
      description: 'Hot springs with views of Mount Fuji, volcanic peaks, and tranquil retreats.'
    },
    {
      name: 'Hiroshima',
      image: 'https://images.unsplash.com/photo-1522383150241-6974f11f6433?auto=format&fit=crop&w=900&q=80',
      description: 'Peace Memorial Park, historic sites, and beautiful riverside scenery.'
    },
    {
      name: 'Osaka',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80',
      description: 'Street food capital, historic Osaka Castle, and vibrant nightlife.'
    }
  ],
  Australia: [
    {
      name: 'Sydney Opera House',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=80',
      description: 'Iconic opera house, harbor views, and coastal city energy.'
    },
    {
      name: 'Great Barrier Reef',
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80',
      description: 'Crystal waters, reef adventures, snorkeling, and unforgettable marine life.'
    },
    {
      name: 'Melbourne',
      image: 'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=900&q=80',
      description: 'Coffee culture, artistic laneways, street art, and creative districts.'
    },
    {
      name: 'Uluru',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
      description: 'Sacred red rock formation in the Outback with stunning sunsets.'
    },
    {
      name: 'Tasmania',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      description: 'Pristine wilderness, Mount Wellington, and wild coastal landscapes.'
    }
  ],
  Morocco: [
    {
      name: 'Marrakech',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80',
      description: 'Vibrant souks, rooftop dining, riads, and Jemaa el-Fnaa square.'
    },
    {
      name: 'Chefchaouen',
      image: 'https://images.unsplash.com/photo-1578305034054-6372f4caa6bb?auto=format&fit=crop&w=900&q=80',
      description: 'Blue-washed mountain town known for calm streets and scenic hiking.'
    },
    {
      name: 'Sahara Desert',
      image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
      description: 'Golden dunes, camel treks, desert camps, and stargazing nights.'
    },
    {
      name: 'Fes',
      image: 'https://images.unsplash.com/photo-1570394699667-e6cf8c95a3f3?auto=format&fit=crop&w=900&q=80',
      description: 'Oldest medina in Morocco with leather tanneries and ancient architecture.'
    },
    {
      name: 'Essaouira',
      image: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?auto=format&fit=crop&w=900&q=80',
      description: 'Coastal beach town with fresh seafood, windsurfing, and Atlantic breeze.'
    }
  ],
  Italy: [
    {
      name: 'Venice',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80',
      description: 'Canals, gondolas, St. Mark\'s Basilica, and romantic piazzas.'
    },
    {
      name: 'Florence',
      image: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=900&q=80',
      description: 'Art galleries, Renaissance masterpieces, Duomo, and charming courtyards.'
    },
    {
      name: 'Amalfi Coast',
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
      description: 'Cliffside villages, azure Mediterranean waters, and luxurious seaside views.'
    },
    {
      name: 'Rome',
      image: 'https://images.unsplash.com/photo-1552832860-cfde51a6baaf?auto=format&fit=crop&w=900&q=80',
      description: 'Colosseum, Vatican, Trevi Fountain, and ancient history everywhere.'
    },
    {
      name: 'Milan',
      image: 'https://images.unsplash.com/photo-1509330449866-8c0b1c94b51d?auto=format&fit=crop&w=900&q=80',
      description: 'Fashion capital with Duomo cathedral, galleries, and world-class dining.'
    }
  ],
  Thailand: [
    {
      name: 'Bangkok',
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80',
      description: 'Street food, ornate temples, floating markets, and vibrant nightlife.'
    },
    {
      name: 'Phuket',
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80',
      description: 'Island beaches, snorkeling, island hopping, and tropical nightlife.'
    },
    {
      name: 'Chiang Mai',
      image: 'https://images.unsplash.com/photo-1537919044978-84a9e180d869?auto=format&fit=crop&w=900&q=80',
      description: 'Mountain temples, elephant sanctuaries, trekking, and lush scenery.'
    },
    {
      name: 'Krabi',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
      description: 'Limestone cliffs, pristine beaches, rock climbing, and island adventures.'
    },
    {
      name: 'Ayutthaya',
      image: 'https://images.unsplash.com/photo-1570394699667-e6cf8c95a3f3?auto=format&fit=crop&w=900&q=80',
      description: 'Ancient capital with temples, ruins, and historical palaces.'
    }
  ],
  'United Arab Emirates': [
    {
      name: 'Dubai',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
      description: 'Burj Khalifa, desert safaris, luxury shopping, and ultramodern architecture.'
    },
    {
      name: 'Abu Dhabi',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80',
      description: 'Grand mosque, cultural museums, waterfront leisure, and oil heritage.'
    },
    {
      name: 'Ras Al Khaimah',
      image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d0b?auto=format&fit=crop&w=900&q=80',
      description: 'Desert dunes, mountain adventures, serene beaches, and water sports.'
    },
    {
      name: 'Sharjah',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
      description: 'Art museums, traditional souks, cultural heritage, and beach resorts.'
    },
    {
      name: 'Ajman',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
      description: 'Pristine beaches, water sports, and relaxed coastal atmosphere.'
    }
  ],
  'United States': [
    {
      name: 'New York',
      image: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=900&q=80',
      description: 'Times Square, Empire State Building, Broadway, and endless city energy.'
    },
    {
      name: 'Grand Canyon',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      description: 'Epic canyon views, hiking trails, river rafting, and sunrise vistas.'
    },
    {
      name: 'California Coast',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      description: 'Big Sur cliffs, San Francisco, Los Angeles, and scenic coastal drives.'
    },
    {
      name: 'Las Vegas',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=80',
      description: 'Entertainment capital with casinos, shows, nightlife, and desert scenery.'
    },
    {
      name: 'Miami',
      image: 'https://images.unsplash.com/photo-1509921381810-c51ffc8d885a?auto=format&fit=crop&w=900&q=80',
      description: 'Art Deco architecture, South Beach, Cuban culture, and tropical vibes.'
    }
  ]
}

const expandedCountryPlaces = {
  ...countryPlaces,
  India: [
    ...countryPlaces.India,
    {
      name: 'Udaipur',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
      description: 'City of lakes with regal palaces, sunset viewpoints, and romantic boat rides.'
    },
    {
      name: 'Munnar',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
      description: 'Rolling tea hills, cool weather, and grand viewpoints in Kerala highlands.'
    }
  ],
  Turkey: [
    ...countryPlaces.Turkey,
    {
      name: 'Antalya',
      image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d0b?auto=format&fit=crop&w=900&q=80',
      description: 'Turquoise coastline, old town charm, and luxury resorts along the Mediterranean.'
    },
    {
      name: 'Bodrum',
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
      description: 'Aegean nightlife, marina views, and sea breeze escapes with boutique stays.'
    }
  ],
  France: [
    ...countryPlaces.France,
    {
      name: 'Lyon',
      image: 'https://images.unsplash.com/photo-1472531641664-5b4ce4f3ad0f?auto=format&fit=crop&w=900&q=80',
      description: 'Gourmet streets, riverside cafes, and elegant old-world architecture.'
    },
    {
      name: 'Corsica',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80',
      description: 'Crystal coves, dramatic coasts, and mountain villages with a rugged feel.'
    }
  ],
  Japan: [
    ...countryPlaces.Japan,
    {
      name: 'Nara',
      image: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=900&q=80',
      description: 'Ancient temples, free-roaming deer, and calm garden paths.'
    },
    {
      name: 'Miyajima',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=900&q=80',
      description: 'Island shrine views, forest trails, and a peaceful coastal atmosphere.'
    }
  ],
  Australia: [
    ...countryPlaces.Australia,
    {
      name: 'Perth',
      image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
      description: 'Sunlit beaches, modern skyline, and easy access to the Indian Ocean.'
    },
    {
      name: 'Byron Bay',
      image: 'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=900&q=80',
      description: 'Surf culture, cliff views, and vibrant cafés on the East Coast.'
    }
  ],
  Morocco: [
    ...countryPlaces.Morocco,
    {
      name: 'Tangier',
      image: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?auto=format&fit=crop&w=900&q=80',
      description: 'A blend of Atlantic and Mediterranean energy with old medina flair.'
    },
    {
      name: 'Ouzoud Falls',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      description: 'Waterfalls surrounded by lush greenery and scenic hiking paths.'
    }
  ],
  Italy: [
    ...countryPlaces.Italy,
    {
      name: 'Cinque Terre',
      image: 'https://images.unsplash.com/photo-1499856871958-5b6d0f0c5c4d?auto=format&fit=crop&w=900&q=80',
      description: 'Colourful cliffside villages connected by coastal walking trails.'
    },
    {
      name: 'Sicily',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80',
      description: 'Ancient ruins, volcano views, beaches, and a rich culinary scene.'
    }
  ],
  Thailand: [
    ...countryPlaces.Thailand,
    {
      name: 'Pattaya',
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80',
      description: 'Beachfront resorts, nightlife, and island day trips near Bangkok.'
    },
    {
      name: 'Chiang Rai',
      image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d0b?auto=format&fit=crop&w=900&q=80',
      description: 'Temple art, mountain roads, and village culture in northern Thailand.'
    }
  ],
  'United Arab Emirates': [
    ...countryPlaces['United Arab Emirates'],
    {
      name: 'Fujairah',
      image: 'https://images.unsplash.com/photo-1499856871958-5b6d0f0c5c4d?auto=format&fit=crop&w=900&q=80',
      description: 'Mountain-backed coastline with freshwater springs and relaxed resorts.'
    },
    {
      name: 'Liwa Oasis',
      image: 'https://images.unsplash.com/photo-1472531641664-5b4ce4f3ad0f?auto=format&fit=crop&w=900&q=80',
      description: 'Golden desert dunes, camp experiences, and stargazing under wide skies.'
    }
  ],
  'United States': [
    ...countryPlaces['United States'],
    {
      name: 'Sedona',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
      description: 'Red rock landscapes, hiking, and spa retreats in Arizona.'
    },
    {
      name: 'Hawaii',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      description: 'Volcano views, reef escapes, and island adventures in the Pacific.'
    }
  ]
}

const countryOptions = Object.keys(expandedCountryPlaces)

const placeImageCatalog = {
  'Taj Mahal': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
  'Charminar': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
  'Goa Beaches': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
  'Kerala Backwaters': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
  Jaipur: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=80',
  Varanasi: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=1200&q=80',
  Rishikesh: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
  Ladakh: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  Udaipur: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  Munnar: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
  Santorini: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
  Kyoto: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
  Marrakech: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
  Queenstown: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
  Paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  Nice: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  Provence: 'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1200&q=80',
  Versailles: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  'Mont-Saint-Michel': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
  Tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
  Hakone: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=1200&q=80',
  Hiroshima: 'https://images.unsplash.com/photo-1522383150241-6974f11f6433?auto=format&fit=crop&w=1200&q=80',
  Osaka: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
  'Sydney Opera House': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
  'Great Barrier Reef': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
  Melbourne: 'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=1200&q=80',
  Uluru: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
  Tasmania: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  Chefchaouen: 'https://images.unsplash.com/photo-1578305034054-6372f4caa6bb?auto=format&fit=crop&w=1200&q=80',
  'Ouzoud Falls': 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?auto=format&fit=crop&w=1200&q=80',
  Tangier: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
  'Cinque Terre': 'https://images.unsplash.com/photo-1499856871958-5b6d0f0c5c4d?auto=format&fit=crop&w=1200&q=80',
  Sicily: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
  Pattaya: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
  'Chiang Rai': 'https://images.unsplash.com/photo-1527631746610-bca00a040d0b?auto=format&fit=crop&w=1200&q=80',
  Fujairah: 'https://images.unsplash.com/photo-1499856871958-5b6d0f0c5c4d?auto=format&fit=crop&w=1200&q=80',
  'Liwa Oasis': 'https://images.unsplash.com/photo-1472531641664-5b4ce4f3ad0f?auto=format&fit=crop&w=1200&q=80',
  Sedona: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
  Hawaii: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'Grand Canyon': 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  'California Coast': 'https://images.unsplash.com/photo-1499856871958-5b6d0f0c5c4d?auto=format&fit=crop&w=1200&q=80',
  'Las Vegas': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
  Miami: 'https://images.unsplash.com/photo-1509921381810-c51ffc8d885a?auto=format&fit=crop&w=1200&q=80',
  'New York': 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=1200&q=80',
  Antalya: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
  Bodrum: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
  Lyon: 'https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1200&q=80',
  Corsica: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
  Nara: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=1200&q=80',
  Miyajima: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
  Perth: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
  'Byron Bay': 'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=1200&q=80',
  'Swiss Alpine Escape': 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
  'Bali': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
  'Bali Beach': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
  'Dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  'Maldives': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'Lisbon': 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80',
  'Barcelona': 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=1200&q=80',
  'Reykjavik': 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
  'Istanbul': 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80',
  'Cappadocia': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
  'Pamukkale': 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=80',
  'Ephesus': 'https://images.unsplash.com/photo-1570394699667-e6cf8c95a3f3?auto=format&fit=crop&w=1200&q=80',
  'Troy': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80',
  'Singapore': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
  'Cape Town': 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80',
  'Auckland': 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80'
}

const getPlaceImage = (placeName, fallbackImage = '') => placeImageCatalog[placeName] || fallbackImage || photoPool[0]

const App = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [upcomingTrips, setUpcomingTrips] = useState(initialTrips)
  const [recommendations, setRecommendations] = useState(initialRecommendations)
  const [showTripForm, setShowTripForm] = useState(false)
  const [newTrip, setNewTrip] = useState({
    city: '',
    date: '',
    status: 'Booked',
    country: '',
    departureCity: '',
    tripType: 'Leisure',
    transport: 'Flight',
    meals: 'Breakfast Included',
    stayType: 'Hotel',
    experience: 'Cultural Tour',
    budget: '',
    travelStyle: 'Relaxed',
    companions: 'Solo',
    visa: 'Not Required',
    roomType: 'Standard'
  })
  const [tripSearch, setTripSearch] = useState('')
  const [reviewTrip, setReviewTrip] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [settings, setSettings] = useState({ alerts: true, darkMode: true, emailSummary: false, autoSync: true, travelAssistant: true, multiCurrency: false })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [editingTripId, setEditingTripId] = useState(null)
  const searchInputRef = useRef(null)
  const toastTimer = useRef(null)

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const response = await fetch('/api/trips')
        if (!response.ok) {
          throw new Error('Unable to load trips')
        }

        const trips = await response.json()
        if (Array.isArray(trips) && trips.length > 0) {
          setUpcomingTrips(trips)
        }
      } catch (error) {
        console.error('Failed to load trips from MongoDB', error)
      }
    }

    loadTrips()
  }, [])

  const syncTripsToServer = async (trips) => {
    try {
      const response = await fetch('/api/trips', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trips)
      })

      if (!response.ok) {
        throw new Error('Unable to save trips')
      }
    } catch (error) {
      console.error('Failed to sync trips to MongoDB', error)
    }
  }

  const filteredTrips = useMemo(
    () =>
      upcomingTrips.filter((trip) =>
        [trip.city, trip.date, trip.status]
          .join(' ')
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [upcomingTrips, searchQuery]
  )

  const filteredRecommendations = useMemo(
    () =>
      recommendations.filter((item) =>
        [item.destination, item.note].join(' ').toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [recommendations, searchQuery]
  )

  const createEmptyTrip = () => ({
    city: '',
    date: '',
    status: 'Booked',
    country: '',
    departureCity: '',
    tripType: 'Leisure',
    transport: 'Flight',
    meals: 'Breakfast Included',
    stayType: 'Hotel',
    experience: 'Cultural Tour',
    budget: '',
    travelStyle: 'Relaxed',
    companions: 'Solo',
    visa: 'Not Required',
    roomType: 'Standard'
  })

  const formatBudget = (value) => {
    if (!value) return '₹0'
    const text = String(value).trim()
    if (text.startsWith('₹')) return text
    if (/^\d+(\.\d+)?$/.test(text)) return `₹${Number(text).toLocaleString('en-IN')}`
    return `₹${text}`
  }

  const resetTripForm = () => {
    setNewTrip(createEmptyTrip())
    setEditingTripId(null)
    setReviewTrip(null)
    setShowConfirmation(false)
    setTripSearch('')
  }

  const showToast = (message) => {
    setToastMessage(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToastMessage(''), 2800)
  }

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination)
    setActiveMenu('Dashboard')
    showToast(`Exploring ${destination.name}`)
  }

  const handleBookSelectedDestination = () => {
    if (!selectedDestination) return

    const bookingPreview = {
      city: selectedDestination.name,
      country: selectedDestination.country,
      date: 'Flexible dates',
      budget: '₹25000',
      departureCity: 'Your city',
      tripType: 'Leisure',
      transport: 'Economy',
      meals: 'Breakfast Included',
      stayType: 'Hotel',
      experience: 'Cultural Tour',
      travelStyle: 'Relaxed',
      companions: 'Solo',
      visa: 'Not Required',
      roomType: 'Standard',
      status: 'Booked'
    }

    setReviewTrip(bookingPreview)
    setShowTripForm(false)
    setShowConfirmation(true)
    setActiveMenu('Trips')
    showToast(`My Trip Booking ready for ${selectedDestination.name}`)
  }

  const handleActionClick = (label) => {
    if (label === 'Create Trip') {
      resetTripForm()
      setShowTripForm(true)
      setActiveMenu('Trips')
      return
    }

    if (label === 'Search Flight') {
      setActiveMenu('Trips')
      setTimeout(() => searchInputRef.current?.focus(), 100)
      showToast('Ready to search flights')
      return
    }

    if (label === 'Book Stay') {
      setActiveMenu('Trips')
      setSearchQuery('Maldives')
      showToast('Booking your Maldives stay...')
      window.setTimeout(() => showToast('Stay booked successfully!'), 1400)
      return
    }

    if (label === 'Schedule') {
      setActiveMenu('Trips')
      setShowTripForm(true)
      showToast('Ready to schedule a new trip')
      return
    }
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    if (searchInputRef.current) {
      searchInputRef.current.blur()
    }
    showToast('Search results updated')
  }

  const handleNewTripChange = (event) => {
    const { name, value } = event.target
    setNewTrip((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectPlace = (placeName) => {
    setNewTrip((prev) => ({ ...prev, city: placeName }))
    setTripSearch('')
    showToast(`${placeName} selected as your destination`)
  }

  const handleEditTrip = (trip) => {
    setEditingTripId(trip.id)
    setNewTrip({ ...createEmptyTrip(), ...trip, budget: trip.budget || '' })
    setShowTripForm(true)
    setActiveMenu('Trips')
    setTripSearch('')
    setShowConfirmation(false)
    setReviewTrip(null)
    showToast(`Updating ${trip.city} itinerary`)
  }

  const handleCancelTrip = (tripId) => {
    setUpcomingTrips((prev) => {
      const nextTrips = prev.filter((trip) => trip.id !== tripId)
      syncTripsToServer(nextTrips)
      return nextTrips
    })
    showToast('Trip cancelled successfully')
  }

  const handleReviewTrip = (event) => {
    event.preventDefault()
    if (!newTrip.city.trim() || !newTrip.date.trim() || !newTrip.country || !newTrip.departureCity || !newTrip.budget) {
      showToast('Please complete all trip details before reviewing')
      return
    }

    setReviewTrip({ ...newTrip, id: editingTripId || Date.now() })
    setShowConfirmation(true)
  }

  const handleConfirmBooking = () => {
    if (editingTripId) {
      setUpcomingTrips((prev) => {
        const nextTrips = prev.map((trip) => trip.id === editingTripId ? { ...trip, ...reviewTrip, status: reviewTrip?.status || 'Booked' } : trip)
        syncTripsToServer(nextTrips)
        return nextTrips
      })
      showToast('Trip updated successfully!')
    } else {
      setUpcomingTrips((prev) => {
        const nextTrips = [{ ...reviewTrip, id: Date.now(), status: 'Booked' }, ...prev]
        syncTripsToServer(nextTrips)
        return nextTrips
      })
      showToast('Trip booked successfully!')
    }

    setShowTripForm(false)
    setShowConfirmation(false)
    setReviewTrip(null)
    setSearchQuery('')
    resetTripForm()
  }

  const createSimplePdf = (lines) => {
    const escapePdfText = (value) => value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
    const content = lines.map((line, index) => `BT /F1 12 Tf 50 ${760 - index * 14} Td (${escapePdfText(line)}) Tj ET`).join('\n')
    const stream = `${content}\n`

    const objects = [
      '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
      '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
      '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n',
      `4 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}endstream\nendobj\n`,
      '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n'
    ]

    let pdf = '%PDF-1.4\n'
    const offsets = [0]
    objects.forEach((object) => {
      offsets.push(pdf.length)
      pdf += object
    })

    const xrefOffset = pdf.length
    const xref = ['xref', '0 6', '0000000000 65535 f ', ...offsets.slice(1).map((offset) => `${String(offset).padStart(10, '0')} 00000 n `)].join('\n')
    pdf += `${xref}\ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`

    return new Blob([pdf], { type: 'application/pdf' })
  }

  const handleExportPdf = () => {
    const bookingSummary = reviewTrip || (selectedDestination ? {
      city: selectedDestination.name,
      country: selectedDestination.country,
      date: 'Flexible dates',
      budget: '₹25000',
      departureCity: 'Your city',
      transport: 'Economy',
      stayType: 'Hotel',
      experience: 'Cultural Tour',
      meals: 'Breakfast Included'
    } : null)

    const content = [
      'Praveen and Martin Travels Booking Confirmation',
      `Reference: TRX-${Math.floor(100000 + Math.random() * 900000)}`,
      `Traveller: Alex Morgan`,
      `Destination: ${bookingSummary?.city || 'N/A'}`,
      `Country: ${bookingSummary?.country || 'N/A'}`,
      `Dates: ${bookingSummary?.date || 'N/A'}`,
      `Budget: ${formatBudget(bookingSummary?.budget)}`,
      `Flight: ${bookingSummary?.transport || 'N/A'}`,
      `Stay: ${bookingSummary?.stayType || 'N/A'}`,
      `Experience: ${bookingSummary?.experience || 'N/A'}`,
      `Meals: ${bookingSummary?.meals || 'N/A'}`
    ]

    const blob = createSimplePdf(content)
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'travel-booking-confirmation.pdf'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const handleToggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
    const labelMap = {
      alerts: 'Alerts',
      darkMode: 'Dark mode',
      emailSummary: 'Email summary',
      autoSync: 'Auto sync',
      travelAssistant: 'Travel assistant',
      multiCurrency: 'Multi-currency'
    }
    showToast(`${labelMap[key] || 'Preference'} updated`)
  }

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const user = await response.json()
      setCurrentUser(user)
      setIsLoggedIn(true)
      showToast(`WELCOME ${user.name || user.email}`)
    } catch (error) {
      console.error('Login failed', error)
      showToast('Unable to sign in right now')
    }
  }

  const selectedTrips = searchQuery ? filteredTrips : upcomingTrips
  const selectedRecommendations = searchQuery ? filteredRecommendations : recommendations

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <Sidebar active={activeMenu} items={menuItems} onSelect={setActiveMenu} />

      <main className="main">
        <motion.div
          className="topbar"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="eyebrow">Welcome back, {currentUser?.name || currentUser?.email || 'traveller'}</p>
            <h2>{activeMenu === 'Dashboard' ? 'TravelX Planner' : activeMenu}</h2>
          </div>

          <div className="topbar-actions">
            <button className="icon-btn" type="button" onClick={() => setSearchQuery('')}>
              <FaSearch />
            </button>
            <button className="icon-btn" type="button">
              <FaBell />
            </button>
            <button className="secondary-btn small" type="button" onClick={() => setIsLoggedIn(false)}>
              Log out
            </button>
          </div>
        </motion.div>

        <motion.form
          className="search-box"
          onSubmit={handleSearchSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <FaSearch className="search-icon" />
          <input
            ref={searchInputRef}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="search-input"
            placeholder="Search destinations, trips, or booking status"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </motion.form>

        {toastMessage && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {toastMessage}
          </motion.div>
        )}

        {activeMenu === 'Dashboard' && (
          <>
            <motion.section
              className="hero"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="hero-copy">
                <p className="eyebrow">Smart planning</p>
                <h1>High-end travel dashboard for adventure seekers.</h1>
                <p className="hero-text">
                  Track trips, manage budgets, and discover top destinations with instant insights and smooth animations.
                </p>
                <div className="hero-actions">
                  <button className="primary-btn" type="button" onClick={() => handleActionClick('Create Trip')}>
                    Create new trip
                  </button>
                  <button className="secondary-btn" type="button" onClick={() => handleActionClick('Search Flight')}>
                    Search flight
                  </button>
                </div>
              </div>

              <div className="toolkit-grid">
                {travelToolkit.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="toolkit-card"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.08 + index * 0.06 }}
                  >
                    <h4>{item.title}</h4>
                    <p>{item.detail}</p>
                  </motion.div>
                ))}
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <span>10 Countries</span>
                  <strong>500+ experiences</strong>
                </div>
                <div className="hero-stat">
                  <span>24 flights</span>
                  <strong>3 upcoming trips</strong>
                </div>
                <div className="hero-stat">
                  <span>₹12L budget</span>
                  <strong>Optimized itinerary</strong>
                </div>
              </div>
            </motion.section>

            <section className="section highlight-section">
              <motion.div
                className="dashboard-card highlight-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="section-header">
                  <div>
                    <h3>Trip spotlight</h3>
                    <p>Everything you need for your next getaway in one place.</p>
                  </div>
                  <span className="highlight-badge">{featuredDestination.badge}</span>
                </div>
                <div className="highlight-grid">
                  <div className="highlight-panel">
                    <p className="eyebrow">Featured destination</p>
                    <h4>{featuredDestination.title}</h4>
                    <p>{featuredDestination.description}</p>
                    <img className="featured-image" src={featuredDestination.image} alt={featuredDestination.title} onError={(event) => {
                      event.currentTarget.src = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
                    }} />
                    <button className="primary-btn small" type="button" onClick={() => setActiveMenu('Trips')}>
                      View itinerary
                    </button>
                  </div>
                  <div className="highlight-panel">
                    <p className="eyebrow">Today’s plan</p>
                    <ul className="timeline-list">
                      {itinerarySteps.map((step) => (
                        <li key={step.time}>
                          <span>{step.time}</span>
                          <strong>{step.title}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </section>

            <section className="section card-grid-block">
              <Cards />

              <motion.section
                className="dashboard-card summary-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <div className="section-header">
                  <div>
                    <h3>Quick actions</h3>
                    <p>Speed up planning with smart workflow shortcuts.</p>
                  </div>
                </div>
                <div className="action-grid">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      className="action-pill"
                      type="button"
                      onClick={() => handleActionClick(action.label)}
                    >
                      <span className="pill-icon">{action.icon}</span>
                      {action.label}
                    </button>
                  ))}
                </div>
              </motion.section>
            </section>

            <section className="section destination-showcase-section">
              <div className="section-header">
                <div>
                  <h3>Tourist place gallery</h3>
                  <p>Tap a destination to see its story and book it instantly with a polished flow.</p>
                </div>
              </div>

              <div className="destination-showcase-grid">
                {destinationShowcase.map((place, index) => (
                  <motion.button
                    key={place.name}
                    type="button"
                    className="destination-showcase-card"
                    onClick={() => handleDestinationSelect(place)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    whileHover={{ y: -8, scale: 1.02, rotate: -0.5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="destination-showcase-image-wrap">
                      <img src={getPlaceImage(place.name, place.image)} alt={place.name} onError={(event) => {
                        event.currentTarget.src = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
                      }} />
                      <div className="destination-showcase-overlay">
                        <span>{place.country}</span>
                      </div>
                    </div>
                    <div className="destination-showcase-meta">
                      <div>
                        <h4>{place.name}</h4>
                        <p>Discover the vibe in a few clicks</p>
                      </div>
                      <span>View</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {selectedDestination && (
                <motion.div
                  className="destination-detail-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="destination-detail-media">
                    <img className="destination-detail-image" src={getPlaceImage(selectedDestination.name, selectedDestination.image)} alt={selectedDestination.name} onError={(event) => {
                      event.currentTarget.src = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
                    }} />
                  </div>
                  <div className="destination-detail-body">
                    <p className="eyebrow">Premium selection</p>
                    <h3>{selectedDestination.name}</h3>
                    <p>{selectedDestination.description}</p>
                    <div className="detail-highlights">
                      {selectedDestination.highlights.map((highlight) => (
                        <span key={highlight}>{highlight}</span>
                      ))}
                    </div>
                    <div className="detail-action-row">
                      <button className="primary-btn" type="button" onClick={handleBookSelectedDestination}>
                        My Trip Booking
                      </button>
                      <button className="secondary-btn" type="button" onClick={handleExportPdf}>
                        Export Booking PDF
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </section>

            <section className="section chart-section">
              <ExpenseChart />
            </section>
          </>
        )}

        {activeMenu === 'Trips' && (
          <>
            <section className="section grid-two">
              <motion.div
                className="dashboard-card trips-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="section-header">
                  <div>
                    <h3>Upcoming trips</h3>
                    <p>Keep track of your next travel plans.</p>
                  </div>
                  <button className="primary-btn small" type="button" onClick={() => setShowTripForm(true)}>
                    Add trip
                  </button>
                </div>
                <ul className="trip-list">
                  {selectedTrips.map((trip, index) => (
                    <motion.li
                      key={`${trip.city}-${index}`}
                      className="trip-item"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <div className="trip-info">
                        <h4>{trip.city}</h4>
                        <p>{trip.country || 'Curated getaway'}</p>
                        <p>{trip.date}</p>
                        <p className="trip-budget">{formatBudget(trip.budget)}</p>
                      </div>
                      <div className="trip-meta-actions">
                        <span className={`status ${trip.status.toLowerCase()}`}>{trip.status}</span>
                        <div className="trip-action-row">
                          <button className="trip-action-btn" type="button" onClick={() => showToast(`Managing ${trip.city} itinerary`)}>Manage trip</button>
                          <button className="trip-action-btn" type="button" onClick={() => handleEditTrip(trip)}>Update</button>
                          <button className="trip-action-btn" type="button" onClick={() => handleEditTrip(trip)}>Modify</button>
                          <button className="trip-action-btn danger" type="button" onClick={() => handleCancelTrip(trip.id)}>Cancel</button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                  {searchQuery && selectedTrips.length === 0 && (
                    <li className="trip-empty">No trips match that search.</li>
                  )}
                </ul>
              </motion.div>

              <motion.div
                className="dashboard-card destinations-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="section-header">
                  <div>
                    <h3>Top recommendations</h3>
                    <p>Suggested stays and experiences you can book now.</p>
                  </div>
                </div>
                <div className="destination-grid">
                  {selectedRecommendations.map((item) => (
                    <motion.button
                      key={item.destination}
                      type="button"
                      className="destination-card"
                      onClick={() => {
                        setSearchQuery(item.destination)
                        searchInputRef.current?.focus()
                        showToast(`Searching for ${item.destination}`)
                      }}
                      whileHover={{ y: -4 }}
                    >
                      <h4>{item.destination}</h4>
                      <p>{item.note}</p>
                    </motion.button>
                  ))}
                  {searchQuery && selectedRecommendations.length === 0 && (
                    <div className="destination-empty">No recommended destinations found.</div>
                  )}
                </div>
              </motion.div>
            </section>

            {showTripForm && (
              <motion.section
                className="section form-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="section-header">
                  <div>
                    <h3>{editingTripId ? 'Update your trip' : 'Add a trip'}</h3>
                    <p>Select your destination, preferences, and confirm the booking.</p>
                  </div>
                </div>
                <form className="trip-form" onSubmit={handleReviewTrip}>
                  <div className="form-row">
                    <label>
                      Country
                      <select name="country" value={newTrip.country} onChange={handleNewTripChange} className="styled-select">
                        <option value="">Choose a country</option>
                        {countryOptions.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Departure city
                      <input
                        name="departureCity"
                        value={newTrip.departureCity}
                        onChange={handleNewTripChange}
                        placeholder="e.g. London"
                      />
                    </label>
                    <label>
                      Trip type
                      <select name="tripType" value={newTrip.tripType} onChange={handleNewTripChange} className="styled-select">
                        <option value="Leisure">Leisure</option>
                        <option value="Business">Business</option>
                        <option value="Adventure">Adventure</option>
                      </select>
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Travel dates
                      <input
                        name="date"
                        value={newTrip.date}
                        onChange={handleNewTripChange}
                        placeholder="e.g. Oct 10 - Oct 18"
                      />
                    </label>
                    <label>
                      Budget
                      <input
                        name="budget"
                        value={newTrip.budget}
                        onChange={handleNewTripChange}
                        placeholder="e.g. ₹25000"
                      />
                    </label>
                    <label>
                      Status
                      <select name="status" value={newTrip.status} onChange={handleNewTripChange} className="styled-select">
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Flight class
                      <select name="transport" value={newTrip.transport} onChange={handleNewTripChange} className="styled-select">
                        <option value="Economy">Economy</option>
                        <option value="Business Flight">Business</option>
                        <option value="First Class">First Class</option>
                        <option value="Premium Economy">Premium Economy</option>
                      </select>
                    </label>
                    <label>
                      Stay type
                      <select name="stayType" value={newTrip.stayType} onChange={handleNewTripChange} className="styled-select">
                        <option value="Hotel">Hotel</option>
                        <option value="Resort">Resort</option>
                        <option value="Villa">Villa</option>
                        <option value="Boutique Stay">Boutique Stay</option>
                      </select>
                    </label>
                    <label>
                      Experience package
                      <select name="experience" value={newTrip.experience} onChange={handleNewTripChange} className="styled-select">
                        <option value="Cultural Tour">Cultural Tour</option>
                        <option value="Adventure Pack">Adventure Pack</option>
                        <option value="Luxury Escape">Luxury Escape</option>
                        <option value="Food & Wine">Food & Wine</option>
                      </select>
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Meal preference
                      <select name="meals" value={newTrip.meals} onChange={handleNewTripChange} className="styled-select">
                        <option value="Breakfast Included">Breakfast Included</option>
                        <option value="Half Board">Half Board</option>
                        <option value="Full Board">Full Board</option>
                        <option value="All Inclusive">All Inclusive</option>
                      </select>
                    </label>
                    <label>
                      Travel style
                      <select name="travelStyle" value={newTrip.travelStyle} onChange={handleNewTripChange} className="styled-select">
                        <option value="Relaxed">Relaxed</option>
                        <option value="Fast-paced">Fast-paced</option>
                        <option value="Luxury">Luxury</option>
                      </select>
                    </label>
                    <label>
                      Companions
                      <select name="companions" value={newTrip.companions} onChange={handleNewTripChange} className="styled-select">
                        <option value="Solo">Solo</option>
                        <option value="Couple">Couple</option>
                        <option value="Family">Family</option>
                        <option value="Friends">Friends</option>
                      </select>
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Visa needs
                      <select name="visa" value={newTrip.visa} onChange={handleNewTripChange} className="styled-select">
                        <option value="Not Required">Not Required</option>
                        <option value="ETA">ETA</option>
                        <option value="Visa">Visa</option>
                      </select>
                    </label>
                    <label>
                      Room type
                      <select name="roomType" value={newTrip.roomType} onChange={handleNewTripChange} className="styled-select">
                        <option value="Standard">Standard</option>
                        <option value="Deluxe">Deluxe</option>
                        <option value="Suite">Suite</option>
                      </select>
                    </label>
                    <label>
                      Destination
                      <input
                        name="city"
                        value={newTrip.city}
                        onChange={handleNewTripChange}
                        placeholder="Select a destination"
                      />
                    </label>
                  </div>

                  {newTrip.country && (
                    <div className="place-section">
                      <div className="section-header">
                        <div>
                          <h3>{newTrip.country} highlights</h3>
                          <p>Pick a traveller favourite and it will fill your destination.</p>
                        </div>
                      </div>
                      <div className="search-box small-search">
                        <FaSearch className="search-icon" />
                        <input
                          value={tripSearch}
                          onChange={(event) => setTripSearch(event.target.value)}
                          className="search-input"
                          placeholder={`Search ${newTrip.country} attractions`}
                        />
                      </div>
                      <div className="place-grid">
                        {expandedCountryPlaces[newTrip.country]
                          .filter((place) => place.name.toLowerCase().includes(tripSearch.toLowerCase()))
                          .map((place, index) => (
                            <motion.button
                              key={place.name}
                              type="button"
                              className="place-card"
                              onClick={() => handleSelectPlace(place.name)}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: index * 0.05 }}
                              whileHover={{ y: -4, scale: 1.01 }}
                            >
                              <img src={getPlaceImage(place.name, place.image)} alt={place.name} onError={(event) => {
                                event.currentTarget.src = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
                              }} />
                              <div>
                                <h4>{place.name}</h4>
                                <p>{place.description}</p>
                              </div>
                            </motion.button>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="form-actions">
                    <button className="primary-btn" type="submit">
                      {editingTripId ? 'Save changes' : 'Review trip'}
                    </button>
                    <button className="secondary-btn" type="button" onClick={() => setShowTripForm(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.section>
            )}

            {showConfirmation && reviewTrip && (
              <motion.section className="section form-card confirmation-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                <div className="section-header">
                  <div>
                    <h3>{editingTripId ? 'Update your booking' : 'Confirm your booking'}</h3>
                    <p>Review the details below and confirm or export your booking summary.</p>
                  </div>
                </div>
                <div className="confirmation-grid">
                  <div className="confirmation-box">
                    <h4>Trip overview</h4>
                    <p><strong>Destination:</strong> {reviewTrip.city}</p>
                    <p><strong>Country:</strong> {reviewTrip.country}</p>
                    <p><strong>Dates:</strong> {reviewTrip.date}</p>
                    <p><strong>Budget:</strong> {formatBudget(reviewTrip.budget)}</p>
                    <p><strong>Departure:</strong> {reviewTrip.departureCity}</p>
                  </div>
                  <div className="confirmation-box">
                    <h4>Selected preferences</h4>
                    <p><strong>Trip type:</strong> {reviewTrip.tripType}</p>
                    <p><strong>Flight:</strong> {reviewTrip.transport}</p>
                    <p><strong>Stay:</strong> {reviewTrip.stayType}</p>
                    <p><strong>Experience:</strong> {reviewTrip.experience}</p>
                    <p><strong>Meals:</strong> {reviewTrip.meals}</p>
                    <p><strong>Style:</strong> {reviewTrip.travelStyle}</p>
                    <p><strong>Companions:</strong> {reviewTrip.companions}</p>
                    <p><strong>Visa:</strong> {reviewTrip.visa}</p>
                    <p><strong>Room:</strong> {reviewTrip.roomType}</p>
                  </div>
                </div>
                <div className="form-actions">
                  <button className="primary-btn" type="button" onClick={handleConfirmBooking}>
                    {editingTripId ? 'Save changes' : 'Confirm & book trip'}
                  </button>
                  <button className="secondary-btn" type="button" onClick={handleExportPdf}>
                    <FaDownload /> Export confirmation PDF
                  </button>
                </div>
              </motion.section>
            )}
          </>
        )}

        {activeMenu === 'Analytics' && (
          <>
            <section className="section chart-grid">
              <Cards />
              <div className="dashboard-card chart-summary">
                <div className="section-header">
                  <div>
                    <h3>Monthly analytics</h3>
                    <p>Review spending, flight volume, and savings momentum across your trips.</p>
                  </div>
                </div>
                <div className="analytics-metrics">
                  <div className="mini-stat-card">
                    <span>Best value month</span>
                    <strong>April</strong>
                  </div>
                  <div className="mini-stat-card">
                    <span>Average savings</span>
                    <strong>₹4,820</strong>
                  </div>
                  <div className="mini-stat-card">
                    <span>Trip success rate</span>
                    <strong>94%</strong>
                  </div>
                </div>
                <p className="chart-summary-text">
                  Track cost trends, forecast budget impact, and optimize next bookings with actionable analytics and smart travel timing.
                </p>
              </div>
            </section>
            <section className="section chart-section analytics-panel">
              <ExpenseChart />
              <div className="dashboard-card analytics-side-card">
                <div className="section-header">
                  <div>
                    <h3>Smart insights</h3>
                    <p>Suggested actions to save more on your next journey.</p>
                  </div>
                </div>
                <ul className="insight-list">
                  <li>Book 3 weeks ahead for premium flights and save up to 18%.</li>
                  <li>Weekend stays in Goa and Kerala are trending lower this month.</li>
                  <li>Use the travel assistant to compare hotel bundles and meal plans.</li>
                </ul>
                <button className="primary-btn small" type="button">Export report</button>
              </div>
            </section>
          </>
        )}

        {activeMenu === 'Budget' && (
          <section className="section budget-page">
            <div className="dashboard-card budget-banner">
              <div>
                <p className="eyebrow">Budget overview</p>
                <h3>Track your travel spending with precision</h3>
              </div>
              <button className="primary-btn small" type="button">
                View report
              </button>
            </div>
            <div className="stats-grid">
              <div className="budget-card">
                <h4>Planned budget</h4>
                <p>₹18,400</p>
              </div>
              <div className="budget-card">
                <h4>Spent this month</h4>
                <p>₹7,160</p>
              </div>
              <div className="budget-card">
                <h4>Remaining</h4>
                <p>₹11,240</p>
              </div>
            </div>

            <div className="budget-detail-grid">
              <div className="dashboard-card budget-card-panel">
                <div className="section-header">
                  <div>
                    <h3>Category breakdown</h3>
                    <p>Compare the main cost buckets for your next trip.</p>
                  </div>
                </div>
                <div className="progress-stack">
                  {budgetBreakdown.map((item) => (
                    <div key={item.label} className="progress-item">
                      <div className="progress-row">
                        <span>{item.label}</span>
                        <strong>{item.amount}</strong>
                      </div>
                      <div className="progress-bar">
                        <span style={{ width: `${item.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dashboard-card budget-card-panel">
                <div className="section-header">
                  <div>
                    <h3>Budget tips</h3>
                    <p>Keep more money for experiences and less for surprises.</p>
                  </div>
                </div>
                <ul className="insight-list">
                  <li>Set a 15% buffer for exchange rates and local transport.</li>
                  <li>Split accommodation costs with a travel buddy for multi-city trips.</li>
                  <li>Use loyalty points for flights to protect your savings.</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {activeMenu === 'Settings' && (
          <section className="section settings-page">
            <div className="dashboard-card budget-banner">
              <div>
                <p className="eyebrow">Preferences</p>
                <h3>Personalize your travel management experience</h3>
              </div>
              <button className="primary-btn small" type="button">
                Save profile
              </button>
            </div>
            <div className="settings-grid">
              <div className="setting-card">
                <h4>Travel notifications</h4>
                {settingOptions.slice(0, 3).map((option) => (
                  <button key={option.key} className={`toggle-pill ${settings[option.key] ? 'active' : ''}`} type="button" onClick={() => handleToggleSetting(option.key)}>
                    <span>{option.label}</span>
                    <small>{option.description}</small>
                  </button>
                ))}
              </div>
              <div className="setting-card">
                <h4>Automation & smart tools</h4>
                {settingOptions.slice(3).map((option) => (
                  <button key={option.key} className={`toggle-pill ${settings[option.key] ? 'active' : ''}`} type="button" onClick={() => handleToggleSetting(option.key)}>
                    <span>{option.label}</span>
                    <small>{option.description}</small>
                  </button>
                ))}
              </div>
              <div className="setting-card">
                <h4>Account snapshot</h4>
                <ul className="insight-list">
                  <li>Membership: Gold traveller</li>
                  <li>Preferred currency: INR</li>
                  <li>Preferred travel style: Premium comfort</li>
                  <li>Next trip: Kyoto & Bali</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
