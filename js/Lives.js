class Lives extends Figure {

    constructor(theRoot, bonusSpot) {

        super(theRoot, bonusSpot, './images/live1.png', BONUS_HEIGHT, BONUS_WIDTH, '+1', Math.random() / 12 + 0.25)


    }
}