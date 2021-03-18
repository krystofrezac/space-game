echo "=== Deploy starts ==="

YARN="~/.nvm/versions/node/v12.18.3/bin/node ~/.nvm/versions/node/v12.18.3/lib/node_modules/yarn/bin/yarn.js"
runWithYarn() {
  eval "$YARN $1"
}
cd "/var/www/space-game" || exit
cd api || exit
runWithYarn "prod:stop"
cd ../game || exit
runWithYarn prod:stop

echo "=== App stopped ==="

cd ../.. || exit

rm -rf "space-game"
mkdir "space-game"

tar xf /var/www/space-game-deploy/bundled.tar.gz -C "/var/www/space-game/"

echo "=== App extracted ==="

cd "/var/www/space-game/api" || exit
runWithYarn prod:start
cd ../game || exit
runWithYarn prod:start

echo "=== App started ==="
echo "=== Deploy ends ==="
