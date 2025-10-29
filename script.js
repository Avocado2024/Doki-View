function createImgElement(images, chapter) {
  if (images.length === 0) {
    return `<p style="text-align: center;">Something went wrong</p>`;
  }

  const result = images.map(
    (img, i) => `<img src="${img}" alt="Ch${chapter} P${i + 1}" loading="lazy">`
  );

  return result.join("\n");
}

function updateWebPage(data) {
  // Check if the user prefers dark mode
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.classList.toggle("dark-mode", isDark);

  // Update the title with manga name and chapter
  const title = document.querySelector(".title");
  title.textContent = `${data.name} - Chapter ${data.chapter}`;

  // Insert images into the container
  const imgElements = createImgElement(data.images, data.chapter);
  document.querySelector(".img-container").innerHTML = imgElements;

  // Show team credits
  document.querySelector(".our-team").innerHTML = `
    <p>Translator: ${data.team.translator}</p>
    <p>Editor: ${data.team.editor}</p>
    <p>Quality Checker: ${data.team.qualityChecker}</p>
  `;
}

updateWebPage(mangaData);
