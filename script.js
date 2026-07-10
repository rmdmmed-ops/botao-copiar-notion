const copyButton = document.getElementById("copyButton");
const copyLabel = document.getElementById("copyLabel");
const clinicalText = document.getElementById("clinicalText");
const toast = document.getElementById("toast");

let resetTimer;

async function copyClinicalText() {
  const text = clinicalText.value.trimEnd();

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    clinicalText.focus();
    clinicalText.select();
    document.execCommand("copy");
    clinicalText.setSelectionRange(0, 0);
  }

  showCopiedState();
}

function showCopiedState() {
  window.clearTimeout(resetTimer);
  copyButton.classList.add("is-copied");
  toast.classList.add("is-visible");
  copyLabel.textContent = "Copiado";

  resetTimer = window.setTimeout(() => {
    copyButton.classList.remove("is-copied");
    toast.classList.remove("is-visible");
    copyLabel.textContent = "Copiar";
  }, 1600);
}

copyButton.addEventListener("click", copyClinicalText);
