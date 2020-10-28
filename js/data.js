// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.
const GAME_WIDTH = 1000; //375
const GAME_HEIGHT = 750; //500

// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 156;
let MAX_ENEMIES = 3;

// These constants represent the player width and height.
const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 54;


// These constants represent the width and height of a bonus in pixels
// as well as the maximum number of bonus on screen at any given time.
const BONUS_WIDTH = 25;
const BONUS_HEIGHT = 10;
const MAX_BONUSES = 2;
const BONUS_SCORE = 50;

// These constants represent the width and height of a lives in pixels
// as well as the maximum number of lives on screen at any given time.
const LIVE_WIDTH = 25;
const LIVE_HEIGHT = 10;
const MAX_LIVES = 2;