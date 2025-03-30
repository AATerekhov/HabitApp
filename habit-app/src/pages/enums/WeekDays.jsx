export const WeekDaysEnum = {
    DAY_ONE: 1 << 0, // 1
    DAY_TWO: 1 << 1, // 2
    DAY_THREE: 1 << 2, // 4
    DAY_FOUR: 1 << 3, // 8
    DAY_FIVE: 1 << 4, // 16
    DAY_SIX: 1 << 5, // 32
    DAY_SEVEN: 1 << 6, // 64
  };
  
  // Словарь подписей
  export const WeekDaysLabels = {
    [WeekDaysEnum.DAY_ONE]: 'Monday',
    [WeekDaysEnum.DAY_TWO]: 'Tuesday',
    [WeekDaysEnum.DAY_THREE]: 'Wednesday',
    [WeekDaysEnum.DAY_FOUR]: 'Thursday',
    [WeekDaysEnum.DAY_FIVE]: 'Friday',
    [WeekDaysEnum.DAY_SIX]: 'Saturday',
    [WeekDaysEnum.DAY_SEVEN]: 'Sunday',
  };