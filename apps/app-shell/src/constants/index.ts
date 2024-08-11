const TEST_PAYMENT_LINKS: {
  title: string;
  link: string;
  note?: string;
}[] = [
  {
    title: 'vnpay',
    link: 'https://sandbox.vnpayment.vn/apis/vnpay-demo/'
  },
  {
    title: 'momo',
    link: 'https://developers.momo.vn/v3/vi/docs/payment/onboarding/test-instructions/#e-wallet-test-details'
  },
  {
    title: 'zalopay',
    link: 'https://docs.zalopay.vn/v2/start/',
    note: '(Mã code: 111111)'
  }
];

const UNLIMITED_PAGE_SIZE = {
  page: 1,
  pageSize: 99999999
};

export { TEST_PAYMENT_LINKS, UNLIMITED_PAGE_SIZE };
