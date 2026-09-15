// ==================================================
// VNX ESPORTES
// SISTEMA DE RECRUTAMENTO
// ==================================================


// ==================================================
// CONFIGURAÇÕES
// ==================================================

const ADMIN_EMAIL = "SEU_EMAIL_AQUI";


// ==================================================
// BANCO LOCAL
// ==================================================

// Esta versão funciona diretamente no GitHub Pages.
// Os agendamentos ficam salvos neste navegador.

let candidatos =
    JSON.parse(
        localStorage.getItem("vnx_candidatos")
    ) || [];

let candidatoAtual =
    JSON.parse(
        localStorage.getItem("vnx_candidato_atual")
    ) || null;

let candidatoSelecionado = null;


// ==================================================
// TROCAR TELAS
// ==================================================

function abrirTela(id) {

    document
        .querySelectorAll(".tela")
        .forEach(tela => {

            tela.classList.remove("ativa");

        });

    document
        .getElementById(id)
        .classList.add("ativa");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==================================================
// GERAR DATAS
// SOMENTE SEGUNDA, QUARTA E SEXTA
// ==================================================

function gerarDias() {

    const select =
        document.getElementById("dia");

    select.innerHTML =
        `<option value="">
            Escolha o dia
        </option>`;

    const hoje = new Date();

    for (let i = 0; i < 60; i++) {

        const data = new Date();

        data.setDate(
            hoje.getDate() + i
        );

        const diaSemana =
            data.getDay();

        // 1 = segunda
        // 3 = quarta
        // 5 = sexta

        if (
            diaSemana === 1 ||
            diaSemana === 3 ||
            diaSemana === 5
        ) {

            const ano =
                data.getFullYear();

            const mes =
                String(
                    data.getMonth() + 1
                ).padStart(2, "0");

            const dia =
                String(
                    data.getDate()
                ).padStart(2, "0");

            const valor =
                `${ano}-${mes}-${dia}`;

            const nomeDia =
                data.toLocaleDateString(
                    "pt-BR",
                    {
                        weekday: "long",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    }
                );

            const option =
                document.createElement(
                    "option"
                );

            option.value = valor;

            option.textContent =
                `${nomeDia} — 19:00`;

            select.appendChild(option);
        }
    }
}


// ==================================================
// FORMATAR DATA
// ==================================================

function formatarData(data) {

    if (!data) return "";

    return new Date(
        data + "T00:00:00"
    ).toLocaleDateString(
        "pt-BR",
        {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );
}


// ==================================================
// AGENDAMENTO
// ==================================================

document
    .getElementById("formulario")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const nome =
                document
                    .getElementById("nome")
                    .value
                    .trim();

            const idFreeFire =
                document
                    .getElementById("idFreeFire")
                    .value
                    .trim();

            const idade =
                Number(
                    document
                        .getElementById("idade")
                        .value
                );

            const funcao =
                document
                    .getElementById(
                        "funcaoEscolhida"
                    )
                    .value;

            const dia =
                document
                    .getElementById("dia")
                    .value;


            // Verificação da idade

            if (idade < 15) {

                alert(
                    "O recrutamento é somente para pessoas com 15 anos ou mais."
                );

                return;
            }


            // Criar candidato

            const candidato = {

                id:
                    Date.now(),

                nome:
                    nome,

                idFreeFire:
                    idFreeFire,

                idade:
                    idade,

                funcao:
                    funcao,

                dia:
                    dia,

                horario:
                    "19:00",

                status:
                    "Aguardando recrutamento",

                mensagens: [

                    {
                        tipo: "bot",

                        texto:
                            "Olá! 👋 Seja muito bem-vindo à VNX Esportes!"
                    },

                    {
                        tipo: "bot",

                        texto:
                            "Seu recrutamento foi agendado para " +
                            formatarData(dia) +
                            " às 19:00. ⏰"
                    },

                    {
                        tipo: "bot",

                        texto:
                            "Fique preparado e esteja online alguns minutos antes do horário do recrutamento. 🎮"
                    }

                ]

            };


            candidatos.push(
                candidato
            );


            localStorage.setItem(
                "vnx_candidatos",
                JSON.stringify(candidatos)
            );


            candidatoAtual =
                candidato;

            localStorage.setItem(
                "vnx_candidato_atual",
                JSON.stringify(candidato)
            );


            mostrarAreaCandidato();

        }
    );


// ==================================================
// ÁREA DO CANDIDATO
// ==================================================

function mostrarAreaCandidato() {

    abrirTela(
        "areaCandidato"
    );

    document
        .getElementById(
            "informacoesAgendamento"
        )
        .innerHTML =

        `${candidatoAtual.nome}
        • ID ${candidatoAtual.idFreeFire}
        • ${candidatoAtual.funcao}
        <br>
        📅 ${formatarData(candidatoAtual.dia)}
        • ⏰ 19:00`;

    mostrarMensagens();

}


// ==================================================
// MOSTRAR MENSAGENS
// ==================================================

function mostrarMensagens() {

    const caixa =
        document.getElementById(
            "mensagens"
        );

    caixa.innerHTML = "";


    candidatoAtual.mensagens
        .forEach(
            mensagem => {

                const div =
                    document.createElement(
                        "div"
                    );

                div.classList.add(
                    "mensagem"
                );


                if (
                    mensagem.tipo ===
                    "bot"
                ) {

                    div.classList.add(
                        "bot-msg"
                    );

                    div.innerHTML =
                        `${mensagem.texto}
                        <small>BOT VNX</small>`;

                }

                else if (
                    mensagem.tipo ===
                    "adm"
                ) {

                    div.classList.add(
                        "adm-msg"
                    );

                    div.innerHTML =
                        `${mensagem.texto}
                        <small>ADM</small>`;

                }

                else {

                    div.classList.add(
                        "usuario-msg"
                    );

                    div.innerHTML =
                        `${mensagem.texto}
                        <small>VOCÊ</small>`;

                }


                caixa.appendChild(
                    div
                );

            }
        );


    caixa.scrollTop =
        caixa.scrollHeight;
}


// ==================================================
// CHAT DO CANDIDATO
// ==================================================

document
    .getElementById("formChat")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const input =
                document.getElementById(
                    "mensagem"
                );

            const texto =
                input.value.trim();


            if (!texto)
                return;


            candidatoAtual.mensagens.push({

                tipo:
                    "usuario",

                texto:
                    texto

            });


            const mensagemMinuscula =
                texto.toLowerCase();


            // BOT

            let resposta =
                "Mensagem recebida! 🤖 " +
                "Vou deixar tudo registrado para o administrador. " +
                "Fique preparado para seu recrutamento às 19:00.";


            if (
                mensagemMinuscula.includes(
                    "oi"
                ) ||
                mensagemMinuscula.includes(
                    "olá"
                ) ||
                mensagemMinuscula.includes(
                    "bom dia"
                ) ||
                mensagemMinuscula.includes(
                    "boa tarde"
                )
            ) {

                resposta =
                    "Olá! 👋 Seja bem-vindo à VNX Esportes! " +
                    "Estou aqui para ajudar. " +
                    "Caso precise falar com o ADM, sua mensagem será encaminhada.";

            }


            if (
                mensagemMinuscula.includes(
                    "horário"
                ) ||
                mensagemMinuscula.includes(
                    "hora"
                ) ||
                mensagemMinuscula.includes(
                    "19"
                )
            ) {

                resposta =
                    "Seu recrutamento está marcado para 19:00. ⏰ " +
                    "Fique online alguns minutos antes e preparado para participar.";

            }


            candidatoAtual.mensagens.push({

                tipo:
                    "bot",

                texto:
                    resposta

            });


            salvarAtual();

            mostrarMensagens();

            input.value = "";

        }
    );


// ==================================================
// SALVAR CANDIDATO ATUAL
// ==================================================

function salvarAtual() {

    const indice =
        candidatos.findIndex(
            c =>
                c.id ===
                candidatoAtual.id
        );


    if (indice !== -1) {

        candidatos[indice] =
            candidatoAtual;

    }


    localStorage.setItem(
        "vnx_candidatos",
        JSON.stringify(candidatos)
    );

    localStorage.setItem(
        "vnx_candidato_atual",
        JSON.stringify(candidatoAtual)
    );

}


// ==================================================
// PAINEL DO ADM
// ==================================================

function abrirPainelAdm() {

    abrirTela(
        "painelAdm"
    );

    carregarCandidatos();

}


// ==================================================
// LISTA DE CANDIDATOS
// ==================================================

function carregarCandidatos() {

    const lista =
        document.getElementById(
            "listaCandidatos"
        );

    lista.innerHTML = "";


    if (candidatos.length === 0) {

        lista.innerHTML =
            "<p style='color:#999;text-align:center'>" +
            "Nenhum recrutamento ainda." +
            "</p>";

        return;
    }


    candidatos.forEach(
        candidato => {

            const div =
                document.createElement(
                    "div"
                );

            div.classList.add(
                "candidato"
            );


            div.innerHTML =

                `<b>
                    ${candidato.nome}
                </b>

                <small>
                    🆔 ID:
                    ${candidato.idFreeFire}
                    <br>

                    🎯
                    ${candidato.funcao}
                    <br>

                    📅
                    ${formatarData(
                        candidato.dia
                    )}
                    às 19:00
                </small>`;


            div.onclick =
                function() {

                    selecionarCandidato(
                        candidato.id
                    );

                };


            lista.appendChild(
                div
            );

        }
    );

}


// ==================================================
// SELECIONAR CANDIDATO
// ==================================================

function selecionarCandidato(
    id
) {

    candidatoSelecionado =
        candidatos.find(
            candidato =>
                candidato.id === id
        );


    if (!candidatoSelecionado)
        return;


    document
        .getElementById(
            "nomeChatAdm"
        )
        .textContent =

        `${candidatoSelecionado.nome}
        • ID ${candidatoSelecionado.idFreeFire}`;


    const mensagens =
        document.getElementById(
            "mensagensAdm"
        );

    mensagens.innerHTML = "";


    candidatoSelecionado
        .mensagens
        .forEach(
            mensagem => {

                const div =
                    document.createElement(
                        "div"
                    );

                div.classList.add(
                    "mensagem"
                );


                if (
                    mensagem.tipo ===
                    "bot"
                ) {

                    div.classList.add(
                        "bot-msg"
                    );

                    div.innerHTML =
                        `${mensagem.texto}
                        <small>BOT VNX</small>`;

                }

                else if (
                    mensagem.tipo ===
                    "adm"
                ) {

                    div.classList.add(
                        "adm-msg"
                    );

                    div.innerHTML =
                        `${mensagem.texto}
                        <small>ADM</small>`;

                }

                else {

                    div.classList.add(
                        "usuario-msg"
                    );

                    div.innerHTML =
                        `${mensagem.texto}
                        <small>CANDIDATO</small>`;

                }


                mensagens.appendChild(
                    div
                );

            }
        );


    mensagens.scrollTop =
        mensagens.scrollHeight;


    document
        .getElementById(
            "formChatAdm"
        )
        .classList.remove(
            "escondido"
        );

}


// ==================================================
// CHAT DO ADM
// ==================================================

document
    .getElementById(
        "formChatAdm"
    )
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            if (
                !candidatoSelecionado
            )
                return;


            const input =
                document.getElementById(
                    "mensagemAdm"
                );


            const texto =
                input.value.trim();


            if (!texto)
                return;


            candidatoSelecionado
                .mensagens
                .push({

                    tipo:
                        "adm",

                    texto:
                        texto

                });


            salvarCandidatoSelecionado();

            selecionarCandidato(
                candidatoSelecionado.id
            );


            input.value = "";

        }
    );


// ==================================================
// SALVAR CANDIDATO ADM
// ==================================================

function salvarCandidatoSelecionado() {

    const indice =
        candidatos.findIndex(
            c =>
                c.id ===
                candidatoSelecionado.id
        );


    if (indice !== -1) {

        candidatos[indice] =
            candidatoSelecionado;

    }


    localStorage.setItem(
        "vnx_candidatos",
        JSON.stringify(candidatos)
    );

}


// ==================================================
// SAIR
// ==================================================

function sairDaArea() {

    candidatoAtual = null;

    candidatoSelecionado = null;

    localStorage.removeItem(
        "vnx_candidato_atual"
    );

    abrirTela(
        "inicio"
    );

}


// ==================================================
// TECLA SECRETA DO ADM
// ==================================================
//
// Para abrir o painel:
// clique no logo VNX 5 vezes.
// Depois será solicitado seu e-mail.
//

let cliquesLogo = 0;

document
    .querySelector(".logo")
    .addEventListener(
        "click",
        function() {

            cliquesLogo++;

            if (
                cliquesLogo >= 5
            ) {

                const email =
                    prompt(
                        "Digite o e-mail do ADM:"
                    );


                if (
                    email &&
                    email.toLowerCase() ===
                    ADMIN_EMAIL.toLowerCase()
                ) {

                    abrirPainelAdm();

                }

                else {

                    alert(
                        "Acesso negado."
                    );

                }


                cliquesLogo = 0;

            }

        }
    );


// ==================================================
// INICIALIZAÇÃO
// ==================================================

gerarDias();


// Recuperar candidato se a página for atualizada

if (candidatoAtual) {

    mostrarAreaCandidato();

}