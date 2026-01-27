const titulo = document.getElementById("titulo-principal");
const botaoTema = document.querySelector(".botao-tema");
const textoBotao = botaoTema.querySelector("span");
const body = document.body;
const listaNoHTML = document.querySelector(".meu-menu");
const saibaMais = body.querySelector(".saiba-mais");
const wrapperTexto = document.getElementById("wrapper-texto");
const formulario = document.getElementById("formulario-contato");
const camposComLimite = document.querySelectorAll("[maxlength]");
const botaoMenu = document.getElementById("botao-mobile");
const listaMenuNav = document.querySelectorAll(".menu-nav a");
const listaMenu = document.querySelector(".menu-nav");
const minhaLista = [
    {nome: "HTML", link: "https://developer.mozilla.org/pt-BR/docs/Web/HTML", icone: "fa-brands fa-html5"},
    {nome: "CSS", link: "https://developer.mozilla.org/pt-BR/docs/Web/CSS", icone: "fa-brands fa-css3-alt"},
    {nome: "JavaScript", link: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript", icone: "fa-brands fa-js"},
    {nome: "Videogames", link: "https://store.steampowered.com/", icone: "fa-solid fa-gamepad"},
    {nome: "História", link: "https://pt.wikipedia.org/wiki/Hist%C3%B3ria", icone: "fa-solid fa-landmark"},
    {nome: "GitHub", link: "https://github.com", icone: "fa-brands fa-github"}
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

// Mostra o texto escondido embaixo do primeiro paragrafo da pagina

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

// Cria a primeira lista na pagina

// listaNoHTML.innerHTML = "";

// minhaLista.forEach(function(item) {
//     let novoItem = document.createElement("li");
//     novoItem.innerHTML = `
//     <a href="${item.link}" target="_blank">
//         <i class="${item.icone}"></i>
//         ${item.nome}
//     </a>
//     `;
//     listaNoHTML.appendChild(novoItem);
// });

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

// Reveal dos cards

const observador = new IntersectionObserver(function(entradas) {
    entradas.forEach(function(entrada) {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('card-visivel');

            setTimeout(function() {
                entrada.target.classList.remove('card-escondido');
                entrada.target.classList.remove('card-visivel');
            }, 1000);
            observador.unobserve(entrada.target);
        }
    });
});

const cardsEscondidos = document.querySelectorAll(".card-escondido");

cardsEscondidos.forEach(function(elemento) {
    observador.observe(elemento);
});