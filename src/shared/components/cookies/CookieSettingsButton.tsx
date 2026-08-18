"use client";

export default function CookieSettingsButton() {
    return (
        <button
            type="button"
            className="text-left transition-colors hover:text-white"
            onClick={() => window.dispatchEvent(new Event("kw:open-cookie-settings"))}
        >
            Preferencias de cookies
        </button>
    );
}
