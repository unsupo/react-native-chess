/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ImageBackground, StyleSheet, Text,} from 'react-native';
import {Circle, Defs, Mask, Rect, Svg} from 'react-native-svg';
import {pieces} from "./Pieces";


const Square = (props) => {
    return (
        <ImageBackground source={pieces[props.piece]} style={styles(props)}>
            {props.coord[0] === "a" ? <Text style={[styles(props).text,styles(props).topLeft]}>{props.coord[1]}</Text> : ""}
            {props.coord[1] === "1" ? <Text style={[styles(props).text,styles(props).bottomRight]}>{props.coord[0]}</Text> : ""}
            {/*{props.from === props.coord ? <HighLight /> : ""}*/}
            {props.to && props.to.indexOf(props.coord) >= 0 ? <PossibleMove /> : ""}
            {props.take && props.take.indexOf(props.coord) >= 0 ? <PossibleTakeMove /> : ""}
            {/*<Image style={styles(props)} source={pieces[props.piece]}/>*/}
        </ImageBackground>
    );
};
const HighLight = () => {
    return <Svg height="100%" width="100%" style={{position: 'absolute',}} />
}
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
const colors = {
    A: '#d0c1a9',
    B: '#769656',
    AH: '#d0c1a9',
    BH: '#BACA2B'
}
const styles = (props) => StyleSheet.create({
    width: props.size,
    height: props.size,
    backgroundColor: props.from === props.coord ? props.color === 0 ? colors.AH : colors.BH : props.color === 0 ? colors.A : colors.B,
    text: {
        color: props.color === 0 ? colors.B : colors.A,
        fontWeight: "bold"
    },
    bottomRight: {
        position: "absolute", bottom: 0, right: 0,
        paddingRight: 1
    },
    topLeft: {
        paddingLeft: 1
    }
});

export default Square;
