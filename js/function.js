const context = {
    handCount: 0,
    cells: new Array(9),
    progress: true,
    isCircleTurn: true,
    circleElement: document.querySelector('.circle'),
    crossElement: document.querySelector('.cross'),
    cellsElements: document.querySelectorAll('.js-cell'),
    msgElement: document.querySelector('.js-state-message'),
    restartButton: document.querySelector('.js-restart'),
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

    context.restartButton.addEventListener('click', () => location.reload())
    return
}

function turnToggle(){
    let {isCircleTurn, circleElement, crossElement} = context
    if(isCircleTurn){
        circleElement.classList.remove('active')
        crossElement.classList.add('active')
    } else {
        crossElement.classList.remove('active')
        circleElement.classList.add('active')
    }
    context.isCircleTurn = !isCircleTurn
}

function checkResult(){
    const {cells, handCount, isCircleTurn, msgElement} = context
    if (handCount >= 9) {
        context.progress = false
        msgElement.innerText = 'draw'
        return
    }

    const done = winPatterns.some(pattern => {
        if(cells[pattern[0]] && (cells[pattern[0]] === cells[pattern[1]] && cells[pattern[0]] === cells[pattern[2]])){
            return true
        }
        return false
    })
    if(done){
        context.progress = false
        const char = isCircleTurn ? '○' : '×'
        msgElement.innerText = char + " win!!"
    }
}

function onClickCell(e) {
    const index = e.target.getAttribute('data-key')
    const {isCircleTurn, cells, progress} = context //objectから特定の値を取り出す(分割代入)
    if (cells[index-1] || !progress) {
      return
    }

    const char = isCircleTurn ? '○' : '×'
    cells[index-1] = char
    e.target.innerText = char

    console.log('handCount', context.handCount)
    console.log('index', index)
    console.log('isCircleTurn', isCircleTurn)
    console.log('cells', cells)
    
    checkResult()
    turnToggle()
    context.handCount++
}
onLoad()