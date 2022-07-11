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
    StyleSheet, TouchableHighlight, View,
} from 'react-native';
import Square from "./Square";
import {Chess} from "chess.js";

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
const convert = (board) => {
    const nBoard = [];
    board.forEach((row, i) => {
        const v = []
        row.forEach((col, j) => {
            v.push(col ? pieces[col['color']+col['type']] : -1)
        })
        nBoard.push(v);
    });
    return nBoard;
}
const alphaCord = ['a','b','c','d','e','f','g','h'];
const convertCord = (x,y) => {
    return alphaCord[x]+(8-y);
}

const chess = new Chess();
const Board = () => {
    // 12 boards 1 for each type of piece 64bit integer
    const w = 8;
    const h = 8;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const size = Math.min(windowWidth, windowHeight);
    const [board, setBoard] = useState(Array(w).fill(0).map(row => Array(h).fill(0)));
    const [pressed, setPressed] = useState({});

    useEffect(() => setBoard(convert(chess.board())), []);
    return (
        <View style={{flexDirection: 'row', width: size, height: size, backgroundColor: '#8d00d4'}}>
            {[...Array(w)].map((x, i) =>
                <View style={styles.row} key={i}>
                    {[...Array(h)].map((y, j) =>
                        <TouchableHighlight key={i + ',' + j+ "touch"}
                            onPress={()=> {
                                console.log(chess.turn());
                                const coords = convertCord(i, j);
                                if(pressed && (pressed['to'] || pressed['take']) &&
                                    pressed['to'].concat(pressed['take']).indexOf(coords) >= 0) {
                                    chess.move({from: pressed.from, to: coords});
                                    setBoard(convert(chess.board()));
                                    return setPressed({});
                                }
                                const obj = {};
                                const moves = chess.moves({verbose: true, square: coords});
                                if(!moves || !moves[0])
                                    return setPressed({})
                                obj['from']=moves[0].from;
                                obj['to']=[];
                                obj['take']=[];
                                moves.forEach(v=>v['flags']==='c'||v['flags']==='cp'?obj['take'].push(v['to']):obj['to'].push(v['to']))
                                console.log(obj)
                                console.log(moves);
                                console.log(chess.fen())
                                setPressed(obj)
                            }}>
                            <Square piece={board[j][i]} key={i + ',' + j} size={size / w}
                                    coord={convertCord(i,j)}
                                    take={pressed['take']}
                                    to={pressed['to']}
                                    from={pressed['from']}
                                    color={(i + j) % 2 === 0 ? '#d0c1a9' : '#346e37'}/>
                        </TouchableHighlight>
                    )}
                </View>
            )}
        </View>
    );
};

/*
Things that can be done
Look
8-1 on left column
a-h on bottom row

AI
bitboard
fen
calculate all moves at all times?
transposition tables
iterative deepening
zobrist keys
https://web.archive.org/web/20071026090003/http://www.brucemo.com/compchess/programming/index.htm
 */

const styles = (props) => StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

export default Board;
