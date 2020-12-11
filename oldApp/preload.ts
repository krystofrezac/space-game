import borderImg from "../game/src/assets/border.png";
import playerImg from "../game/src/assets/player.png";

function preload(): void {
  this.load.image("border", borderImg);
  this.load.image("player", playerImg);
}

export default preload;
