export const ACTIVITY_TYPES = {
  FOOD: 'food',
  TRANSPORT: 'transport',
  STAY: 'stay',
  SIGHTSEEING: 'sightseeing',
  ACTIVITY: 'activity',
  SHOPPING: 'shopping',
  OTHER: 'other',
} as const;

export type ActivityType = typeof ACTIVITY_TYPES[keyof typeof ACTIVITY_TYPES];
