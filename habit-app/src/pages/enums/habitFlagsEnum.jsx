export const HabitFlagsEnum = {
    FLAG_ONE: 1 << 0, // 1
    FLAG_TWO: 1 << 1, // 2
    FLAG_THREE: 1 << 2, // 4
  };
  
  // Словарь подписей
  export const HabitFlagsLabels = {
    [HabitFlagsEnum.FLAG_ONE]: 'Achieving the result after a considerable time',
    [HabitFlagsEnum.FLAG_TWO]: 'Important daily tasks, job, working, run, training',
    [HabitFlagsEnum.FLAG_THREE]: 'Habits, regimen, custom',
  };