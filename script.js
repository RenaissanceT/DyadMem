const copyButton = document.querySelector("#copy-citation");
const status = document.querySelector("#copy-status");

copyButton?.addEventListener("click", async () => {
  const citation = document.querySelector("pre code").textContent;
  try {
    await navigator.clipboard.writeText(citation);
    status.textContent = "Copied";
  } catch {
    status.textContent = "Select and copy the citation above.";
  }
  window.setTimeout(() => { status.textContent = ""; }, 2200);
});

const explorerData = {
  models: {
    folder: "appendix_20_model",
    groups: [
      {
        id: "open-source",
        label: "Open-Source",
        color: "#297768",
        items: [
          "01_Kimi-K3.svg",
          "02_GLM-5.2.svg",
          "05_DeepSeek-V4-Pro.svg",
          "06_MiniMax-M2.5.svg",
          "07_GPT-oss-120B.svg",
          "08_Qwen3.5-397B.svg",
          "09_Qwen3.8-27B.svg",
          "10_Qwen3-8B.svg",
          "12_Qwen3.5-27B.svg",
          "13_Qwen3-4B.svg",
          "15_Qwen3.5-9B.svg",
          "16_Llama-3.1-70B-Instruct.svg",
          "17_Qwen3.5-35B-A3B.svg",
          "18_Qwen3.5-4B.svg",
          "19_Llama-3.1-8B-Instruct.svg",
          "20_Qwen3-30B-A3B.svg"
        ]
      },
      {
        id: "proprietary",
        label: "Proprietary",
        color: "#20252b",
        items: [
          "03_GPT-5.6-Sol.svg",
          "04_Doubao-Seed-2.1-Pro.svg",
          "11_GPT-4o-mini.svg",
          "14_Gemini-3.1-Pro-Preview.svg"
        ]
      }
    ]
  },
  categories: {
    folder: "appendix_25_category",
    groups: [
      {
        id: "work-study",
        label: "Work / Study",
        color: "#4289be",
        items: [
          "dyadmem_m1_25_Collaboration_Style_radar.svg",
          "dyadmem_m1_25_Professional_Identity_radar.svg",
          "dyadmem_m1_25_Project_Responsibilities_radar.svg",
          "dyadmem_m1_25_Study_Scheduling_Review_Reminders_radar.svg",
          "dyadmem_m1_25_Work_Habits_radar.svg"
        ]
      },
      {
        id: "family-home",
        label: "Family / Home",
        color: "#cd7a45",
        items: [
          "dyadmem_m1_25_Commuting_Arrangements_radar.svg",
          "dyadmem_m1_25_Family_Members_radar.svg",
          "dyadmem_m1_25_Family_To-Dos_radar.svg",
          "dyadmem_m1_25_Home_Environment_radar.svg",
          "dyadmem_m1_25_Housing_Information_radar.svg"
        ]
      },
      {
        id: "social-relations",
        label: "Social Relations",
        color: "#7c6498",
        items: [
          "dyadmem_m1_25_Circle_Preferences_radar.svg",
          "dyadmem_m1_25_Communication_Preferences_radar.svg",
          "dyadmem_m1_25_Core_Relationships_radar.svg",
          "dyadmem_m1_25_Extended_Relationships_radar.svg",
          "dyadmem_m1_25_Interaction_Boundaries_radar.svg"
        ]
      },
      {
        id: "lifestyle-assets",
        label: "Lifestyle / Assets",
        color: "#cb89ab",
        items: [
          "dyadmem_m1_25_Daily_Budget_radar.svg",
          "dyadmem_m1_25_Devices_Assets_radar.svg",
          "dyadmem_m1_25_Reading_Music_radar.svg",
          "dyadmem_m1_25_Shopping_Preferences_radar.svg",
          "dyadmem_m1_25_Travel_Preferences_radar.svg"
        ]
      },
      {
        id: "health-routine",
        label: "Health / Routine",
        color: "#43997f",
        items: [
          "dyadmem_m1_25_Dietary_Restrictions_radar.svg",
          "dyadmem_m1_25_Medical_Visits_Medication_radar.svg",
          "dyadmem_m1_25_Physical_Exams_Health_Care_radar.svg",
          "dyadmem_m1_25_Sleep_Routine_radar.svg",
          "dyadmem_m1_25_Workout_Planning_radar.svg"
        ]
      }
    ]
  }
};

const prettyName = (filename, type) => {
  let label = filename.replace(/\.svg$/i, "");
  if (type === "models") label = label.replace(/^\d+_/, "");
  if (type === "categories") label = label.replace(/^dyadmem_m1_25_/, "").replace(/_radar$/, "");
  return label.replace(/[-_]/g, " ");
};

document.querySelectorAll("[data-explorer]").forEach((explorer) => {
  const type = explorer.dataset.explorer;
  const config = explorerData[type];
  if (!config) return;

  const groupList = explorer.querySelector("[data-group-list]");
  const pillList = explorer.querySelector("[data-pill-list]");
  const viewerImage = explorer.querySelector("[data-viewer-image]");
  const viewerCaption = explorer.querySelector("[data-viewer-caption]");
  const groupTabs = [];
  let pillButtons = [];

  const replayViewerAnimation = () => {
    viewerImage.style.animation = "none";
    void viewerImage.offsetWidth;
    viewerImage.style.animation = "";
  };

  const selectItem = (group, index) => {
    const filename = group.items[index];
    const title = prettyName(filename, type);
    viewerImage.src = `./assets/${config.folder}/${filename}`;
    viewerImage.alt = title;
    viewerCaption.textContent = `${title} · ${group.label}`;
    replayViewerAnimation();
    pillButtons.forEach((pill, i) => {
      const isActive = i === index;
      pill.classList.toggle("is-active", isActive);
      pill.setAttribute("aria-selected", String(isActive));
    });
  };

  const renderGroup = (groupIndex) => {
    const group = config.groups[groupIndex];
    explorer.style.setProperty("--group-color", group.color);
    groupTabs.forEach((tab, i) => {
      const isActive = i === groupIndex;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
    pillList.innerHTML = "";
    pillButtons = group.items.map((filename, index) => {
      const title = prettyName(filename, type);
      const pill = document.createElement("button");
      pill.className = "explorer-pill";
      pill.type = "button";
      pill.role = "tab";
      pill.textContent = title;
      pill.setAttribute("aria-label", `Show ${title}`);
      pill.addEventListener("click", () => selectItem(group, index));
      pillList.appendChild(pill);
      return pill;
    });
    if (pillButtons.length) selectItem(group, 0);
  };

  config.groups.forEach((group, groupIndex) => {
    const tab = document.createElement("button");
    tab.className = "explorer-group-tab";
    tab.type = "button";
    tab.role = "tab";
    tab.setAttribute("aria-label", `Show ${group.label} group`);
    tab.innerHTML = `
      <span class="group-dot" style="background: ${group.color}"></span>
      <span>${group.label}</span>
      <span class="group-count">${group.items.length}</span>
    `;
    tab.addEventListener("click", () => renderGroup(groupIndex));
    groupList.appendChild(tab);
    groupTabs.push(tab);
  });

  renderGroup(0);
});
