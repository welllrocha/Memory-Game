function onLoad () {
    
   const dependencias = {
       tela: Tela, // A classe Tela é global
       util: Util
   }

   const jogoDaMemoria = new JogoDaMemoria(dependencias)
   jogoDaMemoria.inicializar()
}

window.onload = onLoad