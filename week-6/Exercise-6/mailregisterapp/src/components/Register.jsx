import React, { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [registeredUser, setRegisteredUser] = useState(null);

  // Helper validation logic for individual fields & full form
  const validateField = (name, value) => {
    let errorMsg = '';
    if (name === 'name') {
      // 1. Name should have at least 5 characters
      if (!value || value.trim().length < 5) {
        errorMsg = 'Name must be at least 5 characters long.';
      }
    } else if (name === 'email') {
      // 2. Email should have @ and .
      if (!value || !value.includes('@') || !value.includes('.')) {
        errorMsg = 'Email must contain both "@" and "." symbols.';
      }
    } else if (name === 'password') {
      // 3. Password should have at least 8 characters
      if (!value || value.length < 8) {
        errorMsg = 'Password must be at least 8 characters long.';
      }
    }
    return errorMsg;
  };

  // Event handler for input changes (Real-time Controlled Validation)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate on event handle if touched
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Trigger validation for all fields
    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const passErr = validateField('password', formData.password);

    const validationErrors = {
      name: nameErr,
      email: emailErr,
      password: passErr,
    };

    setErrors(validationErrors);
    setTouched({ name: true, email: true, password: true });

    // Check if any error exists
    if (nameErr || emailErr || passErr) {
      alert('Registration Failed! Please fix validation errors highlighted in red.');
      return;
    }

    // Success alert and state update
    alert(`Registration Successful!\n\nWelcome, ${formData.name}!\nRegistered Email: ${formData.email}`);
    
    setRegisteredUser({
      name: formData.name,
      email: formData.email,
      timestamp: new Date().toLocaleTimeString(),
    });

    // Reset form state
    setFormData({ name: '', email: '', password: '' });
    setErrors({});
    setTouched({});
  };

  return (
    <div className="card register-card">
      <div className="card-header">
        <div className="badge-pill">Controlled Form with Real-time Validation</div>
        <h2>User Registration Form</h2>
        <p className="card-subtitle">
          Enter your registration details below. Fields validate dynamically via event handlers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="register-form" noValidate>
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name-input">
            Full Name <span className="req-star">*</span> (min 5 chars):
          </label>
          <input
            id="name-input"
            name="name"
            type="text"
            className={`form-control ${touched.name && errors.name ? 'is-invalid' : touched.name && !errors.name ? 'is-valid' : ''}`}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Alexander Fleming"
          />
          {touched.name && errors.name && (
            <div className="error-message">⚠️ {errors.name}</div>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email-input">
            Email Address <span className="req-star">*</span> (must contain @ and .):
          </label>
          <input
            id="email-input"
            name="email"
            type="email"
            className={`form-control ${touched.email && errors.email ? 'is-invalid' : touched.email && !errors.email ? 'is-valid' : ''}`}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. alexander@example.com"
          />
          {touched.email && errors.email && (
            <div className="error-message">⚠️ {errors.email}</div>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password-input">
            Password <span className="req-star">*</span> (min 8 chars):
          </label>
          <input
            id="password-input"
            name="password"
            type="password"
            className={`form-control ${touched.password && errors.password ? 'is-invalid' : touched.password && !errors.password ? 'is-valid' : ''}`}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="••••••••"
          />
          {touched.password && errors.password && (
            <div className="error-message">⚠️ {errors.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn-register">
          📝 Register Account (handleSubmit Event)
        </button>
      </form>

      {registeredUser && (
        <div className="registration-success-card">
          <div className="success-badge">✅ Account Created</div>
          <h3>Welcome, {registeredUser.name}!</h3>
          <p>Confirmation message sent to: <code>{registeredUser.email}</code> at {registeredUser.timestamp}</p>
        </div>
      )}
    </div>
  );
}
