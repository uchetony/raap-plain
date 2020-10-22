const sidebar = document.querySelector(".sidebar");
const hamburgerIcon = document.querySelector(".mobile-navbar__menu-icon");

const toggleSidebar = () => {
    const hamburgerIcon = document.querySelector(".mobile-navbar__menu-icon");
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebar_open");
    hamburgerIcon.classList.toggle("mobile-navbar__menu-icon_close");
}

const showSetting = () => {
    setTimeout(() => {
        const settingId = window.location.hash;
        const sidebarSubLinks = document.querySelectorAll(".sidebar__sub-link");
        const settingsCategory = document.querySelectorAll(".settings-category");

        // make the sublink in the sidebar active
        sidebarSubLinks.forEach((el) => {
            el.classList.remove("sidebar__sub-link_active");
            if (el.hash === `${settingId}`) {
                el.classList.add("sidebar__sub-link_active");
                sidebar.classList.remove("sidebar_open");
                hamburgerIcon.classList.remove("mobile-navbar__menu-icon_close");
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