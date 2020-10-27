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


        //Create Life variable
        this.lifeCount = new Life(this.root, GAME_WIDTH - 150, 20);
        this.lifeCount.update(`Lives: ${this.lifeCount.nlife}`);



        //Create Level variable 

        this.levelScore = 0;
        this.level = new Text(this.root, GAME_WIDTH / 5, 20);
        this.level.update(`Level ${this.levelScore}`);


        // Initially, we have no enemies in the game. The enemies property refers to an array
        // that contains instances of the Enemy class
        this.enemies = [];

        // Initially, we have no bonuses in the game. The bonuses property refers to an array
        this.bonuses = []

        // Initially, we have no lifes in the game. The bonuses property refers to an array
        this.lifes = []


        // We add the background image to the game
        addBackground(this.root, 'images/stars.png');



    }

    // The gameLoop will run every few milliseconds. It does several things
    //  - Updates the enemy positions
    //  - Detects a collision between the player and any enemy
    //  - Removes enemies that are too low from the enemies array
    gameLoop = () => {

        //hide  the button start from the game 
        this.newGameMessage.domElement.style.display = 'none';


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


        //lifes Part

        this.lifes.forEach((life) => {
            life.update(timeDiff);
        });


        this.lifes = this.lifes.filter((life) => {
            return !life.destroyed;
        });



        while (this.lifes.length < MAX_LIFES) {

            const spot = nextBonusSpot(this.lifes);

            this.lifes.push(new Lifes(this.root, spot));
        }


        //check for the bonuses  if he hits the star bonus .
        this.isPlayerBonus = this.isPlayerDo(this.bonuses);


        // We check if the player is dead. If he is, he lost a life 

        this.isPlayerDead = this.isPlayerDo(this.enemies);

        //check for the lifes  if he hits the hart bonus .
        this.isPlayerLive = this.isPlayerDo(this.lifes);



        //get score function
        this.getScore();

        if (this.isPlayerBonus) {
            this.scoreTotal += this.bonusScore;
            console.log(this.scoreTotal)
        }

        if (this.isPlayerLive) {
            this.lifeCount.nlife += 1;
            this.lifeCount.update(`Lives: ${this.lifeCount.nlife}`);
        }

        if (this.isPlayerDead) {
            //console.log(this.lifes.nlife, i)
            this.lifeCount.nlife -= 1;
            this.lifeCount.update(`Lives: ${this.lifeCount.nlife}`);
        }

        if (this.lifeCount.nlife === 0) {

            this.gameOverNotify();
            this.clearGame()
            return;
        }


        //Update Level score

        this.levelScore = Math.floor(this.scoreTotal / 10000)
        this.level.update(`Level ${this.levelScore}`);


        //Increase Dificulty level each time by increasing number 
        //of enmies in the game 

        this.nDificulty = Math.floor(this.levelScore / 5)

        if (this.levelScore % 5 === 0) {
            MAX_ENEMIES = 3 + this.nDificulty;

        }

        //Change background Image when the player reach level 5 and 10 

        if (this.levelScore == 5) {
            changeBackground(this.root, '/images/game-background-1.jpg');
        }
        if (this.levelScore == 10) {
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

        let message = `Game Over 

        your Score is ${this.scoreTotal}
                &&
        your Level is ${this.levelScore}`

        window.alert(message);

    }




    // method to verify if the burger hit element (enmy, bonus or life)

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