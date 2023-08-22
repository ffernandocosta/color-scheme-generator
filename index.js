let colorsArr = [];
const formEl = document.getElementById("clr-scheme--form");
const clrSchemeDiv = document.getElementById("clr-scheme--container");
const copyToClipboardMessageEl = document.getElementById("copy-to-clipboard-message");

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    getColorScheme();
});

clrSchemeDiv.addEventListener("click", (e) => {
    if (e.target.dataset.hexValue) {
        navigator.clipboard.writeText(`${e.target.dataset.hexValue}`);
        renderCopyToClipboardMessage();
    }
});

async function getColorScheme() {
    const clrSeed = document.getElementById("clr-scheme--input").value.replace("#", "")
    const clrSchemeType = document.getElementById("clr-scheme--types").value;

    const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${clrSeed}&mode=${clrSchemeType}`, {method:"GET"});
    const data = await response.json();
    colorsArr = data.colors;
    renderColorScheme();
}

function renderColorScheme() {
    let html = ""
    colorsArr.forEach((color) => {
        html += `
            <div class="clr-scheme-group">
                <img src="${color.image.bare}" class="clr-img" data-hex-value="${color.hex.value}"></img>
                <p class="hex-value" data-hex-value="${color.hex.value}">${color.hex.value}</p>
            </div>
        `
    })
    document.getElementById("clr-scheme--container").innerHTML = html;
}

function renderCopyToClipboardMessage() {
    copyToClipboardMessageEl.style.display = "flex";
    setTimeout(() => {
        copyToClipboardMessageEl.style.display = "none";
    }, 1800)
}

getColorScheme();