import { Request, Response } from "express";
import * as analysisService from "../services/analysis.service";

export const createTextAnalysis = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const analysis = await analysisService.createAnalysis(content);
    res.status(201).json(analysis);
  } catch (error) {
    res.status(500).json({ error: "Failed to create analysis" });
  }
};

export const getTextAnalysis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const analysis = await analysisService.getAnalysis(id);
    if (!analysis) return res.status(404).json({ error: "Analysis not found" });
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: "Failed to get analysis" });
  }
};

export const updateTextAnalysis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const analysis = await analysisService.updateAnalysis(id, content);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: "Failed to update analysis" });
  }
};

export const deleteTextAnalysis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await analysisService.deleteAnalysis(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete analysis" });
  }
};

export const getAllAnalyses = async (req: Request, res: Response) => {
  try {
    const analyses = await analysisService.getAllAnalyses();
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ error: "Failed to get analyses" });
  }
};
