import './style.css';
import './firstPage'
import { setHeader } from './header';
import { createFirstPage } from './firstPage';
const root = document.getElementById("root") as HTMLElement;


setHeader(root);
createFirstPage(root);







export {root};