/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
    Dimensions,
    StyleSheet, View,
} from 'react-native';
import Square from "./Square";

const pieces = {
    bb: 0,
    bk: 1,
    bn: 2,
    bp: 3,
    bq: 4,
    br: 5,
    wb: 6,
    wk: 7,
    wn: 8,
    wp: 9,
    wq: 10,
    wr: 11,
}
const Board = () => {
    const w = 8; const h = 8;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const size = Math.min(windowWidth, windowHeight);
    const [board, setBoard] = useState(Array(w).fill(0).map(row=>Array(h).fill(0)));

    return (
        <View style={{flexDirection: 'row', width: size, height: size, backgroundColor: '#8d00d4'}}>
            {[...Array(w)].map((x,i)=>
                <View style={styles.row} key={i}>
                    {[...Array(h)].map((y,j)=>
                        <Square piece={board[i][j]} key={i+','+j} size={size / w} color={(i+j) % 2 === 0 ? '#d0c1a9' : '#346e37'}/>
                    )}
                </View>
            )}
        </View>
    );

    /**
     * This method sets up a new board in their correct positions
     */
    const newBoard = () => {
        const def = Array(w).fill(0).map(row=>Array(h).fill(0));
        def[0] = [br,bk,bb,bq,bk,bb,bk,br]
        setBoard(def)
    }
};

const styles = (props) => StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

export default Board;
