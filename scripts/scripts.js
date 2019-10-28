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
const mybutton = document.getElementById("back-to-top");

window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    $('html, body').animate({ scrollTop: 0 }, 1500);
    document.documentElement.scrollTop = 0;
};

const team = document.getElementById("team").getBoundingClientRect().top + window.scrollY;


window.addEventListener('scroll', function (e) {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos + window.innerHeight / 2 > team) {
        const flipElement = document.querySelectorAll(".flip-card-inner")
        flipElement.forEach(function (currentElement) {
            currentElement.classList.add("flip-card-auto");
            setTimeout(
                () => currentElement.classList.add("flip-card-auto-return"),
                3000
            );

        })
    }
});

const coockieNoBtn = document.querySelector('.button-coockie__close');
const coockieYesBtn = document.querySelector('.button-coockie__accept');

const cookiesModal = () => {
    if (!localStorage.cookie) {
        $(document).ready(function () {
            $("#cookiesModal").modal("show");
        });
    }

    coockieYesBtn.addEventListener("click", () => {
        localStorage.setItem("cookie", "cookie");
        $(document).ready(function () {
            $("#cookiesModal").modal("hide");
        });
    })

    coockieNoBtn.addEventListener("click", () => {
        alert('Żeby przejść dalej musisz zaakceptować pliki cookie!');
    })

};

cookiesModal();

document.addEventListener('scroll', showSectionInNav)
console.log(team);

function showSectionInNav() {
    const currentPosition = window.scrollY;
    const basicFunctionPosition = document.querySelector('#basic-function').offsetTop;
    const moreFunctionsPosition = document.querySelector('#more-functions').offsetTop;
    const signUpPosition = document.querySelector('#sign-up').offsetTop;
    const teamPosition = document.querySelector('#team').offsetTop;
    let x; // zmienna przechowująca link do określonego miejsca w nawigacji spelniajaca jakiś if
    if (currentPosition > basicFunctionPosition && currentPosition < moreFunctionsPosition) {
        x = document.querySelector('[data-section-basic-func]');
        x.classList.add("mystyle");

    } else if (currentPosition > basicFunctionPosition && currentPosition < moreFunctionsPosition) {
        x = document.querySelector('[data-section-more-func]');
        x.classList.add("mystyle");

    } else if (currentPosition > moreFunctionsPosition && currentPosition < signUpPosition) {
        x = document.querySelector('[data-section-sign-up]');
        x.classList.add("mystyle");

    } else if (currentPosition > signUpPosition && currentPosition < teamPosition) {
        x = document.querySelector('[data-section-team]');
        x.classList.add("mystyle");


        console.log(basicFunctionPosition);
        console.log(moreFunctionsPosition);
        console.log(signUpPosition);
        console.log(teamPosition);
        console.log(currentPosition);




    }