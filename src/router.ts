import { createFirstPage } from "./Init-firstPage";
import { getSubBreedsPage } from "./Init-secondPage";
import { getRandomSubBreedImages } from "./Init-thirdPage";
import { getBreedRandomImages } from "./Init-thirdPage";
import { getErrorPage } from "./error";

function pathToRegex(path:string) {
    return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
} 

function getParams(match : any) {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result: any) => result[1]);
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

async function router(root: HTMLElement) {
    const routes = [
        { path: "/", view: () => createFirstPage()},
        { path: "/breeds/:id", view: (param:any) => getSubBreedsPage(param)},
        { path: "/random/:id1/:id2", view: (param: any) => getRandomSubBreedImages(param)},
        { path: "/random/:id", view: (param: any) => getBreedRandomImages(param)},
        { path: "/404", view: () => getErrorPage()}
    ];

    const potentialMatches = routes.map((route: any) => {
        return {
            route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });
    console.log(potentialMatches)
    
    let match = potentialMatches.find((potentialMatch: any) => potentialMatch.result !== null);
    
    if (!match) {
        match = {
            route: routes[4],
            result: [location.pathname]
        };
    }
    const param: any = getParams(match);
    const page = match.route.view(param) || '';
    root.innerHTML = "";
    root.append(page);
}

function navigateTo(url:string) {
    history.pushState(null, url , url);
    window.dispatchEvent(new Event('popstate'));
};

export {
    router,
    navigateTo,
};
