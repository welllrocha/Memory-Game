// métodos estáticos não podem acessar o "this"
// por isso, não  colocar o util no construtor
const util = Util


// Substitui o local da imagem SRC src="./Arquivos/batman.png" e add name=""

const ID_CONTEUDO = "conteudo"
const ID_BTN_JOGAR = "jogar"
const ID_MENSAGEM = "mensagem"
const CLASSE_INVISIVEL = "invisible"
const ID_CARREGANDO = "carregando"
const ID_CONTADOR = "contador"
const ID_BTN_MOSTRAR_TUDO = "mostrarTudo" // botao
const SOM_ACERTOU = new Audio() // Inserir Som - dar PLAY dentro da mensagem SUCESSO
SOM_ACERTOU.src= "./audios/coin.wav"
const ID_DISPLAY = "display"
const ID_CRONO = "crono"
            

const MENSAGENS = {
    sucesso: {
        texto: "Combinação Correta!",
        classe: "alert-success"
    },
    erro: {
        texto: "Combinação Incorreta!",
        classe: "alert-danger"
    }
}
class Tela {

    // ---------------------------- 
    //          IMAGENS
    // ----------------------------

    static obterCodigoHtml(item) {
        // O .img e .nome será criado no arquivo "index.js"
        /* Se eu colocar isso abaixo da img src: <img class="fundo-carta" src="./Arquivos/padrao.png">
        Vai gerar o fundo da carta. */
        return `
        <div  class="col-md-3"> <!--BATMAN-->
            <div class="card" style="width: 50%;" onclick="window.verificarSelecao('${item.id}' , '${item.nome}')">
                <img src="${item.img}" name="${item.nome}"class="card-img-top" alt="Heróis">
                
            </div>
            
            <br>
        </div>
        `
    }

    static configurarBotaoVerificarSelecao (funcaoOnClick) {
        window.verificarSelecao = funcaoOnClick
    }
    
    
    // *** Crio aqui 
    static alterarConteudoHTML (codigoHtml) {
        const conteudo = document.getElementById(ID_CONTEUDO) // Esse ID_CONTEUDO tenho que criar na index.html na div id= 'conteudo'
        conteudo.innerHTML = codigoHtml
    }
    // Esse .map() vem da classe array e ele vai passar por cada um dos itens parecido com o "FOR OF" e ele vai chamar essa função que tiver dentro dele para cada um dos itens. 
    // Para cada um dos itens nós vamos chamar o "obterCodigoHtml" para gerar uma string grandona automaticamente.
    static gerarStringHTMLPelaImagem (itens) {
        // Para cada item da Lista, vai executar  a função "obterCodigoHtml"
        // ao final, vai concatenar tudo em uma única string
        // muda de Array para String
        return itens.map(Tela.obterCodigoHtml).join('')
    }

    static atualizarImagens(itens) {
        // Vai gerar todo HTML a partir da quantidade de listas ou a quantidade de itens que passamos.
        const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens)
        Tela.alterarConteudoHTML(codigoHtml)
    }

    
    static exibirHerois(nomeDoHeroi, img) {
        const elementosHtml = document.getElementsByName(nomeDoHeroi) // é o "name" name="${item.nome}"
        // Para cada elemento encontrado na tela, vamos alterar a imagem, para imagem inicial dele.
        // Com o "forEach", para cada item, dentro dos "()" setamos o valor de imagem
        elementosHtml.forEach(item => (item.src = img))
    }

    // ---------------------------- 
    //          MENSAGEM
    // ----------------------------

    static async exibirMensagem (sucesso = true) {
        
        const elemento = document.getElementById(ID_MENSAGEM)
        if(sucesso) {
            elemento.classList.remove(MENSAGENS.erro.classe)
            elemento.classList.add(MENSAGENS.sucesso.classe)
            elemento.innerText = MENSAGENS.sucesso.texto
            SOM_ACERTOU.play();
        }
        else {
            elemento.classList.remove(MENSAGENS.sucesso.classe)
            elemento.classList.add(MENSAGENS.erro.classe)
            elemento.innerText = MENSAGENS.erro.texto
        }
        elemento.classList.remove(CLASSE_INVISIVEL)
        // A mensagem aparece durante 1 segundo e desaparece pois coloquei o async na função.
        await util.timeout(1000)
        elemento.classList.add(CLASSE_INVISIVEL)
    }

    static exibirCarregando(mostrar = true) {
        const carregando = document.getElementById(ID_CARREGANDO)
        if(mostrar) {
            carregando.classList.remove(CLASSE_INVISIVEL)
            return;
        }
            carregando.classList.add(CLASSE_INVISIVEL)
    }
// ---------------------------- 
//          CONTADOR
// ----------------------------

    static iniciarContador() {
        let contarAte = 3
        const elementoContador = document.getElementById(ID_CONTADOR)
        // Vamos substituir o texto Começando $$contador segundos
        // onde está o $$contador adicionaremos o valor.
        const identificadorNoTexto = "$$contador"
        const textoPadrao = `Começando em ${identificadorNoTexto} segundos...`

        // Vamos criar uma função em Linha para atualizar o texto a cada segundo
        const atualizarTexto = () =>
        (elementoContador.innerHTML = textoPadrao.replace(identificadorNoTexto, contarAte--))

        atualizarTexto()
        // A cada segundo, vai chamar a função atualizar texto
        // Essa função vai substituir o $$contador pelo "contarAte" diminuindo o valor
        // retornamos o idDoIntervalo para parar ele mais tarde.
        const idDoIntervalo = setInterval(atualizarTexto, 1000)
        return idDoIntervalo
        
    }

    static limparContador (idDoIntervalo) {
        clearInterval(idDoIntervalo)
        // Deixamos sem texto
        document.getElementById(ID_CONTADOR).innerHTML = ""
    }

// ---------------------------- 
//          CRONOMETRO
// ----------------------------

        static cronometro (visivel = false) {
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            // Oculta o Cronometro e mostra após a contagem regressiva zerar
            const cronometragem = document.getElementById(ID_CRONO)
            if(visivel) {
                cronometragem.classList.remove(CLASSE_INVISIVEL)
                return;
            }
                cronometragem.classList.add(CLASSE_INVISIVEL)
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            
            let timer = document.getElementById(ID_DISPLAY)
            let timerArray = timer.textContent.split(':')
            let timerParado = true
            let [hh, mm, ss, dd] = timerArray
            
            
           const startCrono = setInterval(() => {
                if(timerParado) {
                    timerParado = false
                }
                    dd = parseInt(dd) + 1 		    
                    timer.textContent = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}:${String(dd).padStart(2, '0')}`
                if  (parseInt(dd) > 10 ) {
                    dd = '00'
                    ss = parseInt(ss) + 1
                    timer.textContent = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}:${String(dd).padStart(2, '0')}`
                }
                 
                if (parseInt(ss) > 59 ) {
                    ss = '00'
                    mm = parseInt(mm) + 1
                    timer.textContent = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}:${String(dd).padStart(2, '0')}`
                }
                else if (parseInt(mm) > 59 ) {
                    mm = '00'
                    hh = parseInt(hh) + 1
                    timer.textContent = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}:${String(dd).padStart(2, '0')}`

                }
            }, 100);

                return startCrono
        }
        static parar (startCrono) {
            timerParado = true
            clearInterval(startCrono)
        }

        static zerar (startCrono) {
            [hh, mm, ss, dd] = timerArray
            timer.textContent = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}:${String(dd).padStart(2, '0')}`
            timerParado = true
            clearInterval(startCrono)

        }            

        // --------------------------------- 
        //    BOTÕES MOSTRAR TUDO & JOGAR
        // ---------------------------------
        
        static configurarBotaoMostrarTudo (funcaoOnClick) {
            const btnMostrarTudo = document.getElementById(ID_BTN_MOSTRAR_TUDO)
            btnMostrarTudo.onclick = funcaoOnClick  
    }

        static configurarBotaoJogar (funcaoOnClick) {
            const btnJogar = document.getElementById(ID_BTN_JOGAR)
            btnJogar.onclick = funcaoOnClick
    
    }

}     

