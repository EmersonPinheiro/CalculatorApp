import React, {useState, useCallback, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Display} from '../components/atoms';
import {NumPad} from '../components/molecules';
import {MathOperator} from '../types/MathOperator';

const DIGIT_LIMIT = 8;
const DECIMAL_PART_LIMIT = 3;

const Calculator = () => {
  const [currentNumberDigits, setCurrentNumberDigits] = useState<string>('');
  const [currentOperator, setCurrentOperator] = useState<MathOperator>();
  const [calcDisplay, setCalcDisplay] = useState<string>('');
  const [storedNumber, setStoredNumber] = useState<number>();
  const [invalid, setInvalid] = useState<boolean>(false);
  const [decimalDigits, setDecimalDigits] = useState<string>('');

  const {container} = styles;

  useEffect(() => {
    if (invalid) {
      setCalcDisplay('ERR');
    }
  }, [invalid]);

  const calculate = useCallback(
    (concatOperator?: MathOperator) => {
      const currentNumber = parseFloat(currentNumberDigits);
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

      if (result !== undefined) {
        const resultLength = Math.abs(+result.toFixed()).toString().length;

        if (resultLength <= DIGIT_LIMIT) {
          result = result.toString().split('.')[1].length > 3 ? +result.toFixed(3) : result;

          setStoredNumber(result);
          setCurrentOperator(concatOperator);

          const display = concatOperator ? `${result}${concatOperator}` : `${result}`;

          setCalcDisplay(display);
        } else if (resultLength > DIGIT_LIMIT) {
          setInvalid(true);
          setStoredNumber(undefined);
          setCurrentOperator(undefined);
        }
      }
    },
    [currentNumberDigits, currentOperator, storedNumber],
  );

  const clear = useCallback(() => {
    if (currentNumberDigits.length) {
      setCurrentNumberDigits('');
      setDecimalDigits('');

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
    setDecimalDigits('');
    setCurrentOperator(undefined);
    setStoredNumber(undefined);
    setCalcDisplay('0');
  }, []);

  const toggleCurrentNumberSign = useCallback(() => {
    let aux = '0';
    if (currentNumberDigits) {
      aux = `${+currentNumberDigits * -1}`;
    } else if (storedNumber) {
      aux = `${storedNumber * -1}`;
    }
    setCurrentNumberDigits(aux);
    setCalcDisplay(aux);
  }, [currentNumberDigits, storedNumber]);

  const onChangeCurrentNumber = useCallback(
    (digit: string) => {
      if (invalid) {
        setInvalid(false);
      }

      const digitsLength = Math.abs(+currentNumberDigits).toString().length;

      if (
        (digit === '.' && !decimalDigits) ||
        (digit !== '.' &&
          ((digitsLength < DIGIT_LIMIT && !decimalDigits) ||
            (digitsLength < DIGIT_LIMIT + DECIMAL_PART_LIMIT + 1 &&
              decimalDigits.length < DECIMAL_PART_LIMIT + 1)))
      ) {
        setCurrentNumberDigits(currentNumberDigits + digit);

        const display = currentOperator
          ? (invalid ? '' : calcDisplay) + digit
          : currentNumberDigits + digit;
        setCalcDisplay(display);
      }

      if (
        ((!decimalDigits && digit === '.') || (decimalDigits && digit !== '.')) &&
        decimalDigits.length < DECIMAL_PART_LIMIT + 1
      ) {
        setDecimalDigits(decimalDigits + digit);
      }
    },
    [calcDisplay, currentNumberDigits, currentOperator, decimalDigits, invalid],
  );

  const onChangeCurrentOperator = useCallback(
    (operator: MathOperator) => {
      const currentNumberDigitsLength = currentNumberDigits.length;

      if (decimalDigits) {
        setDecimalDigits('');
      }

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
    [calculate, currentNumberDigits, currentOperator, decimalDigits, storedNumber],
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
