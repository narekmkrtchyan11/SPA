import { createContainer } from "./helpers";
import { navigateTo } from "./router";
import { getDogBreeds } from "./helpers";

const secondPage = document.createElement("div") as HTMLDivElement;
secondPage.id = "secondPage";

const showDogBreedListBtn = document.createElement("button") as HTMLButtonElement;
showDogBreedListBtn.id = "showDogBreedListBtn";
showDogBreedListBtn.innerText = "Breed List";
showDogBreedListBtn.addEventListener("click", () => {
    history.back()
})

secondPage.appendChild(showDogBreedListBtn);

const secondPageContainer: HTMLDivElement = createContainer(secondPage, "secondPageContainer");
secondPage.appendChild(secondPageContainer);

function getSubBreedsPage (param:any) {
    secondPageContainer.innerHTML = "";
    async function getSubBreedsPageData() {
        const dogBreedName: string = param.id;
        const dogsBreeds = await getDogBreeds();
        try{
            const dogs: {url: string, name: string}[] = [];
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
                            navigateTo(`/random/${dogBreedName}/${dog.name}`);
                    })
                    
                    secondPageContainer.appendChild(box);
                });
            });
        } catch(error) {
            navigateTo("/404")
        }
    }
    getSubBreedsPageData();
    return secondPage;
}

export {getSubBreedsPage};