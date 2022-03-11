# Login-function-express

## 1. レポジトリをローカルにクローンする.

`git clone https://github.com/masatotezuka/Login-function-express.git`

## 2 npm のインストール

`npm i`

## 3. MySQL の操作（コマンドライン）

`brew services start mysql;`

`mysql --user="usename" --password="password";`

`CREATE USER 'root'@'127.0.0.1';`

`CREATE DATABASE db_dev;`

`GRANT ALL PRIVILEGES ON db_dev.* TO root@'127.0.0.1';`

## 4. DB マイグレーション（MySQL）

`npx sequelize-cli db:migrate`

## 5. サーバー起動

`npm start`
