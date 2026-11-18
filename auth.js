/* Lifteam V4 — Supabase Auth */
(function () {
  const cfg = window.LIFTEAM_SUPABASE;
  if (!cfg || !window.supabase) return;

  const client = window.supabase.createClient(cfg.url, cfg.publishableKey);
  window.lifteamSupabase = client;

  function $(id) { return document.getElementById(id); }

  async function refreshAuthUI() {
    const { data: { session } } = await client.auth.getSession();
    document.querySelectorAll("[data-auth-user]").forEach(el => {
      el.textContent = session?.user?.email || "";
    });
    document.querySelectorAll("[data-auth-only]").forEach(el => {
      el.hidden = !session;
    });
    document.querySelectorAll("[data-guest-only]").forEach(el => {
      el.hidden = !!session;
    });
    return session;
  }

  async function signUp(email, password, fullName) {
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName || "" } }
    });
    if (error) throw error;
    return data;
  }

  async function signIn(email, password) {
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async function signOut() {
    await client.auth.signOut();
    location.href = "index.html";
  }

  window.LifteamAuth = { client, refreshAuthUI, signUp, signIn, signOut };

  document.addEventListener("DOMContentLoaded", async () => {
    await refreshAuthUI();

    const loginForm = $("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const status = $("authStatus");
        status.textContent = "Connexion en cours…";
        try {
          await signIn($("loginEmail").value.trim(), $("loginPassword").value);
          location.href = "client-space.html";
        } catch (err) {
          status.textContent = err.message || "Connexion impossible.";
        }
      });
    }

    const signupForm = $("signupForm");
    if (signupForm) {
      signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const status = $("authStatus");
        status.textContent = "Création du compte…";
        try {
          await signUp($("signupEmail").value.trim(), $("signupPassword").value, $("signupName").value.trim());
          status.textContent = "Compte créé. Vérifie ton e-mail si la confirmation est activée dans Supabase.";
        } catch (err) {
          status.textContent = err.message || "Création du compte impossible.";
        }
      });
    }

    const logout = $("logoutBtn");
    if (logout) logout.addEventListener("click", signOut);

    const session = await refreshAuthUI();
    if (document.body.dataset.authRequired === "true" && !session) {
      location.href = "auth.html";
      return;
    }

    if (session && $("clientEmail")) {
      $("clientEmail").textContent = session.user.email;
    }
  });
})();
