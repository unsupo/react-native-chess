/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,


} from 'react-native/Libraries/NewAppScreen';
import Board from "./components/Board";

const App: () => Node = () => {
    return (
        <SafeAreaView style={styles.app}>
            <Board/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    app: {
        backgroundColor: '#33111e',
        justifyContent: 'center',
        alignItems: 'center'
    },
    board:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
