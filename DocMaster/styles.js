
import { StyleSheet, Dimensions } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    listContainer: {

        flex: 1,
        padding: 10,
       
    },

    scrollContainer: {
        flexGrow: 1,
    
    },

    picture:{
        width: Dimensions.get('window').width ,
        height: Dimensions.get('window').height / 1.5 , // Adjust height as needed
        marginTop: 20,
    },

    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    text: {
        fontSize: 20,
        color: 'black',
        margin: 10,
        color: 'lightblue',
    },
    logo: {
        width: 305,
        height: 220,
        marginBottom: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200,
        borderColor: 'lightblue',
    },
   
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        marginTop: 20,
    },
    fileIcon: {
        width: 80,
        height: 100,
        margin: 10,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    webview: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
});
