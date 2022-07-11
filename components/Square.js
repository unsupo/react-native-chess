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
    require('../resources/pieces/bb.png'),
    require('../resources/pieces/bk.png'),
    require('../resources/pieces/bn.png'),
    require('../resources/pieces/bp.png'),
    require('../resources/pieces/bq.png'),
    require('../resources/pieces/br.png'),
    require('../resources/pieces/wb.png'),
    require('../resources/pieces/wk.png'),
    require('../resources/pieces/wn.png'),
    require('../resources/pieces/wp.png'),
    require('../resources/pieces/wq.png'),
    require('../resources/pieces/wr.png'),
]

const Square = (props) => {
    return (
        <View style={styles(props)}>
            {props.text ? <Text>{props.text}</Text> : ""}
            <Image style={styles(props)} source={pieces[props.piece]}/>
        </View>
    );
};

const styles = (props) => StyleSheet.create({
    width: props.size,
    height: props.size,
    backgroundColor: props.color,
});

export default Square;
