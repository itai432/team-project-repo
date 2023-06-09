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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getUser = exports.logout = exports.updateUserName = exports.getUserById = exports.deleteUser = exports.login = exports.createUser = exports.getUsers = void 0;
var usersModel_1 = require("./usersModel");
var jwt_simple_1 = require("jwt-simple");
var mongoose_1 = require("mongoose");
var secret = process.env.JWT_SECRET;
exports.getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, usersModel_1["default"].find({})];
            case 1:
                users = _a.sent();
                res.send({ users: users });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).send({ Error: mongoose_1.Error.Messages });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, email, birthday, userDB, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, username = _a.username, password = _a.password, email = _a.email, birthday = _a.birthday;
                return [4 /*yield*/, usersModel_1["default"].create({
                        username: username,
                        password: password,
                        email: email,
                        birthday: birthday,
                        userType: "public"
                    })];
            case 1:
                userDB = _b.sent();
                if (!secret)
                    throw new mongoose_1.Error("Missing jwt secret");
                token = jwt_simple_1["default"].encode({ userId: userDB._id, userType: userDB.userType }, secret);
                res.cookie("user", token, { httpOnly: true });
                res.status(201).send({ ok: true });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(500).send({ Error: mongoose_1.Error.Messages });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userDB, token, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    throw new mongoose_1.Error("Email and password are required");
                }
                return [4 /*yield*/, usersModel_1["default"].findOne({ email: email, password: password })];
            case 1:
                userDB = _b.sent();
                if (!userDB)
                    throw new mongoose_1.Error("Username or password are incorrect");
                if (!secret)
                    throw new mongoose_1.Error("Missing jwt secret");
                token = jwt_simple_1["default"].encode({ userId: userDB._id, userType: userDB.userType }, secret);
                res.cookie("user", token, { maxAge: 5000000000, httpOnly: true });
                res.status(201).send({ ok: true });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                console.error(error_3);
                res.status(500).send({ error: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, deleteUser_1, users, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                _id = req.socket._httpMessage.req.body._id;
                return [4 /*yield*/, usersModel_1["default"].deleteOne({ _id: _id })];
            case 1:
                deleteUser_1 = _a.sent();
                return [4 /*yield*/, usersModel_1["default"].find({})];
            case 2:
                users = _a.sent();
                res.send({ users: users });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, decoded, userId, userDB, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.cookies.user;
                if (!secret)
                    throw new mongoose_1.Error("No secret");
                decoded = jwt_simple_1["default"].decode(user, secret);
                userId = decoded.userId;
                return [4 /*yield*/, usersModel_1["default"].findById(userId)];
            case 1:
                userDB = _a.sent();
                res.send({ ok: true, user: userDB });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(500).send({ error: error_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUserName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, userId, userDB, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, username = _a.username, email = _a.email, userId = _a.userId;
                if (!userId) {
                    return [2 /*return*/, res.status(400).send({ error: "userId is required" })];
                }
                return [4 /*yield*/, usersModel_1["default"].findByIdAndUpdate(userId, { $set: { username: username, email: email } }, { "new": true })];
            case 1:
                userDB = _b.sent();
                if (!userDB) {
                    return [2 /*return*/, res.status(404).send({ error: "User not found" })];
                }
                res.status(200).send({ ok: true, user: userDB });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _b.sent();
                console.error(error_6);
                res.status(500).send({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.logout = function (req, res) {
    try {
        res.clearCookie('user');
        res.send('Cookie deleted');
        res.status(200).send({ ok: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
    }
};
exports.getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.query.user;
                return [4 /*yield*/, usersModel_1["default"].findById(userId)];
            case 1:
                user = _a.sent();
                console.log(user);
                res.send({ user: user });
                return [2 /*return*/];
        }
    });
}); };
