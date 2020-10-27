class Bonus extends Figure {

    constructor(theRoot, bonusSpot, BonusScore) {

        super(theRoot, bonusSpot, './images/bonus2.png', BONUS_HEIGHT, BONUS_WIDTH, `+${BONUS_SCORE}`, Math.random() / 12 + 0.25)



    }


}