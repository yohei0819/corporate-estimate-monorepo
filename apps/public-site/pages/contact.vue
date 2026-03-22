<template>
  <div class="page-contact">
    <UiBreadcrumb :crumbs="[{ label: 'お問い合わせ' }]" />
    <UiPageHero
      title="お問い合わせ"
      subtitle="Contact"
      description="サービスに関するご質問やご相談は、下記フォームよりお気軽にどうぞ。"
    />

    <section class="page-contact__form-section">
      <div class="page-contact__form-inner">
        <form class="page-contact__form" @submit.prevent="handleSubmit">
          <ul v-if="validationErrors.length > 0" class="page-contact__validation-errors" role="alert">
            <li v-for="err in validationErrors" :key="err">{{ err }}</li>
          </ul>
          <div class="page-contact__field">
            <label for="contact-company" class="page-contact__label">会社名 <span class="page-contact__required">必須</span></label>
            <input
              id="contact-company"
              v-model="form.company"
              type="text"
              class="page-contact__input"
              placeholder="例：株式会社サンプル"
              required
              :aria-invalid="fieldErrors.company ? 'true' : undefined"
              :aria-describedby="fieldErrors.company ? 'error-company' : undefined"
              @blur="handleBlur('company')"
            >
            <p v-if="fieldErrors.company" :id="'error-company'" class="page-contact__field-error">{{ fieldErrors.company }}</p>
          </div>

          <div class="page-contact__field">
            <label for="contact-name" class="page-contact__label">ご担当者名 <span class="page-contact__required">必須</span></label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              class="page-contact__input"
              placeholder="例：山田 太郎"
              required
              :aria-invalid="fieldErrors.name ? 'true' : undefined"
              :aria-describedby="fieldErrors.name ? 'error-name' : undefined"
              @blur="handleBlur('name')"
            >
            <p v-if="fieldErrors.name" :id="'error-name'" class="page-contact__field-error">{{ fieldErrors.name }}</p>
          </div>

          <div class="page-contact__field">
            <label for="contact-email" class="page-contact__label">メールアドレス <span class="page-contact__required">必須</span></label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              class="page-contact__input"
              placeholder="例：yamada@example.com"
              required
              :aria-invalid="fieldErrors.email ? 'true' : undefined"
              :aria-describedby="fieldErrors.email ? 'error-email' : undefined"
              @blur="handleBlur('email')"
            >
            <p v-if="fieldErrors.email" :id="'error-email'" class="page-contact__field-error">{{ fieldErrors.email }}</p>
          </div>

          <div class="page-contact__field">
            <label for="contact-phone" class="page-contact__label">電話番号</label>
            <input
              id="contact-phone"
              v-model="form.phone"
              type="tel"
              class="page-contact__input"
              placeholder="例：03-1234-5678"
            >
          </div>

          <div class="page-contact__field">
            <label for="contact-category" class="page-contact__label">お問い合わせ種別 <span class="page-contact__required">必須</span></label>
            <select
              id="contact-category"
              v-model="form.category"
              class="page-contact__select"
              required
              :aria-invalid="fieldErrors.category ? 'true' : undefined"
              :aria-describedby="fieldErrors.category ? 'error-category' : undefined"
              @blur="handleBlur('category')"
            >
              <option value="" disabled>選択してください</option>
              <option value="service">サービスについて</option>
              <option value="estimate">お見積もりについて</option>
              <option value="support">導入後のサポートについて</option>
              <option value="other">その他</option>
            </select>
            <p v-if="fieldErrors.category" :id="'error-category'" class="page-contact__field-error">{{ fieldErrors.category }}</p>
          </div>

          <div class="page-contact__field">
            <label for="contact-message" class="page-contact__label">お問い合わせ内容 <span class="page-contact__required">必須</span></label>
            <textarea
              id="contact-message"
              v-model="form.message"
              class="page-contact__textarea"
              rows="6"
              placeholder="お問い合わせ内容をご入力ください"
              required
              :aria-invalid="fieldErrors.message ? 'true' : undefined"
              :aria-describedby="fieldErrors.message ? 'error-message' : undefined"
              @blur="handleBlur('message')"
            />
            <p v-if="fieldErrors.message" :id="'error-message'" class="page-contact__field-error">{{ fieldErrors.message }}</p>
          </div>

          <div class="page-contact__actions">
            <UiBaseButton variant="primary" size="lg" type="submit" :disabled="isSubmitting">
              {{ isSubmitting ? '送信中...' : '送信する' }}
            </UiBaseButton>
          </div>

          <p v-if="submitStatus === 'success'" class="page-contact__success" role="status">
            お問い合わせを受け付けました。担当者よりご連絡いたしますので、しばらくお待ちください。<br>
            <small>※ こちらはデモサイトのため、実際の送信は行われません。</small>
          </p>
          <p v-if="submitStatus === 'error'" class="page-contact__submit-error" role="alert">
            送信に失敗しました。時間をおいて再度お試しいただくか、お電話でお問い合わせください。
          </p>
        </form>
      </div>
    </section>

    <!-- 会社連絡先 -->
    <section class="page-contact__info">
      <div class="page-contact__info-inner">
        <UiSectionTitle title="その他のお問い合わせ方法" subtitle="Other Ways" />
        <div class="page-contact__info-grid">
          <UiBaseCard>
            <h3 class="page-contact__info-title">お電話でのお問い合わせ</h3>
            <p class="page-contact__info-value">{{ companyInfo.phone }}</p>
            <p class="page-contact__info-note">受付時間：平日 9:00〜18:00</p>
          </UiBaseCard>
          <UiBaseCard>
            <h3 class="page-contact__info-title">メールでのお問い合わせ</h3>
            <p class="page-contact__info-value">{{ companyInfo.email }}</p>
            <p class="page-contact__info-note">24時間受付（返信は翌営業日まで）</p>
          </UiBaseCard>
          <UiBaseCard>
            <h3 class="page-contact__info-title">所在地</h3>
            <p class="page-contact__info-value">{{ companyInfo.address }}</p>
            <p class="page-contact__info-note">お越しの際は事前にご連絡ください</p>
          </UiBaseCard>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { MOCK_COMPANY_DETAIL, isValidEmail, isNotEmpty } from '@corporate-estimate/shared';

useSeoMeta({
  title: 'お問い合わせ | Corporate Estimate',
  description: 'Corporate Estimateへのお問い合わせはこちら。サービスに関するご質問やご相談を、フォーム・電話・メールで受け付けております。',
  ogTitle: 'お問い合わせ | Corporate Estimate',
  ogDescription: 'サービスに関するご質問やご相談は、お気軽にお問い合わせください。',
});

const companyInfo = MOCK_COMPANY_DETAIL;

/** 必須フィールド名 */
type RequiredField = 'company' | 'name' | 'email' | 'category' | 'message';

const REQUIRED_FIELDS: RequiredField[] = ['company', 'name', 'email', 'category', 'message'];

/** バリデーションルール定義（単一ソース） */
const VALIDATION_RULES: Record<RequiredField, { test: (v: string) => boolean; message: string }> = {
  company:  { test: isNotEmpty,    message: '会社名を入力してください。' },
  name:     { test: isNotEmpty,    message: 'ご担当者名を入力してください。' },
  email:    { test: isValidEmail,  message: '有効なメールアドレスを入力してください。' },
  category: { test: isNotEmpty,    message: 'お問い合わせ種別を選択してください。' },
  message:  { test: isNotEmpty,    message: 'お問い合わせ内容を入力してください。' },
};

const form = reactive({
  company: '',
  name: '',
  email: '',
  phone: '',
  category: '',
  message: '',
});

const touched = reactive<Record<RequiredField, boolean>>({
  company: false,
  name: false,
  email: false,
  category: false,
  message: false,
});

const isSubmitting = ref(false);
const isSubmitted = ref(false);
const submitStatus = ref<'idle' | 'success' | 'error'>('idle');

/** 個別フィールドのバリデーション */
function validateField(field: RequiredField): string | null {
  const rule = VALIDATION_RULES[field];
  return rule.test(form[field]) ? null : rule.message;
}

/** フィールドエラー — touched かつ submit 済みのフィールドに対してリアルタイム表示 */
const fieldErrors = computed(() => {
  const map: Partial<Record<RequiredField, string>> = {};
  for (const field of REQUIRED_FIELDS) {
    if (touched[field] || isSubmitted.value) {
      const error = validateField(field);
      if (error) map[field] = error;
    }
  }
  return map;
});

/** submit 時に表示するエラー一覧 */
const validationErrors = computed(() => {
  if (!isSubmitted.value) return [];
  return REQUIRED_FIELDS
    .map(validateField)
    .filter((err): err is string => err !== null);
});

function handleBlur(field: RequiredField) {
  touched[field] = true;
}

function resetForm() {
  form.company = '';
  form.name = '';
  form.email = '';
  form.phone = '';
  form.category = '';
  form.message = '';
  isSubmitted.value = false;
  for (const field of REQUIRED_FIELDS) {
    touched[field] = false;
  }
}

async function handleSubmit() {
  submitStatus.value = 'idle';
  isSubmitted.value = true;

  if (validationErrors.value.length > 0) return;

  isSubmitting.value = true;
  try {
    // デモ用: フォームデータをコンソールに出力し、送信をシミュレーション
    // 本番環境ではここを実際のAPIエンドポイントに差し替え
    const payload = {
      company: form.company,
      name: form.name,
      email: form.email,
      phone: form.phone,
      category: form.category,
      message: form.message,
      submittedAt: new Date().toISOString(),
    };
    console.warn('[Contact Form] 送信データ:', JSON.stringify(payload, null, 2));
    await new Promise((resolve) => setTimeout(resolve, 800));
    submitStatus.value = 'success';
    resetForm();
  } catch {
    submitStatus.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style lang="scss" scoped>
.page-contact {
  &__form-section {
    padding: $spacing-3xl 0;
  }

  &__form-inner {
    @include container;
    max-width: 720px;
  }

  &__field {
    margin-bottom: $spacing-lg;
  }

  &__label {
    display: block;
    font-size: $font-size-sm;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: $spacing-xs;
  }

  &__required {
    display: inline-block;
    padding: 1px 6px;
    font-size: $font-size-xs;
    font-weight: 600;
    color: #ffffff;
    background-color: var(--color-danger);
    border-radius: $border-radius-sm;
    margin-left: $spacing-xs;
  }

  &__input,
  &__select,
  &__textarea {
    width: 100%;
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-base;
    font-family: $font-family-base;
    color: var(--color-text);
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: $border-radius-md;
    transition: border-color $transition-base;

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--color-primary-selected);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    &::placeholder {
      color: var(--color-text-light);
    }

    &[aria-invalid='true'] {
      border-color: var(--color-danger);

      &:focus {
        box-shadow: 0 0 0 3px var(--color-danger-bg);
      }
    }
  }

  &__textarea {
    resize: vertical;
    min-height: 120px;
  }

  &__select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235f6368' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: $spacing-xl;
  }

  &__field-error {
    color: var(--color-danger);
    font-size: $font-size-xs;
    margin-top: $spacing-xs;
  }

  &__actions {
    text-align: center;
    margin-top: $spacing-xl;
  }

  &__validation-errors {
    background-color: var(--color-danger-bg);
    border: 1px solid var(--color-danger);
    border-radius: $border-radius-md;
    padding: $spacing-md $spacing-lg;
    margin-bottom: $spacing-lg;
    color: var(--color-danger);
    font-size: $font-size-sm;
    list-style: disc inside;

    li + li {
      margin-top: $spacing-xs;
    }
  }

  &__success {
    text-align: center;
    margin-top: $spacing-lg;
    padding: $spacing-md;
    background-color: rgba(30, 142, 62, 0.08);
    border: 1px solid var(--color-success);
    border-radius: $border-radius-md;
    color: var(--color-success);
    font-size: $font-size-sm;
  }

  &__submit-error {
    text-align: center;
    margin-top: $spacing-lg;
    padding: $spacing-md;
    background-color: var(--color-danger-bg);
    border: 1px solid var(--color-danger);
    border-radius: $border-radius-md;
    color: var(--color-danger);
    font-size: $font-size-sm;
  }

  // Info
  &__info {
    padding: $spacing-3xl 0;
    background-color: var(--color-bg-light);
  }

  &__info-inner {
    @include container;
  }

  &__info-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-lg;

    @include respond-to(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__info-title {
    font-size: $font-size-sm;
    font-weight: 600;
    color: var(--color-text-light);
    margin-bottom: $spacing-sm;
  }

  &__info-value {
    font-size: $font-size-lg;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: $spacing-xs;
  }

  &__info-note {
    font-size: $font-size-xs;
    color: var(--color-text-light);
  }
}
</style>
