#!/bin/bash

echo "0-----------------------------------" >> /tmp/start.sh.log

for HOST in ${LETSENCRYPT_HOSTS}
do
echo "0b-----------------------------------" >> /tmp/start.sh.log
  if [ ! -d "/etc/letsencrypt/live/${HOST}" ]; then
echo "1-----------------------------------" >> /tmp/start.sh.log
    mkdir -p /etc/letsencrypt/live/${HOST}
echo "2-----------------------------------" >> /tmp/start.sh.log
    mkdir -p /var/lib/letsencrypt
echo "3-----------------------------------" >> /tmp/start.sh.log

    crt_file="/etc/letsencrypt/live/${HOST}/fullchain.pem" &&
    key_file="/etc/letsencrypt/live/${HOST}/privkey.pem" &&
    subject="${LETSENCRYPT_SUBJECT}" &&
    openssl req -new -newkey rsa:2048 -sha256 -x509 -nodes \
      -set_serial 1 \
      -days 3650 \
      -subj "$subject" \
      -out "$crt_file" \
      -keyout "$key_file" &&
    chmod 400 "$key_file"
echo "5-----------------------------------" >> /tmp/start.sh.log
  fi
done

echo "6-----------------------------------" >> /tmp/start.sh.log
nginx

echo "7-----------------------------------" >> /tmp/start.sh.log
for HOST in ${LETSENCRYPT_HOSTS}
do
echo "8-----------------------------------" >> /tmp/start.sh.log
  if [ ! -e "/etc/letsencrypt/initialize" ]; then
echo "9-----------------------------------" >> /tmp/start.sh.log
    rm -rf /etc/letsencrypt/live/${HOST}
echo "10-----------------------------------" >> /tmp/start.sh.log
    # certbot certonly: 3ヶ月で失効する SSL/TLSサーバ証明書を自動で更新します
    # -n: インタラクティブ設定をオフにします
    # --keep-until-expiring: ?
    # --agree-tos: Let's Encryptの利用規約に同意します
    # --webroot: 稼働中のサービスを落とさずにSSL証明書の発行や更新ができるようになります
    #     ※Webrootプラグインの仕組みは、コマンド実行時、所定の場所に認証用のファイルを
    #       配置した後、Let's Encryptのサーバがhttpでアクセス、きちんと指定のドメインで
    #       名前解決してアクセスできるよね！ということで認証を行う。
    #       認証用のファイルの配置等はcertbotが行ってくれる。
    # --webroot-path: 認証用ファイル配置先
    # -m: アカウントの登録や回復などに使用する電子メールアドレスを指定します
    # -d: SSL/TLSサーバ証明書の取得を申請するドメイン名を指定します
    certbot certonly -n --keep-until-expiring --agree-tos \
      --webroot --webroot-path /var/lib/letsencrypt \
      -m ${LETSENCRYPT_MAIL} -d ${HOST} \
      --dry-run
echo "11-----------------------------------" >> /tmp/start.sh.log
  fi
done

echo "12-----------------------------------" >> /tmp/start.sh.log
touch /etc/letsencrypt/initialize
echo "13-----------------------------------" >> /tmp/start.sh.log
#certbot renew
certbot renew --dry-run
echo "14-----------------------------------" >> /tmp/start.sh.log

nginx -s reload
echo "15-----------------------------------" >> /tmp/start.sh.log

while true
do
echo "16-----------------------------------" >> /tmp/start.sh.log
    sleep 7
echo "17-----------------------------------" >> /tmp/start.sh.log
done
echo "18-----------------------------------" >> /tmp/start.sh.log