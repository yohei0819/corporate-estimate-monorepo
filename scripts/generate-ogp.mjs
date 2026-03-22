/**
 * OGP画像生成スクリプト
 * 実行: node scripts/generate-ogp.mjs
 */
import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WIDTH = 1200;
const HEIGHT = 630;

function generateOgpImage(title, subtitle, outputPath) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // 背景グラデーション
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, '#1a73e8');
  gradient.addColorStop(1, '#0d47a1');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // 装飾パターン
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.arc(WIDTH * 0.85, HEIGHT * 0.5, 50 + i * 30, 0, Math.PI * 2);
    ctx.stroke();
  }

  // メインタイトル
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 56px sans-serif';
  ctx.fillText(title, WIDTH / 2, HEIGHT / 2 - 40);

  // サブタイトル
  ctx.font = '28px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillText(subtitle, WIDTH / 2, HEIGHT / 2 + 40);

  // ブランド名
  ctx.font = '22px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fillText('Corporate Estimate', WIDTH / 2, HEIGHT - 50);

  // 上下のアクセントライン
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillRect(WIDTH / 2 - 60, HEIGHT / 2 - 90, 120, 3);

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, canvas.toBuffer('image/png'));
  console.warn(`Generated: ${outputPath}`);
}

// public-site 用
const publicDir = resolve(__dirname, '../apps/public-site/public');
generateOgpImage(
  'Corporate Estimate',
  '法人向けIT課題を診断・見積もり',
  resolve(publicDir, 'og-image.png'),
);

// diagnosis-app 用
const diagnosisDir = resolve(__dirname, '../apps/diagnosis-app/public');
generateOgpImage(
  'Web制作プラン診断',
  '最適なプランを無料で診断',
  resolve(diagnosisDir, 'og-image.png'),
);
