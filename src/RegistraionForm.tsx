import React, { SyntheticEvent, useState } from 'react';
import './RegistraionForm.css'; // Import the CSS file

import './BookingSection.css';
import { RegistrationFormData } from './types';
import { PRIVACY_NOTICE_TNC } from './constants';

const RegistraionForm = ({
  onSubmit,
  onBackClick,
}: {
  onSubmit: (data: RegistrationFormData) => void;
  onBackClick: () => void;
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    mobile: '',
    privacyNotice: '',
  });

  const [errors, setErrors] = useState<RegistrationFormData>({
    name: '',
    email: '',
    mobile: '',
    privacyNotice: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 'agreed' : '') : value,
    });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {} as typeof errors;

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.privacyNotice) {
      newErrors.privacyNotice = 'Please accept the terms & conditions';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Mobile validation (Indian mobile number)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number is invalid';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Data:', formData);
      onSubmit(formData);
      // Add further submission logic here
    }
  };
  return (
    <section className="form-section">
      <h1>Booking Form</h1>
      <h4>Please help us with the following information to schedule invite</h4>
      <form onSubmit={handleSubmit}>
        <div className="booking-form">
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <p className="error">{errors.name && <span>{errors.name}</span>}</p>
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <p className="error">{errors.email}</p>
          </div>
          <div className="form-field">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            <p className="error">{errors.mobile}</p>
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="privacyNotice" className="checkboxLabel">
            <input
              type="checkbox"
              id="privacyNotice"
              name="privacyNotice"
              value={formData.mobile}
              onChange={handleChange}
            />
            <p>{PRIVACY_NOTICE_TNC}</p>
          </label>
          <p className="error">{errors.privacyNotice}</p>
        </div>

        <div className="form-buttons booking-form">
          <button type="button" className="btn-back" onClick={onBackClick}>
            Back
          </button>
          <button type="submit" className="btn-proceed">
            Proceed
          </button>
        </div>
      </form>
    </section>
  );
};

export default RegistraionForm;
