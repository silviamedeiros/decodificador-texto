const CRYPTO = {
    e: 'enter',
    i: 'imes',
    a: 'ai',
    o: 'ober',
    u: 'ufat',
  }

function pegarMensagem(texto) {
    return `<div class="output-container">
               <span id="#userOutput">${texto}</span> 
              <div class="conteudo__botao">
               <button onclick="copiarTexto()" class="botao__copiar">Copiar</button>
            </div>`
}

function copiarTexto() {
    const outputDiv = document.getElementById("#userOutput");
    const output = output.outerText;
  
    navigator.clipboard.writeText(output).then(function () {
      console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

function criptografar() {
    const inputUsuario = document.getElementById('#textoUsuario');
    if(!inputUsuario.value) {
        return
    }
    const inputCriptografado = criptografarMensagem(inputUsuario.value);
    const html = pegarMensagem(inputCriptografado);
    exibirResultado(html);
}

function criptografarMensagem(inputUsuario) {
    return inputUsuario.split('').map(function(caractere){
        if(Object.keys(CRYPTO).includes(caractere)) {
        return CRYPTO[caractere]
        }
        return caractere
    }).join('') 
  }

  function exibirResultado(html) {
   const outputDiv = document.getElementById('#outputContainer');
   while(outputDiv.firstChild) {
    outputDiv.removeChild(outputDiv.firstChild)
   }
   outputDiv.innerHTML = html
  }

  function descriptografar() {
    const inputUsuario = document.getElementById('#textoUsuario');
    if(!inputUsuario.value) {
        return 
    }
    const inputDescriptografado = descriptografarMensagem(inputUsuario.value);
    const html = pegarMensagem(inputDescriptografado);
    exibirResultado(html)
}

function descriptografarMensagem(inputUsuario) {
    let mensagemDescriptografada = inputUsuario;
    const palavras = inputUsuario.split(' ');
    palavras.forEach(function(palavra){
    const palavraDescriptografada = descriptografarPalavra(palavra);
    mensagemDescriptografada = mensagemDescriptografada.replace(palavra, palavraDescriptografada);
    }) 
    return mensagemDescriptografada 
}

function descriptografarPalavra(palavra ="") {
    let numeroSubstituicoes = 0, _palavra = palavra;
    Object.values(CRYPTO).forEach((valor) => {
        const ocorrencias = numeroOcorrencias(palavra, valor);
        numeroSubstituicoes += ocorrencias;
      });
      if(!numeroSubstituicoes) {
        return palavra 
      }
      Object.entries(CRYPTO).forEach(function([chave, valor]){
        if(_palavra.includes(valor)) {
            _palavra = _palavra.replace(valor, chave);
        }
      })
      return descriptografarPalavra(_palavra);
}

function numeroOcorrencias(palavra, valor) {
    let ocorrencias = 0, index = 0 
    while(true) {
        const proximaOcorrencia = palavra.indexOf(valor, i);
        if (proximaOcorrencia !== -1) { 
            ocorrencias = ocorrencias + 1
            index = proximaOcorrencia + 1
        } 
        else {
            return ocorrencias;
        }
    }
}


