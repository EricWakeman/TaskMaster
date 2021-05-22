import { ProxyState } from "../AppState.js"
import { TasksController } from "../Controllers/TasksController.js"
import { Task } from "../Models/Task.js"

class TaskService {

    addTask(newTask) {
        ProxyState.tasks = [...ProxyState.tasks, new Task(newTask)]
        console.log(ProxyState.tasks)
    }
    removeTask(id) {
        if (window.confirm('Are you sure you want to delete?')) {
            ProxyState.tasks = ProxyState.tasks.filter(t => t.id !== id)
        }
    }
    checkTasks(id) {
        let taskCheck = ProxyState.tasks.find(t => t.id == id)
        if (taskCheck.check == true) {
            taskCheck.check = false
        }
        else {
            taskCheck.check = true
        }
        ProxyState.tasks = ProxyState.tasks
    }
    clearTasks(id) {
        ProxyState.tasks = ProxyState.tasks.filter(t => t.list !== id)
    }
}

export const taskService = new TaskService()