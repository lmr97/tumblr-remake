function getStyle(style: string | null | undefined) {
    
    if (!style) {
        return "std-style.css"
    }

    let selected = document.querySelector("option."+style);
    selected?.setAttribute("selected", "true");

    switch (style) {
        case "old": 
            return "old-style.css"
        case "classic":
            return "classic-style.css"
        default:
            return "std-style.css"
    }
}

const urlQuery = URL.parse(location.href);
const style    = urlQuery?.searchParams.get("page-style")

var fileref  = document.createElement("link");
fileref.rel  = "stylesheet";
fileref.type = "text/css";
fileref.href = `./styles/${getStyle(style)}`;
document.getElementsByTagName("head")[0].appendChild(fileref)

const styleForm = document.querySelector("form");

if (styleForm) {
    styleForm.addEventListener(
        "submit", (ev) => {
            ev.preventDefault();
            const formData = new FormData(styleForm);
            const newStyle = formData.get("page-style") ?? "std";
            location.replace(`./?page-style=${newStyle}`)
        }
    );
}