export default {
    setCount(state, number) {
        state.count = number
    },
    getCount(state) {
        return state.count
    },
    setReLoadList(state, status) {
        state.reLoadList = status
    }
}