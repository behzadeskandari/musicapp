// src/includes/validation.js
import { Form as VeeForm, Field as VeeField, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email, min, max, confirmed } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

// ---- built-in rules -------------------------------------------------
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
defineRule('confirmed', confirmed);

// ---- custom password rule -------------------------------------------
defineRule('password', (value) => {
  if (!value) return true;               // required rule will catch empty
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  return hasUpper && hasLower && hasNumber && hasSpecial
    || 'Password must contain upper, lower, number & special char';
});

configure({
  generateMessage: localize('en', {
    messages: {
      required: 'The {_field_} field is required',
      email: 'Please enter a valid email address',
      min: 'The {_field_} field must be at least {length} characters',
      max: 'The {_field_} field must be at most {length} characters',
      confirmed: 'The passwords do not match',
      password: 'The {_field_} must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  }),
});

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);
  },
};
