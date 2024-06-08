import React, { useState } from 'react';
import './App.scss';
import RegistraionForm from './RegistraionForm';
import { generateOptions } from './utils';
import {
  FailureResponse,
  RegistrationFormData,
  SlotConfiguration,
  SuccessResponse,
} from './types';
import SuccessPage from './SuccessPage';
import BookingSection from './BookingSection';
import { SCHEDULAR_URL, SLOT_CONFIFGURATIONS } from './constants';
import Scheduler from './Scheduler';

// const data = {
//   assigned_to: 'Sender',
//   event_type_uuid: 'e2f3c774-bf63-4b97-ae8d-f1281aed5bff',
//   event_type_name: '30 Minute Meeting',
//   event_start_time: '2024-06-05T10:00:00+05:30',
//   event_end_time: '2024-06-05T10:30:00+05:30',
//   invitee_uuid: 'ccb3f253-9eba-47a8-b788-5f0cb603230c',
//   invitee_full_name: 'testfullname',
//   invitee_email: 'test@test.com',
//   answer_1: 'contact: testcontact',
//   utm_campaign: '30Min',
//   utm_source: 'booking-page',
//   utm_content: 'test-payment-id',
// };
type TViewData = {
  slots: {
    selectedSlot: SlotConfiguration;
  };
  form: {
    data: RegistrationFormData;
    payment: {
      error: FailureResponse;
      success: SuccessResponse;
    };
  };
  scheduler: {};
  event: {};
};
type TView = keyof TViewData;
type ValueOf<T> = T[keyof T];

function App() {
  const [viewData, setViewData] = useState<TViewData>({} as TViewData);
  const [view, setView] = useState<TView>(() => 'scheduler');

  const updateViewData = (view: TView, data: ValueOf<TViewData>) => {
    setViewData((previousData) => ({
      ...previousData,
      [view]: {
        ...(previousData[view] || {}),
        ...(data || {}),
      },
    }));
  };
  const handleSuccessHandler = (data: SuccessResponse) => {
    updateViewData('form', {
      payment: {
        success: data,
      },
    });
    setView('scheduler');
  };

  const handleFailureHandler = (data: FailureResponse) => {
    updateViewData('form', {
      payment: {
        error: data,
      },
    });
    setView('slots');
  };

  const handleFormSubmit = (data: Record<string, string>) => {
    if (!viewData?.slots?.selectedSlot) {
      return;
    }
    updateViewData('form', {
      data,
      payment: {
        error: null,
        success: null,
      },
    });

    const { email, mobile, name } = data;
    const options = generateOptions(
      viewData?.slots?.selectedSlot?.amoutInPaisa,
      handleSuccessHandler,
      email,
      name,
      mobile,
    );
    openCheckout(options);
  };

  const handleScheduleSuccess = () => {
    setView('event');
  };

  const handleBooking = (data: SlotConfiguration) => {
    updateViewData('slots', {
      selectedSlot: data,
    });
    setView('form');
  };

  const handleFormBack = () => {
    updateViewData('slots', {
      selectedSlot: null,
    });
    setView('slots');
  };

  const openCheckout = (options: Record<string, unknown>) => {
    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
    razorpayInstance.on('payment.failed', handleFailureHandler);
  };

  return (
    <div className="App">
      {view === 'slots' ? (
        <>
          <div className="booking-error">
            {viewData?.form?.payment.error?.error?.description}
          </div>
          <BookingSection
            onClick={handleBooking}
            slots={SLOT_CONFIFGURATIONS}
          />
        </>
      ) : view === 'form' ? (
        <RegistraionForm
          onSubmit={handleFormSubmit}
          onBackClick={handleFormBack}
        />
      ) : view === 'scheduler' ? (
        <Scheduler
          url={SCHEDULAR_URL}
          inputPayload={{
            ...(viewData?.form?.data || {}),
            paymentId: viewData?.form?.payment?.success?.razorpay_payment_id,
            slot: viewData?.slots?.selectedSlot?.mins as unknown as string,
            source: 'Website|Booking Section',
          }}
          onScheduleSuccess={handleScheduleSuccess}
        />
      ) : view === 'event' ? (
        <SuccessPage
          data={{
            eventEndTime: '',
            eventStartTime: '',
            inviteeName: viewData?.form?.data.name,
          }}
        />
      ) : (
        <h4>Reload The page</h4>
      )}
    </div>
  );
}

export default App;
