import type { NavItem } from '../types/company';

/** ヘッダーナビゲーション */
export const HEADER_NAV_ITEMS: NavItem[] = [
  { label: 'ホーム', href: '/' },
  { label: 'サービス', href: '/services' },
  { label: '実績', href: '/works' },
  { label: '会社概要', href: '/about' },
  { label: 'よくある質問', href: '/faq' },
  { label: 'お問い合わせ', href: '/contact' },
];

/** フッターナビゲーション */
export const FOOTER_NAV_ITEMS: NavItem[] = [
  { label: 'プライバシーポリシー', href: '/privacy' },
  { label: '利用規約', href: '/terms' },
  { label: '特定商取引法に基づく表記', href: '/legal' },
];

/** 診断アプリ用ヘッダーナビゲーション */
export const DIAGNOSIS_HEADER_NAV_ITEMS: NavItem[] = [
  { label: 'ホーム', href: '/' },
  { label: '診断', href: '/diagnosis' },
  { label: '見積もり', href: '/estimate' },
  { label: 'プラン比較', href: '/compare' },
  { label: 'マイページ', href: '/mypage' },
];
