function createDogBoxes(parent: HTMLDivElement, dogs: [{name: string, url: string}], addEvent: Function) {
    const dogBoxArr = createBox(parent, dogs);
    dogBoxArr.forEach((box: HTMLDivElement) => {
        box.addEventListener("click", () => {
            addEvent(box.getAttribute("data-id"));
        })
    })
}

function createContainer(parent: HTMLElement,id:string): HTMLDivElement {
    const container = document.createElement("div") as HTMLDivElement;
    container.className = "container";
    container.id = id;
    parent.appendChild(container);
    return container;
}

function createBox (parent: HTMLDivElement, dogs: [{name: string, url: string}]): [] {
    parent.innerHTML = "";
    const dogBoxArr: any = []
    dogs.forEach((dog ) => {
        const box = document.createElement("div") as HTMLDivElement;
        box.className = "box";
        box.setAttribute("data-id", dog.name);
        const img = document.createElement("img") as HTMLImageElement;
        img.src = dog.url;
        const title = document.createElement("p") as HTMLParagraphElement;
        title.innerText = dog.name[0].toUpperCase() + dog.name.slice(1);
        box.append(img, title);
        dogBoxArr.push(box);
        parent.appendChild(box);
   })
   return dogBoxArr;
}


function getRandomImageBySubBreed (page: HTMLDivElement, dogBreedName: string, dogSubBreedName: string) {
    const dogs: any = [];
    fetch(`https://dog.ceo/api/breed/${dogBreedName}/${dogSubBreedName}/images/random/20`)
    .then(response => response.json())
    .then(data => {
        data.message.forEach((imgUrl: string) => {
            dogs.push({
                name: dogSubBreedName,
                url: imgUrl
            })
        })
        createBox(page, dogs)
    })
}

function getRandomImageByBreed (page: HTMLDivElement, dogBreedName: string) {
    const dogs: any = [];
    fetch(`https://dog.ceo/api/breed/${dogBreedName}/images/random/3`)
    .then(response => response.json())
    .then(data => {
        data.message.forEach((imgUrl: string) => {
            dogs.push({
                name: dogBreedName,
                url: imgUrl
            })
        })
        createBox(page, dogs)
    })
}




export {createContainer, createDogBoxes, createBox, getRandomImageBySubBreed, getRandomImageByBreed};