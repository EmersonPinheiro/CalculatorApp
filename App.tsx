import React, {useState, useCallback, useEffect} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, ScrollView} from 'react-native';

const DIGIT_LIMIT = 8;

type MathOperator = '+' | '-' | '/' | '*';

const App = () => {
  const [currentNumberDigits, setCurrentNumberDigits] = useState<string>('');
  const [currentOperator, setCurrentOperator] = useState<MathOperator>();
  const [calcDisplay, setCalcDisplay] = useState<string>('');
  const [storedNumber, setStoredNumber] = useState<number>();
  const [invalid, setInvalid] = useState<boolean>(false);

  //TODO: Numpad input
  //TODO: Display

  useEffect(() => {
    if (invalid) {
      setCalcDisplay('ERR');
    }
  }, [invalid]);

  const calculate = useCallback(
    (concatOperator?: MathOperator) => {
      const currentNumber = +currentNumberDigits;
      let result;

      if (!storedNumber) {
        return;
      }

      switch (currentOperator) {
        case '+':
          result = storedNumber + currentNumber;
          break;
        case '-':
          result = storedNumber - currentNumber;
          break;
        case '*':
          result = storedNumber * currentNumber;
          break;
        case '/':
          result = storedNumber / currentNumber;
          break;
        default:
          break;
      }

      console.log({result});
      //TODO: Divisão

      setCurrentNumberDigits('');

      if (result !== undefined && result.toString().length <= DIGIT_LIMIT) {
        setStoredNumber(result);
        setCurrentOperator(concatOperator);

        const display = concatOperator ? `${result}${concatOperator}` : `${result}`;
        setCalcDisplay(display);
      } else if (result !== undefined && result.toString().length > DIGIT_LIMIT) {
        setInvalid(true);
        setStoredNumber(undefined);
        setCurrentOperator(undefined);
      }
    },
    [currentNumberDigits, currentOperator, storedNumber],
  );

  const clear = useCallback(() => {
    if (currentNumberDigits.length) {
      setCurrentNumberDigits('');

      const display = `${storedNumber ?? ''}${currentOperator ?? ''}`;
      setCalcDisplay(display);
    } else if (storedNumber && currentOperator) {
      setCalcDisplay(`${storedNumber}`);
      setCurrentNumberDigits(`${storedNumber}`);
      setCurrentOperator(undefined);
    }
  }, [currentNumberDigits.length, currentOperator, storedNumber]);

  const clearAll = useCallback(() => {
    setCurrentNumberDigits('');
    setCurrentOperator(undefined);
    setStoredNumber(undefined);
    setCalcDisplay('0');
  }, []);

  //TODO: onChangeCurrentNumber
  const onChangeCurrentNumber = useCallback(
    (digit: string) => {
      if (invalid) {
        setInvalid(false);
      }

      if (currentNumberDigits.length < DIGIT_LIMIT) {
        setCurrentNumberDigits(currentNumberDigits + digit);

        const display = currentOperator
          ? (invalid ? '' : calcDisplay) + digit
          : currentNumberDigits + digit;
        setCalcDisplay(display);
      }
    },
    [calcDisplay, currentNumberDigits, currentOperator, invalid],
  );

  //TODO: onChangeCurrentOperator
  const onChangeCurrentOperator = useCallback(
    (operator: MathOperator) => {
      console.log({operator});
      const currentNumberDigitsLength = currentNumberDigits.length;

      if (currentOperator && currentNumberDigitsLength) {
        calculate(operator);
      } else if (!currentNumberDigitsLength && storedNumber) {
        console.log('aqui');
        setCurrentOperator(operator);
        setCalcDisplay(storedNumber.toString() + operator);
      } else {
        setStoredNumber(+currentNumberDigits);
        setCurrentOperator(operator);
        setCalcDisplay(currentNumberDigits + operator);
        setCurrentNumberDigits('');
      }
    },
    [calculate, currentNumberDigits, currentOperator, storedNumber],
  );

  useEffect(() => {
    console.log('\n');
    console.log({currentNumberDigits});
    console.log({currentOperator});
    console.log({calcDisplay});
    console.log({storedNumber});
  }, [calcDisplay, currentNumberDigits, currentOperator, storedNumber]);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          {/**DISPLAY */}
          <Text>{calcDisplay}</Text>
          {/* <Text>{currentNumberDigits}</Text> */}

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
          <Button onPress={() => onChangeCurrentOperator('+')} title="+" />
          <Button onPress={() => onChangeCurrentOperator('-')} title="-" />
          <Button onPress={() => onChangeCurrentOperator('/')} title="/" />
          <Button onPress={() => onChangeCurrentOperator('*')} title="*" />
          <Button onPress={() => calculate()} title="=" />
          <Button onPress={() => clear()} title="C" />
          <Button onPress={() => clearAll()} title="AC" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
