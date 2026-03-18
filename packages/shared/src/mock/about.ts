import type { CompanyInfo } from '../types/company';

/** 会社沿革 */
export interface CompanyHistory {
  year: string;
  description: string;
}

/** 会社の強み */
export interface CompanyStrength {
  id: string;
  title: string;
  description: string;
}

export const MOCK_COMPANY_DETAIL: CompanyInfo = {
  name: 'Corporate Estimate株式会社',
  description:
    '私たちは、法人のお客様が抱えるIT課題を「見える化」し、最適なソリューションをご提案する専門企業です。診断・見積もり・導入支援までワンストップで対応し、お客様のビジネス成長を支えます。',
  address: '〒100-0005 東京都千代田区丸の内1-1-1 丸の内ビルディング15F',
  phone: '03-1234-5678',
  email: 'info@corporate-estimate.example.com',
};

export const MOCK_COMPANY_HISTORY: CompanyHistory[] = [
  { year: '2018年', description: '東京都千代田区にてCorporate Estimate株式会社を設立' },
  { year: '2019年', description: 'IT導入診断サービスを正式リリース' },
  { year: '2020年', description: 'セキュリティ監査サービスを開始、顧客数100社突破' },
  { year: '2021年', description: 'コスト最適化コンサルティングを開始' },
  { year: '2022年', description: '大阪オフィスを開設、西日本エリアへ展開' },
  { year: '2023年', description: 'オンライン診断プラットフォームをリニューアル' },
  { year: '2024年', description: '顧客数500社を突破、DX推進支援を本格化' },
  { year: '2025年', description: 'AI活用型の自動見積もりシステムを導入' },
];

export const MOCK_COMPANY_STRENGTHS: CompanyStrength[] = [
  {
    id: 'str-1',
    title: '500社以上の導入実績',
    description: '多様な業界・規模の法人様に対応してきた豊富な経験とナレッジが強みです。',
  },
  {
    id: 'str-2',
    title: 'ワンストップ対応',
    description: '診断・見積もり・導入・運用まで一貫してサポート。複数ベンダーへの依頼が不要です。',
  },
  {
    id: 'str-3',
    title: '専任担当制',
    description: 'お客様ごとに専任の担当者をアサインし、継続的にビジネスの成長をサポートします。',
  },
];
