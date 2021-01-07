import React, {useState, useCallback, useEffect} from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';

const DIGIT_LIMIT = 8;

type MathOperator = '+' | '-' | '/' | '*';

const App = () => {
  const [currentNumberDigits, setCurrentNumberDigits] = useState<string>('');
  const [currentOperator, setCurrentOperator] = useState<MathOperator>();

  //TODO: Numpad input
  //TODO: Display

  //TODO: Operation function
  const calculate = useCallback(() => {}, []);

  //TODO: onChangeCurrentNumber
  const onChangeCurrentNumber = useCallback(
    (digit: string) => {
      if (currentNumberDigits.length < DIGIT_LIMIT) {
        setCurrentNumberDigits(currentNumberDigits + digit);
      }
    },
    [currentNumberDigits],
  );

  //TODO: onChangeCurrentOperator
  const onChangeCurrentOperator = useCallback((operator: MathOperator) => {
    if (currentNumberDigits.length) {
      cu
    }
  }, []);

  return (
    <>
      <SafeAreaView>
        {/**DISPLAY */}
        <Text>{currentNumberDigits}</Text>

        {/**NUMPAD */}
        <Button onPress={() => onChangeCurrentNumber('1')} title="1" />
        <Button onPress={() => onChangeCurrentNumber('2')} title="2" />
        <Button onPress={() => onChangeCurrentNumber('3')} title="3" />
        <Button onPress={() => onChangeCurrentNumber('4')} title="4" />
        <Button onPress={() => onChangeCurrentNumber('5')} title="5" />
        <Button onPress={() => onChangeCurrentNumber('6')} title="6" />
        <Button onPress={() => onChangeCurrentNumber('7')} title="7" />
        <Button onPress={() => onChangeCurrentNumber('8')} title="8" />
        <Button onPress={() => onChangeCurrentNumber('9')} title="9" />
        <Button onPress={() => onChangeCurrentNumber('0')} title="0" />

        {/**OPERATORS */}
        <Button onPress={() => onChangeCurrentNumber('+')} title="+" />
        <Button onPress={() => onChangeCurrentNumber('-')} title="-" />
        <Button onPress={() => onChangeCurrentNumber('/')} title="/" />
        <Button onPress={() => onChangeCurrentNumber('*')} title="*" />
        <Button onPress={() => onChangeCurrentNumber('=')} title="=" />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
