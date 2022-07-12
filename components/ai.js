// Notice that all methods are asynchronous.
import { mainLoop, shutdownStockfish, sendCommand } from 'react-native-stockfish-android';
import { NativeEventEmitter, NativeModules } from 'react-native'; // in order to read Stockfish output.

// In startup hook
const eventEmitter = new NativeEventEmitter(NativeModules.ReactNativeStockfishChessEngine);
// Also you need to listen to the event 'stockfish-output' in order to get output lines from Stockfish.
const eventListener = eventEmitter.addListener('stockfish-output', (line) => {
    console.log("Stockfish output: "+line);
});
await mainLoop(); // starts the engine process.

// When you need to send a command (e.g) : don't forget the newline character :
await sendCommand("position start\n");

// In will destroy hook
await shutdownStockfish(); // dispose the engine process
eventListener.remove(); // dispose the Stockfish output reader process.
