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
        <View style={{flexDirection: 'row', width: size, height: size, backgroundColor: '#8d00d4'}}>
            {[...Array(w)].map((x,i)=>
                <View style={styles.row} key={i}>
                    {[...Array(h)].map((y,j)=>
                        <Square v={i+','+j} key={i+','+j} size={size / w} color={(i+j) % 2 === 0 ? '#d0c1a9' : '#346e37'}/>
                    )}
                </View>
            )}
        </View>
    );

    /**
     * This method sets up a new board in their correct positions
     */
    const newBoard = () => {

    }
};

const styles = (props) => StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

export default Board;
