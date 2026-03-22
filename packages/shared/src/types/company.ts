/** 会社情報 */
export interface CompanyInfo {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
}

/** サービス項目 */
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

/** ナビゲーション項目 */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

/** CTA（コールトゥアクション）情報 */
export interface CtaInfo {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
}

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

/** サービス詳細 */
export interface ServiceDetail extends ServiceItem {
  features: string[];
  targetAudience: string;
}
