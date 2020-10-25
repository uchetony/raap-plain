const sidebar = document.querySelector(".sidebar");
const hamburgerIcon = document.querySelector(".mobile-navbar__menu-icon");
const popup = document.querySelector(".popup");
const popupCheck = document.querySelector(".popup__check");


const submitForm = (e) => {
    e.preventDefault();
    const { srcElement } = e;
    const btnText = srcElement.parentNode.querySelector(".button__text");
    const btnSubmittingText = srcElement.parentNode.querySelector(".button__submitting-text");
    const spinner = srcElement.parentNode.querySelector(".button__spinner");
    const formInputs = srcElement.parentNode.querySelectorAll(".form__input");

    spinner.style.display = "block";
    btnText.style.display = "none";
    btnSubmittingText.style.display = "block";

    // Mock post request to an API endpoint
    setTimeout(() => {
        openPopup();
        spinner.style.display = "none";
        btnText.style.display = "block";
        btnSubmittingText.style.display = "none";
        formInputs && formInputs.forEach((e) => e.value = "" );
    }, 3000);
}

const openPopup = () => {
    popup.classList.add("popup_open");
    popupCheck.classList.add("popup__check_active");
}

const closePopup = () => {
    popup.classList.remove("popup_open");
    popupCheck.classList.remove("popup__check_active");
}

const toggleSidebar = () => {
    const hamburgerIcon = document.querySelector(".mobile-navbar__menu-icon");
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebar_open");
    hamburgerIcon.classList.toggle("mobile-navbar__menu-icon_show-close");
}

const showSetting = () => {
    setTimeout(() => {
        const settingId = window.location.hash;
        const sidebarSubLinks = document.querySelectorAll(".sidebar__sub-link");
        const desktopNavbarLinks = document.querySelectorAll(".desktop-navbar__link")
        const settingsCategory = document.querySelectorAll(".section_settings-category");

        desktopNavbarLinks.forEach((el) => {
            el.classList.remove("desktop-navbar__link_active");
            if (el.hash === `${settingId}`) {
                el.classList.add("desktop-navbar__link_active");
            }
        })

        // make the sublink in the sidebar active
        sidebarSubLinks.forEach((el) => {
            el.classList.remove("sidebar__sub-link_active");
            if (el.hash === `${settingId}`) {
                el.classList.add("sidebar__sub-link_active");
                sidebar.classList.remove("sidebar_open");
                hamburgerIcon.classList.remove("mobile-navbar__menu-icon_show-close");
            }
        })

        // show the setting
        settingsCategory.forEach((el) => {
            el.style.display = "none";
            if (`#${el.id}` === `${settingId}`) {
                el.style.display = "block"
            }
        })
    }, 0)
}


(() => {
    const currentUrl = window.location.href.split('#')[0];
    const sidebarLinks = document.querySelectorAll(".sidebar__link")
    sidebarLinks.forEach((el) => {
        if (el.href.split('#')[0] === currentUrl) {
            el.classList.add("sidebar__link_active")
        }
    })
    showSetting();
})();