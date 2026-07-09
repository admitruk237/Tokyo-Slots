export const BET_LABELS = {
  PLACE_A_BID: 'Place a bid',
  AMOUNT_PLACEHOLDER: '0.00',
} as const;

export const BET_ERRORS = {
  INVALID_FORMAT: 'Invalid format',
  ENTER_AMOUNT: 'Enter amount',
  INSUFFICIENT_FUNDS: 'Insufficient funds',
  MIN_BET: (min: number) => `Min bet is ${min}`,
} as const;
