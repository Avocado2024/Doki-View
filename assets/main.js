import { Layout } from "./class/Layout.js";
import { ThemeManager } from "./class/ThemeManager.js";
import { AutoPageLoader } from "./class/AutoPageLoader.js";

// Manga page data from HTML
const pageInfo = window.pageInfo;

// Initialize theme and layout
const themeManager = new ThemeManager();
const layout = new Layout(document.body);

// Set page title and credits
layout.setTitle(pageInfo.name, pageInfo.chapter);
layout.setCredits(pageInfo.members);

// Initialize and start automatic page loader
const autoPageLoader = new AutoPageLoader(layout.ui.imgContainer);
autoPageLoader.start(pageInfo.imageUrls, 3, 3); // start with 3 images, load 3 per batch
