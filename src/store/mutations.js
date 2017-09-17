export default {
    setScroll(state,number,target = 'homeScroll') {
        state[target] = number
    },
    getScroll(state,target = 'homeScroll') {
        return state.count
    }
}