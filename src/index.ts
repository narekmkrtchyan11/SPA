import './style.css';
import { setHeader } from './createHeader';
import { router } from './router';

const root = document.getElementById("root") as HTMLElement;
const body = document.querySelector("body") as HTMLBodyElement;

setHeader(body);

function initRouteChange() {
    router(root);
}

document.addEventListener("DOMContentLoaded", initRouteChange);
window.addEventListener("popstate", initRouteChange);


