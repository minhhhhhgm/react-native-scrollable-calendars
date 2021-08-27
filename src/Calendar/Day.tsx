import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { dayjs } from '../Utils/time';
import Dot from './Dot';
import { CalendarTheme, Marking } from './theme';
import { compareProps } from './util';

type DayProps = {
  day: string;
  isSelected?: boolean;
  width?: number;
  onPress?: any;
  marking?: Marking;
  theme?: CalendarTheme;
} & (DayMonthProps | DayWeekProps);

interface DayMonthProps {
  parent: 'month';
  minMonth: string;
  maxMonth: string;
  month: string;
}

interface DayWeekProps {
  parent: 'week';
}

function Day({
  day,
  width,
  isSelected,
  onPress,
  marking,
  theme, // @ts-ignore
  month, // @ts-ignore
  minMonth, // @ts-ignore
  maxMonth,
  parent,
}: DayProps) {
  const dayInMonth = dayjs(day).date();

  let inMonth, inPrevMonth, inNextMonth, hasLeft, hasRight;

  if (parent === 'month') {
    inMonth = dayjs(day).isSame(month, 'month');
    inPrevMonth = !inMonth && dayjs(day).isBefore(month, 'month');
    inNextMonth = !inMonth && dayjs(day).isAfter(month, 'month');
    hasLeft = dayjs(minMonth).isBefore(month, 'month');
    hasRight = dayjs(maxMonth).isAfter(month, 'month');
  }

  const showAsSelected =
    parent === 'month'
      ? isSelected &&
        (inMonth || (!hasLeft && inPrevMonth) || (!hasRight && inNextMonth))
      : isSelected;

  return (
    <TouchableOpacity
      style={{
        width,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 4,
      }}
      onPress={() => onPress && onPress(day)}
    >
      <View
        style={[
          {
            height: 32,
            width: 32,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: parent === 'week' || inMonth || isSelected ? 1 : 0.35,
          },
          showAsSelected ? theme.selected : {},
          marking
            ? omitBy(
                {
                  backgroundColor:
                    marking.background || theme.marked?.background,
                },
                isNil
              )
            : {},
        ]}
      >
        <Text
          style={[
            { textAlign: 'center', fontSize: 16 },
            showAsSelected ? theme.selected : {},
          ]}
        >
          {dayInMonth}
        </Text>
        {marking ? (
          <View
            style={{ position: 'absolute', bottom: 2, flexDirection: 'row' }}
          >
            {marking.type === 'dot' && marking.marked ? (
              <Dot
                color={
                  isSelected
                    ? marking.selectedColor ||
                      marking.color ||
                      theme.dot?.selectedColor ||
                      theme.dot?.color
                    : marking.color || theme.dot?.color
                }
              />
            ) : marking.type === 'dots' && marking.dots?.length ? (
              marking.dots?.map((dot, index) => (
                <Dot
                  key={index}
                  color={dot.color || theme.dot?.color}
                  style={{ marginLeft: index > 0 ? 2 : 0 }}
                />
              ))
            ) : null}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

export default memo(Day, (prevProps, props) => {
  return compareProps(prevProps, props, [
    'day',
    'parent',
    'isSelected',
    'width',
    'month',
    'maxMonth',
    'minMonth',
    'marking',
    'theme',
  ]);
});
