import { toast } from "sonner";
import { create } from "zustand";

interface INotificationStore {
	sendAlert: (message: string, type?: 'error' | 'success' | 'info') => void;
	sendErrorAlert: (error: Record<string, any>) => void;
	toggleNotification: (isOpened: boolean, type?: "network" | "verification") => void;
	notification: { isOpened: boolean; type?: "network" | "verification" };
}

function showAlert(message: string, type: 'error' | 'success' | 'info') {
	if (type === 'success') {
		toast.success(message)
	} else if (type === 'info') {
		toast.info(message);
	} else {
		toast.error(message);
	}
}

export const useNotificationStore = create<INotificationStore>((set, get) => ({
	notification: { isOpened: false },
	sendAlert: (message: string, type?: 'error' | 'success' | 'info') => {
		type = type || 'success';
		if (Array.isArray(message)) {
			message.forEach(msg => {
				showAlert(typeof msg === 'string' ? msg : JSON.stringify(msg), type);
			});
		} else {
			showAlert(typeof message === 'string' ? message : JSON.stringify(message), type);
		}
	},
	sendErrorAlert: (error) => {
		get().sendAlert(error.message, 'error');
	},
	toggleNotification: (isOpened, type) => set({ notification: { isOpened, type } })
}));