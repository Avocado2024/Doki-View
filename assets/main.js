import { ThemeManager } from "./class/ThemeManager.js";
import { ReaderUI } from "./class/ReaderUI.js";

const pageInfo = window.pageInfo; // Get manga page info

const themeManager = new ThemeManager(); // Apply theme
const readerUI = new ReaderUI(); // Init reader

readerUI.setTitle(pageInfo.name, pageInfo.chapter);
readerUI.setCredits(pageInfo.members);
readerUI.startLazyLoading(pageInfo.imageUrls, 3, 2); // Lazy load images
