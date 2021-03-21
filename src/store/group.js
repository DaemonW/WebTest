import axios from "axios";
import defaultErrHandler from "@/store/err_handler";

const group = {
    state: {
        groups: [
            {
              id: -1,
              name: 'test',
              priority: 0,
              date: '2021.02.07'
            }
        ],
        showAdd: false,
        showDelete: false,
        groupForDel: null
    },
    mutations: {
        clearGroups(state) {
            state.groups = [];
        },
        addGroup: (state, group) => {
            state.groups.push(group);
        },
        deleteGroup: (state, group) => {
            for (let i = 0; i < state.groups.length; i++) {
                if (state.groups[i].id === group.id) {
                    state.groups.splice(i, 1);
                }
            }
        },
        showAddGroupDialog(state) {
            state.showAdd = true;
        },
        dismissAddGroupDialog(state) {
            state.showAdd = false;
        },
        showDeleteGroupDialog(state) {
            state.showDelete = true;
        },
        dismissDeleteGroupDialog(state) {
            state.showDelete = false;
        },
        setGroupForDel(state, group) {
            state.groupForDel = group;
        }
    },
    actions: {
        addGroup(context) {
            axios({
                method: 'post',
                url: context.getters.host + 'api/admin/groups',
                headers: {"Authorization": context.getters.token},
                data: {
                    name: this.groupName,
                    priority: 1
                }
            })
                .then((response) => {
                    let group = response.data.result.group;
                    context.commit('addGroup', {
                        id: group.Id,
                        name: group.Name,
                        priority: group.Priority,
                        date: '2021.02.07'
                    });
                })
                .catch(defaultErrHandler);
        },

        fetchGroups(context) {
            let token = context.getters.token;
            axios.get(
                context.getters.host + 'api/admin/groups', {
                    headers: {"Authorization": token}
                })
                .then((response) => {
                    //console.log(response.data)
                    let groups = response.data.result.groups;
                    if (groups.length >= 0) {
                        context.commit('clearGroups');
                    }
                    for (let i = 0; i < groups.length; i++) {
                        context.commit('addGroup', {
                            name: groups[i].Name,
                            priority: groups[i].Priority,
                            id: groups[i].Id,
                            date: ''
                        })
                    }
                })
                .catch(defaultErrHandler)
        },

        deleteGroup(context, group) {
            axios({
                method: 'DELETE',
                headers: {'Authorization': context.getters.token},
                url: context.getters.host + 'api/admin/group/' + group.id,
            }).then((resp) => {
                context.commit('deleteGroup', group);
            }).catch(defaultErrHandler)
        },
    },
    getters: {
        groups(state) {
            return state.groups;
        }
    }
};

export default group;