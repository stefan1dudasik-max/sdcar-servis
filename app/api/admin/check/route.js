import { createClient } from "@supabase/supabase-js";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return Response.json(
        { ok: false, error: "Neprihlásený používateľ." },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return Response.json(
        { ok: false, error: "Neplatné prihlásenie." },
        { status: 401 }
      );
    }

    if (user.id !== process.env.ADMIN_USER_ID) {
      return Response.json(
        { ok: false, error: "Nemáš oprávnenie administrátora." },
        { status: 403 }
      );
    }

    return Response.json({
      ok: true,
      admin: true,
    });
  } catch (error) {
    return Response.json(
      { ok: false, error: "Chyba servera." },
      { status: 500 }
    );
  }
}
