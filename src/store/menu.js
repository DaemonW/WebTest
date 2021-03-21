import Cookies from 'js-cookie';

const menu = {
    state: {
        pageIndex: 1,
        visible: false,
        mode: 'normal'
    },
    mutations: {
        setPageIndex(state, index) {
            state.pageIndex = index;
            Cookies.set('pageIndex', '' + index);
        },
        setVisible(state, visible) {
            state.visible = visible;
        },
        setMenuMode(state, mode) {
            state.mode = mode;
        }
    },
    getters: {
        pageIndex: state => {
            return state.pageIndex;
        },
        mode: state => {
            return state.mode;
        },
        visible: state => {
            return state.visible;
        }
    },
    actions: {}
}

export default menu;