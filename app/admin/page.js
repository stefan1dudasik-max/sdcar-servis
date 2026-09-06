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

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Nesprávny email alebo heslo.");
      setLoading(false);
      return;
    }

    setMessage("Prihlásenie úspešné. Vitaj v administrácii SDcar Servis! 🔧");
    setLoading(false);
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

          <p style={{ color: "#666", margin: 0 }}>
            Prihlásenie pre SDcar Servis
          </p>
        </div>

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
            {loading ? "Prihlasujem..." : "Prihlásiť sa"}
          </button>

          {message && (
            <p
              style={{
                marginTop: "20px",
                textAlign: "center",
                color: message.includes("úspešné") ? "green" : "red",
              }}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
