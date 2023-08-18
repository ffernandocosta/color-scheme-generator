let colorsArr = [];
const formEl = document.getElementById("clr-scheme--form")

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    getColorScheme();
})

async function getColorScheme() {
    const clrSeed = document.getElementById("clr-scheme--input").value.replace("#", "")
    const clrSchemeType = document.getElementById("clr-scheme--types").value

    const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${clrSeed}&mode=${clrSchemeType}`, {method:"GET"})
    const data = await response.json();
    colorsArr = data.colors
    renderColorScheme()
}

function renderColorScheme() {
    let html = ""
    colorsArr.forEach((color) => {
        html += `
            <div class="clr-scheme-group">
                <img src="${color.image.bare}" class="clr-img"></img>
                <p class="hex-value">${color.hex.value}</p>
            </div>
        `
    })
    document.getElementById("clr-scheme--container").innerHTML = html
}

getColorScheme()