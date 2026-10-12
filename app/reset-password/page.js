
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function prepareReset() {
      const { data, error } = await supabase.auth.getSession();

      if (!active) return;

      if (error || !data.session) {
        setMessage(
          "Odkaz na zmenu hesla je neplatný alebo vypršal. Požiadaj o nový e-mail."
        );
        return;
      }

      setReady(true);
    }

    prepareReset();

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("Heslo musí mať aspoň 8 znakov.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Heslá sa nezhodujú.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage("Heslo sa nepodarilo zmeniť. Požiadaj o nový resetovací e-mail.");
      setLoading(false);
      return;
    }

    await supabase.auth.signOut();
    setPassword("");
    setConfirmPassword("");
    setReady(false);
    setMessage("Heslo bolo zmenené. Teraz sa môžeš prihlásiť v administrácii.");
    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background: "#111",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          padding: 32,
          borderRadius: 16,
        }}
      >
        <h1 style={{ marginTop: 0 }}>SDcar Servis</h1>
        <h2>Obnovenie hesla</h2>

        {ready ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="password">Nové heslo</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                boxSizing: "border-box",
                padding: 12,
                margin: "8px 0 18px",
              }}
            />

            <label htmlFor="confirmPassword">Potvrď nové heslo</label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                boxSizing: "border-box",
                padding: 12,
                margin: "8px 0 18px",
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: 14,
                background: "#111",
                color: "#fff",
                border: 0,
                borderRadius: 8,
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading ? "Ukladám..." : "Zmeniť heslo"}
            </button>
          </form>
        ) : null}

        {message && (
          <p role="status" style={{ marginTop: 18 }}>
            {message}
          </p>
        )}

        {message.startsWith("Heslo bolo zmenené") && (
          <p>
            <a href="/admin">Prejsť na prihlásenie</a>
          </p>
        )}
      </section>
    </main>
  );
}

