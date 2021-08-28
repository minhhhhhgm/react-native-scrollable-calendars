import React, { useRef, useState } from 'react';
import { Button, Text, View } from 'react-native';
import {
  CalendarRef,
  Calendar,
  dayjs,
  Marking,
} from 'react-native-scrollable-calendars';

const mkds: { [x: string]: Marking } = {};

const randomColor = (number) =>
  ['blue', 'green', 'red'][Math.floor(Math.random() * number) % 3];

for (let index = 0; index < 200; index++) {
  if (Math.random() > 0.5) {
    mkds[dayjs().add(index, 'day').format('YYYY-MM-DD')] = {
      type: 'dot',
      marked: true,
      color: randomColor(index),
      selectedColor: randomColor(index),
      background: randomColor(index),
    };
  }
}

export default function Month() {
  const [date, setDate] = useState('2021-08-28');
  const [month, setMonth] = useState(new Date().toISOString());
  const ref = useRef<CalendarRef>(null);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            marginHorizontal: 12,
            fontSize: 24,
            fontWeight: 'bold',
          }}
        >
          {dayjs(month).format('MM/YYYY')}
        </Text>
        <Button
          title="Today"
          onPress={() => {
            ref.current.scrollToDate(new Date());
          }}
        />
        <View style={{ flex: 1 }} />
        <Button title="Prev" onPress={() => ref.current.scrollToPrevMonth()} />
        <Button title="Next" onPress={() => ref.current.scrollToNextMonth()} />
      </View>
      <Calendar
        ref={ref}
        autoSelect="markedDate"
        markedDates={mkds}
        selected={date}
        onSelectDate={(value, source) => {
          setDate(value as any);
        }}
        onMonthChange={(m) => {
          setMonth(m as any);
        }}
      />
    </View>
  );
}
