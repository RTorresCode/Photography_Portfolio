import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
    },
    heading: {
        marginRight: '20px',
        cursor: 'pointer',
    },
    image: {
        marginRight: 'auto',
        cursor: 'pointer',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '290px',
        alignItems: 'right',
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '300px',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
    },
    logout: {
        marginLeft: '15px',
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));
