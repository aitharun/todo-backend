const zod = require("zod")
const createtodo = zod.object({
    title: zod.string(),
    completed: zod.boolean()
})

const updatetodo = zod.object({
    _id : zod.string(),
})
const deletetodo = zod.object({
    _id:zod.string()
})

module.exports = {
    createtodo: createtodo,
    updatetodo: updatetodo,
    deletetodo: deletetodo
}
