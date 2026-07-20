export const ecommerceUsers = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
  invalid: { username: 'standard_user', password: 'invalid_password' },
} as const;

export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  onesie: 'Sauce Labs Onesie',
} as const;

export const checkoutCustomer = {
  firstName: 'Henrique',
  lastName: 'Silva',
  postalCode: '01001-000',
} as const;
