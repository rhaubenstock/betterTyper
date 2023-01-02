export const dashNames:string[] = [
    "time",
    "wpm",
    "combo",
    "progress",
    "correct-chars",
    "incorrect-chars",
];

const Dashboard = {
    elements: {
        dashContainer: null,
        main: null,
        dashElements: []
    },

    init(){
        // @ts-ignore comment.
        this.elements.dashContainer = document.getElementById("dashboard");
        // @ts-ignore comment.
        this.elements.main = document.getElementById("main");
        // @ts-ignore comment.
        this.elements.dashElements = document.getElementsByClassName("dashboard__element");
    },

    _createDash(){
        const fragment = document.createDocumentFragment();
        // add icons for backspace/space/capslock later -- using font awesome
        for (const name of dashNames){
            const dashElement = document.createElement("button");
            dashElement.setAttribute("type", "button");
            // @ts-ignore comment.
            dashElement.classList.add("dashboard__dash", fingerLookup[dashStr]);
            dashElement.id = `dash--${name}`;
        
            fragment.appendChild(dashElement);
        }
        fragment.appendChild(document.createElement("br"));   
    },

    update(){

    }
};

// what do we need here
// object -> contains all the dashboard elements
// -> class off at start -> class off removed after load text button clicked

// need method to update dashboard element values

// probably want initialization method to add each dashboard element to dash
// to make it more modular




export default Dashboard;