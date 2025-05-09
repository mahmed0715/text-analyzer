import { Router } from "express";
import * as analysisController from "../controllers/analysis.controller";

const router = Router();

router.post("/", analysisController.createTextAnalysis);
router.get("/", analysisController.getAllAnalyses);
router.get("/:id", analysisController.getTextAnalysis);
router.patch("/:id", analysisController.updateTextAnalysis);
router.delete("/:id", analysisController.deleteTextAnalysis);

export default router;
