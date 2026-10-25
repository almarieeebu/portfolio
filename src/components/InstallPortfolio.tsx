"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPortfolio() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);
  const [installed, setInstalled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)");
    function updateInstalled() {
      setInstalled(standalone.matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    }
    function onPrompt(event: Event) {
      event.preventDefault();
      setPrompt(event as InstallPrompt);
    }
    function onInstalled() {
      setInstalled(true);
      setPrompt(null);
      setMessage("Portfolio added. You can open it from your home screen or apps.");
    }
    updateInstalled();
    standalone.addEventListener("change", updateInstalled);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    if ("serviceWorker" in navigator && window.isSecureContext) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Browser shortcuts remain available even if worker registration is blocked.
      });
    }
    return () => {
      standalone.removeEventListener("change", updateInstalled);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (!prompt) return;
    setBusy(true);
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      setMessage(choice.outcome === "accepted"
        ? "Installation requested. Follow your browser’s instructions to finish."
        : "You can install later from your browser menu.");
    } catch {
      setMessage("Use your browser menu to add this portfolio to your home screen.");
    } finally {
      setPrompt(null);
      setBusy(false);
    }
  }

  return (
    <>
      <button type="button" className="install-trigger" onClick={() => dialog.current?.showModal()}>
        <Image src="/icons/icon-192.png" width={44} height={44} alt="" />
        <span><strong>{installed ? "Portfolio installed" : "Install portfolio"}</strong><small>Keep it on your home screen</small></span>
      </button>
      <dialog ref={dialog} className="install-dialog" aria-labelledby="install-title" aria-describedby="install-description">
        <Image src="/icons/icon-192.png" width={72} height={72} alt="mariabu.dev logo" className="rounded-2xl" />
        <h2 id="install-title">Keep my portfolio handy.</h2>
        <p id="install-description">Add this web app to your home screen with the mariabu.dev icon. An internet connection is needed for projects and demos.</p>
        {installed ? <p>This portfolio is already installed on this device.</p> : (
          <>
            {prompt && <button type="button" className="button-primary" onClick={install} disabled={busy}>{busy ? "Opening browser…" : "Install on this device"}</button>}
            <ol>
              <li><strong>iPhone / iPad:</strong> open in Safari, tap Share, then Add to Home Screen.</li>
              <li><strong>Android:</strong> open in Chrome, tap the menu, then Install app or Add to Home screen.</li>
              <li><strong>Desktop:</strong> use the install option in your browser’s address bar or menu, if available.</li>
            </ol>
            <p>Can’t see an install option? Open this page in your device’s browser. In-app browsers may not support installation.</p>
          </>
        )}
        <p role="status" aria-live="polite">{message}</p>
        <form method="dialog"><button className="install-close">Close</button></form>
      </dialog>
    </>
  );
}
