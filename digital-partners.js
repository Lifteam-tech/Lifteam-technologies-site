/* Lifteam Digital Partners — referral handoff
   Front-end helper only. Secure attribution must be confirmed server-side.
*/
(function () {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");

  if (ref && /^LP-[A-Z0-9-]+$/i.test(ref)) {
    try {
      localStorage.setItem("lifteam_affiliate_ref", ref.toUpperCase());
      localStorage.setItem("lifteam_affiliate_ref_at", new Date().toISOString());
    } catch (_) {}
  }

  window.LifteamAffiliate = {
    getRef: function () {
      try { return localStorage.getItem("lifteam_affiliate_ref"); }
      catch (_) { return null; }
    },
    clearRef: function () {
      try {
        localStorage.removeItem("lifteam_affiliate_ref");
        localStorage.removeItem("lifteam_affiliate_ref_at");
      } catch (_) {}
    }
  };
})();
