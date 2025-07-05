import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";
import cors from "cors";
import routes from "./app/routes";
import { sendError } from "./app/utils/sendResponse";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is on: 🥰🥰");
});

app.use((_req, res, _next) => {
  return sendError(res, {
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: "API Not Found!",
    error: null,
  });
});

export default app;
