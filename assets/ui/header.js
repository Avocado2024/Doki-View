export function createHeader({ name, chapter }) {
  const header = document.createElement("header");
  header.className = "p-4 bg-[#8D99AE]";

  const title = document.createElement("h1");
  title.className = "text-[#2B2D42] text-2xl text-center font-bold";
  title.textContent = `${name} Ch.${chapter}`;
  header.appendChild(title);

  return header;
}
