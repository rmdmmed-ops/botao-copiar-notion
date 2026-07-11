const initialText = document.getElementById("initialText");
const reevaluationText = document.getElementById("reevaluationText");
const copyButtons = document.querySelectorAll("[data-copy]");
const toast = document.getElementById("toast");

let resetTimer;

function getText(part) {
  const initial = initialText.value.trim();
  const reevaluation = reevaluationText.value.trim();

  if (part === "initial") return initial;
  if (part === "reevaluation") return reevaluation;
  return `${initial}\n\n${reevaluation}`;
}

async function writeToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }
}

function showCopiedState(button) {
  window.clearTimeout(resetTimer);
  const label = button.querySelector("span:last-child");
  const originalLabel = label.textContent;

  copyButtons.forEach((item) => item.classList.remove("is-copied"));
  button.classList.add("is-copied");
  label.textContent = "Copiado";
  toast.textContent = `${originalLabel} copiado`;
  toast.classList.add("is-visible");

  resetTimer = window.setTimeout(() => {
    button.classList.remove("is-copied");
    label.textContent = originalLabel;
    toast.classList.remove("is-visible");
  }, 1600);
}

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    await writeToClipboard(getText(button.dataset.copy));
    showCopiedState(button);
  });
});
