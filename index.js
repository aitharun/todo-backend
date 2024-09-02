const express = require('express')
const bodyParser = require('body-parser')
const { createtodo, updatetodo,deletetodo } = require('./types')
const { todo } = require('./db')
const app = express();
const cors = require('cors');
const port = 3000;
app.use(cors({
    //origin: "http://localhost:5173/"
}));
    


try{
    const cors = require('cors');
    console.log('cors is installed');
}
catch(e){
    console.log('not installed');
}
app.use(bodyParser.json())
app.use(express.json())
//to allow access of this db from port 5173 only

function userMiddleware(req,res,next){
    const username = req.headers.username;
    const password = req.headers.password;
    if(username!='tharun' || password!="pass"){
        res.status(400).json({
            "error" : "wrong inputs",
        })
    }
    else{
        next();
    }
}
app.get("/", async function(req,res){
    const todos = await todo.find({});
    res.json({
        todos
    })
})

app.post("/todo",async function(req,res){
    const createpayload = req.body;
    const parsedpayload = createtodo.safeParse(createpayload);
    if(!parsedpayload.success){
        res.status(411).json({
            msg: "you sent the wrong inputs",
        })
        return;
    }
    await todo.create({
        title: createpayload.title,
        completed: createpayload.completed
    })

    res.json({
        msg: "todo created"
    })
});

app.delete("/delete",async function(req, res){
    const deletepayload = req.body;
    const parsedpayload = deletetodo.safeParse(deletepayload);
    if(!parsedpayload.success){
        res.status(411).json({
            msg: "you sent the wrong inputs",
        })
        return;
    }
    const index = req.body._id;
    const todoToDelete = await todo.findOne({_id : index});

    if (todoToDelete) {
        await todo.deleteOne({ _id: index }); // Use the correct value to delete
        res.json({
            msg: "Todo deleted"
        });
    } else {
        res.status(404).json({
            msg: "Todo not found"
        });
    }
})

app.put("/completed",async function(req, res){
    const updatepayload = req.body
    const parsedpayload = updatetodo.safeParse(updatepayload)
    if(!parsedpayload.success){
        res.status(411).json({
            msg: "you sent the wrong inputs",
        })
        return;
    }
    await todo.updateOne({
        _id: req.body.id
    },{
        completed: true
    })
    res.json({
        msg: "Todo updated"
    })
})

app.listen(port,function(){
    console.log(`server is running on port ${port}`);
});