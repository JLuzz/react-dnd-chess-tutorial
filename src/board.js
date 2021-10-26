import { createUseStyles } from 'react-jss'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import {BoardSquare} from './board-square'
import {Knight} from './knight'
import { canKnightMove, moveKnight } from './game'

const useStyles = createUseStyles({
    board: {
        display:'flex',
        flexWrap:'wrap',
        height: '100%',
        width: '100%'
    },
    square: {
        width:'12.5%',
        height:'12.5%'
    }
})

export const Board = ({knightPosition}) => {
    const classes = useStyles()
    const squares = []

    const handleSquareClick = (toX, toY) => {
        if(canKnightMove(toX, toY)) moveKnight(toX, toY)
    }

    const renderPiece = (x, y, [knightX, knightY]) =>{
        if(x === knightX && y === knightY) return <Knight/>
    }

    const renderSquare = (i, knightPosition) => {
        const x = i % 8
        const y = Math.floor(i/8)
    
        return (
            <div key={i} className={classes.square} onClick={() => handleSquareClick(x,y)}>
                <BoardSquare x={x} y={y}>
                    { renderPiece(x,y, knightPosition) }
                </BoardSquare>
            </div>
      )
    }

    for(let i = 0; i < 64; i++){
        squares.push(renderSquare(i, knightPosition))
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={classes.board}>
                {squares}
            </div>
        </DndProvider>
        
    )
}