import { generateId } from "../Utils/GenerateId.js"

export class List {

    constructor({ name, color, id, tasks }) {
        this.id = id || generateId()
        this.name = name
        this.color = color
        this.tasks = tasks || 0
    }



}
