export class ImageLoader {
  constructor(container, imageUrls, batchSize = 5, startCount = 5) {
    this.imageUrls = imageUrls;
    this.container = container;
    this.options = { batchSize, startCount };
    this.loadedCount = 0;
    this.observer = null;
  }

  loadNextBatch() {
    for (let i = 0; i < this.options.batchSize; i++) {
      if (this.loadedCount >= this.imageUrls.length) break;

      const imageElement = document.createElement("img");
      imageElement.classList = `w-full xl:w-1/2 rounded-lg pointer-events-none select-none`;
      imageElement.alt = `Page ${this.loadedCount + 1}`;
      imageElement.src = this.imageUrls[this.loadedCount];
      imageElement.loading = "lazy";
      imageElement.draggable = false;

      this.container.appendChild(imageElement);
      this.loadedCount++;
    }
  }

  loadImagesOnScroll() {
    this.observer = new IntersectionObserver(
      (entries) => {
        // If the observed element is not intersecting, do nothing
        if (!entries[0].isIntersecting) return;
        this.observer.unobserve(entries[0].target);

        // If all images are loaded, disconnect the observer
        if (this.loadedCount >= this.imageUrls.length) {
          console.log(`All pages loaded! Total pages: ${this.loadedCount}`);
          this.observer.disconnect();
          return;
        }

        // Load the next batch of images
        this.loadNextBatch();
        this.loadImagesOnScroll();
      },
      { rootMargin: "0px 0px 700px 0px" }
    );

    // Observe the last image
    const lastImage = this.container.lastElementChild;
    lastImage ? this.observer.observe(lastImage) : this.observer.disconnect();
  }

  initializeImageLoading() {
    // Clear any existing images or content
    this.container.innerHTML = "";

    // Load the initial batch of images
    this.loadNextBatch(); // Load initial images
    this.loadImagesOnScroll(); // Set up scroll loading
  }
}
