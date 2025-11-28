export class AutoPageLoader {
  constructor(container) {
    this.container = container;
    this.loadedCount = 0;
    this.observer = null;
  }

  appendImage(alt, src, container) {
    const img = document.createElement("img");
    img.alt = alt;
    img.src = src;
    img.loading = "lazy";
    img.draggable = false;

    // Size detection AFTER loading
    img.onload = () => {
      const ratio = img.naturalWidth > img.naturalHeight ? "landscape" : "portrait";
      img.classList = `${ratio} blocked`;
    };

    container.appendChild(img);
  }

  loadBatch(imageUrls, batchSize) {
    for (let i = 0; i < batchSize; i++) {
      if (this.loadedCount >= imageUrls.length) break;
      this.appendImage(imageUrls[this.loadedCount], `Page ${this.loadedCount + 1}`, this.container);
      this.loadedCount++;
    }

    // Returns true if more images are left to load
    return this.loadedCount < imageUrls.length;
  }

  watchScroll(imageUrls, batchSize) {
    const lastImage = this.container.lastElementChild;
    if (!lastImage) return; // No image to watch

    const handleIntersect = (entries) => {
      if (!entries[0].isIntersecting) return;
      this.observer.unobserve(entries[0].target);

      // Load the next batch of images.
      // hasMore = true → still more images to load
      // hasMore = false → all images loaded

      const hasMore = this.loadBatch(imageUrls, batchSize);
      if (hasMore) return this.watchScroll(imageUrls, batchSize);

      // If we reach here → all pages are loaded completely.
      console.log(`All pages loaded! Total pages: ${this.loadedCount}`);

      // Turn off the observer entirely.
      this.observer.disconnect();
    };

    this.observer = new IntersectionObserver(handleIntersect, { rootMargin: "0px 0px 700px 0px" });
    this.observer.observe(lastImage); // Start observing
  }

  start(imageUrls, startCount, batchSize) {
    this.loadBatch(imageUrls, startCount); // Load initial pages
    this.watchScroll(imageUrls, batchSize); // Start watching for more
  }
}
