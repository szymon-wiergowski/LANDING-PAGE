"use strict";

document.addEventListener("scroll", function () {
    let currentPosition = window.scrollY;
    let basicFunctionPosition = document.querySelector("#basic-function").offsetTop;
    let moreFunctionsPosition = document.querySelector("#more-functions").offsetTop;
    let signUpPosition = document.querySelector("#sign-up").offsetTop;
    let teamPosition = document.querySelector('#team').offsetTop;
    let dataSectionInNav = "";
    let dataSectionInNavTeam = "";

    if (currentPosition > basicFunctionPosition && currentPosition < moreFunctionsPosition) {
        dataSectionInNav = document.querySelector(".data-section-basic-func");
        dataSectionInNav.classList.add("sectionPositionInNav");
        delateFromDiffrentA = document.querySelector(".data-section-more-func, .data-section-sign-up, .data-section-team");
        console.log("chwytak", delateFromDiffrentA);
        // delateFromDiffrentA.classList.remove("sectionPositionInNav");

    } else if (currentPosition > moreFunctionsPosition && currentPosition < signUpPosition) {
        dataSectionInNav = document.querySelector(".data-section-more-func");
        dataSectionInNav.classList.add("sectionPositionInNav");
        delateFromDiffrentA = document.querySelectorAll(".data-section-basic-func, .data-section-sign-up, .data-section-team");
        // delateFromDiffrentA.classList.remove("sectionPositionInNav");

    } else if (currentPosition > signUpPosition && currentPosition < teamPosition) {
        dataSectionInNav = document.querySelector(".data-section-sign-up");
        dataSectionInNav.classList.add("sectionPositionInNav");
        dataSectionInNavTeam = document.querySelector(".data-section-team");
        dataSectionInNavTeam.classList.add("sectionPositionInNav");
        delateFromDiffrentA = document.querySelectorAll(".data-section-basic-func, .data-section-basic-func");
        // delateFromDiffrentA.classList.remove("sectionPositionInNav");
    }
});

$(document).ready(function () {
    $('a[href^="#"]').click(function () {
        let hash = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 1500);
        return false;
    });
});
$(window).scroll(function () {
    let top = $(window).scrollTop();
    let find_class_small = $.contains('mainNav', '.smallNav');

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

