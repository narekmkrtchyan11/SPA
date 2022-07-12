import { createContainer} from "./helpers";
import { navigateTo } from "./router";

const thirdPage = document.createElement("div") as HTMLDivElement;
thirdPage.id = "thirdPage";

const thirdPageContainer: HTMLDivElement = createContainer(thirdPage, "thirdPageContainer");
thirdPage.appendChild(thirdPageContainer);

const backBtn = document.createElement("i") as HTMLElement;
backBtn.className = "fa-solid fa-arrow-left-long";
backBtn.id = "backBtn";
thirdPage.appendChild(backBtn);

backBtn.addEventListener("click", () => {
    history.back()
})

function getRandomSubBreedImages(param: any): HTMLElement {
    thirdPageContainer.innerHTML = "";
    const dogBreedName = param.id1;
    const dogSubBreedName = param.id2;
    const dogs: {url: string, name: string}[] = [];

    try{
        fetch(`https://dog.ceo/api/breed/${dogBreedName}/${dogSubBreedName}/images/random/20`)
        .then(response => response.json())
        .then(data => {
            if(data.status === "error") {
                const errorMessege = document.createElement("h1") as HTMLParagraphElement;
                errorMessege.className = "errorMessege";
                errorMessege.innerText = `"${dogSubBreedName}" subBreed not found`
                thirdPage.appendChild(errorMessege);
            }
            data.message.forEach((imgUrl: string) => {
                dogs.push({
                    name: dogSubBreedName,
                    url: imgUrl
                })
            })
            dogs.forEach((dog ) => {
                const box = document.createElement("div") as HTMLDivElement;
                box.className = "box";
                box.style.cursor = "default";
                box.setAttribute("data-id", dog.name);
                const img = document.createElement("img") as HTMLImageElement;
                img.src = dog.url;
                const title = document.createElement("p") as HTMLParagraphElement;
                title.innerText = dog.name[0].toUpperCase() + dog.name.slice(1);
                box.append(img, title);
                thirdPageContainer.appendChild(box);
            });
        });
    } catch(error) {
        navigateTo("/404")
    }
    return thirdPage;
}

function getBreedRandomImages(param: any): HTMLElement {
    thirdPageContainer.innerHTML = "";
    const dogBreedName = param.id;
    const dogs: {url: string, name: string}[] = [];
    try {
        fetch(`https://dog.ceo/api/breed/${dogBreedName}/images/random/3`)
        .then(response => response.json())
        .then(data => {
            if(data.status === "error") {
                const errorMessege = document.createElement("h1") as HTMLParagraphElement;
                errorMessege.className = "errorMessege";
                errorMessege.innerText = `"${dogBreedName}" breed not found`
                thirdPage.appendChild(errorMessege);
            }
            data.message.forEach((imgUrl: string) => {
                dogs.push({
                    name: dogBreedName,
                    url: imgUrl
                })
            })
            dogs.forEach((dog ) => {
                const box = document.createElement("div") as HTMLDivElement;
                box.className = "box";
                box.style.cursor = "default";
                box.setAttribute("data-id", dog.name);
                const img = document.createElement("img") as HTMLImageElement;
                img.src = dog.url;
                const title = document.createElement("p") as HTMLParagraphElement;
                title.innerText = dog.name[0].toUpperCase() + dog.name.slice(1);
                box.append(img, title);
                thirdPageContainer.appendChild(box);
            });
        })
    } catch {
        navigateTo("/404")
    }
    return thirdPage;
}

export {getBreedRandomImages, getRandomSubBreedImages}