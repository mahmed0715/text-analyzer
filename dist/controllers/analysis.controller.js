"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAnalyses = exports.deleteTextAnalysis = exports.updateTextAnalysis = exports.getTextAnalysis = exports.createTextAnalysis = void 0;
const analysisService = __importStar(require("../services/analysis.service"));
const createTextAnalysis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content } = req.body;
        const userId = req.userId;
        const analysis = yield analysisService.createAnalysis(userId, content);
        res.status(201).json(analysis);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create analysis" });
    }
});
exports.createTextAnalysis = createTextAnalysis;
const getTextAnalysis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const analysis = yield analysisService.getAnalysis(userId, id);
        if (!analysis)
            return res.status(404).json({ error: "Analysis not found" });
        res.json(analysis);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get analysis" });
    }
});
exports.getTextAnalysis = getTextAnalysis;
const updateTextAnalysis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.userId;
        const analysis = yield analysisService.updateAnalysis(userId, id, content);
        res.json(analysis);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update analysis" });
    }
});
exports.updateTextAnalysis = updateTextAnalysis;
const deleteTextAnalysis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId;
        yield analysisService.deleteAnalysis(userId, id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete analysis" });
    }
});
exports.deleteTextAnalysis = deleteTextAnalysis;
const getAllAnalyses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const analyses = yield analysisService.getAllAnalyses(userId);
        res.json(analyses);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get analyses" });
    }
});
exports.getAllAnalyses = getAllAnalyses;
