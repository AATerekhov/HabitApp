export const ResetIntervalEnum = {
    INTERVAL_ONE: 1 << 0, // 1
    INTERVAL_TWO: 1 << 1, // 2
    INTERVAL_THREE: 1 << 2, // 4
  };
  
  // Словарь подписей
  export const ResetIntervalLabels = {
    [ResetIntervalEnum.INTERVAL_ONE]: 'Everyday',
    [ResetIntervalEnum.INTERVAL_TWO]: 'Weekdays',
    [ResetIntervalEnum.INTERVAL_THREE]: 'Once a month',
  };