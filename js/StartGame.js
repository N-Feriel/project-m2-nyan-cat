class StartGame {

    constructor(root, NAME, color) {


        this.x = GAME_WIDTH / 5;
        this.y = GAME_WIDTH / 5;

        this.domElement = document.createElement('div');
        this.domElement.style.opacity = '0.6'

        this.domElement1 = document.createElement('h2');
        this.domElement1.style.textAlign = 'center';
        this.domElement1.innerHTML = "Welcome to the Game"

        this.domElement2 = document.createElement('div');
        this.domElement2.style.display = 'flex';
        this.domElement2.style.alignItems = 'center'
        this.domElementImg = document.createElement('img');
        this.domElementImg.src = '/images/keyboard.png';
        this.domElementTxt = document.createElement('p');
        this.domElementTxt.innerHTML = "Use KeyBoard to move"


        this.domElementBtn = document.createElement('button');
        this.domElementBtn.innerHTML = "START";
        this.domElementBtn.style.backgroundColor = '#000099';
        this.domElementBtn.style.color = 'white'
        this.domElementBtn.style.padding = '5px 10px';
        this.domElementBtn.style.border = 'none';
        this.domElementBtn.style.borderRadius = '4px'
        this.domElementBtn.style.fontSize = '32px'
        this.domElementBtn.style.width = '150px';
        this.domElementBtn.style.alignSelf = 'center';




        this.domElement.style.backgroundColor = ' #e6e6ff';
        this.domElement.style.padding = '25px';
        this.domElement.style.border = 'none';
        this.domElement.style.borderRadius = '4px'
        this.domElement.style.fontSize = '24px'
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${this.x}px`;
        this.domElement.style.top = ` ${this.y}px`;
        this.domElement.style.zIndex = '10';
        this.domElement.style.display = 'flex';
        this.domElement.style.flexDirection = 'column';


        root.appendChild(this.domElement);

        this.domElement.appendChild(this.domElement1);
        this.domElement.appendChild(this.domElement2);
        this.domElement2.appendChild(this.domElementImg);
        this.domElement2.appendChild(this.domElementTxt);
        this.domElement.appendChild(this.domElementBtn);



    }



}