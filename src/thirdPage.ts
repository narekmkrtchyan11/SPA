import { root } from ".";
import { currentPage } from "./secondPage";
import { createContainer, createDogBoxes, createBox, getRandomImageBySubBreed, getRandomImageByBreed} from "./helpers";

const thirdPage = document.createElement("div") as HTMLDivElement;
thirdPage.id = "thirdPage";

const thirdPageContainer: HTMLDivElement = createContainer(thirdPage, "thirdPageContainer");
thirdPage.appendChild(thirdPageContainer);

const backBtn = document.createElement("i") as HTMLElement;
backBtn.className = "fa-solid fa-arrow-left-long";
backBtn.id = "backBtn";

backBtn.addEventListener("click", () => {
    root.removeChild(thirdPage)
    root.appendChild(currentPage)
})

thirdPage.appendChild(backBtn);

function drowRandomImages (currentPage: HTMLDivElement, dogBreedName: string, dogSubBreedName: string, boolean: boolean) {
    root.removeChild(currentPage);
    root.appendChild(thirdPage);    
    if(boolean) {
        getRandomImageBySubBreed(thirdPageContainer, dogBreedName, dogSubBreedName)
    } else {
        getRandomImageByBreed(thirdPageContainer, dogBreedName)
    }
}

export {drowRandomImages}