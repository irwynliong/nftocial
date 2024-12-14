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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.select_images_from_token_address = exports.delete_user = exports.insert_user = exports.delete_matching_row = exports.insert_row = exports.select = void 0;
var supabase_js_1 = require("@supabase/supabase-js");
var dotenv = require('dotenv');
dotenv.config();
var SUPABASE_URL = process.env.SUPABASE_URL;
var SUPABASE_API = process.env.SUPABASE_API;
var supabase = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_API);
function select() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase
                        .from('NFTdata')
                        .select('*')];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error(error);
                    }
                    else {
                        console.log(data);
                    }
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
exports.select = select;
;
function insert_row(token_address, network, token_id) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase
                        .from('NFTdata')
                        .insert([
                        {
                            token_address: token_address,
                            network: network,
                            token_id: token_id,
                            image: "link.com",
                            sticker: null,
                        },
                    ]).select()];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(data);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.insert_row = insert_row;
;
function delete_matching_row(token_address, network) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase
                        .from('NFTdata')
                        .delete()
                        .eq('token_address', token_address)
                        .eq('network', network)
                        .select()];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(data);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.delete_matching_row = delete_matching_row;
;
function insert_user(username, wallet_address, network) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase
                        .from('Users')
                        .insert([
                        {
                            username: username,
                            wallet_address: wallet_address,
                            network: network,
                        },
                    ]).select()];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(data);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.insert_user = insert_user;
function delete_user(wallet_address) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase
                        .from('Users')
                        .delete()
                        .eq('wallet_address', wallet_address)
                        .select()];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(data);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.delete_user = delete_user;
;
function select_images_from_token_address(token_address, network) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase
                        .from('NFTdata')
                        .select('stickers')
                        .eq('token_address', token_address)
                        .eq('network', network)];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error(error);
                    }
                    else {
                        console.log(data);
                    }
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
exports.select_images_from_token_address = select_images_from_token_address;
;
