import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'
import Modal from './modules/Modal'

let mobileMenu = new MobileMenu();
// create two instances of the class for the featured items and testimonials
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
let stickyHeader = new StickyHeader();
new Modal();

// allow hot module replacement from webpack-dev-server
if (module.hot) {
    module.hot.accept();
}