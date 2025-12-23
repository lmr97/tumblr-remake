function getStyle(style) {
    switch (style) {
        case "old": 
            return "old-style.css"
        case "classic":
            return "classic-style"
        default:
            return "std-style.css"
    }
}

const urlQuery = URL.parse(window.location.href).searchParams;
const style    = urlQuery.get("style")

var fileref  = document.createElement("link");
fileref.rel  = "stylesheet";
fileref.type = "text/css";
fileref.href = `./styles/${getStyle(style)}`;
document.getElementsByTagName("head")[0].appendChild(fileref)

const styleForm = document.getElementById("style-changer");

styleForm.addEventListener(
    "submit", (ev) => {
        ev.preventDefault();
        const formData = new FormData(styleForm);
        const newStyle = formData.get("page-style");
        location.replace(`./page.html?style=${newStyle}`)
    }
);