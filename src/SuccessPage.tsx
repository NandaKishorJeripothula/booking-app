import React from 'react';
import './SuccessPage.css'; // Import the CSS file
import { InviteData } from './types';

const SuccessPage = ({ data }: { data: InviteData }) => {
  const { details, slot } = data;

  return (
    <div className="success-container">
      <span className="checkmark" />
      <div className="success-header">
        <h2>Booking succesful!</h2>
      </div>
      <p>A calendar invitation has been sent to your email address.</p>
      <div className="success-details">
        <div className="detail-item">
          {/* <h3>{event_type_name}</h3> */}
          <span className="icon">👤</span>
          <span>{details.name}</span>
        </div>
        <div className="detail-item">
          <span className="icon">📩</span>
          <span>{details.email}</span>
        </div>
        <div className="detail-item">
          <span className="icon">📞</span>
          <span>{details.mobile}</span>
        </div>
        <div className="detail-item">
          <span className="icon">⏱️</span>
          <span>{`${slot.mins} minutes`}</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
