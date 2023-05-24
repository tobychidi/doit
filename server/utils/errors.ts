import { H3Event } from "h3";

export const SendTaskNotFound = (event: H3Event) => {
   sendError(event, createError({ statusCode: 404, statusMessage: "Task not found" }));
};
