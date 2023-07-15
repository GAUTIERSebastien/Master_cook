// Function de création
export function createMarkup(markupname, text, parent, attributes = []) {
    const markup = document.createElement(markupname);
    markup.textContent = text;
    parent.appendChild(markup);
    for (const attribute of attributes) {
        for (let key in attribute) {
            markup.setAttribute(key, attribute[key]);
        }
    }
    return markup;
}
