// @ts-nocheck
import { ProxyState } from "../AppState.js";
import { listsService } from "../Services/ListsService.js";
import { taskService } from "../Services/TasksService.js";
import { loadState } from "../Utils/LocalStorage.js";

function drawLists() {
    console.log('drawing lists yo')
    let lists = ProxyState.lists
    let listElem = document.getElementById('listDisplay')
    let template = ''

    lists.forEach(list => {
        let totalTasks = ProxyState.tasks.filter(t => t.list == list.id)
        let currentTasks = totalTasks.length

        totalTasks.forEach(t => {
            if (t.check == true) {
                currentTasks--
            }
        })


        template += /*html*/ `
            <div class="card">
                <div class="card-header text-center" style="background-color: ${list.color};">
                    <h3>${list.name}</h3>
                    <h6>${currentTasks}/${totalTasks.length}</h6>
                </div>
                <div class="car-body m-4">
                    <ul>`
        totalTasks.forEach(t => {
            if (t.check == true) {
                template += /*html*/
                    `<li><input type="checkbox" name="complete" id="${t.id}" onclick="app.tasksController.checkTasks('${t.id}')" checked>${t.name}
                                   <button class="btn"  onclick="app.tasksController.removeTask('${t.id}')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                        <path onclick="app.tasksController.removeTask(${t.id})"
                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                    </svg>
                                </button>
                            </li>
                `}
            else {
                template += /*html*/
                    `<li><input type="checkbox" name="complete" id="${t.id}" onclick="app.tasksController.checkTasks('${t.id}')">${t.name}
                                   <button class="btn"  onclick="app.tasksController.removeTask('${t.id}')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                        <path onclick="app.tasksController.removeTask(${t.id})"
                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                    </svg>
                                </button>
                            </li>
                ` }
        }
        )

        template += /*html*/
            `</ul >
                    <form onsubmit="app.tasksController.addTask(event, '${list.id}')">
                        <div class="form-group">
                            <label for="name" >Task Name</label>
                            <input type="text" id="title" maxlength="50" minlength="3">
                                <button type="submit">Add Task</button>
                            </div>
                        </form>
                        <button class="btn btn-primary" onclick="app.listsController.removeList('${list.id}')">Complete and Delete!</button>
                    </div>
        </div > `
    })

    listElem.innerHTML = template
}





export class ListsController {
    constructor() {
        console.log('the controler is linked');
        ProxyState.on('lists', drawLists)
        ProxyState.on('tasks', drawLists)
        loadState()
    }
    addList(event) {
        event.preventDefault()
        console.log('button works')
        let list = event.target
        let newList = {
            name: list.name.value,
            color: list.color.value
        }

        listsService.addList(newList)
        list.reset()
    }
    removeList(id) {
        listsService.removeList(id)

    }
}