const galleryElement = document.querySelector("#gallery")

function renderGalleryView (characters) {
    const characterCards = characters.map(toCharacterView)
    galleryElement.replaceChildren(...characterCards)
    // replaceChildren() is our alternative to append() when we want to replace the contents of the parent element, instead of adding new elements
}

function toCharacterView (character) {
    const imgURL = `${character.thumbnail.path}.${character.thumbnail.extension}`
    const imgElement = document.createElement("img")
    imgElement.src = imgURL
    
    const characterContainer = document.createElement("article")
    characterContainer.classList.add("character-card")

    characterContainer.append(imgElement)
    characterContainer.append(characterNameView(character))

    return characterContainer  /* Should look like:
        <article class="character-card">
            <img src="..." alt="...">
            <a href="..." alt="..." target="_blank">
                <!-- See characterNameView() for more of this part of the HTML... -->
            </a>
        </article>
    */
}

function characterNameView (character) {
    const link = document.createElement("a")
    link.alt = character.name + " on Marvel.com"
    link.target = "_blank"
    
    const urlObject = character.urls.find(urlObject => urlObject.type === "detail") // or backup links if there is no detail link for this character...
        || character.urls.find(urlObject => urlObject.type === "wiki")
        || character.urls.find(urlObject => urlObject.type === "comiclink")

    link.href = urlObject.url

    const firstLineElement = document.createElement("div")
    const secondLineElement = document.createElement("div")
    
    firstLineElement.classList.add("name-first-line")
    secondLineElement.classList.add("name-second-line")
    
    const [firstLine, secondLine] = character.name.split(" (")
    
    firstLineElement.append(firstLine)
    if (secondLine) secondLineElement.append("(" + secondLine)  // Don't add content to this DIV if there is no text in parentheses (see the split() above)

    link.append(firstLineElement)
    link.append(secondLineElement)

    return link  /* Should look like:
        <a href="..." alt="..." target="_blank">
            <div class="name-first-line">NAME</div>
            <div class="name-second-line">PARENTHETICAL CLARIFICATION</div>
        </a>
    */
}