export class ReaderUI {
  constructor(root = document.body) {
    this.root = root;
    this.initLayout();

    this.loadedImage = 0;
    this.observer = null;
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
    imageEl.src = src;
    imageEl.alt = alt;
    imageEl.loading = "lazy";
    imageEl.draggable = false;
    container.appendChild(imageEl);
  }

  loadNextBatch(imageUrls, batchSize) {
    for (let i = 0; i < batchSize; i++) {
      if (this.loadedImage >= imageUrls.length) break;

      const imageUrl = imageUrls[this.loadedImage];
      const imageAlt = `Page ${this.loadedImage + 1}`;
      this.createImageElement(imageUrl, imageAlt, this.imgContainer);
      this.loadedImage++; // Update count
    }
  }

  observeLastImage(imageUrls, batchSize) {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return; // Not visible yet, do nothing
        this.observer.unobserve(entries[0].target); // Stop observing this image

        if (this.loadedImage >= imageUrls.length) {
          console.log(`All pages loaded! Total pages: ${this.loadedImage}`);
          return; // All images loaded
        }

        this.loadNextBatch(imageUrls, batchSize); // Load next set of images
        this.observeLastImage(imageUrls, batchSize); // Observe the new last image
      },
      { threshold: 0, rootMargin: "0px 0px 700px 0px" }
    );

    const lastImageElement = this.imgContainer.lastElementChild;
    if (!lastImageElement) return; // Nothing to observe yet

    this.observer.observe(lastImageElement); // Start observing
  }

  startLazyLoading(imageUrls, startCount, batchSize) {
    if (imageUrls.length === 0) {
      this.imgContainer.innerHTML = "<p style='text-align:center'>No images found</p>";
      return;
    }

    this.loadNextBatch(imageUrls, startCount); // Preload initial images
    this.observeLastImage(imageUrls, batchSize); // Activate lazy load
  }
}
