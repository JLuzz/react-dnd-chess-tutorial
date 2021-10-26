import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    overlay:{
        position:'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: ({color})=>color
    }
})

export const Overlay = ({color}) => {
    const classes = useStyles({color})

    return <div className={classes.overlay}/>
}