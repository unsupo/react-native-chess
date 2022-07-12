/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useEffect, useState} from 'react';
import {
    Dimensions, Image, Modal, Pressable, ScrollView,
    StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';
import Square from "./Square";
import {Chess} from "chess.js";
import {pieces} from "./Pieces";
import {AI} from "./ai"

const piecesPos = {
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
    def[0] = [piecesPos.br, piecesPos.bn, piecesPos.bb, piecesPos.bq, piecesPos.bk, piecesPos.bb, piecesPos.bn, piecesPos.br]
    def[1] = Array(w).fill(piecesPos.bp);
    def[def.length - 1] = [piecesPos.wr, piecesPos.wn, piecesPos.wb, piecesPos.wq, piecesPos.wk, piecesPos.wb, piecesPos.wn, piecesPos.wr]
    def[def.length - 2] = Array(w).fill(piecesPos.wp);
    return def
}
const convert = (board) => {
    const nBoard = [];
    board.forEach((row, i) => {
        const v = []
        row.forEach((col, j) => {
            v.push(col ? piecesPos[col['color'] + col['type']] : -1)
        })
        nBoard.push(v);
    });
    return nBoard;
}
const alphaCord = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const convertCord = (x, y) => {
    return alphaCord[x] + (8 - y);
}

const chess = new Chess();
const Board = () => {
    const ai = new AI();
    const w = 8;
    const h = 8;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const size = Math.min(windowWidth, windowHeight);
    const [board, setBoard] = useState(Array(w).fill(0).map(row => Array(h).fill(0)));
    const [pressed, setPressed] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [promotion, setPromotion] = useState("");
    const [squarePressedVal, setSquarePressedVal] = useState([]);

    useEffect(() => setBoard(convert(chess.board())), []);

    function squarePressed(i, j, p) {
        // console.log("HISTORY: "+JSON.stringify(chess.history({verbose: true}).slice(-1)[0] ));
        const coords = convertCord(i, j);
        if (pressed && (pressed['to'] || pressed['take']) &&
            pressed['to'].concat(pressed['take']).indexOf(coords) >= 0) {
            if (pressed['promotion'].indexOf(coords) >= 0 && !p) {
                setSquarePressedVal([i,j]);
                return setModalVisible(true);
                // promotion = "q";
            }
            if (p) {
                chess.move({
                    from: pressed.from,
                    to: coords,
                    promotion: p
                });
                setPromotion("");
                setSquarePressedVal([]);
            }else
                chess.move({from: pressed.from, to: coords});
            // console.log({from: pressed.from, to: coords, p: p})
            setBoard(convert(chess.board()));
            return setPressed({});
        }
        const obj = {};
        const moves = chess.moves({verbose: true, square: coords});
        if (!moves || !moves[0])
            return setPressed({})
        obj['from'] = moves[0].from;
        obj['to'] = [];
        obj['take'] = [];
        obj['promotion'] = []
        moves.forEach(v => {
                switch (v['flags']) {
                    case 'cp':
                        obj['promotion'].push(v['to']);
                    case 'c':
                        obj['take'].push(v['to']);
                        break
                    default:
                        obj['to'].push(v['to']);
                }
            }
        )
        // console.log(obj)
        // console.log(moves);
        // console.log(chess.fen())
        setPressed(obj)
        // stockfish.
        ai.getBestMove(chess.fen()).then(r => console.log(r));
    }

    const PromotionModal = () => {
        return (<Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                <View style={modalStyles.centeredView}>
                    <TouchableWithoutFeedback onPress={() => {
                    }}>
                        <View style={modalStyles.modalView}>
                            {["q", "n", "r", "b"].map(value =>
                                <Pressable key={value} onPress={()=>{console.log('promotinon: '+value); setPromotion(value); setModalVisible(!modalVisible); squarePressed(squarePressedVal[0], squarePressedVal[1],value)}}>
                                    <Image style={{width: size / (w - 1), height: size / (w - 1)}}
                                           source={pieces[piecesPos[chess.turn() + value]]}/>
                                </Pressable>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>);
    }

    return (
        <View style={{flexDirection: 'row', width: size, height: size, backgroundColor: '#8d00d4'}}>
            <PromotionModal/>
            {[...Array(w)].map((x, i) =>
                <View style={styles.row} key={i}>
                    {[...Array(h)].map((y, j) =>
                        <TouchableHighlight key={i + ',' + j + "touch"}
                                            onPress={() => squarePressed(i, j)}>
                            <Square piece={board[j][i]} key={i + ',' + j} size={size / w}
                                    coord={convertCord(i, j)}
                                    take={pressed['take']}
                                    to={pressed['to']}
                                    from={pressed['from']}
                                    history={chess.history({verbose: true}).slice(-1)[0]}
                                    color={(i + j) % 2}/>
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


buttons at botton
options|new|analysis|back|forward
options -> (modal) flip board, copy PNG, resing
new -> (modal) are you sure you want to end this game cancel, end game

your username at bottom
opp username at top (AI)

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


const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageView: {
        width: 50
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});

export default Board;
