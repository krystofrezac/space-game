import { UpdatePositionsPlayers } from "@space-game/shared/resolvers/updatePositions";
import Phaser from "phaser";

let players: {
  id: string;
  image: Phaser.GameObjects.Image;
  lives: Phaser.GameObjects.Text;
  name: Phaser.GameObjects.Text;
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
    inactivePlayer.lives.destroy();
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
      lives: phaser.add.text(0, 0, `${newPlayer.lives}`, {
        font: "4em",
        color: "#ff0044",
        align: "center",
      }),
      name: phaser.add.text(0, 0, newPlayer.name, {
        font: "4em",
        color: "#ff0044",
        align: "center",
        fixedWidth: 600,
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
      player.lives.setText(`${updatePlayer.lives}`);
      player.lives.x = player.image.x - 50;
      player.lives.y = player.image.y + 240;
      player.name.x = player.image.x - 310;
      player.name.y = player.image.y + 290;
    }
  });
};

export default checkPlayers;
