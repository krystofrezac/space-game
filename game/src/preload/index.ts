import borderImg from "../assets/border.png";
import playerImg from "../assets/player.png";
import enemyImg from "../assets/enemy.png";
import bulletImg from "../assets/bullet.png";

function preload(this: Phaser.Scene): void {
  this.load.image("border", borderImg);
  this.load.image("player", playerImg);
  this.load.image("enemy", enemyImg);
  this.load.image("bullet", bulletImg);
}

export default preload;
