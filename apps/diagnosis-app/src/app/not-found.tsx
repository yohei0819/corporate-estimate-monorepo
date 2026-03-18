import { Button } from '@/components/ui/Button';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles['not-found']}>
      <div className={styles['not-found__inner']}>
        <p className={styles['not-found__code']}>404</p>
        <h2 className={styles['not-found__title']}>
          ページが見つかりません
        </h2>
        <p className={styles['not-found__message']}>
          お探しのページは存在しないか、移動された可能性があります。
        </p>
        <div className={styles['not-found__actions']}>
          <Button variant="primary" href="/">
            ホームに戻る
          </Button>
          <Button variant="outline" href="/diagnosis">
            診断を始める
          </Button>
        </div>
      </div>
    </div>
  );
}
