/**
 * CONCILIAÇÃO UNIVERSITÁRIA - ATENDIMENTO DIRETO
 * Rastreamento de Conversão Google Ads e Conexão WhatsApp
 */

const CONFIG = {
  whatsappNumber: "5518981470791",
  whatsappUrl: "https://wa.me/5518981470791?text=Ol%C3%A1%2C%20desejo%20atendimento",
  defaultMessage: "Olá, desejo atendimento"
};

/**
 * Dispara evento de conversão no Google Ads e gerencia o clique de WhatsApp
 * @param {string} source - Origem do clique ('atendimento', 'duvidas', 'flutuante')
 * @param {Event} event - Evento de clique do DOM
 */
function handleWhatsappClick(source, event) {
  try {
    // Disparo oficial Google Ads
    if (typeof gtag === "function") {
      gtag("event", "generate_lead", {
        event_category: "contact",
        event_label: "whatsapp_" + (source || "geral"),
        send_to: "AW-18428899731",
        value: 1.0,
        currency: "BRL"
      });

      gtag("event", "conversion", {
        send_to: "AW-18428899731"
      });
    }
  } catch (err) {
    console.warn("Analytics event error:", err);
  }
}

// Interações visuais
document.addEventListener("DOMContentLoaded", () => {
  const actionButtons = document.querySelectorAll(".btn-direct-primary, .btn-direct-secondary, .floating-whatsapp-btn");
  actionButtons.forEach((btn) => {
    btn.addEventListener("mousedown", () => {
      btn.style.transform = "scale(0.98)";
    });
    btn.addEventListener("mouseup", () => {
      btn.style.transform = "";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
});
