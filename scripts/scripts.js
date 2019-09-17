$(document).ready(function () {
    $('a[href^="#"]').click(function () {
        var hash = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 1500);
        return false;
    });
});
$(window).scroll(function () {
    var top = $(window).scrollTop();
    var find_class_small = $.contains('mainNav', '.smallNav');

    if (top > 50 && find_class_small == false) {
        $('#mainNav').addClass('smallNav');
    } else {
        $('#mainNav').removeClass('smallNav');
    }

});