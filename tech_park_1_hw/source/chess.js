/**
 * @file chess.js
 * @brief Generate chess board with size N*N cells.
 *
 * It generate chess board where black cells marks as "${BLACK}" and white cells marks as "${WHITE}".
 * Cells in one row separates by "${SEPARATOR}". Rows separates by "${LINE_SEPARATOR}".
 */
"use strict";

const BLACK = "*",            ///< Symbol for black cell
      WHITE = " ",            ///< Symbol for white cell
      DELIMITER = "",         ///< Symbol-separator for cells in one row
      LINES_DELIMITER = "\n"; ///< Symbol-separator for rows

/**
 * @brief Generate and return chess boars with size N*N cells
 * @param[in] N Size of chess boars
 * @return {string} Chess boars
 */
function chess(N) {
	parsedN = parseFloat(N)
	if (!Number.isInteger(parsedN) || parsedN < 2) {
		return null;
	}

	const result = new Array(parsedN);
	const odd_row = getRow(parsedN);
	const even_row = getRow(parsedN, false);
	for (let i = 0; i < parsedN; i++) {
		result[i] = (i % 2 === 0 ? even_row : odd_row);
	}

	return result.join(LINES_DELIMITER) + "\n";
}

/**
 * @brief Generate and return one row of chess boars
 * @param[in] N Size of chess board
 * @param[in] is_odd Flag marks that this row is odd
 * @return {string} One row on chess board
 */
function getRow(N, is_odd=true) {
	const result = new Array(N);

	for (let i = 0; i < N; i++) {
		if (i % 2 === 0) {
			result[i] = is_odd ? WHITE : BLACK;
		} else {
			result[i] = is_odd ? BLACK : WHITE;
		}
	}

	return result.join(DELIMITER);
}
