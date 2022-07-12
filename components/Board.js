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

const chess = new Chess('rnbqkbnr/ppP1p1pp/8/8/2P2p2/4p3/PP3PPP/RNBQKBNR w KQkq - 0 7');
const Board = () => {
    // 12 boards 1 for each type of piece 64bit integer
    const w = 8;
    const h = 8;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const size = Math.min(windowWidth, windowHeight);
    const [board, setBoard] = useState(Array(w).fill(0).map(row => Array(h).fill(0)));
    const [pressed, setPressed] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => setBoard(convert(chess.board())), []);

    function squarePressed(i, j) {
        console.log(chess.turn());
        const coords = convertCord(i, j);
        if (pressed && (pressed['to'] || pressed['take']) &&
            pressed['to'].concat(pressed['take']).indexOf(coords) >= 0) {
            let promotion = "";
            if (pressed['promotion'].indexOf(coords) >= 0) {
                return setModalVisible(true);
                // promotion = "q";
            }
            if (promotion)
                chess.move({
                    from: pressed.from,
                    to: coords,
                    promotion: promotion
                });
            else
                chess.move({from: pressed.from, to: coords});
            console.log({from: pressed.from, to: coords})
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
        console.log(obj)
        console.log(moves);
        console.log(chess.fen())
        setPressed(obj)
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
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={modalStyles.modalView}>
                            {["q","n","r","b"].map(value =>
                                <Image source={pieces[piecesPos[chess.turn()+value]]} />
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

promotion pop up window queen knight rook bishop picture coming off of promotion spot with x (close) to take back

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
        marginTop: 22
    },
    modalView: {
        width: "100%",
        height: "50%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default Board;
