import { ProxyState } from "../AppState.js"
import { List } from "../Models/List.js"
import { saveState } from "../Utils/LocalStorage.js"

class ListsService {

    constructor() {
        ProxyState.on('lists', saveState)
        ProxyState.on('tasks', saveState)
    }


    addList(newList) {
        ProxyState.lists = [...ProxyState.lists, new List(newList)]
        console.log(ProxyState.lists)
    }
    removeList(id) {
        if (window.confirm('Are you sure you want to delete?')) {
            ProxyState.lists = ProxyState.lists.filter(l => l.id !== id)
        }
    }

}

export const listsService = new ListsService()