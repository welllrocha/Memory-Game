class JogoDaMemoria {

    constructor({ tela, util }) {
        this.tela = tela
        this.util = util

        this.heroisIniciais = [
            { img: './Arquivos/batman.png', nome: 'batman'},
            { img: './Arquivos/flash.png', nome: 'flash'},
            { img: './Arquivos/spiderman.png', nome: 'spiderman'},
            { img: './Arquivos/thor.png', nome: 'thor'},
            { img: './Arquivos/deadpool.png', nome: 'deadpool'},
            { img: './Arquivos/mulhermaravilha.png', nome: 'mulhermaravilha'}
        ]
        this.iconePadrao = './Arquivos/padrao.png'  
        this.heroisEscondidos = [] 
        this.heroisSelecionados = [] 
        
    }
    // ---------------------------- 
    //          INICIAR
    // ----------------------------
    
    inicializar() {
        // Vai pegar todas as funções da classe TELA!
        // Coloca todos heróis na Tela
        this.tela.atualizarImagens(this.heroisIniciais)   
        // Força a tela a usar o "THIS" de Jogo da Memoria
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
       
        this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))

        this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this))

        // document.querySelector('#display') //---
    }

    // --------------------------------------------------------------------------------
    // CORAÇÃO DO PROJETO onde crio a lógica de manipular as cartas, mostrar e ocultar.
    // --------------------------------------------------------------------------------

    async embaralhar(){
        const copias = this.heroisIniciais
        // duplicar os itens (cartas) usando o ".concat"
        .concat(this.heroisIniciais)
        // entrar em cada item e criar um id aleatório
        .map(item => {
            // Concateno o objeto "Object.assign", crio um objeto vazio "{}", pego o "item" (img e nome) em seguida crio uma nova propriedade e chamo de "{ id: }" deixando ramdomico.
            return Object.assign({}, item, { id: Math.random() / 0.5})
        })
        // Ordenar Aleatóriamente
        .sort(() => Math.random() - 0.5)
        // verificar se criou
        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()
        
        const idDoIntervalo = this.tela.iniciarContador()
        // const startCrono = this.tela.cronometro()
        
        // Vamos esperar 3 segundo para atualizar a tela e ocultará todas img com a IMGPadrão
        await this.util.timeout(3000)
        
        this.tela.cronometro()
        
        this.tela.limparContador(idDoIntervalo)
        
        this.esconderHerois(copias)
        this.tela.exibirCarregando(false)
        this.tela.cronometro(true)
        // this.tela.zerar(startCrono)
    }

        // ---------------------------- 
        //       ESCONDER HERÓIS
        // ----------------------------

    esconderHerois(herois) {
        // Vamos trocar a imagem de todos os herois existentes pelo ícone padrão.
        // Como feito no "construtor", vamos extrair somente o necessário.
        // Usando a sintaxe ({ chave: 1 }) estamos falando que vamos  retornar o que tiver
        // dentro dos parenteses.
        // Quando não usamos: (exemplo do id), o JS entende que o nome é o mesmo do valor.
        // Ex.: id: id, vira id,
        const heroisOcultos = herois.map(( { nome, id }) => ({
            id,
            nome,
            img: this.iconePadrao
        }))
        // Atualizar as imagens com os herois ocultos
        this.tela.atualizarImagens(heroisOcultos)
        // Guardamos os herois para trabalhar com eles depois
        this.heroisEscondidos = heroisOcultos
        
    }

        // ---------------------------- 
        //         EXIBI HERÓIS
        // ----------------------------

    exibirHerois(nomeDoHeroi) {
        // Vamos procurar esse herói pelo nome em nossos heroisIniciais, vamos obter somente a imagem dele.
        const { img } = this.heroisIniciais.find(({ nome }) => nomeDoHeroi === nome)
        // Vamos criar uma função na tela, para exibir somente o heroi selecionado
        this.tela.exibirHerois(nomeDoHeroi, img)
    }

        // ---------------------------- 
        //       VERIFICA SELEÇÃO
        // ----------------------------

    verificarSelecao(id,nome) {
        const item = { id, nome }
        
        //  Verificar a quantidade de heróis selecionados e tomar ação se escolheu certo ou errado.
        const heroisSelecionados = this.heroisSelecionados.length
        switch(heroisSelecionados) {
            case 0: 
                // Adiciona a escolha na lista, esperando pela próxima clicada
                this.heroisSelecionados.push(item)
                
                break;
            case 1: 
                // Se a quantidade de escolhidos for 1, significa que o usuário
                // só pode escolher mais um. Vamos obter o primeiro item da lista
                const [ opcao1 ] = this.heroisSelecionados
                // Zerar itens para não selecionar mais de dois
                this.heroisSelecionados = [] 
                // Conferimos se o nome e o id batem conforme o esperado.
                if(opcao1.nome === item.nome &&
                    // aqui verificamos se são ids diferentes para o usuário não clicar duas vezes no mesmo.
                 opcao1.id !== item.id   
                 ) 
                 

                 {
                    //  alert('Combinação Correta!' +' '+ item.nome)
                    this.exibirHerois(item.nome) // Clicando no Heroi certo, ele exibe as imagens.
                    // Como o padrão é true, não precisa passar nada
                    this.tela.exibirMensagem()
                    
                    //  para a execução
                    return
                 }

                //  alert('Combinação Incorreta!')
                this.tela.exibirMensagem(false)
                //  fim do case!
                break;
        }

    }

        // ---------------------------- 
        //   MOSTRA HERÓIS ESCONDIDOS
        // ----------------------------
    mostrarHeroisEscondidos() {
        // Vamos pegar todos os heróis da tela e colocar seu respectivo valor correto
        const heroisEscondidos = this.heroisEscondidos
        for(const heroi of heroisEscondidos) {
            const { img } = this.heroisIniciais.find(item => item.nome === heroi.nome)
            heroi.img = img
        }
        this.tela.atualizarImagens(heroisEscondidos)
        
    }

    jogar() {
        this.embaralhar()

    }

}


