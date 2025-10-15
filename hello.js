Steps:-
1)Run the Serv.js in cmd
2)then in Google Chrome – run with localhost: (port)
Code:-
1 ) Serv.js
const express=require('express');
const http =require('http');
const {Server}=require('socket.io');
const app=express();
const server=http.createServer(app);
const io=new Server(server);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html"); 
});
io.on('connection',(socket)=>{
console.log("New client connected");
socket.on("chat message",(msg)=>{
console.log("received ",msg);
io.emit("chat message",msg);
});
socket.on("disconnected ",()=>{
console.log("client disconnected");
});
});
server.listen(4000,()=>{
console.log("server running at http://localhost:4000");
});
2) Index.html:-
<!DOCTYPE html>
<html>
<head>
  <title>SimpleChat</title>
</head>
<body>
  <h2>Socket.IO Chat</h2>
  <label for="username">Enter your name:</label>
  <input id="username" type="text" placeholder="eg. client"/>
  <br><br>
  <input id="messageInput" type="text" placeholder="type a message"/>
  <button id="send">Send</button>
  <div id="chatBox"></div>
  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io();
    const chatBox = document.getElementById("chatBox");
    const input = document.getElementById("messageInput");
    const usernameInput = document.getElementById("username");
    const send = document.getElementById("send");
    function appendMessage(text){
      const message = document.createElement("p");
      message.textContent = text;
      chatBox.appendChild(message);
    }
    send.addEventListener("click", () => {
      const username = usernameInput.value || "Anonymous";
      const text = username + ": " + input.value;
      if(input.value.trim() !== ""){
        socket.emit("chat message", text);
        input.value = "";
      }
    });
    input.addEventListener("keydown", (e) => {
      if(e.key === "Enter"){
        send.click();
      }
    });
    socket.on("chat message", (msg) => {
      appendMessage(msg);
    });
  </script>
</body>
</html>
Output:- 
