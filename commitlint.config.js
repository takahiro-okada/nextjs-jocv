const customPlugin = require('./commitlint-plugin-custom');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: customPlugin.rules,
    },
  ],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        '🐛', // バグ修正・誤字脱字修正
        '✏️', // 微修正
        '✨', // 新機能・新ファイル追加
        '🎉', // 新プロジェクト立ち上げ
        '⚡️', // 改良・高速化
        '♻️', // コード整形
        '💩', // 非推奨追加
        '🗑️', // 削除
      ],
    ],
    'subject-case': [0], // ケースを強制しない
    'type-case': [0], // タイプのケースを強制しない
    'type-empty': [0], // タイプの空を許可する
    'subject-empty': [0], // サブジェクトの空を許可する
    'header-match-pattern': [2, 'always'],
  },
};
