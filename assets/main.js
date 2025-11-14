class ReaderUI {
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

  setTitle(name, chapterNumber) {
    this.titleEl.textContent = `${name} Chapter ${chapterNumber}`;
  }

  setCredits(team) {
    this.creditsEl.innerHTML = `
      <p>Translator: ${team.translator}</p>
      <p>Editor: ${team.editor}</p>
      <p>Quality Checker: ${team.qualityChecker}</p>
    `;
  }
}

class ImageViewer {
  constructor(container, chapterNumber, images) {
    this.container = container;
    this.chapterNumber = chapterNumber;
    this.images = images;
  }

  render() {
    if (this.images.length === 0) {
      const errorMessage = `<p style="text-align: center;">No images found</p>`;
      this.container.innerHTML = errorMessage;
      return;
    }

    this.images.forEach((imgUrl, index) => {
      const alt = `Chapter${this.chapterNumber} Page${index + 1}`;
      const imageEl = `<img class="blocked" src="${imgUrl}" alt="${alt}" loading="lazy" draggable="false">`;
      this.container.innerHTML += imageEl;
    });
  }
}

const buildUI = new ReaderUI();
buildUI.setTitle(data.name, data.chapter);
buildUI.setCredits(data.team);

const imgViewer = new ImageViewer(buildUI.imgContainer, data.chapter, data.images);
imgViewer.render();
