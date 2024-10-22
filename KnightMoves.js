function knightMoves(start, end) {
    let queue = [start]
    let currPos = start
    let pred = {}
    let moves = 0
    const knightMove = [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]]
    const visited = Array(8).fill(null).map(() => Array(8).fill(false));
    
    do {
        const temp = []
        while ((currPos[0] !== end[0] || currPos[1] !== end[1]) && queue.length > 0) { //explore the current depth of nodes
            currPos = queue.pop()
            visited[currPos[0]][currPos[1]] = true

            for (const [y, x] of knightMove) {
                // console.log(currPos)
                if (inBoard([currPos[0] + y, currPos[1] + x]))  {
                    if (!visited[currPos[0] + y][currPos[1] + x]) {
                        temp.push([currPos[0] + y, currPos[1] + x])
                        pred[[currPos[0] + y, currPos[1] + x]] = currPos

                    }
                }
            }
        }
        queue = temp
        if (currPos[0] === end[0] && currPos[1] === end[1])
            break
        currPos = queue.pop()
        moves++
    } while((currPos[0] !== end[0] || currPos[1] !== end[1]))
    let path = [currPos]
    while (currPos[0] != start[0] || currPos[1] != start[1]) {
        path = [pred[currPos], ... path]
        currPos = pred[currPos]
    }
    return {"numMoves": moves, "path": path}
}



function inBoard(pos) {
    return pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8
}

function displayMoves(start, end) {
    let moves = knightMoves(start, end);
    console.log(moves["numMoves"])
    moves.path.forEach(i => console.log(i))
}

displayMoves([0,0],[3,3]) 
displayMoves([3,3],[0,0])
displayMoves([0,0],[7,7])