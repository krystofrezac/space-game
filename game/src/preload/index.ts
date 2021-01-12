import borderImg from "../assets/border.png";
import playerImg from "../assets/player.png";

function preload(): void {
  this.load.image("border", borderImg);
  this.load.image("player", playerImg);
}

export default preload;
