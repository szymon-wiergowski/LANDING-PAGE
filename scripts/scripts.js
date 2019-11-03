document.addEventListener("scroll", function () {
    let currentPosition = window.scrollY;
    let basicFunctionPosition = document.querySelector("#basic-function").offsetTop;
    let moreFunctionsPosition = document.querySelector("#more-functions").offsetTop;
    let signUpPosition = document.querySelector("#sign-up").offsetTop;
    let teamPosition = document.querySelector("#team").offsetTop;
    let addClass = "";
    let delateClass = "";

    if (currentPosition < basicFunctionPosition) {
        delateClass = document.querySelectorAll(".data-section-basic-func, .data-section-more-func, .data-section-sign-up, .data-section-team");
        delateClass.forEach((item) => {
            item.classList.remove("highlightNav");
        });
    } else if (currentPosition > basicFunctionPosition && currentPosition < moreFunctionsPosition) {
        delateClass = document.querySelectorAll(".data-section-more-func, .data-section-sign-up, .data-section-team");
        delateClass.forEach((item) => {
            item.classList.remove("highlightNav");
        });
        addClass = document.querySelector(".data-section-basic-func");
        addClass.classList.add("highlightNav");

    } else if (currentPosition > moreFunctionsPosition && currentPosition < signUpPosition) {
        delateClass = document.querySelectorAll(".data-section-basic-func, .data-section-sign-up, .data-section-team");
        delateClass.forEach((item) => {
            item.classList.remove("highlightNav");
        });
        addClass = document.querySelector(".data-section-more-func");
        addClass.classList.add("highlightNav");
    } else if (currentPosition > signUpPosition && currentPosition < teamPosition) {
        delateClass = document.querySelectorAll(".data-section-basic-func, .data-section-more-func");
        delateClass.forEach((item) => {
            item.classList.remove("highlightNav");
        });
        addClass = document.querySelectorAll(".data-section-sign-up, .data-section-team");
        addClass.forEach((item) => {
            item.className += " highlightNav";
        });
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

