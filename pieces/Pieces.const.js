function shift(number, shift) {
    return Math.floor(number * Math.pow(2, shift));
}
const BIT_INIT_POSITIONS = {
    "KING_W" : 1 << 3,
    "KING_B" : shift(8*7+3),
    "QUEEN_W" : 1 << 4,
    "QUEEN_B" : shift(8*7+4),
    "ROOK_W" : 1 & (1 << 7)
}
