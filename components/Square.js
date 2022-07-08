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
    <Image  source={require('../pieces/bb.png')} />,
    <Image source={require('../pieces/bk.png')} />,
    <Image source={require('../pieces/bn.png')} />,
    <Image source={require('../pieces/bp.png')} />,
    <Image source={require('../pieces/bq.png')} />,
    <Image source={require('../pieces/br.png')} />,
    <Image source={require('../pieces/wb.png')} />,
    <Image source={require('../pieces/wk.png')} />,
    <Image source={require('../pieces/wn.png')} />,
    <Image source={require('../pieces/wp.png')} />,
    <Image source={require('../pieces/wq.png')} />,
    <Image source={require('../pieces/wr.png')} />,
]

{/*{props.piece < 0 || !props.piece ? <View/> :*/}
{/*<Image source={require('../pieces/' + pieces[props.piece])}/>}</View>*/}
const Square = (props) => {
    return (
        <View style={styles(props)}>{pieces[props.piece]}</View>
    );
};

const styles = (props) => StyleSheet.create({
    width: props.size,
    height: props.size,
    backgroundColor: props.color,
});

export default Square;
