export class Layout {
  constructor(root = document.body) {
    this.root = root;
    this.ui = {};
    this.buildLayout();
  }

  buildLayout() {
    this.root.innerHTML = `
      <div class="container">

        <header>
          <p class="title"></p>
        </header>

        <main>
          <div class="img-container"></div>
          <div class="credits"></div>
        </main>

        <footer>
          Scanlation by
          <a href="https://t.me/Doki_Translation" target="_blank">Doki Translation</a>
        </footer>

      </div>
    `;

    this.ui = {
      title: this.root.querySelector(".title"),
      credits: this.root.querySelector(".credits"),
      imgContainer: this.root.querySelector(".img-container"),
    };
  }

  setTitle(name, chapter) {
    this.ui.title.textContent = `${name} Chapter ${chapter}`;
  }

  setCredits(members) {
    members.forEach((member) => {
      const memberEl = document.createElement("p");
      memberEl.textContent = `${member.role}: ${member.name}`;
      this.ui.credits.appendChild(memberEl);
    });
  }
}
