import { createHeader } from "./ui/header.js";
import { createImagesWrapper } from "./ui/images.js";
import { createFooter } from "./ui/footer.js";
import { ImageLoader } from "./models/ImageLoader.js";

// == THEME COLORS ===
// Primary   #2B2D42
// Secondary #8D99AE
// Accent    #EDF2F4
// ===================

function initializeMangaPage(data) {
  // ==== Setup TailwindCSS ====
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
  script.defer = true;
  document.head.appendChild(script);

  // ==== Create Main Content Area ====
  const contentArea = document.createElement("main");
  contentArea.className = `grid grid-rows-[auto_1fr_auto] gap-4 min-h-screen bg-[#2B2D42]`;
  document.body.appendChild(contentArea);

  // ==== Create UI Components ====
  const header = createHeader({ name: data.name, chapter: data.chapter });
  const imagesWrapper = createImagesWrapper();
  const footer = createFooter(data.members);

  contentArea.append(header, imagesWrapper, footer);

  // ==== Initialize Image Loader ====
  const imageLoader = new ImageLoader(imagesWrapper, data.imageUrls);
  imageLoader.initializeImageLoading();
}

initializeMangaPage(window.pageInfo);
