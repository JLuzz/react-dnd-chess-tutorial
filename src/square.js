import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    square: {
        backgroundColor: ({backgroundColor}) => backgroundColor,
        color: ({color}) => color,
        height: '100%',
        width: '100%'
    }
})

export const Square = ({children, black}) => {
    const classes = useStyles({ backgroundColor: black ? 'black' : 'white' , color: black ? 'white' : 'black'}) 

    return (
        <div
            className={classes.square}
        >
            {children}
        </div>
    )
}