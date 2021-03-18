echo "=== Build start ==="
rm -rf ../space-game-deploy/bundled.tar.gz
cd ./app || exit
yarn build || exit
cd ..
tar -czf ../space-game-deploy/bundled.tar.gz ./

echo "=== Build end ==="
echo "=== Transfer start ==="

scp -r ../space-game-deploy/bundled.tar.gz root@161.35.208.81:/var/www/space-game-deploy/bundled.tar.gz || exit
scp ./deploy/server.sh root@161.35.208.81:/var/www/space-game-deploy/server.sh || exit

echo "=== Transfer end ==="
ssh root@161.35.208.81 "bash /var/www/space-game-deploy/server.sh"
