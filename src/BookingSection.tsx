import React from 'react';
import './BookingSection.css';
import { SlotConfiguration } from './types';

export default ({
  slots,
  onClick,
}: {
  slots: SlotConfiguration[];
  onClick: (data: SlotConfiguration) => void;
}) => {
  return (
    <section className="booking-section">
      <h1>Book a Session</h1>
      <div className="booking-options">
        {slots.map((slotConfiguration) => {
          const { displayPrice, mins } = slotConfiguration;
          return (
            <div className="booking-option">
              <h2>Book - {mins} Mins</h2>
              <p>
                {mins} mins | {displayPrice}
              </p>
              <button onClick={() => onClick(slotConfiguration)}>
                BOOK NOW
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
