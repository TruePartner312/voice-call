import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express()

const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"]
  }
});

app.use(cors());

const PORT = process.env.PORT || 8080;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

io.on("connection", (socket : any) => {
  socket.emit("me", socket.id);
  socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded")
  });
  socket.on("callUser", ({ userToCall, signalData, from, name } : any) => {
      io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });
  socket.on("answerCall", (data : any) => {
      io.to(data.to).emit("callAccepted", data.signal)
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));