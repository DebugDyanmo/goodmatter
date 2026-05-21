// Google Identity Services (One Tap + popup flow)
// Docs: https://developers.google.com/identity/gsi/web

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          prompt: (notification?: (n: { isNotDisplayed: () => boolean; isSkippedMoment: () => boolean }) => void) => void;
          renderButton: (element: HTMLElement, config: object) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

export function initGoogleAuth(callback: (idToken: string) => void) {
  if (!GOOGLE_CLIENT_ID) {
    console.warn("VITE_GOOGLE_CLIENT_ID not set — Google login disabled");
    return false;
  }

  if (!window.google?.accounts?.id) {
    console.warn("Google Identity Services script not loaded yet");
    return false;
  }

  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: (response) => callback(response.credential),
    auto_select: false,
    cancel_on_tap_outside: true,
  });

  return true;
}

export function triggerGoogleSignIn(callback: (idToken: string) => void) {
  const ready = initGoogleAuth(callback);
  if (!ready) return;
  window.google!.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      // One Tap was blocked — fall back to popup via renderButton approach
      // This is handled by the rendered button in the modal
    }
  });
}

export { GOOGLE_CLIENT_ID };
