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
