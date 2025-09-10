import { ApplicationNamesType } from "../types";

export interface IAnalysis {
	id: string;
	model: string;
	usage: Record<string, any>;
	responses: string[];
}

export interface CreateAnalysisDto {
	readonly applicationName: ApplicationNamesType;
	readonly applicationFeatures: string[];
	readonly userCount: number;
	readonly annualExpense: number;
	readonly isRawPrompt?: boolean;
	readonly monthlyExpense: number;
	readonly rawPromptMessage?: string;
}