curl -X POST --data "payload={\"text\": \":slack: Starting Build - Web\"}" https://hooks.slack.com/services/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

cd /coin-collecting
git pull origin master
yarn
chmod +x build.sh

yarn build

rm -rf /var/www/html/* && cp -a /home/ubuntu/coin-collecting-app/public/. /var/www/html/

curl -X POST --data "payload={\"text\": \":slack: text here \"}" https://hooks.slack.com/services/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
