/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    Dimensions,
    StyleSheet, View,
} from 'react-native';
import Square from "./Square";

const Board = () => {
    const w = 8; const h = 8;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const size = Math.min(windowWidth, windowHeight);

    return (
        <View style={styles}>
            {[...Array(w)].map((x,i)=>
                [...Array(w)].map((x,i)=> {
                    <Square key={i} size={size / w} color={i % 2 === 0 ? '#00BCD4' : '#132c2d'}/>
                }
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
});

export default Board;
