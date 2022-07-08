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
        <View style={styles().board}>
            {[...Array(w)].map((x,i)=>
                <View style={styles({flexDirection: i % 2 === 0 ? 'row': 'column'}).row}>
                [...Array(w)].map((y,j)=>
                    <Square key={i+','+j} size={size / w} color={i % 2 === 0 ? '#00BCD4' : '#132c2d'}/>
                )
                </View>
            )}
        </View>
    );
};

const styles = (props) => StyleSheet.create({
    board: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    row: {
        flexDirection: props.flexDirection
    }
});

export default Board;
