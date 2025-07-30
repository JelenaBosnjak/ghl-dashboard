import React, { useEffect, useState } from "react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/appointments")
      .then(res => res.json())
      .then(data => {
        setAppointments(Array.isArray(data.appointments) ? data.appointments : []);
        setLoading(false);
      })
      .catch(() => {
        setAppointments([]);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
      fontFamily: "Inter, Arial, sans-serif",
      background: "#f8fafc",
      minHeight: "100vh",
      padding: 0,
      margin: 0
    }}>
      <div style={{
        background: "#fff",
        padding: "24px 32px",
        borderBottom: "1px solid #ececec"
      }}>
        <div style={{ fontSize: 32, fontWeight: 700 }}>
          Appointments
        </div>
      </div>
      <div style={{
        maxWidth: 800,
        margin: "32px auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 1px 5px rgba(30,34,90,0.05)",
        padding: "24px"
      }}>
        {loading ? (
          <div>Loading appointments...</div>
        ) : (
          <>
            {appointments.length === 0 ? (
              <div style={{ color: "#888" }}>No appointments found.</div>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {appointments.map((appt, idx) => (
                  <li key={appt.id || idx} style={{
                    padding: "16px 0",
                    borderBottom: idx !== appointments.length - 1 ? "1px solid #ececec" : "none",
                    display: "flex",
                    flexDirection: "column"
                  }}>
                    <span style={{ fontWeight: 600, fontSize: 18 }}>
                      {appt.title || appt.name || `Appointment #${idx + 1}`}
                    </span>
                    <span style={{ color: "#555", marginTop: 4 }}>
                      {appt.date ? new Date(appt.date).toLocaleString() : "No date"}
                    </span>
                    {appt.client && (
                      <span style={{ color: "#888", marginTop: 2 }}>
                        Client: {appt.client}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}