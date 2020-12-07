const DisplayGameBoard = () => {
  const row = []

  for (let i = 0; i < 3; i++) {
    const column = []

    for (let j = 2; j >= 0; j--) {
      column.push(
        <div
        key={`${j}${i}`}
        id={`${j}${i}`}
        className={`row${j}`}>
          &nbsp;
        </div>
      )
    }

    row.push(<div key={`${i}`} className={`column${i}`}>{column}</div>)
  }

  return row
}

export default DisplayGameBoard