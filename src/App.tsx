import React, { useState } from 'react';
import './App.scss';
import RegistraionForm from './RegistraionForm';
import {
  DATA_TO_QUERY_KEYS,
  generateOptions,
  jsonToQueryString,
} from './utils';
import { FailureResponse, SuccessResponse } from './types';
import SuccessPage from './SuccessPage';

const data = {
  assigned_to: 'Sender',
  event_type_uuid: 'e2f3c774-bf63-4b97-ae8d-f1281aed5bff',
  event_type_name: '30 Minute Meeting',
  event_start_time: '2024-06-05T10:00:00+05:30',
  event_end_time: '2024-06-05T10:30:00+05:30',
  invitee_uuid: 'ccb3f253-9eba-47a8-b788-5f0cb603230c',
  invitee_full_name: 'testfullname',
  invitee_email: 'test@test.com',
  answer_1: 'contact: testcontact',
  utm_campaign: '30Min',
  utm_source: 'booking-page',
  utm_content: 'test-payment-id',
};

function App() {
  const [slot, setSlot] = useState<'30Min' | '60Min' | '90Min' | null>(null);
  const [formData, setFormData] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<FailureResponse | null>();
  const handleSuccessHandler = (data: SuccessResponse) => {
    const queryParams = {
      hide_gdpr_banner: 1,
      hide_landing_page_details: 1,
      hide_event_type_details: 1,
      email: formData?.email,
      name: formData?.name,
      [DATA_TO_QUERY_KEYS.content]: `contact: ${formData?.mobile}`,
      [DATA_TO_QUERY_KEYS.paymentId]: data.razorpay_payment_id,
      [DATA_TO_QUERY_KEYS.slot]: slot,
      [DATA_TO_QUERY_KEYS.source]: 'booking-page',
    };
    setSlot(null);
    const queryString = jsonToQueryString(queryParams);
    const url = `https://calendly.com/telugutarots/30min?${queryString}`;
    location.href = url;
  };
  const handleFailureHandler = (data: FailureResponse) => {
    console.log(data);
    setError(data);

    setSlot(null);
  };
  const openCheckout = (options: Record<string, unknown>) => {
    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
    razorpayInstance.on('payment.failed', handleFailureHandler);
  };

  const handleFormSubmit = (data: Record<string, string>) => {
    setError(null);
    const { email, mobile, name } = data;
    setFormData(data);
    const amount = slot === '30Min' ? 1 : slot === '60Min' ? 2 : 3;
    const options = generateOptions(
      amount,
      handleSuccessHandler,
      email,
      name,
      mobile,
    );
    openCheckout(options);
  };
  const handle30MinCall = () => {
    setSlot('30Min');
  };
  const handle60MinCall = () => {
    setSlot('60Min');
  };
  const handle90MinCall = () => {
    setSlot('90Min');
  };
  return (
    <div className="App">
      {/* {slot ? (
        <RegistraionForm
          onSubmit={handleFormSubmit}
          onBackClick={() => setSlot(null)}
        />
      ) : (
        <>
          <div className="booking-error">
            {error ? JSON.stringify(error) : ''}
          </div>
          <div className="button-group">
            <button onClick={handle30MinCall}>30Min</button>
            <button onClick={handle60MinCall}>60Min</button>
            <button onClick={handle90MinCall}>90Min</button>
          </div>
        </>
      )} */}
      <SuccessPage data={data} />
    </div>
  );
}

export default App;
