import { navigateTo } from "./router";



function createContainer(parent: HTMLElement,id:string): HTMLDivElement {
    const container = document.createElement("div") as HTMLDivElement;
    container.className = "container";
    container.id = id;
    parent.appendChild(container);
    return container;
}


async function getDogBreeds() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const dogsBreeds: Record<string, string[]> = data.message;
    return dogsBreeds;
}




export {createContainer, getDogBreeds};