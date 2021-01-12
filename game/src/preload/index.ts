import borderImg from "../assets/border.png";
import playerImg from "../assets/player.png";
import { setPlayer } from "../stores/player";

function preload(): void {
  this.load.image("border", borderImg);
  this.load.image("player", playerImg);
}

export default preload;
