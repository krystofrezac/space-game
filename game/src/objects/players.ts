import { UpdatePositionsPlayers } from "@space-game/shared/resolvers/updatePositions";
import Phaser from "phaser";

let players: {
  id: string;
  image: Phaser.GameObjects.Image;
  text: Phaser.GameObjects.Text;
}[] = [];

const checkPlayers = (
  phaser: Phaser.Scene,
  updatePlayers: UpdatePositionsPlayers
): void => {
  const inactivePlayers = players.filter(
    (player) =>
      !updatePlayers.some((updatePlayer) => updatePlayer.id === player.id)
  );

  inactivePlayers.forEach((inactivePlayer) => {
    inactivePlayer.image.destroy();
    inactivePlayer.text.destroy();
    players = players.filter((p) => p.id !== inactivePlayer.id);
  });

  const newPlayers = updatePlayers.filter(
    (updatePlayer) => !players.some((player) => player.id === updatePlayer.id)
  );

  newPlayers.forEach((newPlayer) => {
    players.push({
      id: newPlayer.id,
      image: phaser.add.image(
        newPlayer.position.x,
        newPlayer.position.y,
        "enemy"
      ),
      text: phaser.add.text(0, 0, `${newPlayer.lives}`, {
        font: "4em",
        fill: "#ff0044",
        align: "center",
      }),
    });
  });

  players.forEach((player) => {
    const updatePlayer = updatePlayers.find(
      (updatePlayer) => updatePlayer.id === player.id
    );
    if (updatePlayer) {
      player.image.setPosition(
        updatePlayer.position.x,
        updatePlayer.position.y
      );
      player.image.setAngle(Phaser.Math.RadToDeg(updatePlayer.angle));
      player.text.setText(`${updatePlayer.lives}`);
      player.text.x = player.image.x - 50;
      player.text.y = player.image.y + 240;
    }
  });
};

export default checkPlayers;
