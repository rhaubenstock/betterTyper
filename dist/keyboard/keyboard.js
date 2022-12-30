// class vs factory function vs isolated object
// ask Alex which makes sense -- probably isolated object since not duplicating
// or creating multiple instances
//can also look into performance later
const reducedKeys = [
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];
const fingerLookup = {
    'a': 'left-pinky',
    's': 'left-ring',
    'd': 'left-middle',
    'f': 'left-index',
    'g': 'left-thumb',
    'h': 'right-thumb',
    'j': 'right-index',
    'k': 'right-middle',
    'l': 'right-ring',
    ' ': 'right-pinky',
    'q': 'left-pinky',
    'w': 'left-ring',
    'e': 'left-middle',
    'r': 'left-index',
    't': 'left-thumb',
    'y': 'right-thumb',
    'u': 'right-index',
    'i': 'right-middle',
    'o': 'right-ring',
    'p': 'right-pinky',
    'z': 'left-pinky',
    'x': 'left-ring',
    'c': 'left-middle',
    'v': 'left-index',
    'b': 'left-thumb',
    'n': 'right-thumb',
    'm': 'right-index',
};
// const fullKeys = [
//   ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-','+','backspace'],
//   ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
//   ['caps','a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter'],
//   ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
// ];
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
        this.elements.keysContainer = document.getElementById("virtual-keyboard");
        // @ts-ignore comment.
        this.elements.keysContainer.classList.add("off");
        // @ts-ignore comment.
        this.elements.main = document.getElementById("keyboard-keys");
        // @ts-ignore comment.
        this.elements.main.classList.add("keyboard");
        // @ts-ignore comment.
        this.elements.main.classList.add("keyboard__keys");
        // @ts-ignore comment.
        this.elements.main.appendChild(this._createKeys());
    },
    // _ doesn't do anything functionally, just naming convention for private methods
    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyRowsLayout = reducedKeys;
        // add icons for backspace/space/capslock later -- using font awesome
        for (const keyRow of keyRowsLayout) {
            for (const keyStr of keyRow) {
                const keyElement = document.createElement("button");
                keyElement.setAttribute("type", "button");
                // @ts-ignore comment.
                keyElement.classList.add("keyboard__key", fingerLookup[keyStr]);
                keyElement.id = `key--${keyStr}`;
                keyElement.textContent = keyStr.toLowerCase();
                // can add manually click keyboard later -- not essential
                fragment.appendChild(keyElement);
            }
            fragment.appendChild(document.createElement("br"));
        }
        //last row is always space for now
        //append br element (do we need one after the space at the end? may as well for now)
        const spaceElement = document.createElement("button");
        spaceElement.setAttribute("type", "button");
        spaceElement.classList.add("keyboard__key", "keyboard__key--extra-wide");
        spaceElement.id = "key--space";
        spaceElement.textContent = "space";
        fragment.appendChild(spaceElement);
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
export default Keyboard;
