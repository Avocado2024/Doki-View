function updateTitle(name, chapter) {
  const title = document.querySelector(".title");
  title.textContent = `${name} - Chapter ${chapter}`;
}

function createImageElement(images, chapter) {
  const container = document.querySelector(".img-container");

  if (images.length === 0) {
    container.innerHTML = `<p>Something went wrong</p>`;
    container.style.textAlign = "center";
    return;
  }

  container.innerHTML = images
    .map((img, i) => `<img src="${img}" alt="Ch${chapter} P${i + 1}">`)
    .join("");
}

function createTeamElement(team) {
  document.querySelector(".our-team").innerHTML = `
    <p>Translator: ${team.translator}</p>
    <p>Editor: ${team.editor}</p>
    <p>Quality Checker: ${team.qualityChecker}</p>
  `;
}

updateTitle(mangaData.name, mangaData.chapter);
createImageElement(mangaData.images, mangaData.chapter);
createTeamElement(mangaData.team);
