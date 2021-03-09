import borderImg from "../../../assets/border.png";
import playerImg from "../../../assets/player.png";
import enemyImg from "../../../assets/enemy.png";
import bulletImg from "../../../assets/bullet.png";

function preload(phaser: Phaser.Scene): void {
  phaser.load.image("border", borderImg);
  phaser.load.image("player", playerImg);
  phaser.load.image("enemy", enemyImg);
  phaser.load.image("bullet", bulletImg);
}

export default preload;
