const titulo = document.getElementById("titulo-principal");
const botaoTema = document.querySelector(".botao-tema");
const textoBotao = botaoTema.querySelector("span");
const body = document.body;
const listaDeCards = document.querySelector(".meu-menu");
const saibaMais = body.querySelector(".saiba-mais");
const wrapperTexto = document.getElementById("wrapper-texto");
const formulario = document.getElementById("formulario-contato");
const camposComLimite = document.querySelectorAll("[maxlength]");
const botaoMenu = document.getElementById("botao-mobile");
const listaMenuNav = document.querySelectorAll(".menu-nav a");
const listaMenu = document.querySelector(".menu-nav");
const campoBusca = document.getElementById("campo-busca");

const listaDeProjetos = [
    {nome: "Projeto 1", descricao: "Landing Page Advogados", imagem: "https://picsum.photos/300/200?random=1", link: "#"},
    {nome: "Projeto 2", descricao: "E-Commerce de Roupas", imagem: "https://picsum.photos/300/200?random=2", link: "#"},
    {nome: "Projeto 3", descricao: "Dashboard Financeiro", imagem: "https://picsum.photos/300/200?random=3", link: "#"},
    {nome: "Projeto 4", descricao: "Blog Pessoal", imagem: "https://picsum.photos/300/200?random=4", link: "#"},
    {nome: "Projeto 5", descricao: "App de Delivery", imagem: "https://picsum.photos/300/200?random=5", link: "#"},
    {nome: "Projeto 6", descricao: "Portfólio Antigo", imagem: "https://picsum.photos/300/200?random=6", link: "#"},
];

// Trocar botaoTema. Modo claro/escuro
function trocarTema() {
    body.classList.toggle("modo-claro");
    if (textoBotao.innerText === "Modo Claro") {
        textoBotao.innerText = "Modo Escuro"
    } else {
        textoBotao.innerText = "Modo Claro"
    }
}

// Altera o texto do título Principal
function mudarTexto() {
    titulo.classList.toggle("texto-ativo")
    if (titulo.innerText === "Felipe Souza") {
        titulo.innerText = "Bem vindo ao meu portfólio!";
    } else {
        titulo.innerText = "Felipe Souza";
    }
}

// Mostra o texto escondido
function mostrarTexto() {
        wrapperTexto.classList.toggle("escondido");
        saibaMais.classList.toggle("girar-icone");
}

function abrirMenu() {
    listaMenu.classList.toggle("aberto");
};

listaMenuNav.forEach(function(link) {  
    function fechaMenuNav() {
        listaMenu.classList.remove("aberto");
    }
    link.addEventListener("click", fechaMenuNav);   
}) 

// Criar os cards e limpar HTML anterior

// listaDeProjetos.filter(function(projeto) {
//     return projeto.nome === "Projeto 1" || projeto.nome === "Projeto 3";
// })

// .forEach(function(card, index) {
//     let novoCard = document.createElement("li");
//     novoCard.classList.add("card-projeto", "card-escondido");
    
//     // Cálculo do delay (Efeito Escadinha)
//     novoCard.style.transitionDelay = `${(index % 3) * 200}ms`;

//     novoCard.innerHTML = `
//         <div class="capa-projeto">
//             <img src="${card.imagem}" alt="Preview do projeto.">
//         </div>
//         <div class="info-projeto">
//             <h4>${card.nome}</h4>
//             <p>${card.descricao}</p>
//             <a href="${card.link}" class="btn-projeto">Ver detalhes</a>
//         </div>        
//     `;
//     listaDeCards.appendChild(novoCard);
// });

// Reveal dos cards (Porteiro)
const observador = new IntersectionObserver(function(entradas) {
    entradas.forEach(function(entrada) {
        if (entrada.isIntersecting) {
            // 1. Aparece
            entrada.target.classList.add('card-visivel');

            // 2. Faxina (remove delay e classes de animação após 1s)
            setTimeout(function() {
                entrada.target.style.transitionDelay = "0s";
                entrada.target.classList.remove('card-escondido');
                entrada.target.classList.remove('card-visivel');
            }, 1000);

            // 3. Para de vigiar
            observador.unobserve(entrada.target);
        }
    });
});

function criarCards(lista) {
    listaDeCards.innerHTML = "";
    lista.forEach(function(card, index) {
        let novoCard = document.createElement("li");
        novoCard.classList.add("card-projeto", "card-escondido");
        novoCard.style.transitionDelay = `${(index % 3) * 200}ms`;

        novoCard.innerHTML = `
            <div class="capa-projeto">
                <img src="${card.imagem}" alt="Preview do projeto.">
            </div>
            <div class="info-projeto">
                <h4>${card.nome}</h4>
                <p>${card.descricao}</p>
                <a href="${card.link}" class="btn-projeto">Ver detalhes</a>
            </div>
        `;
        listaDeCards.appendChild(novoCard);
        observador.observe(novoCard);

    });
}

criarCards(listaDeProjetos);

campoBusca.addEventListener("input", function() {
    const termoDigitado = campoBusca.value.toLowerCase();
    const listaFiltrada = listaDeProjetos.filter(function(projeto) {
        return projeto.nome.toLowerCase().includes(termoDigitado) || projeto.descricao.toLowerCase().includes(termoDigitado);
    });
    criarCards(listaFiltrada);
});

// Escutadores de evento
titulo.addEventListener("click", mudarTexto);
botaoTema.addEventListener("click", trocarTema);
saibaMais.addEventListener("click", mostrarTexto);
botaoMenu.addEventListener("click", abrirMenu);

// Captura o submit do formulario
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nomeInput = document.getElementById("nome");
    const mensagemInput = document.getElementById("mensagem");
    const erroNome = nomeInput.parentElement.querySelector(".mensagem-erro");
    const erroMensagem = mensagemInput.parentElement.querySelector(".mensagem-erro");
    const emailInput = document.getElementById("email");
    const erroEmail = emailInput.parentElement.querySelector(".mensagem-erro");

    let formularioValido = true;

    if (nomeInput.value.trim().length < 3) {
        erroNome.innerText = "Por favor, digite um nome real (mínimo 3 letras).";
        nomeInput.style.borderColor = "#ff4d4d";
        formularioValido = false;
    } else {
        erroNome.innerText = "";
        nomeInput.style.borderColor = "";
    }

    if (emailInput.value.trim().length < 10 || !emailInput.value.includes("@") || !emailInput.value.includes(".")) {
        erroEmail.innerText = "Por favor, digite um email válido (ex.: seunome@email.com.br).";
        emailInput.style.borderColor = "#ff4d4d";
        formularioValido = false;
    } else {
        erroEmail.innerText = "";
        emailInput.style.borderColor = "";
    }

    if (mensagemInput.value.trim().length < 10) {
        erroMensagem.innerText = "Sua mensagem está muito curta. Por favor escreva mais (mínimo 10 letras).";
        mensagemInput.style.borderColor = "#ff4d4d";
        formularioValido = false;
    } else {
        erroMensagem.innerText = "";
        mensagemInput.style.borderColor = "";
    }

    if (formularioValido) {
        const nome = nomeInput.value;
        const botaoFormulario = formulario.querySelector("button");
        const textoOriginal = botaoFormulario.innerText;

        botaoFormulario.innerText = "Enviando...";
        botaoFormulario.disabled = true;

        setTimeout(function() {
            alert("Valeu, " + nome + "! Agora seu cérebro de programador validou os dados.");

            formulario.reset();
            botaoFormulario.innerText = "Sucesso!";
            botaoFormulario.style.backgroundColor = "#2ecc71";
            botaoFormulario.style.border = "3px solid #2ecc71";

            setTimeout(() => {
                botaoFormulario.innerText = textoOriginal;
                botaoFormulario.style.backgroundColor = "";
                botaoFormulario.disabled = false;
            }, 2000);
        }, 1500);
    }
});

// Contador de caracteres do fomulario
camposComLimite.forEach(function(campo) {
    const limiteMaximo = campo.getAttribute("maxlength");
    const pai = campo.parentElement;
    const spanContador = pai.querySelector(".contador");
    if (!spanContador) return;
    campo.addEventListener("input", function() {
        const tamanhoAtual = campo.value.length;
        spanContador.innerText = `${tamanhoAtual}/${limiteMaximo}`;
    });
});

// const cardsEscondidos = document.querySelectorAll(".card-escondido");

// cardsEscondidos.forEach(function(elemento) {
//     observador.observe(elemento);
// });