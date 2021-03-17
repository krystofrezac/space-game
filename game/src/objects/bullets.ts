import Phaser from "phaser";
import { UpdatePositionsBullets } from "@space-game/shared/resolvers/updatePositions";

let bullets: { id: string; image: Phaser.GameObjects.Image }[] = [];

const checkBullets = (
  phaser: Phaser.Scene,
  updateBullets: UpdatePositionsBullets
): void => {
  const inactiveBullets = bullets.filter(
    (bullet) =>
      !updateBullets.some((updateBullet) => updateBullet.id === bullet.id)
  );
  inactiveBullets.forEach((inactiveBullet) => {
    inactiveBullet.image.destroy();
    bullets = bullets.filter((b) => b.id !== inactiveBullet.id);
  });

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

export const deleteBullets = (): void => {
  bullets.forEach((bullet) => bullet.image.destroy());
  bullets = [];
};

export default checkBullets;
