export class ReaderUI {
  constructor(root = document.body) {
    this.root = root;
    this.loadedImage = 0;
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

    this.titleEl = this.root.querySelector(".title");
    this.imgContainer = this.root.querySelector(".img-container");
    this.creditsEl = this.root.querySelector(".credits");
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

  createImageElement(src, alt, container) {
    const imageEl = document.createElement("img");
    imageEl.classList.add("blocked");
    imageEl.src = src;
    imageEl.alt = alt;
    imageEl.loading = "lazy";
    imageEl.draggable = false;
    container.appendChild(imageEl);
  }

  loadNextBatch(imageUrls, batchSize) {
    if (imageUrls.length === 0) {
      const imageNotFoundEl = document.createElement("p");
      imageNotFoundEl.style.textAlign = "center";
      imageNotFoundEl.textContent = "No images found";
      this.imgContainer.innerHTML = "";
      this.imgContainer.appendChild(imageNotFoundEl);
      return;
    }

    for (let i = 0; i < batchSize; i++) {
      if (this.loadedImage >= imageUrls.length) break;

      const imageUrl = imageUrls[this.loadedImage];
      const imageAlt = `Page ${this.loadedImage + 1}`;
      this.createImageElement(imageUrl, imageAlt, this.imgContainer);
      this.loadedImage++; // Update count
    }
  }

  observeLastImage(imageUrls, batchSize) {
    const lastImageElement = this.imgContainer.lastElementChild;
    if (!lastImageElement) return;

    const onChange = (entries, obs) => {
      if (!entries[0].isIntersecting) return;
      obs.unobserve(entries[0].target);

      if (this.loadedImage >= imageUrls.length) {
        console.log(`All pages loaded! Total pages: ${this.loadedImage}`);
        return;
      }

      this.loadNextBatch(imageUrls, batchSize); // Load next batch
      this.observeLastImage(imageUrls, batchSize); // Observe new last image
    };

    const observer = new IntersectionObserver(onChange, { rootMargin: "0px 0px 700px 0px" });
    observer.observe(lastImageElement);
  }

  startLazyLoading(imageUrls, startCount, batchSize) {
    this.loadNextBatch(imageUrls, startCount); // Preload initial images
    this.observeLastImage(imageUrls, batchSize); // Activate lazy load
  }
}
