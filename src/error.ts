const errorPage = document.createElement("div") as HTMLElement;
errorPage.id = "errorPage";

const errorMessege = document.createElement("h1");
errorMessege.innerText = "404 Not found";
errorPage.appendChild(errorMessege);

export function getErrorPage():HTMLElement {
    document.querySelector("body")?.classList.add("error");
    return errorPage;
}