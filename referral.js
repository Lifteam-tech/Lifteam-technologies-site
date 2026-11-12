/* Lifteam V4 — referral capture
   Client-side capture is only a handoff. Final attribution must be validated server-side.
*/
(function () {
  const params = new URLSearchParams(location.search);
  const ref = params.get("ref");
  if (ref && /^LP-[A-Z0-9-]{3,20}$/i.test(ref)) {
    localStorage.setItem("lifteam_affiliate_ref", ref.toUpperCase());
  }
  window.LifteamReferral = {
    get: () => localStorage.getItem("lifteam_affiliate_ref"),
    clear: () => localStorage.removeItem("lifteam_affiliate_ref")
  };
})();
