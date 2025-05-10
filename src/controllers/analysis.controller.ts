import { Request, Response } from "express";
import * as analysisService from "../services/analysis.service";

export const createTextAnalysis = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const userId = (req as any).userId;
    const analysis = await analysisService.createAnalysis(userId, content);
    res.status(201).json(analysis);
  } catch (error) {
    res.status(500).json({ error: "Failed to create analysis" });
  }
};

export const getTextAnalysis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    const analysis = await analysisService.getAnalysis(userId, id);
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
    const userId = (req as any).userId;
    const analysis = await analysisService.updateAnalysis(userId, id, content);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: "Failed to update analysis" });
  }
};

export const deleteTextAnalysis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    await analysisService.deleteAnalysis(userId, id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete analysis" });
  }
};

export const getAllAnalyses = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const analyses = await analysisService.getAllAnalyses(userId);
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ error: "Failed to get analyses" });
  }
};
