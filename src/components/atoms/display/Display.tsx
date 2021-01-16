import React, {FC} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';

interface DisplayProps {
  calcDisplay: string;
  currentNumberDigits: string;
}

const Display: FC<DisplayProps> = ({calcDisplay, currentNumberDigits}) => {
  const {container, outerDisplay, innerDisplay, calcDisplayText} = styles;

  return (
    <View style={container}>
      <NeomorphFlex style={outerDisplay}>
        <Neomorph inner style={innerDisplay}>
          {/* <Text
            style={{
              flex: 1,
              textAlign: 'right',
              textAlignVertical: 'center',
              fontSize: 16,
              paddingHorizontal: 16,
            }}>
            {calcDisplay}
          </Text> */}

          <Text style={calcDisplayText}>{calcDisplay}</Text>
        </Neomorph>
      </NeomorphFlex>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  outerDisplay: {
    flex: 1,
    shadowRadius: 3,
    padding: 16,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  innerDisplay: {
    height: 110,
    width: 300,
    shadowRadius: 3,
    backgroundColor: '#B1C6A6',
    shadowColor: '#6B9672',
    borderRadius: 10,
  },
  calcDisplayText: {
    flex: 3,
    textAlign: 'right',
    textAlignVertical: 'center',
    fontSize: 32,
    paddingHorizontal: 16,
    fontFamily: 'RobotoMono-Thin',
    // fontWeight: '600',
  },
});

export default Display;
