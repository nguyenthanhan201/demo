type VNPayPaymentUrl = {
  vnp_Amount: number;
  vnp_BankCode: string;
  vnp_BankTranNo: string;
  vnp_CardType: string;
  vnp_OrderInfo: string;
  vnp_PayDate: string;
  vnp_ResponseCode: string;
  vnp_TmnCode: string;
  vnp_TransactionNo: string;
  vnp_TransactionStatus: string;
  vnp_TxnRef: string;
  vnp_SecureHash: string;
};

// http://localhost:3002/payment-url-return/?vnp_Amount=11900000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14501282&vnp_CardType=ATM&vnp_OrderInfo=Thanh%20toan%20don%20hang&vnp_PayDate=20240709092504&vnp_ResponseCode=00&vnp_TmnCode=WZU9KE1N&vnp_TransactionNo=14501282&vnp_TransactionStatus=00&vnp_TxnRef=2024-07-09T09%3A24%3A33.328&vnp_SecureHash=5a4edc5c0e81035575b36f4b27f5af490d77540540390b89cfd2341d0bb0601e16da465cd8a44bc2a06a8690cf3522f92d19798f5e1132ed99b57aec51a1d93f

type MoMoPaymentUrl = {
  partnerCode: string;
  orderId: string;
  requestId: string;
  amount: number;
  orderInfo: string;
  orderType: string;
  transId: string;
  resultCode: string;
  message: string;
  payType: string;
  responseTime: string;
  extraData: string;
  signature: string;
};

// ?partnerCode=MOMO&orderId=MOMO1720448965057&requestId=MOMO1720448965057&amount=119000&orderInfo=pay+with+MoMo&orderType=momo_wallet&transId=1720448972857&resultCode=1006&message=Transaction+denied+by+user.&payType=&responseTime=1720448972883&extraData=&signature=657e9a2a8832c89127c8e66f1c0515e808c2309e53bd695d129470794c5d8373

type ZaloPayPaymentUrl = {
  amount: number;
  appid: number;
  apptransid: string;
  bankcode: string;
  checksum: string;
  discountamount: number;
  pmcid: number;
  status: string;
};

// http://localhost:3002/payment-url-return/?amount=119000&appid=2553&apptransid=080724_152303&bankcode=SBIS&checksum=1af1a1ded63af3ef9ed1a26f2aa5ba034e2fde65642b237ce081b4aae508d044&discountamount=0&pmcid=39&status=1

const getResultPaymentFromUrl = () => {
  if (typeof window === 'undefined') return;

  let isSuccessful = false;

  const query = window.location.search;
  // console.log('👌  query:', query);
  const tempParams = JSON.parse(
    '{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === '' ? value : decodeURIComponent(value);
    }
  );

  if (Object.keys(tempParams).includes('vnp')) {
    const params = tempParams as VNPayPaymentUrl;
    isSuccessful = params.vnp_ResponseCode === '00';
  }

  if (Object.keys(tempParams).includes('partnerCode')) {
    const params = tempParams as MoMoPaymentUrl;
    isSuccessful = params.resultCode === '0';
  }

  if (Object.keys(tempParams).includes('appid')) {
    const params = tempParams as ZaloPayPaymentUrl;
    isSuccessful = params.status === '1';
    console.log(params.status === '1');
  }

  return isSuccessful;
};

const getResultSupabaseSinginRedirectUrl = ():
  | {
      access_token: string;
      expires_at: string;
      expires_in: string;
      provider_token: string;
      refresh_token: string;
      token_type: string;
    }
  | undefined => {
  if (typeof window === 'undefined') return;

  const query = window.location.href.split('#')[1];

  if (!query) return;

  const tempParams = JSON.parse(
    '{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === '' ? value : decodeURIComponent(value);
    }
  );

  return tempParams;
};

export { getResultPaymentFromUrl, getResultSupabaseSinginRedirectUrl };
