"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const schemas_1 = require("./schemas");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const client = new client_1.PrismaClient();
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = schemas_1.signupSchema.safeParse(req.body);
    if (!result.success) {
        res.json({
            message: "Please enter a valid credentials"
        });
        return;
    }
    const { username, password, age, city } = result.data;
    try {
        const existingUser = yield client.user.findUnique({
            where: { username },
        });
        if (!existingUser) {
            res.status(400).json({
                message: "User aleready exists!"
            });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield client.user.create({
            data: {
                username,
                password: hashPassword,
                age,
                city,
            },
        });
        res.status(201).json({
            user: {
                id: newUser.id,
                username: newUser.username,
            },
            message: "User signup successfully!"
        });
    }
    catch (e) {
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield client.user.findUnique({
        where: {
            username,
        },
    });
    if (!user) {
        return;
    }
    const decoded = yield bcrypt_1.default.compare(password, user.password);
    if (!decoded) {
        res.status(400).json({
            message: "password is incorrect!",
        });
    }
    res.status(201).json({
        user: {
            id: user === null || user === void 0 ? void 0 : user.id,
            username: user === null || user === void 0 ? void 0 : user.username,
        },
        message: "user login successfully!",
    });
}));
app.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, done, userId } = req.body;
    if (!title || !description || typeof done !== "boolean" || !userId) {
        res.json({
            message: "something is missing!",
        });
    }
    const user = yield client.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        res.status(400).json({ message: "User not found!" });
    }
    const newTodo = yield client.todo.create({
        data: {
            title,
            description,
            done,
            userId,
        },
    });
    res.status(201).json({
        message: "Todo created successfully!",
        todo: newTodo,
    });
}));
app.listen(5000);
