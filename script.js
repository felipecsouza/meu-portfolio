const titulo = document.getElementById("titulo-principal");
const botaoTema = document.querySelector(".botao-tema");
const textoBotao = botaoTema.querySelector("span");
const body = document.body;
const listaNoHTML = document.querySelector(".meu-menu");
const saibaMais = body.querySelector(".saiba-mais");
const wrapperTexto = document.getElementById("wrapper-texto");
const formulario = document.getElementById("formulario-contato");
const camposComLimite = document.querySelectorAll("[maxlength]");
const minhaLista = [
    {nome: "HTML", link: "https://developer.mozilla.org/pt-BR/docs/Web/HTML", icone: "fa-brands fa-html5"},
    {nome: "CSS", link: "https://developer.mozilla.org/pt-BR/docs/Web/CSS", icone: "fa-brands fa-css3-alt"},
    {nome: "JavaScript", link: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript", icone: "fa-brands fa-js"},
    {nome: "Videogames", link: "https://store.steampowered.com/", icone: "fa-solid fa-gamepad"},
    {nome: "História", link: "https://pt.wikipedia.org/wiki/Hist%C3%B3ria", icone: "fa-solid fa-landmark"},
    {nome: "GitHub", link: "https://github.com", icone: "fa-brands fa-github"}
];

function trocarTema() {
    body.classList.toggle("modo-claro");
    if (textoBotao.innerText === "Modo Claro") {
        textoBotao.innerText = "Modo Escuro"
    } else {
        textoBotao.innerText = "Modo Claro"
    }
}

function mudarTexto() {
    titulo.classList.toggle("texto-ativo")
    if (titulo.innerText === "Felipe Souza") {
        titulo.innerText = "Bem vindo ao meu portfólio!";
    } else {
        titulo.innerText = "Felipe Souza";
    }
}

function mostrarTexto() {
        wrapperTexto.classList.toggle("escondido");
        saibaMais.classList.toggle("girar-icone");
}

listaNoHTML.innerHTML = "";

minhaLista.forEach(function(item) {
    let novoItem = document.createElement("li");
    novoItem.innerHTML = `
    <a href="${item.link}" target="_blank">
        <i class="${item.icone}"></i>
        ${item.nome}
    </a>
    `;
    listaNoHTML.appendChild(novoItem);
});

titulo.addEventListener("click", mudarTexto);

botaoTema.addEventListener("click", trocarTema);

saibaMais.addEventListener("click", mostrarTexto);

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;
    
    console.log("Formulário enviado por: " + nome);
    
    const botaoFormulario = formulario.querySelector("button");
    const textoOriginal = botaoFormulario.innerText;
    
    botaoFormulario.innerText = "Enviado!";
    botaoFormulario.style.backgroundColor = "#2ecc71";
    botaoFormulario.style.border = "3px solid #2ecc71";
    botaoFormulario.style.transform = "scale(1.05)";

    alert("Valeu, " + nome + "! Sua mensagem foi enviada com sucesso (de mentirinha).");

    setTimeout(function() {
        formulario.reset();
        botaoFormulario.innerText = textoOriginal;
        botaoFormulario.style.backgroundColor = "";
        botaoFormulario.style.border = "";
        botaoFormulario.style.transform = "";
    }, 3000);
});

camposComLimite.forEach(function(campo) {
    const limiteMaximo = campo.getAttribute("maxlength");
    const spanContador = campo.nextElementSibling;
    if (!spanContador) return;
    campo.addEventListener("input", function() {
        const tamanhoAtual = campo.value.length;
        spanContador.innerText = `${tamanhoAtual}/${limiteMaximo}`;
    });
})