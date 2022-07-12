function setHeader(root: HTMLElement) {
    const header = document.createElement("div") as HTMLElement;
    header.id = "header";
    const logoImg = document.createElement("img") as HTMLImageElement;
    logoImg.src = "https://www.thedoglist.com/wp-content/uploads/2018/10/doglist-logo-FINAL-2018-transparent-rev1.png";
    header.append(logoImg);
    root.appendChild(header);
}

export {setHeader}