const context = {
    handCount: 0,
    cells: new Array(9),
    progress: true,
    isCircleTurn: true,
    circleElement: document.querySelector('.circle'),
    crossElement: document.querySelector('.cross'),
    cellsElements: document.querySelectorAll('.js-cell'),
    msgElement: document.querySelector('.js-state-message'),
    restartBtnElement: document.querySelector('.js-restart')
}

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function onLoad() {
    context.cellsElements.forEach(ele => {
      ele.addEventListener('click', onClickCell)
    })
    return
}
function onClickCell(e) {
    const index = e.target.getAttribute('data-key')
    const { isCircleTurn, cells, msgElement } = context
    if (cells[index-1]) {
      return
    }
    const char = isCircleTurn ? '○' : '×'
    cells[index-1] = char
    e.target.innerText = char
    console.log('handCount', context.handCount)
    console.log('index', index)
    console.log('isCircleTurn', isCircleTurn)
    console.log('cells', cells)
    context.isCircleTurn = !isCircleTurn
    context.handCount++
    if (context.handCount >= 9) {
      context.progress = false
      msgElement.innerText = 'draw'
    }
}
onLoad()

