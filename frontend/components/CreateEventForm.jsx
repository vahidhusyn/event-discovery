import { useState } from "react";

export default function CreateEventForm({ onEventCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    maxParticipants: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, currentParticipants: 0 }),
      });

      if (!res.ok) throw new Error("Failed to create event");
      setFormData({
        title: "",
        description: "",
        location: "",
        date: "",
        maxParticipants: "",
      });
      onEventCreated(); // 🔁 refresh event list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6 max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Create New Event</h2>

      <div className="grid gap-4">
        <input
          name="title"
          type="text"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2 dark:bg-gray-900 dark:border-gray-700"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={2}
          className="border rounded-lg px-3 py-2 dark:bg-gray-900 dark:border-gray-700"
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2 dark:bg-gray-900 dark:border-gray-700"
        />
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2 dark:bg-gray-900 dark:border-gray-700"
        />
        <input
          name="maxParticipants"
          type="number"
          placeholder="Max Participants"
          value={formData.maxParticipants}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2 dark:bg-gray-900 dark:border-gray-700"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition hover:cursor-pointer"
      >
        {loading ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
}
