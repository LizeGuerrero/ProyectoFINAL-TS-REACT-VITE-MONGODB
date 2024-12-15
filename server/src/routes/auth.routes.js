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
const authController_1 = require("../controllers/users/authController");
const validateInput_middleware_1 = require("../middlewares/validateInput.middleware");
const router = express_1.default.Router();
// Define routes with middlewares and controllers
router.post('/register', validateInput_middleware_1.validateRegisterInput, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, authController_1.register)(req, res);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, authController_1.login)(req, res);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/auth/me', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, authController_1.verifyAuth)(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/logout', authController_1.logout);
exports.default = router;
