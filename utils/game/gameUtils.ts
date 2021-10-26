export const genearateBlankGrid = (size: number) => {
  const newGrid: number[][] = []
  for (let i = 0; i < size; i++) {
    const newRow = []
    for (let j = 0; j < size; j++) {
      newRow.push(0)
    }
    newGrid.push(newRow)
  }
  return newGrid
}
