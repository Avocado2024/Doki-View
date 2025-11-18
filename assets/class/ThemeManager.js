export class ThemeManager {
  constructor() {
    this.body = document.body;
    this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    this.applyTheme(this.mediaQuery.matches); // Apply initial theme
    this.mediaQuery.addEventListener("change", (event) => this.applyTheme(event.matches));
  }

  applyTheme(isDark) {
    if (isDark) this.body.setAttribute("data-theme", "dark");
    else this.body.removeAttribute("data-theme");
  }
}
