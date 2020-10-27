class StartBtn {

    constructor(root, NAME, position1, position2, color) {


        this.x = position1;
        this.y = position2;

        this.domElement = document.createElement('button');

        this.domElement.style.color = 'white';
        this.domElement.style.backgroundColor = color;
        this.domElement.style.padding = '5px 10px';
        this.domElement.style.border = 'none';
        this.domElement.style.borderRadius = '4px'
        this.domElement.style.fontSize = '24px'
        this.domElement.innerHTML = NAME
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${this.x}px`;
        this.domElement.style.top = ` ${this.y}px`;
        this.domElement.style.zIndex = '10';
        root.appendChild(this.domElement);



    }



}