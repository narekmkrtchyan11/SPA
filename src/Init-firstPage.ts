import { createContainer, getDogBreeds } from "./helpers";
import { navigateTo } from "./router";

const firstPage = document.createElement("div") as HTMLDivElement;
firstPage.id = "firstPage";

const firstPageContainer: HTMLDivElement = createContainer(firstPage, "firstPageContainer");
firstPage.appendChild(firstPageContainer);

function createFirstPage(): HTMLElement {
    const dogs: {url: string, name: string}[] = [];

    async function drowDogBreeds():Promise<void>{
        try{
            const dogsBreeds = await getDogBreeds();
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
                dogs.forEach((dog ) => {
                    const box = document.createElement("div") as HTMLDivElement;
                    box.className = "box";
                    box.setAttribute("data-id", dog.name);
                    const img = document.createElement("img") as HTMLImageElement;
                    img.src = dog.url;
                    const title = document.createElement("p") as HTMLParagraphElement;
                    title.innerText = dog.name[0].toUpperCase() + dog.name.slice(1);
                    box.append(img, title);
                    box.addEventListener("click", () => {
                        if(dogsBreeds[dog.name].length !== 0){
                            navigateTo(`/breeds/${dog.name}`)
                        } else {
                            navigateTo(`/random/${dog.name}`)
                        }
                    })
                    firstPageContainer.appendChild(box);
                });
            });
        } catch (error) {
            navigateTo("/404")
        }
    }
    drowDogBreeds();
    return firstPage;
}

export {createFirstPage}

