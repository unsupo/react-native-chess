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
        <View style={styles}/>
    );
};

const styles = (props?: any) => StyleSheet.create({
    width: 120,
    height: 120,
    backgroundColor: '#00BCD4'
});

export default Square;
