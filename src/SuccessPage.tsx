import React from 'react';
import './SuccessPage.css'; // Import the CSS file
import { InviteData } from './types';

const SuccessPage = ({ data }: { data: InviteData }) => {
  const { eventStartTime, eventEndTime, inviteeName } = data;

  const formatTime = (isoString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(isoString).toLocaleString('en-IN', options);
  };

  const startTime = formatTime(eventStartTime);
  const endTime = new Date(eventEndTime).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

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
          <span>{inviteeName}</span>
        </div>
        <div className="detail-item">
          <span className="icon">📅</span>
          <span>{`${startTime} - ${endTime}`}</span>
        </div>
        <div className="detail-item">
          <span className="icon">🌐</span>
          <span>India Standard Time</span>
        </div>
        <div className="detail-item">
          <span className="icon">💻</span>
          <span>Web conferencing details to follow.</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
