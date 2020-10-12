function reducer(state, action) {
    if (action.type === "INCR") {
        return state + action.value
    } else if (action.type === "DECR") {
        return state - action.value
    } else {
        return state
    }
}

export default reducer

