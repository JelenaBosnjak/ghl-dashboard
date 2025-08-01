// This API route fetches all contacts in paginated batches,
// then for each contact, fetches their appointments, and aggregates them.
// It supports ?page=1&limit=25 pagination (default 1/25).
// "Load More" is supported via frontend by incrementing the page param.

export default async function handler(req, res) {
  const API_KEY = process.env.API_KEY;
  const LOCATION_ID = process.env.LOCATION_ID;

  if (!API_KEY || !LOCATION_ID) {
    return res.status(500).json({ error: "Missing API_KEY or LOCATION_ID in environment." });
  }

  // Pagination parameters for contacts
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;

  try {
    // 1. Fetch paginated contacts
    const contactsRes = await fetch(
      `https://rest.gohighlevel.com/v1/contacts/?locationId=${LOCATION_ID}&limit=${limit}&page=${page}`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    );
    if (!contactsRes.ok) {
      return res.status(contactsRes.status).json({ error: "Failed to fetch contacts" });
    }
    const contactsData = await contactsRes.json();
    const contacts = contactsData.contacts || [];

    // 2. For each contact, fetch their appointments
    // To avoid rate limits, we can throttle/batch or just fetch sequentially for small batches
    // For higher scale, consider batching with setTimeout or a queue!
    let allAppointments = [];
    for (const contact of contacts) {
      try {
        const apptRes = await fetch(
          `https://rest.gohighlevel.com/v1/contacts/${contact.id}/appointments`,
          { headers: { Authorization: `Bearer ${API_KEY}` } }
        );
        if (!apptRes.ok) continue;
        const apptData = await apptRes.json();
        const appts = (apptData.appointments || []).map(appt => ({
          ...appt,
          client: contact.name || contact.firstName + " " + contact.lastName || "",
        }));
        allAppointments = allAppointments.concat(appts);
      } catch (e) {
        // skip if failed for a contact
      }
    }

    res.status(200).json({
      appointments: allAppointments,
      contactsCount: contacts.length,
      page,
      limit,
      hasMore: contacts.length === limit // likely more contacts available
    });
  } catch (e) {
    res.status(500).json({ error: "Server error", details: e.message });
  }
}