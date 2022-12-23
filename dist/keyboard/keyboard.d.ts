declare const Keyboard: {
    elements: {
        main: null;
        keysContainer: null;
        keys: never[];
    };
    eventHandlers: {
        oninput: null;
        onclose: null;
    };
    properties: {
        value: string;
        capsLock: boolean;
    };
    init(): void;
    _createKeys(): DocumentFragment;
};
export default Keyboard;
