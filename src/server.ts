import express, { response } from "express";

const app = express();

app.get("/test", (resquest, response) => {
    return response.send("Hello new world!!!")
})

app.post("/test-post", (request, response) => {
    return response.send("Hello new world método POST")
})
app.listen(3000, () => console.log("Server is runing"));d