import { createUseStyles } from 'react-jss';
import {useDrop} from 'react-dnd'

import { ItemTypes } from './item-types';
import { canKnightMove, moveKnight } from './game';
import { Square } from "./square";
import { Overlay } from './overlay';

const useStyles = createUseStyles({
    boardSquare: {
        position: 'relative',
        width: '100%',
        height: '100%'
    }
})

export const BoardSquare = ({x, y, children}) => {
    const classes = useStyles()
    const black = (x + y) % 2 === 1
    
    const [{isOver, canDrop}, drop] = useDrop(
        ()=>({
            accept: ItemTypes.KNIGHT,
            canDrop: () => canKnightMove(x, y),
            drop: () => moveKnight(x, y),
            collect: monitor => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop()
            })
        }),
        [x, y]
    )

    return (
        <div
            ref={drop}
            className={classes.boardSquare}
        >
            <Square black={black}>{children}</Square>
            {isOver && !canDrop && <Overlay color='red'/>}
            {!isOver && canDrop && <Overlay color='yellow'/>}
            {isOver && canDrop && <Overlay color='green'/>}
        </div>
    )
}