import { root } from ".";
import { firstPage } from "./firstPage";
import { createContainer } from "./helpers";
import { createDogBoxes } from "./helpers";
import { drowRandomImages } from "./thirdPage";

const secondPage = document.createElement("div") as HTMLDivElement;
secondPage.id = "secondPage";

const showDogBreedListBtn = document.createElement("button") as HTMLButtonElement;
showDogBreedListBtn.id = "showDogBreedListBtn";
showDogBreedListBtn.innerText = "Breed List";
showDogBreedListBtn.addEventListener("click", () => {
    root.removeChild(secondPage);
    root.appendChild(firstPage);
})

secondPage.appendChild(showDogBreedListBtn);

const secondPageContainer: HTMLDivElement = createContainer(secondPage, "secondPageContainer");
secondPage.appendChild(secondPageContainer);
let currentPage: HTMLElement;


function drowDogSubBreeds (firstPage: HTMLDivElement, dogsBreeds: any, dogBreedName: string) {
    const dogs: any = [];
    const boolean = Boolean(dogsBreeds[dogBreedName].length);

    if(dogsBreeds[dogBreedName].length !== 0) {
        currentPage = secondPage;
        root.removeChild(firstPage);
        root.appendChild(secondPage);
        try{
            const dogArray =  dogsBreeds[dogBreedName].map((dogSubBreedName: string) => {
                return fetch(`https://dog.ceo/api/breed/${dogBreedName}/${dogSubBreedName}/images/random`);
            })
    
            Promise.all(dogArray).then(values => {
                return Promise.all(values.map(value => value.json()));
            })
            .then(data => {
                data.map((item, index) => (dogs.push({
                    url: item.message,
                    name: dogsBreeds[dogBreedName][index],
                })))
                createDogBoxes(secondPageContainer, dogs, (dogSubBreedName: string, func: Function) =>  {
                    drowRandomImages(secondPage, dogBreedName,dogSubBreedName, boolean)
                });
            });
        } catch(error) {
            console.log(error);
        }
    } else {
        currentPage = firstPage;
        drowRandomImages(firstPage, dogBreedName,dogBreedName, boolean)
    }
}

export {drowDogSubBreeds, currentPage};