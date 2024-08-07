//variaveis
let flgJQuery = false, flgBoot = false;

// ativa modo sem conflitos
let $j = jQuery.noConflict();

//funcoes
let InicializaJQuery = function(){
    try {
        //exibe mensagem
        console.log('JQuery inicializado.');
        ///////////////////
        flgJQuery = true;
    } catch (error) {
        flgJQuery = false;
        console.log(error.message);
    }
}

let InicializaBootstrap = function(){
    try {
        //exibe mensagem
        console.log('DOM carregado - Bootstrap inicializado.');
        ///////////////////
        flgBoot = true;
    } catch (error) {
        flgBoot = false;
        console.log(error.message);
    }
}

//evento DOM carregado
document.addEventListener('DOMContentLoaded', InicializaBootstrap);
//evento p/ validar JQuery
$j(document).ready(InicializaJQuery);
//eventos

