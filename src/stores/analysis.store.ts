import { create } from "zustand";

import { useNotificationStore } from "./notification.store";
import { IBaseErrorObject, CreateAnalysisDto, IAnalysis } from "../interface";
import { getdummyAnalysis } from "../constants";

interface IThemeStore {
	analysis: IAnalysis | null;
	isLoading: boolean,
	error: IBaseErrorObject | null,
	createAnalysis: (analysisDto: CreateAnalysisDto) => Promise<boolean | undefined>;
}

export const useAnalysisStore = create<IThemeStore>((set) => ({
	analysis: null,
	isLoading: false,
	error: null,
	createAnalysis: async (analysisDto) => {
		try {
			set({ isLoading: true });
		
			useNotificationStore.getState().sendAlert(message);
			set({ analysis: getdummyAnalysis() });
			return true;
		} catch (error) {
			console.log('error', error);
			useNotificationStore.getState().sendErrorAlert(error);
			set({ analysis: null });
		} finally {
			set({ isLoading: false });
		}
	}
}));