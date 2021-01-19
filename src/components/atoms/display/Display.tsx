import React, {FC} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';

interface DisplayProps {
  calcDisplay: string;
}

const Display: FC<DisplayProps> = ({calcDisplay}) => {
  const {container, outerDisplay, innerDisplay, calcDisplayText} = styles;

  return (
    <View style={container}>
      <NeomorphFlex style={outerDisplay}>
        <Neomorph inner style={innerDisplay}>
          <Text style={calcDisplayText}>{calcDisplay}</Text>
        </Neomorph>
      </NeomorphFlex>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
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
    height: 80,
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
    fontSize: 24,
    paddingHorizontal: 16,
    fontFamily: 'RobotoMono-ExtraLight',
  },
});

export default Display;
