import { ProxyState } from "../AppState.js"
import { List } from "../Models/List.js"
import { Task } from "../Models/Task.js"

export function saveState() {
    localStorage.setItem('TaskMastaData', JSON.stringify({

        lists: ProxyState.lists,
        tasks: ProxyState.tasks

    }))
}

export function loadState() {
    let data = JSON.parse(localStorage.getItem('TaskMastaData'))
    console.log(data)
    if (data != null && ProxyState.lists.length > 0) {
        ProxyState.lists = data.lists.map(list => new List(list))
        ProxyState.tasks = data.tasks.map(task => new Task(task))

    }

}