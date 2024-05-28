import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import omit from 'lodash/omit';
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
  isToday?:boolean
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
  isToday

}: DayProps) {
  const dayInMonth = dayjs(day).date();

  let inMonth, inPrevMonth, inNextMonth, hasLeft, hasRight;
  // console.log(dayjs().format('DD-MM-YYYY').toString()==day.toString());
    
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
        marginVertical: 2,
        // borderRadius: 19,
        // backgroundColor:'red'
      }}
      onPress={() => onPress && onPress(day)}
    >
      <View
        style={[
          {
            height: 40,
            width: 40,
            borderRadius: 19,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: showAsSelected ? isToday ? '#16AB89' : '#D9F8F1' : 'white'
            // opacity: parent === 'week' || inMonth || isSelected ? 1 : 0.35,
          },
          // showAsSelected
          //   ? { 
          //     // backgroundColor: isToday? '#16AB89' :theme?.selected?.backgroundColor ,
          //     backgroundColor: showAsSelected ? isToday ? '#16AB89' : '#D9F8F1' : 'white' 
          //   }
          //   : {  },
          // marking
          //   ? omitBy(
          //       {
          //         backgroundColor:
          //           marking.background || theme.marked?.background,
          //       },
          //       isNil
          //     )
          //   : {  },
        ]}
      >
        <Text
          style={[
            { textAlign: 'center', fontSize: 16, 
            color: showAsSelected ? !isToday ? '#16AB89' : 'white' : day.toString() === dayjs().format('YYYY-MM-DD').toString() ? '#16AB89' : '#000000' ,
            // color: showAsSelected ? 'red' :'#000'
           },
            // theme.day,
            // omit(showAsSelected && theme.selected, 'backgroundColor'),
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
