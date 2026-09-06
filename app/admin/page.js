"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      setMessage("Nesprávny email alebo heslo.");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/admin/check", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      await supabase.auth.signOut();
      setMessage(
        result.error || "Nemáš oprávnenie administrátora."
      );
      setLoading(false);
      return;
    }

    setAdmin(true);
    setMessage("Prihlásenie úspešné. Vitaj v administrácii SDcar Servis! 🔧");
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setAdmin(false);
    setMessage("");
    setEmail("");
    setPassword("");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "#111",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          padding: "35px",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,.3)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              fontSize: "30px",
              fontWeight: "800",
              letterSpacing: "-1px",
            }}
          >
            SD<span style={{ color: "#e11d48" }}>car</span>
          </div>

          <div
            style={{
              fontSize: "12px",
              letterSpacing: "4px",
              fontWeight: "700",
              marginTop: "5px",
            }}
          >
            SERVIS
          </div>

          <h1 style={{ marginTop: "25px", marginBottom: "5px" }}>
            Administrácia
          </h1>

          {!admin ? (
            <p style={{ color: "#666", margin: 0 }}>
              Prihlásenie pre SDcar Servis
            </p>
          ) : (
            <p style={{ color: "#666", margin: 0 }}>
              Administrátor je prihlásený
            </p>
          )}
        </div>

        {!admin ? (
          <form onSubmit={handleLogin}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              E-mail
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@email.sk"
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginBottom: "18px",
                fontSize: "16px",
              }}
            />

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Heslo
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "16px",
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                border: "0",
                borderRadius: "8px",
                background: "#111",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "700",
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading ? "Overujem..." : "Prihlásiť sa"}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                padding: "20px",
                background: "#f3f4f6",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <strong>🔐 Admin prístup potvrdený</strong>
              <p style={{ color: "#666", marginBottom: 0 }}>
                Tvoj účet má oprávnenie správcu.
              </p>
            </div>

            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "14px",
                border: "0",
                borderRadius: "8px",
                background: "#e11d48",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Odhlásiť sa
            </button>
          </div>
        )}

        {message && (
          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              color:
                message.includes("úspešné") ||
                message.includes("potvrdený")
                  ? "green"
                  : "red",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
