import React, {FC} from 'react';
import {NumPadPressable} from '../../atoms';
import {StyleSheet, View} from 'react-native';
import {MathOperator} from '../../../types/MathOperator';

interface NumPadProps {
  onPressDigit: (digit: string) => void;
  onPressOperator: (operator: MathOperator) => void;
  clear: () => void;
  clearAll: () => void;
  calculate: () => void;
  toggleCurrentNumberSign: () => void;
}

const NumPad: FC<NumPadProps> = ({
  onPressDigit,
  calculate,
  clear,
  clearAll,
  onPressOperator,
  toggleCurrentNumberSign,
}) => {
  const {container, row, column} = styles;

  return (
    <View style={container}>
      <View style={row}>
        <View style={column}>
          <View style={row}>
            <NumPadPressable onPress={clearAll} digit="AC" />
            <NumPadPressable onPress={clear} digit="C" />
            <NumPadPressable onPress={toggleCurrentNumberSign} digit="-/+" />
          </View>
          <View style={row}>
            <NumPadPressable onPress={onPressDigit} digit="1" />
            <NumPadPressable onPress={onPressDigit} digit="2" />
            <NumPadPressable onPress={onPressDigit} digit="3" />
          </View>
          <View style={row}>
            <NumPadPressable onPress={onPressDigit} digit="4" />
            <NumPadPressable onPress={onPressDigit} digit="5" />
            <NumPadPressable onPress={onPressDigit} digit="6" />
          </View>
          <View style={row}>
            <NumPadPressable onPress={onPressDigit} digit="7" />
            <NumPadPressable onPress={onPressDigit} digit="8" />
            <NumPadPressable onPress={onPressDigit} digit="9" />
          </View>
          <View style={row}>
            <NumPadPressable onPress={onPressDigit} digit="0" expandHorizontally />
            <NumPadPressable onPress={onPressDigit} digit="." />
          </View>
        </View>
        <View style={column}>
          <NumPadPressable onPress={onPressOperator} digit="/" />
          <NumPadPressable onPress={onPressOperator} digit="*" />
          <NumPadPressable onPress={onPressOperator} digit="-" />
          <NumPadPressable onPress={onPressOperator} digit="+" />
          <NumPadPressable onPress={calculate} digit="=" disableDigitForward />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  column: {
    flexDirection: 'column',
  },
});

export default NumPad;
