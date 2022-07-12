// Notice that all methods are asynchronous.
import { mainLoop, shutdownStockfish, sendCommand } from 'react-native-stockfish-android';
import { NativeEventEmitter, NativeModules } from 'react-native'; // in order to read Stockfish output.


class AI {
    // In startup hook
    eventEmitter = new NativeEventEmitter(NativeModules.ReactNativeStockfishChessEngine);
    // Also you need to listen to the event 'stockfish-output' in order to get output lines from Stockfish.
    eventListener = this.eventEmitter.addListener('stockfish-output', (line) => {
        console.log("Stockfish output: " + line);
    });

    async constructor() {
        await mainLoop(); // starts the engine process.
    }

    async getBestMove(fen){
        // await sendCommand("position start\n");
        await sendCommand("ucinewgame");
        await sendCommand("position fen " + fen);
        await sendCommand("go depth 18");
    }

    async stop() {
        // In will destroy hook
        await shutdownStockfish(); // dispose the engine process
        this.eventListener.remove(); // dispose the Stockfish output reader process.
    }
}


// When you need to send a command (e.g) : don't forget the newline character :
await sendCommand("position start\n");
