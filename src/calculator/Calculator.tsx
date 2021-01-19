import React, {useState, useCallback, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Display} from '../components/atoms';
import {NumPad} from '../components/molecules';
import {MathOperator} from '../types/MathOperator';

const DIGIT_LIMIT = 8;

const Calculator = () => {
  const [currentNumberDigits, setCurrentNumberDigits] = useState<string>('');
  const [currentOperator, setCurrentOperator] = useState<MathOperator>();
  const [calcDisplay, setCalcDisplay] = useState<string>('');
  const [storedNumber, setStoredNumber] = useState<number>();
  const [invalid, setInvalid] = useState<boolean>(false);

  const {container} = styles;

  useEffect(() => {
    if (invalid) {
      setCalcDisplay('ERR');
    }
  }, [invalid]);

  const calculate = useCallback(
    (concatOperator?: MathOperator) => {
      const currentNumber = +currentNumberDigits;
      let result;

      if (storedNumber !== undefined) {
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
      }

      setCurrentNumberDigits('');

      if (result !== undefined && Math.abs(result).toString().length <= DIGIT_LIMIT) {
        setStoredNumber(result);
        setCurrentOperator(concatOperator);

        const display = concatOperator ? `${result}${concatOperator}` : `${result}`;
        setCalcDisplay(display);
      } else if (result !== undefined && Math.abs(result).toString().length > DIGIT_LIMIT) {
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

  const toggleCurrentNumberSign = useCallback(() => {
    const aux = `${+currentNumberDigits * -1}`;
    setCurrentNumberDigits(aux);
    setCalcDisplay(aux);
  }, [currentNumberDigits]);

  const onChangeCurrentNumber = useCallback(
    (digit: string) => {
      if (invalid) {
        setInvalid(false);
      }

      if (Math.abs(+currentNumberDigits).toString().length < DIGIT_LIMIT) {
        setCurrentNumberDigits(currentNumberDigits + digit);

        const display = currentOperator
          ? (invalid ? '' : calcDisplay) + digit
          : currentNumberDigits + digit;
        setCalcDisplay(display);
      }
    },
    [calcDisplay, currentNumberDigits, currentOperator, invalid],
  );

  const onChangeCurrentOperator = useCallback(
    (operator: MathOperator) => {
      console.log({operator});
      const currentNumberDigitsLength = currentNumberDigits.length;

      if (currentOperator && currentNumberDigitsLength) {
        calculate(operator);
      } else if (!currentNumberDigitsLength && storedNumber) {
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

  return (
    <>
      <SafeAreaView>
        <View style={container}>
          <Display calcDisplay={calcDisplay} />
          <NumPad
            onPressDigit={onChangeCurrentNumber}
            onPressOperator={onChangeCurrentOperator}
            calculate={calculate}
            clear={clear}
            clearAll={clearAll}
            toggleCurrentNumberSign={toggleCurrentNumberSign}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDDDDD',
    height: '100%',
    width: '100%',
  },
});

export default Calculator;
