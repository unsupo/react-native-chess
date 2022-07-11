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
            {/*<Image style={styles(props)} source={pieces[props.piece]}/>*/}
        </ImageBackground>
    );
};
const PossibleMove = () => {
    return (
        <Svg height="100%" width="100%" style={{
            position: 'absolute',}}>
            <Circle r="17%" cx="50%" cy="50%" fill="black" fillOpacity=".1"  />
        </Svg>
    )
}
const PossibleTakeMove = () => {
    return (
        <Svg height="100%" width="100%" style={{position: 'absolute',}}>
            <Defs>
                <Mask id="hole">
                    <Rect width="100%" height="100%" fill="white"/>
                    <Circle r="40%" cx="50%" cy="50%" fill="black"/>
                </Mask>
            </Defs>
            <Circle id="donut" r="50%" cx="50%" cy="50%" fill="black" fillOpacity=".1" mask="url(#hole)" />
        </Svg>
    )
}

const styles = (props) => StyleSheet.create({
    width: props.size,
    height: props.size,
    backgroundColor: props.color,
});

export default Square;
