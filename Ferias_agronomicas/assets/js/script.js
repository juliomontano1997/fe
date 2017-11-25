$(document).ready(main);

var contador = 1;

function main(){
    $('.menu_bar').click(ocultar_menu);
    $('.nav_opt').click(ocultar_menu);
    function ocultar_menu() {
        //$('nav').toggle();
        if(contador === 1)
        {
            $('nav').animate({left: '0'});
            contador = 0;
        }
        else
        {
            contador = 1;
            $('nav').animate({left: '-100%'});
        }
    }

};