"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, "username must be at least 3 characters"),
    password: zod_1.z.string().min(6, "password must be at least 6 characters"),
    age: zod_1.z.number().int().min(1, "age must be at least 1"),
    city: zod_1.z.string().min(2, "City must be at least 2 characters"),
});
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    password: zod_1.z.string().min(6),
});
exports.todoSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    done: zod_1.z.boolean(),
    userId: zod_1.z.number().int().min(1, "Invalid userId"),
});
