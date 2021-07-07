'use strict';


const headerCityButton = document.querySelector(".header__city-button");
headerCityButton.textContent = localStorage.getItem("lomoda-location") || "Ваш город?";

headerCityButton.addEventListener("click", () => {
    const city = prompt("Укажите ваш город");
    localStorage.setItem("lomoda-location", city);
    headerCityButton.textContent = city;
});


// блокировка скролла

const disableScroll = () => {
    const widthScroll = window.innerWidth - document.body.offsetWidth;
    document.body.style.overflow = "hidden";
    localStorage.setItem("dbScrollY", window.scrollY);
    document.body.style.cssText = `
        left: 0;
        top: ${-window.scrollY};
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-right: ${widthScroll}px;
    `
};


const enableScroll = () => {
    document.body.style.cssText = "";
    window.scroll({
        top: localStorage.getItem("dbScrollY")
    })

};


// модальное окно
const subheaderCart = document.querySelector(".subheader__cart");
const cartOverlay = document.querySelector(".cart-overlay");


const cartModalOpen = () => {
    cartOverlay.classList.add("cart-overlay-open");
    disableScroll();
}

const cartModalClose = () => {
    cartOverlay.classList.remove("cart-overlay-open");
    enableScroll();
}


subheaderCart.addEventListener("click", () => {
    cartModalOpen();
})


cartOverlay.addEventListener("click", event => {
    const target = event.target;

    if (target.matches(".cart__btn-close") || target.matches(".cart-overlay")) cartModalClose();
})

document.addEventListener("keydown", event => {
    if (event.key === "Escape") cartModalClose();
});