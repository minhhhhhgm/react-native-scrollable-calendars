import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface DotProps {
  color?: string;
  style?: ViewStyle;
}

export default function Dot({ color, style }: DotProps) {
  return <View style={[styles.dot, { backgroundColor: color }, style]} />;
}

const styles = StyleSheet.create({
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
