/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    Image,
    StyleSheet, Text, View,


} from 'react-native';

const pieces = [
    require('../pieces/bb.png'),
    require('../pieces/bk.png'),
    require('../pieces/bn.png'),
    require('../pieces/bp.png'),
    require('../pieces/bq.png'),
    require('../pieces/br.png'),
    require('../pieces/wb.png'),
    require('../pieces/wk.png'),
    require('../pieces/wn.png'),
    require('../pieces/wp.png'),
    require('../pieces/wq.png'),
    require('../pieces/wr.png'),
]

const Square = (props) => {
    return (
        <View style={styles(props)}><Image source={pieces[props.piece]}/></View>
    );
};

const styles = (props) => StyleSheet.create({
    width: props.size,
    height: props.size,
    backgroundColor: props.color,
});

export default Square;
