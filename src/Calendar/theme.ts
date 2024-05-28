import { TextStyle, ViewStyle } from 'react-native';

export interface CalendarTheme {
  selected?: {
    color?: string;
    backgroundColor: string;
  };
  day?: {
    color?: string;
  };
  dot?: {
    color: string;
    selectedColor: string;
  };
  marked?: {
    color: string;
    background: string;
  };
  dayName?: TextStyle;
  header?: ViewStyle;
}

export interface Marking {
  type: 'dot' | 'dots';
  marked: boolean;
  selectedColor?: string;
  color?: string;
  background?: string;
  dots?: { color: string }[];
}

export const defaultTheme: CalendarTheme = {
  selected: {
    color: '#fff',
    backgroundColor: '#FF6732',
  },
  dot: {
    color: '#FF6732',
    selectedColor: '#fff',
  },
};
