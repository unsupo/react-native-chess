/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useEffect, useState} from 'react';
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
const defaultBoard = (w, h) => {
    const def = [];//Array(w).fill(-1).map(row=>Array(h).fill(-1));
    for (let i = 0; i < w; i++) {
        def.push([])
        for (let j = 0; j < h; j++) {
            def[i].push(-1);
        }
    }
    def[0] = [pieces.br, pieces.bn, pieces.bb, pieces.bq, pieces.bk, pieces.bb, pieces.bn, pieces.br]
    def[1] = Array(w).fill(pieces.bp);
    def[def.length - 1] = [pieces.wr, pieces.wn, pieces.wb, pieces.wq, pieces.wk, pieces.wb, pieces.wn, pieces.wr]
    def[def.length - 2] = Array(w).fill(pieces.wp);
    return def
}
const Board = () => {
    const w = 8;
    const h = 8;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const size = Math.min(windowWidth, windowHeight);
    const [board, setBoard] = useState(Array(w).fill(0).map(row => Array(h).fill(0)));

    useEffect(() => setBoard(defaultBoard(w, h)), []);

    return (
        <View style={{flexDirection: 'row', width: size, height: size, backgroundColor: '#8d00d4'}}>
            {[...Array(w)].map((x, i) =>
                <View style={styles.row} key={i}>
                    {[...Array(h)].map((y, j) =>
                        <Square piece={board[j][i]} key={i + ',' + j} size={size / w}
                                color={(i + j) % 2 === 0 ? '#d0c1a9' : '#346e37'}/>
                    )}
                </View>
            )}
        </View>
    );

    /**
     * This method sets up a new board in their correct positions
     */
    const newBoard = () => {
        setBoard(defaultBoard());
    }
};

/*
All pieces except for pawn can be inverted and rotated 90 deg
knight can but also needs more rotations
so rook:
right 7 ----------
inverted left 7
rotated 90 deg down 7
inverted and rotated 90 deg up 7

bishop
top right diag 7
bottom left diag 7
bottom right
top left

knight
up 2 right 1
inverted down 2 left 1
rotated 90 deg right 2 down 1
inverted rotated 90 deg is left 2 up 1
also need mirror of above 4
up 2 left 1
down 2 right 1
right 2 up 1
left 2 down 1

 */

const styles = (props) => StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

export default Board;
