#!/usr/bin/env bash
curl -X POST --data "payload={\"text\": \":slack: Starting Build - Web\"}" https://hooks.slack.com/services/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

cd /home/ubuntu/coin-collecting-app/ && git pull origin master && npm run build && rm -rf /var/www/html/* && cp -a /home/ubuntu/coin-collecting-app/public/. /var/www/html/

curl -X POST --data "payload={\"text\": \":slack: Build Complete - Web\"}" https://hooks.slack.com/services/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
