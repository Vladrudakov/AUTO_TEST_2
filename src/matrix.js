function validateMatrix(matrix, name = 'Matrix') {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new Error(`${name} must be a non-empty 2D array`);
  }

  const columns = matrix[0].length;

  if (columns === 0) {
    throw new Error(`${name} must contain at least one column`);
  }

  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== columns) {
      throw new Error(`${name} must be a rectangular matrix`);
    }
  }

  return { rows: matrix.length, columns };
}

function validateMatrixShape(left, right, operation = 'add') {
  const leftInfo = validateMatrix(left, 'Left matrix');
  const rightInfo = validateMatrix(right, 'Right matrix');

  if (operation === 'add' || operation === 'subtract') {
    if (leftInfo.rows !== rightInfo.rows || leftInfo.columns !== rightInfo.columns) {
      throw new Error('Matrix dimensions do not match');
    }
  }

  if (operation === 'multiply') {
    if (leftInfo.columns !== rightInfo.rows) {
      throw new Error('Matrix dimensions do not match');
    }
  }

  return {
    leftInfo,
    rightInfo,
  };
}

function addMatrices(left, right) {
  validateMatrixShape(left, right, 'add');

  return left.map((row, rowIndex) =>
    row.map((cell, columnIndex) => cell + right[rowIndex][columnIndex])
  );
}

function subtractMatrices(left, right) {
  validateMatrixShape(left, right, 'subtract');

  return left.map((row, rowIndex) =>
    row.map((cell, columnIndex) => cell - right[rowIndex][columnIndex])
  );
}

function multiplyMatrices(left, right) {
  const { leftInfo, rightInfo } = validateMatrixShape(left, right, 'multiply');

  const result = Array.from({ length: leftInfo.rows }, () => Array(rightInfo.columns).fill(0));

  for (let i = 0; i < leftInfo.rows; i += 1) {
    for (let j = 0; j < rightInfo.columns; j += 1) {
      let sum = 0;
      for (let k = 0; k < leftInfo.columns; k += 1) {
        sum += left[i][k] * right[k][j];
      }
      result[i][j] = sum;
    }
  }

  return result;
}

function transposeMatrix(matrix) {
  const { rows, columns } = validateMatrix(matrix, 'Matrix');

  return Array.from({ length: columns }, (_, columnIndex) =>
    Array.from({ length: rows }, (_, rowIndex) => matrix[rowIndex][columnIndex])
  );
}

function multiplyMatrixByScalar(matrix, scalar) {
  validateMatrix(matrix, 'Matrix');

  return matrix.map((row) => row.map((cell) => cell * scalar));
}

module.exports = {
  validateMatrix,
  validateMatrixShape,
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  transposeMatrix,
  multiplyMatrixByScalar,
};
