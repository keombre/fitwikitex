const realSource = "https://fit-wiki.cz/_media/latex/"

const loaded = img => {
    if ((img.complete && img.naturalHeight != 0) || img.src.includes("_media/latex"))
        return
    const query = new URLSearchParams(img.src.split("?")[1])
    if (query.has("media")) {
        const media = query.get("media")
        if (media.startsWith("latex:"))
            img.src = realSource + media.substr(6)
    }
}

// attach event listeners
const images = document.querySelectorAll('img.media[title="mimeTeX"]');
images.forEach(img => {
    if (!img.complete) {
        img.addEventListener('load', () => loaded(img))
        img.addEventListener('error', () => loaded(img))
    } else
        loaded(img)
})
