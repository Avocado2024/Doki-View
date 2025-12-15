export function createFooter(members) {
  const footer = document.createElement("div");
  footer.className = "grid gap-4 p-4 bg-[#8D99AE]";

  // Project Team Section
  const teamSection = document.createElement("div");
  teamSection.className = "grid gap-4 pb-4 border-b border-[#2B2D42] ";

  const teamTitle = document.createElement("p");
  teamTitle.className = "text-[#2B2D42] text-lg font-medium";
  teamTitle.textContent = "PROJECT TEAM";

  const teamList = document.createElement("div");
  teamList.className = "flex gap-4 flex-wrap";

  members.forEach((member) => {
    const memberElement = document.createElement("p");
    memberElement.className = "flex-grow p-3 bg-[#2B2D42] text-[#EDF2F4] text-sm text-center rounded-lg";
    memberElement.textContent = `${member.role} - ${member.name}`;
    teamList.appendChild(memberElement);
  });

  teamSection.appendChild(teamTitle);
  teamSection.appendChild(teamList);

  // Copyright Section
  const copyrightDiv = document.createElement("div");
  copyrightDiv.className = "flex flex-col gap-1 md:flex-row md:justify-between";
  copyrightDiv.innerHTML = `
    <p class="text-[#2B2D42] text-sm">
      <a class="font-bold hover:underline" href="https://t.me/Doki_Translation" target="_blank">Doki Translation</a>
      © 2025 Doki View. All Rights Reserved.
    </p>
    <p class="text-[#2B2D42] text-sm">
      Designed & Developed by
      <a class="font-bold hover:underline" href="https://t.me/avocadoSan" target="_blank">Avocado</a>
    </p>`;

  footer.appendChild(teamSection);
  footer.appendChild(copyrightDiv);

  return footer;
}
