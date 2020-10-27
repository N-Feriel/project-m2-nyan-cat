// The Enemy class will contain information about the enemy such as
// its position on screen. It will also provide methods for updating
// and destroying the enemy.
class Enemy extends Figure {

    constructor(theRoot, enemySpot) {

        super(theRoot, enemySpot, './images/enemy.png', ENEMY_HEIGHT, ENEMY_WIDTH, '', Math.random() / 2 + 0.25)



    }


}