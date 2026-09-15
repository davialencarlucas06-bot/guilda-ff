// ================================
// CONFIGURAÇÃO
// ================================

// COLOQUE AQUI O NÚMERO DO WHATSAPP DA VNX
// Exemplo: 5531999999999
const whatsapp = "5531999999999";


// ================================
// DATA MÍNIMA
// ================================

const campoData = document.getElementById("data");

const hoje = new Date();

const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dia = String(hoje.getDate()).padStart(2, "0");

campoData.min = `${ano}-${mes}-${dia}`;


// ================================
// AGENDAMENTO
// ================================

document
    .getElementById("formAgendamento")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const nick = document.getElementById("nick").value.trim();
        const idade = Number(document.getElementById("idade").value);
        const funcao = document.getElementById("funcao").value;
        const data = document.getElementById("data").value;

        // Verificação de idade

        if (idade < 15) {

            document.getElementById("mensagem").innerHTML =
                "❌ O recrutamento é permitido apenas para jogadores com 15 anos ou mais.";

            return;
        }


        // Verificação da data

        if (!data) {

            document.getElementById("mensagem").innerHTML =
                "❌ Escolha uma data para o recrutamento.";

            return;
        }


        // Converte a data

        const dataFormatada =
            new Date(data + "T00:00:00")
            .toLocaleDateString("pt-BR");


        // Mensagem do WhatsApp

        const mensagem =
`🔥 *VNX ESPORTES — RECRUTAMENTO*

Olá! Quero agendar meu recrutamento.

👤 *Nome:* ${nome}
🎮 *Nick:* ${nick}
🎂 *Idade:* ${idade} anos
🎯 *Função:* ${funcao}

📅 *Data:* ${dataFormatada}
⏰ *Horário:* 19:00

✅ Aguardo a confirmação do recrutamento.

VNX ESPORTES
RECRUTAMENTO ON
VAGAS ABERTAS`;


        // Cria o link

        const link =
            `https://wa.me/${whatsapp}?text=` +
            encodeURIComponent(mensagem);


        // Mensagem na página

        document.getElementById("mensagem").innerHTML =
            "✅ Agendamento preparado! Abrindo o WhatsApp...";


        // Abre WhatsApp

        window.open(link, "_blank");

});