const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { init: initDB, Counter } = require("./db");

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/jquery.min.js", async (req, res) => {
  res.sendFile(path.join(__dirname, "./public/jquery.min.js"));
});
app.get("/jscex-async-powerpack.min.js", async (req, res) => {
  res.sendFile(path.join(__dirname, "./public/jscex-async-powerpack.min.js"));
});
app.get("/jscex-async.min.js", async (req, res) => {
  res.sendFile(path.join(__dirname, "./public/jscex-async.min.js"));
});
app.get("/jscex.min.js", async (req, res) => {
  res.sendFile(path.join(__dirname, "./public/jscex.min.js"));
});
app.get("/jscex-builderbase.min.js", async (req, res) => {
  res.sendFile(path.join(__dirname, "./public/jscex-builderbase.min.js"));
});
app.get("/functions.js", async (req, res) => {
  res.sendFile(path.join(__dirname, "./public/functions.js"));
});
app.get("/love.js", async (req, res) => {
  res.sendFile(path.join(__dirname, "./public/love.js"));
});
app.get("/jscex-jit.js", async (req, res) => {
  res.sendFile(path.join(__dirname, "./public/jscex-jit.js"));
});
app.get("/jscex-parser.js", async (req, res) => {
  res.sendFile(path.join(__dirname, "./public/jscex-parser.js"));
});

// 更新计数
app.post("/api/count", async (req, res) => {
  const { action } = req.body;
  if (action === "inc") {
    await Counter.create();
  } else if (action === "clear") {
    await Counter.destroy({
      truncate: true,
    });
  }
  res.send({
    code: 0,
    data: await Counter.count(),
  });
});

// 获取计数
app.get("/api/count", async (req, res) => {
  const result = await Counter.count();
  res.send({
    code: 0,
    data: result,
  });
});

// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    res.send(req.headers["x-wx-openid"]);
  }
});

const port = process.env.PORT || 80;

async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
