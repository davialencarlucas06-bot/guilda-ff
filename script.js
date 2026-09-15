/* =========================================
   VNX ESPORTES
   SISTEMA DE RECRUTAMENTO
========================================= */


/* =========================================
   LINK DO GRUPO
========================================= */

const WHATSAPP_GROUP =
  "https://chat.whatsapp.com/KqXvIWJYEN1LA9CCGao8bN?s=cl&p=i&mlu=4";


/* =========================================
   NAVEGAÇÃO ENTRE TELAS
========================================= */

function showScreen(screenId) {

  const screens =
    document.querySelectorAll(".screen");

  screens.forEach(screen => {

    screen.classList.add("hidden");

  });


  const selectedScreen =
    document.getElementById(screenId);


  if (selectedScreen) {

    selectedScreen.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

}


/* =========================================
   VERIFICAR DIA
========================================= */

function isValidDay(day) {

  const validDays = [
    "Segunda-feira",
    "Quarta-feira",
    "Sexta-feira"
  ];

  return validDays.includes(day);

}


/* =========================================
   ENVIAR INSCRIÇÃO
========================================= */

function submitRegistration() {

  const playerId =
    document
      .getElementById("playerId")
      .value
      .trim();


  const age =
    Number(
      document
        .getElementById("playerAge")
        .value
    );


  const role =
    document
      .getElementById("playerRole")
      .value;


  const day =
    document
      .getElementById("recruitmentDay")
      .value;


  const error =
    document.getElementById("formError");


  error.textContent = "";


  /* =========================
     VALIDAÇÕES
  ========================== */

  if (!playerId) {

    error.textContent =
      "Digite seu ID do Free Fire.";

    return;
  }


  if (!/^[0-9]+$/.test(playerId)) {

    error.textContent =
      "O ID deve conter apenas números.";

    return;
  }


  if (!age) {

    error.textContent =
      "Digite sua idade.";

    return;
  }


  if (age < 15) {

    error.textContent =
      "A idade mínima para participar é 15 anos.";

    return;
  }


  if (!role) {

    error.textContent =
      "Escolha uma função.";

    return;
  }


  if (!day) {

    error.textContent =
      "Escolha o dia do recrutamento.";

    return;
  }


  if (!isValidDay(day)) {

    error.textContent =
      "Escolha um dia válido de recrutamento.";

    return;
  }


  /* =========================
     CRIAR DADOS
  ========================== */

  const registration = {

    id: playerId,

    age: age,

    role: role,

    day: day,

    time: "19:00",

    createdAt:
      new Date().toISOString()

  };


  /* =========================
     SALVAR NO NAVEGADOR
  ========================== */

  localStorage.setItem(
    "vnxRegistration",
    JSON.stringify(registration)
  );


  /* =========================
     MOSTRAR CONFIRMAÇÃO
  ========================== */

  showConfirmation(registration);

}


/* =========================================
   MOSTRAR CONFIRMAÇÃO
========================================= */

function showConfirmation(data) {

  const summary =
    document.getElementById(
      "registrationSummary"
    );


  summary.innerHTML = `

    <div class="summary-row">

      <span>ID</span>

      <strong>
        ${escapeHtml(data.id)}
      </strong>

    </div>


    <div class="summary-row">

      <span>Idade</span>

      <strong>
        ${escapeHtml(data.age)}
      </strong>

    </div>


    <div class="summary-row">

      <span>Função</span>

      <strong>
        ${escapeHtml(data.role)}
      </strong>

    </div>


    <div class="summary-row">

      <span>Dia</span>

      <strong>
        ${escapeHtml(data.day)}
      </strong>

    </div>


    <div class="summary-row">

      <span>Horário</span>

      <strong>
        19:00
      </strong>

    </div>

  `;


  const whatsappButton =
    document.querySelector(
      ".whatsapp-button"
    );


  whatsappButton.href =
    WHATSAPP_GROUP;


  showScreen(
    "confirmationScreen"
  );

}


/* =========================================
   SEGURANÇA BÁSICA PARA TEXTO
========================================= */

function escapeHtml(value) {

  return String(value)

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");

}


/* =========================================
   CARREGAR INSCRIÇÃO SALVA
========================================= */

function loadPreviousRegistration() {

  const saved =
    localStorage.getItem(
      "vnxRegistration"
    );


  if (!saved) {

    return;

  }


  try {

    const registration =
      JSON.parse(saved);


    if (
      registration &&
      registration.id &&
      registration.role &&
      registration.day
    ) {

      console.log(
        "Inscrição VNX encontrada:",
        registration
      );

    }

  } catch (error) {

    console.error(
      "Erro ao carregar inscrição.",
      error
    );

  }

}


/* =========================================
   INICIALIZAÇÃO
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadPreviousRegistration();

    showScreen("homeScreen");

  }
);