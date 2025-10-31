import { useEffect, useState } from "react";
import EventList from "../components/EventList";
import CreateEventForm from "../components/CreateEventForm";

export default function App() {
  const [events, setEvents] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark");

  const fetchEvents = async (location = "") => {
    const url = location
      ? `http://localhost:5000/api/events?location=${encodeURIComponent(location)}`
      : "http://localhost:5000/api/events";

    const res = await fetch(url);
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Theme effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    
    
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-6">
      
        <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold dark:text-white">🎉 Event Discovery App</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 px-4 py-2 rounded-lg transition hover:cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-600"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

        <h1 className="text-3xl font-bold m-10 text-center">Create events and watch them below!</h1>

        <CreateEventForm onEventCreated={() => fetchEvents()} />

        {/* Pass both events and fetch function to EventList */}
        <EventList events={events} fetchEvents={fetchEvents} />
      </div>
    </div>
  );
}
