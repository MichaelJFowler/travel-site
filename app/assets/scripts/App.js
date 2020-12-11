import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'

let mobileMenu = new MobileMenu();





// allow hot module replacement from webpack-dev-server
if (module.hot) {
    module.hot.accept();
}