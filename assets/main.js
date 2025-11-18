import { ThemeManager } from "./class/ThemeManager.js";
import { ReaderUI } from "./class/ReaderUI.js";

const themeManager = new ThemeManager(); // Auto apply theme
const readerUI = new ReaderUI();

readerUI.setTitle(window.pageInfo.name, window.pageInfo.chapter);
readerUI.setCredits(window.pageInfo.members);
readerUI.renderImages(window.pageInfo.imageUrls);
