import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
        '& .MuiOutlinedInput-root': {
            backgroundColor: theme.palette.background.default
        },
        marginTop: '30px',
        width: '830px'
    }
}));
