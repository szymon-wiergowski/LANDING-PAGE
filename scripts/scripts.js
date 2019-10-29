$(document).ready(function() {
    $('a[href^="#"]').click(function() {
        var hash = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 1500);
        return false;
    });
});
$(window).scroll(function() {
    var top = $(window).scrollTop();
    var find_class_small = $.contains('mainNav', '.smallNav');

    if (top > 50 && find_class_small == false) {
        $('#mainNav').addClass('smallNav');
    } else {
        $('#mainNav').removeClass('smallNav');
    }

});
const mybutton = document.getElementById("back-to-top");

window.onscroll = function() {
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
    $('html, body').animate({scrollTop: 0}, 1500);
    document.documentElement.scrollTop = 0;
};

const team = document.getElementById("team").getBoundingClientRect().top + window.scrollY;


window.addEventListener('scroll', function(e) {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos + window.innerHeight /2 > team) {
        const flipElement = document.querySelectorAll(".flip-card-inner")
        flipElement.forEach(function(currentElement){
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

const createCookie = (name, value, expires) => {
    let cookie = `${name}=${value};`;
    expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);
    cookie += `expires=${expires.toGMTString()};`;
    document.cookie = cookie;
    console.log(cookie);
}

const cookiesModal = () => {
    if (document.cookie !==  "cookie=cookie") {
        $(document).ready(function () {
            $("#cookiesModal").modal("show");
        });
    }
    coockieYesBtn.addEventListener("click", () => {
        createCookie("cookie", "cookie", 30);
        $(document).ready(function () {
            $("#cookiesModal").modal("hide");
        });
    })
    coockieNoBtn.addEventListener("click", () => {
        $(document).ready(function () {
            $("#cookiesModal").modal("hide");
        });
    })
};

cookiesModal();

(function () {
    var navMenuItems = document.querySelectorAll('#navbarNav a');
    var navbar = document.querySelector("#navbarNav");
    navMenuItems.forEach(item => {
        item.addEventListener("click", () => {
            navbar.classList.remove("show");
        })
    })
    document.addEventListener("scroll", () => {
        navbar.classList.remove("show");
    })
})();

(function() {
    var navMenuItems = document.querySelectorAll('#navbarNav a');
    var navbar = document.querySelector("#navbarNav");
    navMenuItems.forEach(item => {
        item.addEventListener("click", () => {
            navbar.classList.remove("show");
        })
    })
    document.addEventListener("scroll", () => {
        navbar.classList.remove("show");
    })
})();