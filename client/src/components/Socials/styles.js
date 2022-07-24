import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    socialsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
    },
    icons: {
        marginLeft: '5px',
        marginBottom: 'auto',
        marginTop: 'auto',
    },
    links: {
        padding: '7px',
        fontSize: '18px',
    }
}));
