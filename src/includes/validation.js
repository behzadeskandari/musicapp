// src/includes/validation.js
import { Form as VeeForm, Field as VeeField, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email, min, max, confirmed ,alpha_spaces as  alphaSpaces , min_value, max_value} from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

// ---- built-in rules -------------------------------------------------
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
defineRule('confirm_password', confirmed);
defineRule("alpha_spaces",alphaSpaces);
defineRule('min_value', min_value);
defineRule('max_value', max_value);
// ---- custom password rule -------------------------------------------
defineRule('password', (value) => {
   if (!value) return true; // 'required' handles empties

  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  // ✅ Return the rule name (triggers localized message)
  return hasUpper && hasLower && hasNumber && hasSpecial ? true : 'password';
});
defineRule('tos_required', (value) => !!value);

// configure({

//   generateMessage: localize('en', {
//     messages: {
//       name: "The {_field_} field may only contain alphabetic characters and spaces",
//       required: 'The {_field_} field is required',
//       email: 'Please enter a valid email address',
//       min: 'The {_field_} field must be at least {length} characters',
//       max: 'The {_field_} field must be at most {length} characters',
//       min_value: 'The {_field_} must be at least {min}',
//       max_value: 'The {_field_} must be at most {max}',
//       confirm_password: 'The passwords do not match',
//       password:
//         'The {_field_} must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
//   },
//   }),
// });
const enMessages = {
  email:    'Please enter a valid email address',
  min:      'The {_field_} field must be at least {length} characters',
  max:      'The {_field_} field must be at most {length} characters',
  min_value: 'The {_field_} must be at least {min}',
  max_value: 'The {_field_} must be at most {max}',
  confirm_password: 'The passwords do not match',
  tos_required: 'You must accept the terms of service',

  password:
    'The {_field_} must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  // optional – a nicer name for the "name" field (you can add more)
  alpha_spaces: 'The {_field_} field may only contain alphabetic characters and spaces',
  required: 'The {_field_} field is required',
};
// -------------------------------------------------
// 4. CONFIGURE – replace {_field_} automatically
// -------------------------------------------------
configure({
  validation: {
    tos: 'tos_required',  // ← defined globally
    // ... other fields
  },
  generateMessage(ctx) {
    console.log(ctx,'ctx in generateMessage');
    const raw = enMessages[ctx.rule.name];
    if (!raw) return `${ctx.field} is invalid`;

    // Replace {_field_} with the actual field name (capitalized)
    const fieldLabel = ctx.field
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return raw
      .replace('{_field_}', fieldLabel)
      .replace('{length}', ctx.rule.params?.[0] ?? '')
      .replace('{min}', ctx.rule.params?.[0] ?? '')
      .replace('{max}', ctx.rule.params?.[0] ?? '');
  },
});

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);
  },
};
