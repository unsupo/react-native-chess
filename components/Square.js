/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    Image, ImageBackground,
    StyleSheet, Text, View,
} from 'react-native';
import { Svg, Defs, Rect, Mask, Circle } from 'react-native-svg';


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
        <ImageBackground source={pieces[props.piece]} style={styles(props)}>
            {props.coord[0] === "a" || props.coord[1] === "1" ? <Text>{props.coord}</Text> : ""}
            <Svg height="100%" width="100%">
                <Circle r="15%" cx="50%" cy="50%" fill="grey" fillOpacity=".4"  />
            </Svg>
            {/*<Image style={styles(props)} source={pieces[props.piece]}/>*/}
        </ImageBackground>
    );
};
const styles = (props) => StyleSheet.create({
    width: props.size,
    height: props.size,
    backgroundColor: props.color,
    circle: {
        width: props.size/4,
        height: props.size/4,
        background: 'grey',
        borderRadius: '50%',
    },
});

export default Square;
