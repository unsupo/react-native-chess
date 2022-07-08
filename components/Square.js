/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    StyleSheet, View,


} from 'react-native';

const Square = (props) => {
    return (
        <View style={styles(props)}>{props.key}</View>
    );
};

const styles = (props) => StyleSheet.create({
    width: props.size,
    height: props.size,
    backgroundColor: props.color,
});

export default Square;
