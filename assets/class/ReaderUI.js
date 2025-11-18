export class ReaderUI {
  constructor(root = document.body) {
    this.root = root;
    this.initLayout();
  }

  initLayout() {
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

    this.titleEl = document.querySelector(".title");
    this.imgContainer = document.querySelector(".img-container");
    this.creditsEl = document.querySelector(".credits");
  }

  setTitle(name, chapter) {
    this.titleEl.textContent = `${name} Chapter ${chapter}`;
  }

  setCredits(members) {
    members.forEach((member) => {
      this.creditsEl.innerHTML += `<p>${member.name}: ${member.role}</p>`;
    });
  }

  renderImages(imageUrls) {
    if (imageUrls.length === 0) {
      this.imgContainer.innerHTML = `<p style="text-align: center;">No images found</p>`;
      return;
    }

    imageUrls.forEach((imageUrl, i) => {
      this.imgContainer.innerHTML += `
        <img class="blocked" src="${imageUrl}" alt="Page${i + 1}" loading="lazy" draggable="false">
      `;
    });
  }
}
