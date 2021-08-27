import React, { useRef, useState } from 'react';
import { Button, Text, View } from 'react-native';
import {
  dayjs,
  WeekCalendarRef,
  WeekCalendar,
} from 'react-native-scrollable-calendars';

export default function Month() {
  const [date, setDate] = useState(new Date());
  const [week, setWeek] = useState(new Date().toISOString());
  const ref = useRef<WeekCalendarRef>(null);

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
          {dayjs(week).format('MM/YYYY')}
        </Text>
        <Button
          title="Today"
          onPress={() => {
            ref.current.scrollToDate(new Date());
          }}
        />
        <View style={{ flex: 1 }} />
        <Button title="Prev" onPress={() => ref.current.scrollToPrevWeek()} />
        <Button title="Next" onPress={() => ref.current.scrollToNextWeek()} />
      </View>
      <WeekCalendar
        ref={ref}
        autoSelect="firstday"
        markedDates={{
          '2021-08-22': {
            marked: true,
            type: 'dot',
            background: 'blue',
          },
        }}
        selected={date}
        onSelectDate={(value, source) => {
          setDate(value as any);
        }}
        onWeekChange={(w) => {
          setWeek(w);
        }}
      />
    </View>
  );
}
