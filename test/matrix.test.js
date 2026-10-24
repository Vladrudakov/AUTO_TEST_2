const { expect } = require('chai');
const {
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  transposeMatrix,
  multiplyMatrixByScalar,
  validateMatrixShape,
} = require('../src/matrix');

describe('Matrix operations', () => {
  it('adds two matrices of the same size', () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [5, 6],
      [7, 8],
    ];

    expect(addMatrices(a, b)).to.deep.equal([
      [6, 8],
      [10, 12],
    ]);
  });

  it('subtracts one matrix from another', () => {
    const a = [
      [9, 8],
      [7, 6],
    ];
    const b = [
      [1, 2],
      [3, 4],
    ];

    expect(subtractMatrices(a, b)).to.deep.equal([
      [8, 6],
      [4, 2],
    ]);
  });

  it('multiplies two compatible matrices', () => {
    const a = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const b = [
      [7, 8],
      [9, 10],
      [11, 12],
    ];

    expect(multiplyMatrices(a, b)).to.deep.equal([
      [58, 64],
      [139, 154],
    ]);
  });

  it('transposes a matrix', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    expect(transposeMatrix(matrix)).to.deep.equal([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
  });

  it('multiplies a matrix by a scalar', () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];

    expect(multiplyMatrixByScalar(matrix, 3)).to.deep.equal([
      [3, 6],
      [9, 12],
    ]);
  });

  it('checks that matrix dimensions match before operations', () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const incompatibleLeft = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const incompatibleRight = [
      [1, 2],
      [3, 4],
    ];

    expect(() => addMatrices(a, b)).to.throw(Error, 'Matrix dimensions do not match');
    expect(() => multiplyMatrices(incompatibleLeft, incompatibleRight)).to.throw(Error, 'Matrix dimensions do not match');
    expect(() => validateMatrixShape(a, b)).to.throw(Error, 'Matrix dimensions do not match');
  });
});
