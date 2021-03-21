import Cookies from 'js-cookie';
import {Message} from "element-ui";
import axios from "axios";
import defaultErrHandler from "@/store/err_handler";

const user = {
    state: {
        token: ''
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            Cookies.set('token', token);
        }
    },
    getters: {
        isLogin: state => {
            if (state.token === '') {
                state.token = Cookies.get('token');
            }
            return state.token !== undefined && state.token !== '';
        },
        token: state => {
            if (state.token !== '') {
                return state.token;
            }
            state.token = Cookies.get('token');
            if (state.token === undefined) {
                state.token = '';
            }
            return state.token;
        },
    },
    actions: {
        doLogin(context, data) {
            axios({
                method:'post',
                url: context.getters.host + 'api/tokens',
                data: {
                    username: data.username,
                    password: data.password
                }
            })
                .then((response) => {
                    let token = response.data.result.token;
                    if (token !== undefined) {
                        context.commit('setToken', token);
                    }
                    Message({
                        message: 'Login Success',
                        offset: 500
                    });
                })
                .catch(defaultErrHandler)
        }
    }
}
export default user;