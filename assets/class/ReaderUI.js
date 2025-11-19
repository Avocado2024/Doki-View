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
      const memberEl = document.createElement("p");
      memberEl.textContent = `${member.role}: ${member.name}`;
      this.creditsEl.appendChild(memberEl);
    });
  }

  renderImages(imageUrls) {
    if (imageUrls.length === 0) {
      const imageNotFoundEl = document.createElement("p");
      imageNotFoundEl.style.textAlign = "center";
      imageNotFoundEl.textContent = "No images found";
      this.imgContainer.appendChild(imageNotFoundEl);
      return;
    }

    imageUrls.forEach((imageUrl, i) => {
      const imageEl = document.createElement("img");
      imageEl.classList.add("blocked");
      imageEl.src = imageUrl;
      imageEl.alt = `Page${i + 1}`;
      imageEl.loading = "lazy";
      imageEl.draggable = false;
      this.imgContainer.appendChild(imageEl);
    });
  }
}
