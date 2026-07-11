const copyButtons = document.querySelectorAll("[data-copy]");
const toast = document.getElementById("toast");

const template = {
  initial: `QUEIXA PRINCIPAL/HISTÓRIA DA DOENÇA ATUAL: DOR NO LOCAL APÓS TRAUMA DIRETO. NEGA FEBRE E OUTROS SINTOMAS.

EXAME FÍSICO: BOM ESTADO GERAL, AFEBRIL, DEAMBULANDO COM CARGA TOTAL. DOR À PALPAÇÃO LOCAL. EDEMA ++/4 E EQUIMOSE PRESENTES. AMPLITUDE DE MOVIMENTO PRESERVADA, PORÉM DOLOROSA À MOBILIZAÇÃO. SEM DÉFICITS NEUROLÓGICOS. EXAME NEUROVASCULAR DISTAL PRESERVADO.`,
  reevaluation: `RADIOGRAFIA: SEM EVIDÊNCIAS DE FRATURA. PRESENÇA DE SINAIS DEGENERATIVOS.

HIPÓTESE DIAGNÓSTICA: CONTUSÃO. CID-10: T14.0.

CONDUTA: ANALGESIA. ORIENTADO QUANTO AOS SINAIS DE ALERTA E À NECESSIDADE DE RETORNO IMEDIATO EM CASO DE PIORA DA DOR, EDEMA IMPORTANTE, FEBRE OU NOVOS SINTOMAS. MANTER SEGUIMENTO AMBULATORIAL.`,
};

let resetTimer;

function getText(part) {
  if (part === "initial") return template.initial;
  if (part === "reevaluation") return template.reevaluation;
  return `${template.initial}\n\n${template.reevaluation}`;
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
