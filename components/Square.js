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
    "bb.png",
    "bk.png",
    "bn.png",
    "bp.png",
    "bq.png",
    "br.png",
    "wb.png",
    "wk.png",
    "wn.png",
    "wp.png",
    "wq.png",
    "wr.png",
]

{/*{props.piece < 0 || !props.piece ? <View/> :*/}
{/*<Image source={require('../pieces/' + pieces[props.piece])}/>}</View>*/}
const Square = (props) => {
    function getPiece(piece) {
        return "./pieces/"+pieces[piece];
    }

    return (
        <View style={styles(props)}><Image source={require(getPiece(pieces[props.piece]))}/>}</View>
    );
};

const styles = (props) => StyleSheet.create({
    width: props.size,
    height: props.size,
    backgroundColor: props.color,
});

export default Square;
