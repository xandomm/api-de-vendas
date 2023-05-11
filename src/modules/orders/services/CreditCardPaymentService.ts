import http, { RequestOptions } from 'http';

interface PagSeguroCredentials {
  email: string;
  token: string;
}

interface PagSeguroCustomerPhone {
  country: string;
  area: string;
  number: string;
  type: string;
}

interface PagSeguroCustomer {
  name: string;
  email: string;
  tax_id: string;
  phones: PagSeguroCustomerPhone[];
}

interface PagSeguroItem {
  reference_id: string;
  name: string;
  quantity: number;
  unit_amount: number;
}

interface PagSeguroQrCode {
  amount: {
    value: number;
  };
}

interface PagSeguroShippingAddress {
  street: string;
  number: string;
  complement: string;
  locality: string;
  city: string;
  region_code: string;
  country: string;
  postal_code: string;
}

interface PagSeguroShipping {
  address: PagSeguroShippingAddress;
}

interface PagSeguroCreateOrderRequest {
  reference_id: string;
  customer: PagSeguroCustomer;
  items: PagSeguroItem[];
  qr_codes: PagSeguroQrCode[];
  shipping: PagSeguroShipping;
  notification_urls: string[];
}

interface PagSeguroCreateOrderResponse {
  id: string;
  reference_id: string;
  created_at: string;
  updated_at: string;
  total_amount: number;
  payment_link: string;
  qr_code_urls: string[];
  status: string;
  embedded: {
    checkout: {
      type: string;
      url: string;
    };
  };
}

export default class CreditCardPaymentService {
  private credentials: PagSeguroCredentials;
  private url = 'https://sandbox.api.pagseguro.com/orders';

  constructor(credentials: PagSeguroCredentials) {
    this.credentials = credentials;
  }

  public async createOrder(
    request: PagSeguroCreateOrderRequest,
  ): Promise<PagSeguroCreateOrderResponse> {
    const postData = JSON.stringify(request);

    const options: RequestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.credentials.token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const promise = new Promise<PagSeguroCreateOrderResponse>(
      (resolve, reject) => {
        const req = http.request(this.url, options, res => {
          let data = '';

          res.on('data', chunk => {
            data += chunk;
          });

          res.on('end', () => {
            const response = JSON.parse(data);
            if (response.errors) {
              reject(response.errors);
            } else {
              resolve(response);
            }
          });
        });

        req.on('error', err => {
          reject(err);
        });

        req.write(postData);
        req.end();
      },
    );

    return promise;
  }
}
