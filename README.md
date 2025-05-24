# AutoBuzzSns

AutoBuzzSns は、SNS投稿をAIで自動生成し、作業時間を大幅に短縮できるWebアプリケーションです。

## 🔥 特徴
- OpenAI APIを活用して「バズる投稿」を自動生成
- 投稿ジャンル・形式・トーンなどを選択し、カスタマイズ可能
- 出力履歴の保存・テーマカラー設定・Stripeによるプラン管理にも対応

## 🧠 使用技術
| レイヤー | 技術        | 説明                                     |
|----------|-------------|------------------------------------------|
| フロント | SvelteKit   | 軽量で高速なモダンWebアプリ開発フレームワーク |
| バックエンド | Go + Fiber   | 高速API開発に特化した軽量Webフレームワーク     |
| 認証      | JWT         | トークンベースのセキュアなAPI認証             |
| 決済      | Stripe      | 有料プランの支払い管理に使用                 |
| その他    | OpenAI API | 投稿生成ロジックにChatGPTを使用             |

## 📁 ディレクトリ構成（例）
```plaintext
📦 AutoBuzzSns
┣ 📁 frontend         # SvelteKitアプリケーション
┣ 📁 backend          # Go + Fiber APIサーバー
┣ 📁 openapi          # Swaggerドキュメント
┃ ┗ 📄 openapi.yaml
┣ 📄 README.md
┣ 📄 .gitignore
┗ 📄 LICENSE (必要に応じて)
```

## 🚀 セットアップ手順
後ほど追記予定（環境構築、OpenAIキー設定、Stripe連携など）

## 📌 機能一覧（初期リリース）
- [x] 投稿生成 `/posts/generate`
- [x] 履歴取得・詳細・削除 `/posts/history`
- [x] テーマ設定機能 `/themes`
- [x] 認証（登録・ログイン・JWT） `/auth`
- [x] Stripe決済 `/plans/subscribe`
- [x] プラン別制限・出力回数の管理

## 🎯 将来のアップデート予定
- [ ] 投稿スケジューリング機能
- [ ] マルチアカウント対応
- [ ] バズ分析レポート機能

## 📄 ライセンス
MITライセンス（予定）
