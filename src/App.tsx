import React, { useState } from 'react';
import './App.scss';
import RegistraionForm from './RegistraionForm';
import { generateOptions } from './utils';
import {
  FailureResponse,
  SlotConfiguration,
  SuccessResponse,
  TView,
  TViewData,
  ValueOf,
} from './types';
import SuccessPage from './SuccessPage';
import BookingSection from './BookingSection';
import { SCHEDULAR_URL, SLOT_CONFIFGURATIONS } from './constants';
import Scheduler from './Scheduler';

function App() {
  const [viewData, setViewData] = useState<TViewData>({} as TViewData);
  const [view, setView] = useState<TView>(() => 'slots');

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
            details: viewData?.form?.data,
            slot: viewData?.slots?.selectedSlot,
          }}
        />
      ) : (
        <h4>Reload The page</h4>
      )}
    </div>
  );
}

export default App;
