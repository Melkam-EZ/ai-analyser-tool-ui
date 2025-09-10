import { Toaster } from "sonner";

export default function NotificationComponent() {
	return <Toaster visibleToasts={4} closeButton={true} position="top-right" />
}
