import { StyleSheet, Dimensions } from 'react-native';

export default styles = StyleSheet.create({
    likeButton: {
        marginRight: 20,
        backgroundColor: '#fff', // Temporary background color for debugging
        borderRadius: 10,        // Adjusted border radius
        padding: 10,             // Increased padding
        borderWidth: 1,          // Added border for visibility
        borderColor: '#000',     // Border color for debugging
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        justifyContent: 'space-between', // Space between file content and like button
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        margin: 10,
        color: '#457ea8',
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 20,
    },
    fileIcon: {
        width: 110,
        height: 110,
        margin: 10,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    picture: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 1.5,
        marginTop: 20,
    },
    button: {
        backgroundColor: '#457ea8',
        width: '50%',
        padding: 10,
        margin: 2,
        borderRadius: 10,
        alignItems: 'center',
        fontStyle: 'bold',
        height: 50,
    },
    buttonText: {
        fontSize: 20,
        fontStyle: 'bold',
        color: 'white',
    },
    input: {
        height: 45,
        margin: 6,
        borderWidth: 1,
        padding: 10,
        width: 280,
        borderColor: 'lightblue',
        borderRadius: 10,
    },
    logo: {
        width: 305,
        height: 220,
        marginBottom: 10,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
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
