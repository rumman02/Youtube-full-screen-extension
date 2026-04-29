(function () {
  // Don't run on YouTube Shorts
  if (location.pathname.startsWith("/shorts")) return;

  const STYLE_ID = "yt-theater-fullscreen-style";

  const css = `
    #masthead-container,
    ytd-masthead,
    #masthead {
      transition: opacity 0.3s ease !important;
    }

    body.ytf-at-top #masthead-container,
    body.ytf-at-top ytd-masthead,
    body.ytf-at-top #masthead {
      opacity: 0 !important;
      pointer-events: none !important;
    }

    ytd-app > #content > #header {
      display: none !important;
    }

    ytd-watch-flexy[theater] #full-bleed-container {
      max-height: 100vh !important;
      height: 100vh !important;
      margin-top: 0 !important;
    }

    ytd-watch-flexy[theater] #movie_player {
      width: 100% !important;
      height: 100% !important;
    }

    ytd-watch-flexy[theater] #below,
    ytd-watch-flexy[theater] #columns {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }

    #page-manager {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }
  `;

  const hideScrollbarCss = `
    html::-webkit-scrollbar { display: none !important; }
    html { scrollbar-width: none !important; }
  `;

  let styleEl = null;
  let scrollStyleEl = null;
  let isTheater = false;

  function injectStyle() {
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = STYLE_ID;
      styleEl.textContent = css;
      document.head.appendChild(styleEl);
    }
  }

  function removeStyle() {
    if (styleEl) { styleEl.remove(); styleEl = null; }
    removeScrollbarStyle();
    document.body.classList.remove("ytf-at-top");
  }

  function injectScrollbarStyle() {
    if (!scrollStyleEl) {
      scrollStyleEl = document.createElement("style");
      scrollStyleEl.id = STYLE_ID + "-scroll";
      scrollStyleEl.textContent = hideScrollbarCss;
      document.head.appendChild(scrollStyleEl);
    }
  }

  function removeScrollbarStyle() {
    if (scrollStyleEl) { scrollStyleEl.remove(); scrollStyleEl = null; }
  }

  function onScroll() {
    if (!isTheater) return;
    const atTop = window.scrollY < 50;
    document.body.classList.toggle("ytf-at-top", atTop);
    atTop ? injectScrollbarStyle() : removeScrollbarStyle();
  }

  function check() {
    // Skip if navigated to Shorts
    if (location.pathname.startsWith("/shorts")) {
      removeStyle();
      return;
    }
    const player = document.querySelector("ytd-watch-flexy");
    if (player && player.hasAttribute("theater")) {
      isTheater = true;
      injectStyle();
      onScroll();
    } else {
      isTheater = false;
      removeStyle();
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  // Also re-check on SPA navigation (YouTube navigates without full reload)
  navigation?.addEventListener("navigate", () => setTimeout(check, 500));

  const observer = new MutationObserver(check);

  function startObserving() {
    const target = document.querySelector("ytd-watch-flexy");
    if (target) {
      observer.observe(target, { attributes: true, attributeFilter: ["theater"] });
      check();
    }
  }

  const navObserver = new MutationObserver(() => startObserving());
  navObserver.observe(document.body, { childList: true, subtree: true });
  startObserving();
})();
