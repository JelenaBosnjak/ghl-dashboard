import React from "react";

export default function AppointmentsList({ appointments, loading, onLoadMore, hasMore }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 1px 5px rgba(30,34,90,0.05)",
      padding: "24px"
    }}>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Appointments</div>
      {loading ? (
        <div>Loading appointments...</div>
      ) : (
        <>
          {appointments.length === 0 ? (
            <div style={{ color: "#aaa", fontSize: 15 }}>No appointments found.</div>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {appointments.map((appt, idx) => (
                <li key={appt.id || idx} style={{
                  padding: "8px 0",
                  borderBottom: idx !== appointments.length - 1 ? "1px solid #ececec" : "none"
                }}>
                  <span style={{ fontWeight: 600 }}>
                    {appt.title || appt.name || `Appointment #${idx + 1}`}
                  </span>
                  <span style={{ color: "#555", marginLeft: 8 }}>
                    {appt.date ? new Date(appt.date).toLocaleString() : ""}
                  </span>
                  {appt.client && (
                    <span style={{ color: "#888", marginLeft: 8 }}>
                      (Client: {appt.client})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
          {hasMore && (
            <button
              onClick={onLoadMore}
              style={{
                marginTop: 16,
                background: "#e2eaff",
                color: "#223",
                border: "none",
                borderRadius: 6,
                padding: "10px 20px",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >Load More</button>
          )}
        </>
      )}
    </div>
  );
}