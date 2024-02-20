import { StyleSheet } from "react-native"

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 20
    },
    Tasks: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5
    },
    deleteIcon:{
        justifyContent: "center",
        paddingLeft: 150,
    },
    description:{
        width: "100%",
        alignContent: "flex-start",
        backgroundColor: "#d9d9d9",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 5,
        marginRight: 15,
        color: "green"
    },
    newTaskBtn:{
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 30,
        left: 20,
        backgroundColor: "purple",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    iconButton: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold"
    }
})

export default styles