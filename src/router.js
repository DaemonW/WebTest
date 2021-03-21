import Login from "@/view/LoginPage/LoginPage";
import MainPage from "@/view/Main/Main.vue";
import VueRouter from "vue-router";
import AppPage from "@/view/AppPage/AppPage";
import GroupPage from "@/view/GroupPage/GroupPage";
import DevicePage from "@/view/DevicePage/DevicePage";
import Settings from "@/view/SettingPage/Settings";
import GroupDetail from "@/view/GroupPage/GroupDetail";
import store from "@/store";

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: MainPage,
        redirect: to => {
            if (store.getters.isLogin) {
                return 'apps';
            }
            return '/login';
        },
        children: [
            {path: 'apps', component: AppPage},
            {path: 'groups', component: GroupPage},
            {path: 'group/:id', component: GroupDetail},
            {path: 'devices', component: DevicePage},
            {path: 'settings', component: Settings},
        ],
    },
];

const router = new VueRouter({
    routes
});
export default router;
