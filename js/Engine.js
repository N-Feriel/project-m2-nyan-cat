// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
    // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
    // You need to provide the DOM node when you create an instance of the class
    constructor(theRoot) {
        // We need the DOM element every time we create a new enemy so we
        // store a reference to it in a property of the instance.
        this.root = theRoot;
        // We create our hamburger.
        // Please refer to Player.js for more information about what happens when you create a player
        this.player = new Player(this.root);


        this.scoreTotal = 0;
        this.bonusScore = 50;


        //Create our Score

        this.score = new Score(this.root, 20, 20);
        this.score.update(`${this.scoreTotal}`);


        //Create button newGame

        this.newGame = new StartBtn(this.root, 'NEW GAME', GAME_WIDTH / 2, 20, '#7ba5f0');

        this.newGameMessage = new StartGame(this.root)


        //Create Live variable
        this.liveCount = new Live(this.root, GAME_WIDTH - 150, 20);
        this.liveCount.update(`Lives:${this.liveCount.nlive}`);







        //Create Level variable 

        this.levelScore = 0;
        this.level = new Text(this.root, GAME_WIDTH / 5, 20);
        this.level.update(`Level ${this.levelScore}`);


        // Initially, we have no enemies in the game. The enemies property refers to an array
        // that contains instances of the Enemy class
        this.enemies = [];

        // Initially, we have no bonuses in the game. The bonuses property refers to an array
        this.bonuses = []

        // Initially, we have no lives in the game. The bonuses property refers to an array
        this.lives = []


        // We add the background image to the game
        addBackground(this.root, 'images/stars.png');


        this.mySound = new Sound('./images/GaiNeeToren.mp3');



        //this.newGameMessage.domElementBtn.addEventListener('click', this.mySound.playSound)
    }

    // The gameLoop will run every few milliseconds. It does several things
    //  - Updates the enemy positions
    //  - Detects a collision between the player and any enemy
    //  - Removes enemies that are too low from the enemies array
    gameLoop = () => {

        //hide  the button start from the game 
        this.newGameMessage.domElement.style.display = 'none';
        this.mySound.playSound();

        // This code is to see how much time, in milliseconds, has elapsed since the last
        // time this method was called.
        // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.

        if (this.lastFrame === undefined) {
            this.lastFrame = new Date().getTime();
        }

        let timeDiff = new Date().getTime() - this.lastFrame;

        this.lastFrame = new Date().getTime();
        // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
        // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
        this.enemies.forEach((enemy) => {
            enemy.update(timeDiff);
        });



        // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
        // We use filter to accomplish this.
        // Remember: this.enemies only contains instances of the Enemy class.
        this.enemies = this.enemies.filter((enemy) => {
            return !enemy.destroyed;
        });

        // We need to perform the addition of enemies until we have enough enemies.
        while (this.enemies.length < MAX_ENEMIES) {
            // We find the next available spot and, using this spot, we create an enemy.
            // We add this enemy to the enemies array
            const spot = nextEnemySpot(this.enemies);

            //add extra param img
            this.enemies.push(new Enemy(this.root, spot));
        }


        //Bonus Part

        this.bonuses.forEach((bonus) => {
            bonus.update(timeDiff);
        });


        this.bonuses = this.bonuses.filter((bonus) => {
            return !bonus.destroyed;
        });



        while (this.bonuses.length < MAX_BONUSES) {

            const spot = nextBonusSpot(this.bonuses);

            this.bonuses.push(new Bonus(this.root, spot));
        }


        //lives Part

        this.lives.forEach((live) => {
            live.update(timeDiff);
        });


        this.lives = this.lives.filter((live) => {
            return !live.destroyed;
        });



        while (this.lives.length < MAX_LIVES) {

            const spot = nextBonusSpot(this.lives);

            this.lives.push(new Lives(this.root, spot));
        }


        //check for the bonuses  if he hits the star bonus .
        this.isPlayerBonus = this.isPlayerDo(this.bonuses);


        // We check if the player is dead. If he is, he lost a live 

        this.isPlayerDead = this.isPlayerDo(this.enemies);

        //check for the lives  if he hits the hart bonus .
        this.isPlayerLive = this.isPlayerDo(this.lives);



        //get score function
        this.getScore();

        if (this.isPlayerBonus) {
            this.scoreTotal += this.bonusScore;
        }

        if (this.isPlayerLive) {
            this.liveCount.nlive += 1;
            this.liveCount.update(`Lives:${this.liveCount.nlive}`);
        }

        if (this.isPlayerDead) {
            //console.log(this.lives.nlive, i)
            this.liveCount.nlive -= 1;
            this.liveCount.update(`Lives:${this.liveCount.nlive}`);
        }

        if (this.liveCount.nlive === 0) {

            this.gameOverNotify();

            return;
        }


        //Update Level score

        this.levelScore = Math.floor(this.scoreTotal / 1000)
        this.level.update(`Level ${this.levelScore}`);


        //Increase Dificulty level each time by increasing number 
        //of enmies in the game 

        this.nDificulty = Math.floor(this.levelScore / 5)

        if (this.levelScore % 5 === 0) {
            MAX_ENEMIES = 3 + this.nDificulty;

        }

        //Change background Image when the player reach level 5 and 10 

        if (this.levelScore == 2) {
            changeBackground(this.root, '/images/game-background-1.jpg');
        }
        if (this.levelScore == 4) {
            changeBackground(this.root, '/images/game-background-2.jpg');
        }





        // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
        setTimeout(this.gameLoop, 20);
    };



    //method to calculate the score and display it in the game 

    getScore = () => {

        this.scoreTotal += 5;

        this.score.update(`${this.scoreTotal}`);

    }

    // methode to display message when the game is Over
    gameOverNotify = () => {

        let message1 = `${this.scoreTotal}`

        let message2 = `${this.levelScore}`;

        this.finishGameMessage = new FinishGame(this.root, message1, message2)

        this.finishGameMessage.domElementBtn.addEventListener('click', this.mySound.stopSound);
        this.finishGameMessage.domElementBtn.addEventListener('click', this.clearGame);

        //window.alert(message);

    }




    // method to verify if the burger hit element (enmy, bonus or live)

    isPlayerDo = (array) => {

        let isGetDo = false;

        array.map(elm => {

            if (this.player.x === elm.x && elm.y >= this.player.y) {
                elm.destroyed = true;


                elm.destroy();
                isGetDo = true;

            }

        })

        return (isGetDo)

    }


    clearGame = () => {
        window.location.reload();
    }






};