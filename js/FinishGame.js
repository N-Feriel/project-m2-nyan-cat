class FinishGame {

    constructor(root, message1, message2) {


        this.x = GAME_WIDTH / 5;
        this.y = GAME_WIDTH / 5;

        this.domElement = document.createElement('div');
        this.domElement.style.opacity = '0.8'

        this.domElement1 = document.createElement('h2');
        this.domElement1.style.textAlign = 'center';
        this.domElement1.innerHTML = "GAME OVER"

        this.domElement2 = document.createElement('div');
        this.domElement2.style.display = 'flex';
        this.domElement2.style.flexDirection = 'column';
        this.domElement2.style.alignSelf = 'center';
        this.domElement2.style.margin = '20px'
        this.domElementTxta = document.createElement('div');
        this.domElementTxta.innerHTML = `Your Score is  <b>${message1}</b>`;
        this.domElement2.appendChild(this.domElementTxta);
        this.domElementTxta.style.margin = '20px 0'


        this.domElementTxtb = document.createElement('div');
        this.domElementTxtb.innerHTML = `Your Level is <b>${message2}</b>`
        this.domElement2.appendChild(this.domElementTxtb);

        this.domElement3 = document.createElement('div');
        this.domElement3.style.display = 'flex';
        this.domElement3.style.flexDirection = 'column';
        this.domElement3.style.alignItems = 'center'
        this.domElementTxt2 = document.createElement('p');
        this.domElementTxt2.innerHTML = "PRESS THE BUTTON TO START A NEW GAME";
        this.domElementBtn = document.createElement('button');
        this.domElementBtn.innerHTML = "NEW";
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
        this.domElement.appendChild(this.domElement3);
        // this.domElement2.appendChild(this.domElementTxt);

        this.domElement3.appendChild(this.domElementTxt2);
        this.domElement3.appendChild(this.domElementBtn);


    }



}