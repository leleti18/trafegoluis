/**
 * SIMULADOR DE RENEGOCIAÇÃO DE CONTRATOS UNIVERSITÁRIOS & ACORDOS
 * Versão Express: 2 Perguntas Objetivas
 */
const CONFIG = {
  whatsappNumber: "5518981470791",
  whatsappUrl: "https://wa.me/5518981470791?text=Ol%C3%A1%2C%20desejo%20atendimento",
  defaultMessage: "Olá, desejo atendimento",
};

const questions = [
  {
    stage: "Etapa 1 de 2",
    title: "Qual é a origem principal da pendência na faculdade?",
    options: [
      "Acordo anterior que foi descumprido / quebrou",
      "Contrato transferido para assessoria jurídica ou cartório",
      "Renegociação Universitária"
    ]
  },
  {
    stage: "Etapa 2 de 2",
    title: "Qual o valor total estimado da pendência com correções acumuladas?",
    options: [
      "Até R$ 4.000,00",
      "De R$ 4.000,00 a R$ 10.000,00",
      "De R$ 10.000,00 a R$ 25.000,00",
      "Acima de R$ 25.000,00"
    ]
  }
];

let currentIdx = 0;
const selectedAnswers = [];

const paneIntro = document.getElementById("pane-intro");
const paneLoading = document.getElementById("pane-loading");
const paneResult = document.getElementById("pane-result");
const questionsOutlet = document.getElementById("questions-outlet");
const lineFill = document.getElementById("lineFill");
const phaseChip = document.getElementById("phaseChip");

function initGarantiaQuiz() {
  questions.forEach((q, i) => {
    const pane = document.createElement("section");
    pane.className = "card-screen";
    pane.id = `pane-q-${i}`;

    let tilesHtml = "";
    q.options.forEach((optText, oIdx) => {
      const letter = String.fromCharCode(65 + oIdx);
      tilesHtml += `
        <button type="button" class="btn-opt-tile" onclick="chooseTile(${i}, ${oIdx}, this)">
          <span class="opt-index">${letter}</span>
          <span>${optText}</span>
        </button>
      `;
    });

    pane.innerHTML = `
      <div class="quest-stage">${q.stage}</div>
      <h2 class="quest-header-text">${q.title}</h2>
      <div class="btn-options-container">${tilesHtml}</div>
      <div class="tile-bottom-nav">
        <button type="button" class="btn-opt-back" onclick="retreatStep(${i})">
          ← Voltar
        </button>
        <span style="font-size:11.5px;color:#94a3b8">Mediação e anistia de encargos</span>
      </div>
    `;

    questionsOutlet.appendChild(pane);
  });
}

function openSimulation() {
  paneIntro.classList.remove("active");
  bringStep(0);
}

function bringStep(idx) {
  questions.forEach((_, i) => {
    const el = document.getElementById(`pane-q-${i}`);
    if (el) el.classList.remove("active");
  });

  const curr = document.getElementById(`pane-q-${idx}`);
  if (curr) curr.classList.add("active");

  currentIdx = idx;
  const pct = ((idx + 1) / (questions.length + 1)) * 100;
  lineFill.style.width = `${pct}%`;
  phaseChip.textContent = `Etapa ${idx + 1} de ${questions.length}`;
}

function chooseTile(qIdx, optIdx, element) {
  const container = element.parentElement;
  container.querySelectorAll(".btn-opt-tile").forEach(b => b.classList.remove("selected"));
  element.classList.add("selected");

  selectedAnswers[qIdx] = questions[qIdx].options[optIdx];

  setTimeout(() => {
    if (qIdx + 1 < questions.length) {
      bringStep(qIdx + 1);
    } else {
      executeAnalysis();
    }
  }, 260);
}

function retreatStep(idx) {
  if (idx === 0) {
    document.getElementById("pane-q-0").classList.remove("active");
    paneIntro.classList.add("active");
    lineFill.style.width = "0%";
    phaseChip.textContent = "Início";
  } else {
    bringStep(idx - 1);
  }
}

function executeAnalysis() {
  questions.forEach((_, i) => {
    const el = document.getElementById(`pane-q-${i}`);
    if (el) el.classList.remove("active");
  });

  lineFill.style.width = "100%";
  phaseChip.textContent = "Finalizando";
  paneLoading.classList.add("active");

  const phrases = [
    "Analisando Contratos e Cobranças...",
    "Calculando Deságio de Juros e Multas...",
    "Estruturando Parcelas de até 36x sem Acréscimo...",
    "Emitindo Termo de Conciliação..."
  ];

  let step = 0;
  const timer = setInterval(() => {
    step++;
    if (step === 1) document.getElementById("bstep-2").classList.add("active-step");
    if (step === 2) document.getElementById("bstep-3").classList.add("active-step");
    if (step < phrases.length) {
      document.getElementById("loaderCaption").textContent = phrases[step];
    }
  }, 650);

  setTimeout(() => {
    clearInterval(timer);
    paneLoading.classList.remove("active");
    renderPrimeResult();
  }, 2200);
}

function renderPrimeResult() {
  paneResult.classList.add("active");
  phaseChip.textContent = "Autorizado";

  const origem = selectedAnswers[0] || "Acordo / Contrato Educacional";
  const valor = selectedAnswers[1] || "R$ 4.000 a R$ 10.000";

  document.getElementById("deckOrigem").textContent = origem;
  document.getElementById("deckValor").textContent = valor;
  document.getElementById("deckCobranca").textContent = "Suspensão de ligações autorizada";

  // Garante que o botão/link use a URL exata configurada
  const btnAction = document.getElementById("btnWhatsappAction");
  if (btnAction) {
    btnAction.href = CONFIG.whatsappUrl;
  }
}

function consultantWhatsapp(event) {
  if (typeof gtag === "function") {
    gtag('event', 'generate_lead', {
      event_category: 'engagement',
      event_label: 'whatsapp_click'
    });
  }
  if (event) {
    // Permite fluxo natural do clique se for elemento <a>
    return;
  }
  const link = CONFIG.whatsappUrl;
  window.open(link, "_blank");
}

document.addEventListener("DOMContentLoaded", initGarantiaQuiz);
