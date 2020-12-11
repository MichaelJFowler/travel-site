class MobileMenu {
    constructor() {
        this.menuIcon = document.querySelector(".site-header__menu-icon");
        this.menuContent = document.querySelector(".site-header__menu-content");
        this.siteHeader = document.querySelector(".site-header");

        this.events();
    }

    // Events
    events() {
        this.menuIcon.addEventListener("click", () => this.toggleTheMenu());
    }

    // Methods
    toggleTheMenu() {
        // toggles class onto the menuContent which can be targeted with CSS
        this.menuContent.classList.toggle("site-header__menu-content--is-visible");
        this.menuContent.classList.toggle("site-header--is-expanded");
        this.menuIcon.classList.toggle("site-header__menu-icon--close-x");
    }

}

// What to export if module included - default class
export default MobileMenu;