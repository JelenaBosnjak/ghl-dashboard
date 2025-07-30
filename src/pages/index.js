import React, { useEffect, useState } from "react";

export default function DashboardSkeleton() {
  const [business, setBusiness] = useState({
    businessName: "...",
    logoUrl: "/logo.png"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/business")
      .then(res => res.json())
      .then(data => {
        setBusiness({
          businessName: data.businessName || "Business",
          logoUrl: data.logoUrl || "/logo.png"
        });
        setLoading(false);
      })
      .catch(() => {
        setBusiness({
          businessName: "Business",
          logoUrl: "/logo.png"
        });
        setLoading(false);
      });
  }, []);

  const TODAY = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div style={{
      fontFamily: "Inter, Arial, sans-serif",
      background: "#f8fafc",
      minHeight: "100vh",
      padding: 0,
      margin: 0
    }}>
      {/* Header */}
      <div style={{
        background: "#fff",
        padding: "24px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #ececec"
      }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 5 }}>
            Good morning, {loading ? "..." : business.businessName}!
          </div>
          <div style={{ fontSize: 15, color: "#888" }}>
            Today is {TODAY}
          </div>
        </div>
        <img
          src={business.logoUrl}
          alt="Logo"
          style={{
            width: 150,
            height: 150,
            objectFit: "contain",
            borderRadius: 12,
            background: "#fff"
          }}
        />
      </div>

      {/* Main Grid */}
      <div style={{
        maxWidth: 1100,
        margin: "32px auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 32
      }}>
        {/* Appointments */}
        <div style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 1px 5px rgba(30,34,90,0.05)",
          padding: "24px"
        }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Appointments</div>
          <div>9:00 Jane Smith</div>
          <div>11:00 Mark Jones</div>
          <div style={{ color: "#aaa", fontSize: 15 }}>...</div>
        </div>
        {/* New Leads */}
        <div style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 1px 5px rgba(30,34,90,0.05)",
          padding: "24px"
        }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>New Leads</div>
          <div>
            John Doe (555...) <button style={{ marginLeft: 8, background: "#eee", border: "none", borderRadius: 4, padding: "2px 10px", fontWeight: 600, cursor: "pointer" }}>Call</button>
          </div>
          <div style={{ color: "#aaa", fontSize: 15 }}>...</div>
        </div>
      </div>

      {/* Tasks / Reminders */}
      <div style={{
        maxWidth: 1100,
        margin: "0 auto 32px auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 1px 5px rgba(30,34,90,0.05)",
        padding: "24px"
      }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Tasks / Reminders</div>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>Follow up with Jane</li>
          <li>Confirm with Mark</li>
        </ul>
      </div>

      {/* Quick Stats */}
      <div style={{
        maxWidth: 1100,
        margin: "0 auto 32px auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 1px 5px rgba(30,34,90,0.05)",
        padding: "24px",
        display: "flex",
        flexWrap: "wrap",
        gap: 24
      }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>[12] New Leads</div>
        <div style={{ fontWeight: 700, fontSize: 16 }}>[8] Jobs Booked</div>
        <div style={{ fontWeight: 700, fontSize: 16 }}>[6] Done</div>
        <div style={{ fontWeight: 700, fontSize: 16 }}>[€2400] Revenue</div>
        <div style={{ fontWeight: 700, fontSize: 16 }}>[2] Campaigns</div>
      </div>

      {/* Quick Actions */}
      <div style={{
        maxWidth: 1100,
        margin: "0 auto 32px auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 1px 5px rgba(30,34,90,0.05)",
        padding: "24px",
        display: "flex",
        gap: 16
      }}>
        <span style={{ fontWeight: 700, marginRight: 16 }}>Quick Actions:</span>
        <button style={{ background: "#e2eaff", color: "#223", border: "none", borderRadius: 6, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>Add Lead</button>
        <button style={{ background: "#e2eaff", color: "#223", border: "none", borderRadius: 6, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>Book Appt</button>
        <button style={{ background: "#e2eaff", color: "#223", border: "none", borderRadius: 6, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>Text</button>
      </div>

      {/* Charts (placeholder boxes) */}
      <div style={{
        maxWidth: 1100,
        margin: "0 auto 48px auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 1px 5px rgba(30,34,90,0.05)",
        padding: "24px"
      }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Charts</div>
        <div style={{ display: "flex", gap: 24 }}>
          <div style={{
            flex: 1,
            minHeight: 140,
            background: "#f4f6fa",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#aaa"
          }}>Appointments (week) chart</div>
          <div style={{
            flex: 1,
            minHeight: 140,
            background: "#f4f6fa",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#aaa"
          }}>Pipeline chart</div>
          <div style={{
            flex: 1,
            minHeight: 140,
            background: "#f4f6fa",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#aaa"
          }}>Revenue chart</div>
        </div>
      </div>
    </div>
  );
}