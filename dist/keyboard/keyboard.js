// class vs factory function vs isolated object
// ask Alex which makes sense -- probably isolated object since not duplicating
// or creating multiple instances
//can also look into performance later
const reducedKeys = [
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];
const fullKeys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'backspace'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
];
const main = null;
const keysContainer = null;
const Keyboard = {
    elements: {
        main: main,
        keysContainer: keysContainer,
        keys: []
    },
    eventHandlers: {
        oninput: null,
        onclose: null
    },
    properties: {
        value: "",
        capsLock: false
    },
    init() {
        // @ts-ignore comment.
        this.elements.main = document.createElement("div");
        // @ts-ignore comment.
        this.elements.keysContainer = document.createElement("div");
        // @ts-ignore comment.
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        // @ts-ignore comment.
        this.elements.keysContainer.classList.add("keyboard__keys");
        // @ts-ignore comment.
        this.elements.keysContainer.appendChild(this._createKeys());
        // @ts-ignore comment.
        this.elements.main.appendChild(this.elements.keysContainer);
        // @ts-ignore comment.
        document.body.appendChild(this.elements.main);
    },
    // _ doesn't do anything functionally, just naming convention for private methods
    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyRowsLayout = reducedKeys;
        const lastRow = ['space'];
        // add icons for backspace/space/capslock later -- using font awesome
        for (const keyRow of keyRowsLayout) {
            for (const keyStr of keyRow) {
                const keyElement = document.createElement("button");
                keyElement.setAttribute("type", "button");
                keyElement.classList.add("keyboard__key");
                keyElement.textContent = keyStr.toLowerCase();
                // can add manually click keyboard later -- not essential
                fragment.appendChild(keyElement);
            }
            fragment.appendChild(document.createElement("br"));
        }
        //last row is always space for now
        //append br element (do we need one after the space at the end? may as well for now)
        return fragment;
    },
    // _triggerEvent(handlerName) {
    // },
    // _toggleCapsLock() {
    // },
    // open(initialValue, oninput, onclose) {
    // },
    // close () {
    // },
};
export {};
