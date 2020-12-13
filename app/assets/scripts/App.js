import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'


/* 
You do not require a variable unless you are going to call its methods later on.
If modules need to interact wit hone another, then the variables are necessary.
We could delete "let mobileMenu =" and "let stickyheader =" without causing any issues 
*/

let mobileMenu = new MobileMenu();
// create two instances of the class for the featured items and testimonials
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
let stickyHeader = new StickyHeader();
let modal;

// Load Modal.js only when the user clicks on the button
document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", e => {
        e.preventDefault();
        if (typeof model == "undefined") {
            import('./modules/Modal').then(x => {
                modal = new x.default();
                setTimeout(() => modal.openTheModal(), 20);
            }).catch(() => console.log("There was an issue loading Modal.js"));
        } else {
            model.openTheModal();
        }
    })
})



// allow hot module replacement from webpack-dev-server
if (module.hot) {
    module.hot.accept();
}