const urlQuery    = URL.parse(window.location.href).searchParams;
const useOldStyle = (urlQuery.get("oldstyle") === "true");

var styleFile = "./style.css";
if (useOldStyle) {
    console.debug("style set to 'old'");
    styleFile = "./style-old.css";
} else {
    console.debug("style retained standard");
}

var fileref = document.createElement("link");
fileref.rel = "stylesheet";
fileref.type = "text/css";
fileref.href = styleFile;
document.getElementsByTagName("head")[0].appendChild(fileref)

const linkElement = document.getElementById("link-style");
const styleButton = document.getElementById("chstyle");

styleButton.addEventListener(
    "click", () => location.replace(`./page.html?oldstyle=${!useOldStyle}`)
);