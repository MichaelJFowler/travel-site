// to throttle the number of calls to window.addEventListener to make code more efficient
// We do not hav eto import the entire library
import throttle from 'lodash/throttle';
// only runs once an action like resizing has completed
import debounce from 'lodash/debounce';

class RevealOnScroll {
    constructor(els, thresholdPercent) {
        // querySelector will only select the first item must use querySelectorAll
        this.itemsToReveal = els;
        this.thresholdPercent = thresholdPercent;
        this.browserHeight = window.innerHeight;
        this.hideInitially();
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
        this.events();
    }

    events() {
        window.addEventListener("scroll", this.scrollThrottle);
        window.addEventListener("resize", debounce(() => {
            this.browserHeight = window.innerHeight;
        }, 300))
    }

    // Methods
    hideInitially() {
        this.itemsToReveal.forEach(el => {
            el.classList.add("reveal-item")
            el.isRevealed = false;
        });
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
    }

    calcCaller() {
        this.itemsToReveal.forEach(el => {
            if (el.isRevealed == false) {
                this.calculateIfScrolledTo(el);
            }
        })
    }



    calculateIfScrolledTo(el) {
        // getBoundingClientRect is a measure for how far the 
        // current element is from the top edge of the bounding rectangle
        if (window.scrollY + this.browserHeight > el.offsetTop) {
            let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100;
            if (scrollPercent < this.thresholdPercent) {
                el.classList.add("reveal-item--is-visible");
                el.isRevealed = true;
                if (el.isLastItem) {
                    window.removeEventListener("scroll", this.scrollThrottle);
                }
            }
        };
    }
}

export default RevealOnScroll;