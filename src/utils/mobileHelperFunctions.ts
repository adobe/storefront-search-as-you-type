import { activeClass } from "utils";

const isMobile = window.matchMedia(
    "only screen and (max-width: 768px)",
).matches;

const handleMobileDisplay = (target: HTMLLabelElement): void => {
    if (isMobile) {
        toggleActiveClass(target);
    }
};

/**
 * Magento uses the class "active" to show/hide the search bar when on mobile.
 * That class changes the style of .label to { position: static },
 * same goal could also be achieved by manually adjusting that style. But we
 * are trying to find the less intrusive approach and leverage OOTB behavior.
 */
const toggleActiveClass = (target: HTMLLabelElement): void => {
    const classList = target.classList;

    if (classList.contains(activeClass)) {
        classList.remove(activeClass);
        target.setAttribute("aria-haspopup", "false");
        document.body.style["overflowY"] = "inherit";
        target.style.removeProperty("display");
    } else {
        classList.add(activeClass);
        target.setAttribute("aria-haspopup", "true");
        target.style["display"] = "none";
        // when the popover is open, in mobile, we want it to be the only thing that scrolls
        document.body.style["overflowY"] = "hidden";
    }
};

export { isMobile, handleMobileDisplay, toggleActiveClass };
