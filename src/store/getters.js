const PROTOCOL = "http";
const HOST = '192.168.1.3';
const PORT = "8080";
const WIDTH = 992 // refer to Bootstrap's responsive design


import Cookies from 'js-cookie';

const getters = {
    isMobile: state => {
        console.log('is mobile = ' + state.isMobile);
        return state.isMobile;
    },
    host: state => {
        return PROTOCOL.concat("://", HOST, ":", PORT, "/");
    }
};

export default getters;