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

$(document).ready(function()
{
    $('.navbar-nav li a.dropdown-toggle').click(function(e)
    {
        e.preventDefault();
        $(this).parent().toggleClass('open');
    });
    $('[data-toggle="collapse"]').click(function()
    {
        var target = $(this).attr('data-target');
        $(target).toggleClass('in');
    });
});