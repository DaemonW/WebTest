import defaultErrHandler from "@/store/err_handler";
import axios from "axios";

const app = {
    state: {
        categories: [
            '分组1', '分组2', '分组3', '分组4'
        ],
        apps: [],
        showAdd: false,
        showDelete: false,
        appForDel: null,
    },
    mutations: {
        setCategories(state, categories) {
            state.categories = categories;
        },
        addApp(state, app) {
            state.apps.push(app);
        },
        deleteApp(state, id) {
            for (let i = 0; i < state.apps.length; i++) {
                if (state.apps[i].id === id) {
                    state.apps.splice(i, 1);
                    break;
                }
            }
        },
        clearApps(state) {
            state.apps = [];
        },
        setApps(state, apps) {
            state.apps = apps;
        },
        showAddAppDialog(state) {
            state.showAdd = true;
        },
        dismissAddAppDialog(state) {
            state.showAdd = false;
        },
        showDeleteAppDialog(state) {
            state.showDelete = true;
        },
        dismissDeleteAppDialog(state) {
            state.showDelete = false;
        },
        setAppForDel(state, app) {
            state.appForDel = app;
        }
    },
    actions: {
        fetchCategories(context) {
            axios({
                method: 'get',
                url: ''
            }).then((resp) => {

            }).catch(defaultErrHandler)
        },
        fetchApps(context) {
            let token = context.getters.token;
            axios.get(
                context.getters.host + 'api/apps?uuid=123', {
                    headers: {"Authorization": token}
                })
                .then((response) => {
                    //console.log(response.data)
                    let apps = response.data.result.apps;
                    if (apps.length >= 0) {
                        context.commit('clearApps');
                    }
                    for (let i = 0; i < apps.length; i++) {
                        context.commit('addApp', {
                            name: apps[i].Name,
                            version: apps[i].Version,
                            size: apps[i].Size,
                            icon: apps[i].Icon,
                            id: apps[i].Id
                        })
                    }
                })
                .catch(defaultErrHandler)
        },
        refreshApps(context) {
            context.commit('clearApps');
            context.dispatch('fetchApps');
        },
        deleteApp(context, id) {
            axios({
                method: 'DELETE',
                headers: {'Authorization': context.getters.token},
                url: context.getters.host + 'api/admin/app/' + id,
            }).then((resp) => {
                context.commit('deleteApp', id);
            }).catch(defaultErrHandler)
        },
        uploadApp(context, app) {
            let formData = new FormData();
            formData.append("name", app.appName);
            formData.append("category", app.appCategory);
            formData.append('encrypted', app.encrypt);
            formData.append("apk", app.apkFile);
            // formData.append("document", documentJson);
            axios({
                method: 'post',
                url: context.getters.host + 'api/admin/apps',
                headers: {"Authorization": context.getters.token},
                data: formData,
            })
                .then((response) => {
                    let new_app = response.data.result.app;
                    context.commit('addApp', {
                        name: new_app.Name,
                        version: new_app.Version,
                        size: new_app.Size,
                        icon: new_app.Icon,
                        id: new_app.Id
                    })
                })
                .catch(defaultErrHandler);
        },
    },
    getters: {
        categories: state => {
            return state.categories;
        },
        apps: state => {
            return state.apps;
        },
        showAddAppDialog(state) {
            return state.showAdd;
        },
        showDeleteAppDialog(state) {
            return state.showDelete;
        }
    },
};
export default app;