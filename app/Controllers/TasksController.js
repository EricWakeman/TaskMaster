import { taskService } from "../Services/TasksService.js"





export class TasksController {

    constructor() {
        console.log()
    }

    addTask(event, id) {
        event.preventDefault()
        console.log('task button works')
        let task = event.target
        let newTask = {
            name: task.title.value,
            list: id
        }

        taskService.addTask(newTask)
        task.reset()


    }
    removeTask(id) {
        console.log('task delete button')
        taskService.removeTask(id)
    }

    checkTasks(id) {
        taskService.checkTasks(id)
    }


}