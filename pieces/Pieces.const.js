function shift(number, shift) {
    return number * Math.pow(2, shift);
}
const BIT_INIT_POSITIONS = {
    "KING_W" : 1 << 3,
    "KING_B" : 1 << shift(8*7+3),
}
