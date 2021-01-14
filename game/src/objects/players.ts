import { UpdatePositionsPlayers } from "@space-game/shared/resolvers/updatePositions";
import Phaser from "phaser";

let players: { id: string; image: Phaser.GameObjects.Image }[] = [];

const checkPlayers = (
  phaser: Phaser.Scene,
  updatePlayers: UpdatePositionsPlayers
): void => {
  console.log("players", players.length, updatePlayers.length);

  const inactivePlayers = players.filter(
    (player) =>
      !updatePlayers.some((updatePlayer) => updatePlayer.id === player.id)
  );

  inactivePlayers.forEach((inactivePlayer) => {
    inactivePlayer.image.destroy();
    players = players.filter((p) => p.id !== inactivePlayer.id);
  });

  const newPlayers = updatePlayers.filter(
    (updatePlayer) => !players.some((player) => player.id !== updatePlayer.id)
  );

  newPlayers.forEach((newPlayer) => {
    players.push({ id: newPlayer.id, image: phaser.add.image(0, 0, "enemy") });
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
    }
  });
};

export default checkPlayers;
