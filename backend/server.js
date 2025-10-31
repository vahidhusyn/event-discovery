const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let events = [];

// Create event
app.post("/api/events", (req, res) => {
  const newEvent = {
    id: events.length + 1,
    ...req.body,
    currentParticipants: req.body.currentParticipants || 0,
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// Generate dummy data
app.post("/api/events/seed", (req, res) => {
  const sampleTitles = [
    "Tech Conference",
    "Startup Meetup",
    "Music Festival",
    "Art Exhibition",
    "Food Carnival",
    "Coding Bootcamp",
    "Science Fair",
    "Book Launch",
    "Design Workshop",
    "Gaming Expo",
  ];

  const sampleLocations = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Jaipur",
    "Chennai",
    "Pune",
    "Kolkata",
    "Hyderabad",
  ];

  const dummyEvents = Array.from({ length: 5 }, (_, i) => {
    const title =
      sampleTitles[Math.floor(Math.random() * sampleTitles.length)] +
      " " +
      (Math.floor(Math.random() * 90) + 10); // adds random suffix for uniqueness
    const location =
      sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
    const maxParticipants = Math.floor(Math.random() * 400) + 50;
    const currentParticipants = Math.floor(Math.random() * maxParticipants * 0.8);

    return {
      id: Date.now() + i,
      title,
      description: `Join us for the amazing ${title} happening in ${location}.`,
      location,
      date: new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      ).toISOString(),
      maxParticipants,
      currentParticipants,
    };
  });

  events.push(...dummyEvents);
  res.json({ success: true, added: dummyEvents.length, events });
});



// Get all events (with optional ?location= filter)
app.get("/api/events", (req, res) => {
  const { location } = req.query;
  console.log("🔍 Received location:", location); // <— Add this
  if (location && location.trim() !== "") {
    const filtered = events.filter(e =>
      e.location.toLowerCase().includes(location.toLowerCase())
    );
    console.log("Matched events:", filtered.length);
    return res.json(filtered);
  }
  res.json(events);
  
});

// Get single event
app.get("/api/events/:id", (req, res) => {
  const event = events.find(e => e.id == req.params.id);
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json(event);
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
