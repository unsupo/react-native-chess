// Notice that all methods are asynchronous.
import { mainLoop, shutdownStockfish, sendCommand } from 'react-native-stockfish-android';
import { NativeEventEmitter, NativeModules } from 'react-native'; // in order to read Stockfish output.


export class AI {
    started = false;
    async init() {
        if(!this.started)
            await mainLoop(); // starts the engine process.
        this.started = true;
    }
    async getBestMove(fen){
        await this.init();
        // await sendCommand("position start\n");
        await sendCommand("ucinewgame\nposition fen " + fen+"\ngo movetime 1000\n");
    }

    async stop() {
        // In will destroy hook
        await shutdownStockfish(); // dispose the engine process
        this.eventListener.remove(); // dispose the Stockfish output reader process.
    }
}


// When you need to send a command (e.g) : don't forget the newline character :
// await sendCommand("position start\n");
