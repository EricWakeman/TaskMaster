import { generateId } from "../Utils/GenerateId.js"

export class Task {

    constructor({ name, list, check, id }) {
        this.name = name
        this.list = list
        this.check = check || false
        this.id = id || generateId()
    }


}