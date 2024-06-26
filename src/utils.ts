import { SuccessResponse } from './types';

export function jsonToQueryString(json: Record<string, unknown>) {
  return (
    '?' +
    Object.keys(json)
      .map(function (key) {
        return (
          encodeURIComponent(key) +
          '=' +
          encodeURIComponent(json[key as string] as string)
        );
      })
      .join('&')
  );
}

export function getJsonFromUrl(url: string) {
  if (!url) {
    url = location.search;
  }
  const query = url.substring(1);
  const result = {} as Record<string, string>;
  query.split('&').forEach(function (part) {
    const item = part.split('=');
    result[item[0] as string] = decodeURIComponent(item[1]);
  });
  return result;
}
export const generateOptions = (
  amount: number,
  handler: (data: SuccessResponse) => void,
  email: string,
  name: string,
  contact: string,
) => ({
  // redirect: true,
  key: 'rzp_test_0wFRWIZnH65uny', // Enter the Key ID generated from the Dashboard
  amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: 'INR',
  name: 'Acme Corp', //your business name
  description: 'Test Transaction',
  image: 'https://example.com/your_logo',
  handler,
  // callback_url:
  //   'https://calendly.com/telugutarots/30min?hide_gdpr_banner=1&hide_landing_page_details=1&hide_event_type_details=1',
  prefill: {
    //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
    name, //your customer's name
    email,
    contact,
  },
  retry: false,
  notes: {
    category: `${amount}-11223`,
  },
  theme: {
    color: '#3399cc',
  },
});

export const DATA_TO_QUERY_KEYS = {
  content: 'a1',
  slot: 'utm_campaign',
  source: 'utm_source',
  paymentId: 'utm_content',
};
