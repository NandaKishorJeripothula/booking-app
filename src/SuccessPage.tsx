import React from 'react';
import './SuccessPage.css'; // Import the CSS file
import { InviteData } from './types';

const SuccessPage = ({ data }: { data: InviteData }) => {
  const {
    event_type_name,
    event_start_time,
    event_end_time,
    invitee_full_name,
  } = data;

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

  const startTime = formatTime(event_start_time);
  const endTime = new Date(event_end_time).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="success-container">
      <span className="success-icon">✔️</span>
      <div className="success-header">
        <h2>You slot booked succesfully!</h2>
      </div>
      <p>A calendar invitation has been sent to your email address.</p>
      <div className="success-details">
        <h3>{event_type_name}</h3>
        <div className="detail-item">
          <span className="icon">👤</span>
          <span>{invitee_full_name}</span>
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
