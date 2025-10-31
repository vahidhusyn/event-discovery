import { useEffect, useState } from "react";

export default function EventList() {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");

  // Fetch all events (initially + refresh)
  const fetchAllEvents = async () => {
    const res = await fetch("http://localhost:5000/api/events");
    const data = await res.json();
    setAllEvents(data);
    setFilteredEvents(data);
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  // Instant search with debounce
  useEffect(() => {
    const delay = setTimeout(async () => {
      const query = locationFilter.trim();
      if (query === "") {
        setFilteredEvents(allEvents);
        return;
      }

      const res = await fetch(
        `http://localhost:5000/api/events?location=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setFilteredEvents(data);
    }, 300);

    return () => clearTimeout(delay);
  }, [locationFilter, allEvents]);

  // Generate dummy events via backend
  const handleGenerateDummy = async () => {
    await fetch("http://localhost:5000/api/events/dummy", { method: "POST" });
    fetchAllEvents();
  };

  const isBackendEmpty = allEvents.length === 0;

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">
      {/* Search bar */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {/* Dummy button (only if backend truly empty) */}
      {isBackendEmpty && (
        <div className="text-center mt-10">
          <button
            onClick={handleGenerateDummy}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            Generate Dummy Events
          </button>
        </div>
      )}

      {/* Event list */}
      {!isBackendEmpty && (
        <>
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 border rounded-xl dark:border-gray-700 bg-white dark:bg-gray-900 shadow"
                >
                  <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    📍 {event.location}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
              No events found for this location.
            </p>
          )}
        </>
      )}
    </div>
  );
}
