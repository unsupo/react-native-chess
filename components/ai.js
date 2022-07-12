// Notice that all methods are asynchronous.
import { mainLoop, shutdownStockfish, sendCommand } from 'react-native-stockfish-android';
import { NativeEventEmitter, NativeModules } from 'react-native'; // in order to read Stockfish output.


class AI {
    eventEmitter;

    async constructor() {
        eventListener = new NativeEventEmitter(NativeModules.ReactNativeStockfishChessEngine);
        // In startup hook
        // Also you need to listen to the event 'stockfish-output' in order to get output lines from Stockfish.
        const eventListener = eventEmitter.addListener('stockfish-output', (line) => {
            console.log("Stockfish output: " + line);
        });
        await mainLoop(); // starts the engine process.
    }

    async stop() {
        // In will destroy hook
        await shutdownStockfish(); // dispose the engine process
        eventListener.remove(); // dispose the Stockfish output reader process.
    }
}


// When you need to send a command (e.g) : don't forget the newline character :
await sendCommand("position start\n");
