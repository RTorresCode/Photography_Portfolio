import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0px',
        position: 'static',
        bottom: "0",
        right: "0",
    },
    
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '300px',
        alignItems: 'center',
    },
}));
