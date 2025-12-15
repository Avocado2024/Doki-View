export function createImagesWrapper() {
  const imagesWrapper = document.createElement("div");
  imagesWrapper.className = "grid gap-4 px-3 place-items-center";

  const loadingText = document.createElement("p");
  loadingText.className = "text-[#EDF2F4] text-center";
  loadingText.textContent = "Loading…";
  imagesWrapper.appendChild(loadingText);

  return imagesWrapper;
}
