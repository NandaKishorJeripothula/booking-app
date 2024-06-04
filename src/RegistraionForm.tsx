import React, { SyntheticEvent, useState } from 'react';
import './RegistraionForm.css'; // Import the CSS file
import { RegistrationFormData } from './types';

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
  });

  const [errors, setErrors] = useState<RegistrationFormData>({
    name: '',
    email: '',
    mobile: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
    <div className="form-container">
      <h2>Simple Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>
            Mobile:
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </label>
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>
        <div className="button-group">
          <button type="button" className="other-button" onClick={onBackClick}>
            Back to Slots
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistraionForm;
