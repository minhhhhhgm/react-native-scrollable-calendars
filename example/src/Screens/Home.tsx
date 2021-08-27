import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, View } from 'react-native';

export default function Home() {
  const navigation = useNavigation<any>();
  const [date, setDate] = useState(new Date());

  return (
    <View style={{ flex: 1 }}>
      <Button title="Month" onPress={() => navigation.navigate('Month')} />
      <Button title="Week" onPress={() => navigation.navigate('Week')} />
      <Button title="Expand" onPress={() => navigation.navigate('Expand')} />
    </View>
  );
}
