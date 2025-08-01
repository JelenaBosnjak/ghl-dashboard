export default async function handler(req, res) {
  const { LOCATION_ID, API_KEY } = process.env;

  if (!LOCATION_ID || !API_KEY) {
    return res.status(400).json({ error: "Missing Location ID or API Key" });
  }

  try {
    const ghlRes = await fetch(
      `https://rest.gohighlevel.com/v1/locations/${LOCATION_ID}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!ghlRes.ok) {
      return res.status(ghlRes.status).json({ error: "Failed to fetch location" });
    }

    const data = await ghlRes.json();
    // Use business.name if exists, otherwise fallback to name
    const businessName = data.business?.name || data.name || "Business";
    res.status(200).json({ businessName });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
}