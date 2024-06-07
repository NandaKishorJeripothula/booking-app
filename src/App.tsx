import React, { useEffect, useState } from 'react';
import './App.scss';
import RegistraionForm from './RegistraionForm';
import {
  DATA_TO_QUERY_KEYS,
  generateOptions,
  getJsonFromUrl,
  jsonToQueryString,
} from './utils';
import { FailureResponse, SlotConfiguration, SuccessResponse } from './types';
import SuccessPage from './SuccessPage';
import BookingSection from './BookingSection';

const slotConfigurations: SlotConfiguration[] = [
  {
    mins: 5,
    displayPrice: '₹60',
    amoutInPaisa: 60 * 100,
  },
  {
    mins: 10,
    displayPrice: '₹110',
    amoutInPaisa: 110 * 100,
  },
  {
    mins: 15,
    displayPrice: '₹150',
    amoutInPaisa: 150 * 100,
  },
];
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
  const [slot, setSlot] = useState<SlotConfiguration | null>(null);
  const [formData, setFormData] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<FailureResponse | null>();
  const [successPage, setSuccessPage] = useState<boolean>(false);
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
    if (!slot) {
      return;
    }
    setError(null);
    const { email, mobile, name } = data;
    setFormData(data);

    const options = generateOptions(
      slot?.amoutInPaisa,
      handleSuccessHandler,
      email,
      name,
      mobile,
    );
    openCheckout(options);
  };

  const handleBooking = (data: SlotConfiguration) => {
    setSlot(data);
  };

  useEffect(() => {
    const successData = getJsonFromUrl(location.href);
    setSuccessPage(!!(Object.keys(successData).length > 2));
  }, []);
  return (
    <div className="App">
      {successPage ? (
        <SuccessPage data={data} />
      ) : slot ? (
        <RegistraionForm
          onSubmit={handleFormSubmit}
          onBackClick={() => setSlot(null)}
        />
      ) : (
        <>
          <div className="booking-error">{error?.error?.description}</div>
          <BookingSection onClick={handleBooking} slots={slotConfigurations} />
        </>
      )}
    </div>
  );
}

export default App;
