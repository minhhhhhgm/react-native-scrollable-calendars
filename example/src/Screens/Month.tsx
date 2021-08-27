import React, { useRef, useState } from 'react';
import { Button, Text, View } from 'react-native';
import {
  CalendarRef,
  Calendar,
  dayjs,
} from 'react-native-scrollable-calendars';

export default function Month() {
  const [date, setDate] = useState(new Date());
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
        autoSelect="firstday"
        markedDates={{
          '2021-08-22': {
            marked: true,
            type: 'dot',
          },
        }}
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
