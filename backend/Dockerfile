# =====================================================
# 都合くんReactイメージビルド
# ※ビルドにはgit cloneが必要。常にフルビルドを行うため「--no-cache」を付けること。
#   → 「docker(docker-compose) build --no-cache ...」
# =====================================================
# ----------------------------
# ベースイメージ
# ----------------------------
FROM node:12

# ----------------------------
# Dockerビルド引数
# ----------------------------
# APIホストアドレス
ARG HOST_URL=http://localhost:3000
# Cookie有効期限（分単位）
# ※60*24*60=86400（2ヶ月）
ARG COOKIE_EXPIRED_MINUTES=86400

# ----------------------------
# アプリケーションディレクトリを作成する
# ----------------------------
WORKDIR /opt/tsugou-kun

# ----------------------------
# 環境変数
# ----------------------------
ENV PJ_HOME=/opt/tsugou-kun/app

# ----------------------------
# ビルド処理
# ----------------------------
RUN git clone https://github.com/isoittech/tsugou-kun-react.git app && \
    cd ${PJ_HOME}/backend && \
    npm ci && \
    cd ${PJ_HOME}/backend/src/main/db && \
    mkdir data && \
    ${PJ_HOME}/backend/node_modules/sequelize-cli/lib/sequelize db:migrate --env development && \
    mv ${PJ_HOME}/backend/src/main/db/data/tsugoukun_development.sqlite3 ${PJ_HOME}/backend/data/ && \
    cd ${PJ_HOME}/frontend && \
    npm ci && \
    touch .env && \
    npx cross-env NODE_ENV=production HOST_URL=${HOST_URL} COOKIE_EXPIRED_MINUTES=${COOKIE_EXPIRED_MINUTES} webpack

# ----------------------------
# ポート公開
# ----------------------------
EXPOSE 3000

# ----------------------------
# コンテナ起動時処理
# ----------------------------
#WORKDIR /opt/tsugou-kun/app/backend
#ENTRYPOINT ["node", "--nolazy", "-r", "ts-node/register/transpile-only", "src/main/index.ts"]
