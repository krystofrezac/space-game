import Phaser from "phaser";
import { UpdatePositionsBullets } from "@space-game/shared/resolvers/updatePositions";

const bullets: { id: string; image: Phaser.GameObjects.Image }[] = [];

const checkBullets = (
  phaser: Phaser.Scene,
  updateBullets: UpdatePositionsBullets
): void => {
  const newBullets = updateBullets.filter(
    (updateBullet) => !bullets.some((bullet) => updateBullet.id === bullet.id)
  );

  newBullets.forEach((bullet) => {
    bullets.push({
      id: bullet.id,
      image: phaser.add.image(bullet.position.x, bullet.position.y, "bullet"),
    });
  });

  bullets.forEach((bullet) => {
    const updateBullet = updateBullets.find(
      (updateBullet) => updateBullet.id === bullet.id
    );
    if (updateBullet) {
      bullet.image.setPosition(
        updateBullet.position.x,
        updateBullet.position.y
      );
      bullet.image.setAngle(Phaser.Math.RadToDeg(updateBullet.angle));
    }
  });
};

export default checkBullets;
