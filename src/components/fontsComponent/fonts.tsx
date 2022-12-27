import React from 'react';
import {Text} from 'react-native';

const AppText = props => {
  return (
    <Text
      {...props}
      style={{
        ...props.style,
        fontFamily: 'Urbanist-VariableFont_wght',
      }}>
      {props.children}
    </Text>
  );
};

export default AppText;
