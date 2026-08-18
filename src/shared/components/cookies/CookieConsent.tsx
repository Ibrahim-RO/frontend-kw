"use client";

import { Cookie, Settings2, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_COOKIE = "kw_cookie_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

type CookiePreferences = {
    analytics: boolean;
    marketing: boolean;
};

const defaultPreferences: CookiePreferences = {
    analytics: false,
    marketing: false,
};

function readPreferences(): CookiePreferences | null {
    const cookie = document.cookie
        .split("; ")
        .find((item) => item.startsWith(`${CONSENT_COOKIE}=`));

    if (!cookie) return null;

    try {
        const parsed = JSON.parse(decodeURIComponent(cookie.split("=").slice(1).join("=")));
        if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") return null;
        return parsed;
    } catch {
        return null;
    }
}

function writePreferences(preferences: CookiePreferences) {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(preferences))}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
    window.dispatchEvent(new CustomEvent("kw:cookie-consent", { detail: preferences }));
}

export default function CookieConsent() {
    const [isReady, setIsReady] = useState(false);
    const [hasConsent, setHasConsent] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState(defaultPreferences);

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            const saved = readPreferences();
            setPreferences(saved ?? defaultPreferences);
            setHasConsent(saved !== null);
            setIsReady(true);
        });

        const openSettings = () => {
            setPreferences(readPreferences() ?? defaultPreferences);
            setShowSettings(true);
        };

        window.addEventListener("kw:open-cookie-settings", openSettings);
        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener("kw:open-cookie-settings", openSettings);
        };
    }, []);

    const save = (nextPreferences: CookiePreferences) => {
        writePreferences(nextPreferences);
        setPreferences(nextPreferences);
        setHasConsent(true);
        setShowSettings(false);
    };

    if (!isReady || (hasConsent && !showSettings)) return null;

    return (
        <div
            className={`fixed inset-0 z-100 flex justify-center p-4 ${
                showSettings ? "items-center" : "pointer-events-none items-end"
            }`}
            role="presentation"
        >
            {showSettings && (
                <button
                    type="button"
                    className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
                    aria-label="Cerrar preferencias de cookies"
                    onClick={() => setShowSettings(false)}
                />
            )}

            <section
                role={showSettings ? "dialog" : "region"}
                aria-modal={showSettings || undefined}
                aria-labelledby="cookie-consent-title"
                className={`relative w-full bg-white text-neutral-900 shadow-2xl ${
                    showSettings
                        ? "max-w-xl rounded-2xl p-6 sm:p-8"
                        : "pointer-events-auto max-w-6xl rounded-2xl border border-neutral-200 p-5 sm:p-6"
                }`}
            >
                {showSettings ? (
                    <PreferencesPanel
                        preferences={preferences}
                        onChange={setPreferences}
                        onClose={() => setShowSettings(false)}
                        onSave={() => save(preferences)}
                        onAcceptAll={() => save({ analytics: true, marketing: true })}
                    />
                ) : (
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                        <div className="flex flex-1 items-start gap-4">
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-kw-primary/10 text-kw-primary">
                                <Cookie size={22} aria-hidden="true" />
                            </span>
                            <div>
                                <h2 id="cookie-consent-title" className="font-heading text-lg font-bold">Tu privacidad importa</h2>
                                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-neutral-600">
                                    Usamos cookies necesarias para que el sitio funcione y, con tu permiso, cookies de analítica y marketing para mejorar tu experiencia. Consulta nuestro{" "}
                                    <Link href="/aviso-privacidad" className="font-semibold text-kw-primary underline underline-offset-2">aviso de privacidad</Link>.
                                </p>
                            </div>
                        </div>
                        <div className="grid shrink-0 gap-2 sm:grid-cols-3">
                            <button type="button" onClick={() => save(defaultPreferences)} className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-bold transition-colors hover:bg-neutral-100">
                                Rechazar opcionales
                            </button>
                            <button type="button" onClick={() => setShowSettings(true)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-bold transition-colors hover:bg-neutral-100">
                                <Settings2 size={16} aria-hidden="true" /> Personalizar
                            </button>
                            <button type="button" onClick={() => save({ analytics: true, marketing: true })} className="rounded-lg bg-kw-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-800">
                                Aceptar todas
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

function PreferencesPanel({ preferences, onChange, onClose, onSave, onAcceptAll }: {
    preferences: CookiePreferences;
    onChange: (preferences: CookiePreferences) => void;
    onClose: () => void;
    onSave: () => void;
    onAcceptAll: () => void;
}) {
    return (
        <>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-kw-primary">Centro de privacidad</p>
                    <h2 id="cookie-consent-title" className="mt-1 font-heading text-2xl font-bold">Preferencias de cookies</h2>
                </div>
                <button type="button" onClick={onClose} className="rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900" aria-label="Cerrar">
                    <X size={20} />
                </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-neutral-600">Elige qué cookies opcionales podemos usar. Puedes cambiar esta decisión en cualquier momento desde el pie de página.</p>

            <div className="mt-6 divide-y divide-neutral-200 rounded-xl border border-neutral-200">
                <PreferenceRow title="Necesarias" description="Permiten funciones esenciales, como recordar esta elección y mantener la seguridad del sitio." checked disabled onChange={() => undefined} />
                <PreferenceRow title="Analítica" description="Nos ayudan a entender el uso del sitio y a mejorar su funcionamiento." checked={preferences.analytics} onChange={(analytics) => onChange({ ...preferences, analytics })} />
                <PreferenceRow title="Marketing" description="Permiten medir campañas y mostrar contenido más relevante para ti." checked={preferences.marketing} onChange={(marketing) => onChange({ ...preferences, marketing })} />
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={onSave} className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-bold transition-colors hover:bg-neutral-100">Guardar preferencias</button>
                <button type="button" onClick={onAcceptAll} className="rounded-lg bg-kw-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-800">Aceptar todas</button>
            </div>
        </>
    );
}

function PreferenceRow({ title, description, checked, disabled = false, onChange }: {
    title: string;
    description: string;
    checked: boolean;
    disabled?: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <label className={`flex items-center justify-between gap-5 p-4 ${disabled ? "cursor-default" : "cursor-pointer"}`}>
            <span>
                <span className="block text-sm font-bold">{title}</span>
                <span className="mt-0.5 block text-xs leading-5 text-neutral-500">{description}</span>
            </span>
            <input type="checkbox" className="peer sr-only" checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} />
            <span className="relative h-6 w-11 shrink-0 rounded-full bg-neutral-300 transition-colors peer-checked:bg-kw-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-kw-primary peer-disabled:opacity-60 after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-5" aria-hidden="true" />
        </label>
    );
}
