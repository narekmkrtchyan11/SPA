import { createContainer, createDogBoxes } from "./helpers";
import { drowDogSubBreeds } from "./secondPage";

    const firstPage = document.createElement("div") as HTMLDivElement;
    firstPage.id = "firstPage";

    const firstPageContainer: HTMLDivElement = createContainer(firstPage, "firstPageContainer");
    firstPage.appendChild(firstPageContainer);

function createFirstPage(root: HTMLElement): void {
    async function drowDogBreeds():Promise<void>{
        const dogs: any = [];
        try{
            const response = await fetch("https://dog.ceo/api/breeds/list/all");
            const data = await response.json();
            const dogsBreeds: Record<string, string[]> = data.message;
            
            const dogArray =  Object.keys(dogsBreeds).map(dogBreed => {
                return fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`);
            })

            Promise.all(dogArray).then(values => {
            return Promise.all(values.map(value => value.json()));
            })
            .then(data => {
                data.map((item, index) => (dogs.push({
                    url: item.message,
                    name: Object.keys(dogsBreeds)[index],
                })))
                createDogBoxes(firstPageContainer, dogs, (dogBreedName: string) =>  {
                    drowDogSubBreeds(firstPage, dogsBreeds, dogBreedName)
                });
            });
            root.appendChild(firstPage);
        } catch (error) {
            console.log("Error")
        }
    }
    drowDogBreeds();
}

export {createFirstPage, firstPage}

