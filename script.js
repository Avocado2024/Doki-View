function createImages(images, chapter, container) {
  if (images.length === 0) {
    const messageEl = document.createElement("p");
    messageEl.textContent = "No images found";
    messageEl.style.textAlign = "center";
    container.appendChild(messageEl);
    return;
  }

  images.forEach((imgData, index) => {
    const imageEl = document.createElement("img");
    imageEl.src = imgData;
    imageEl.alt = `Chapter${chapter} Page${index + 1}`;
    imageEl.loading = "lazy";
    container.appendChild(imageEl);
  });
}

// page skeleton
document.body.innerHTML = `
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
`;

// set dark mode if user prefers it
const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.body.classList.toggle("dark-mode", isDark);

const titleEl = document.querySelector(".title");
const imgContainer = document.querySelector(".img-container");
const creditsEl = document.querySelector(".credits");

const creditsHTML = `
  <p>Translator: ${data.team.translator}</p>
  <p>Editor: ${data.team.editor}</p>
  <p>Quality Checker: ${data.team.qualityChecker}</p>
`;

titleEl.textContent = `${data.name} - Chapter ${data.chapter}`;
createImages(data.images, data.chapter, imgContainer);
creditsEl.innerHTML = creditsHTML;
