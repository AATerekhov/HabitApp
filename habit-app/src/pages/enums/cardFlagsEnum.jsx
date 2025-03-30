export const CardFlagsEnum = {
    OPTION_ONE: 1 << 0, // 1
    OPTION_TWO: 1 << 1, // 2
    OPTION_THREE: 1 << 2, // 4
    OPTION_FOUR: 1 << 3, // 8
    OPTION_FIVE: 1 << 4, // 16
    OPTION_SIX: 1 << 5, // 32
    OPTION_SEVEN: 1 << 6, // 64
    OPTION_EIGHT: 1 << 7, // 128
  };
  
  // Словарь подписей
  export const CardFlagsLabels = {
    [CardFlagsEnum.OPTION_ONE]: 'The presence of a changing status',
    [CardFlagsEnum.OPTION_TWO]: 'Quantitative indicator',
    [CardFlagsEnum.OPTION_THREE]: 'Check boxes',
    [CardFlagsEnum.OPTION_FOUR]: 'The need for a report, text, comment',
    [CardFlagsEnum.OPTION_FIVE]: 'Embedded tags',
    [CardFlagsEnum.OPTION_SIX]: 'Positive notation',
    [CardFlagsEnum.OPTION_SEVEN]: 'Negative notation',
    [CardFlagsEnum.OPTION_EIGHT]: 'File, Photo, Document',
  };