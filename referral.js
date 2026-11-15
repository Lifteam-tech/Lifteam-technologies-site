(function () {
    "use strict";

    const STORAGE_KEY = "lifteam_partner_code";
    const CAPTURED_AT_KEY = "lifteam_partner_captured_at";

    function getPartnerCodeFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get("ref");

        if (!ref) {
            return null;
        }

        const code = ref.trim();

        if (!/^LP-[A-Z0-9-]+$/i.test(code)) {
            return null;
        }

        return code.toUpperCase();
    }

    function savePartnerCode(code) {
        localStorage.setItem(STORAGE_KEY, code);
        localStorage.setItem(CAPTURED_AT_KEY, new Date().toISOString());
    }

    function getStoredPartnerCode() {
        return localStorage.getItem(STORAGE_KEY);
    }

    function clearPartnerCode() {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(CAPTURED_AT_KEY);
    }

    function getVisitorId() {
        const key = "lifteam_visitor_id";
        let visitorId = localStorage.getItem(key);

        if (!visitorId) {
            visitorId =
                "VIS-" +
                Date.now().toString(36) +
                "-" +
                Math.random().toString(36).substring(2, 10);

            localStorage.setItem(key, visitorId);
        }

        return visitorId;
    }

    async function recordAffiliateClick(partnerCode) {
        if (!partnerCode) {
            return;
        }

        if (!window.lifteamSupabase) {
            console.warn("Supabase n'est pas disponible.");
            return;
        }

        try {
            await window.lifteamSupabase.rpc("record_affiliate_click", {
                p_partner_code: partnerCode,
                p_landing_page: window.location.href,
                p_visitor_id: getVisitorId()
            });
        } catch (error) {
            console.error("Erreur lors de l'enregistrement du clic :", error);
        }
    }

    const partnerCode = getPartnerCodeFromUrl();

    if (partnerCode) {
        savePartnerCode(partnerCode);
        recordAffiliateClick(partnerCode);
    }

    window.LifteamReferral = {
        getPartnerCode: getStoredPartnerCode,
        clearPartnerCode: clearPartnerCode
    };
})();
