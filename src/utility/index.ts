
export function toTitleCase(text: string | undefined): string {
	if (!text || text === null || text === "") return " ";
	return text.replace(/^./, text[0].toUpperCase());
}


export function transformText(
	text?: string,
	format?: "uppercase" | "lowercase" | "titlecase" | "capitalize" | "date-time"
) {
	if (!text || typeof text === "object") return text;
	if (format === "uppercase") {
		text = text.toUpperCase();
	}
	if (format === "lowercase") {
		text = text.toLowerCase();
	}
	if (format === "capitalize") {
		text = text.toLowerCase()
			.replace(/\b\w/g, (match: string) => match.toUpperCase());
	}
	if (format === "titlecase") {
		text = text.replace(/^./, text[0].toUpperCase());
	}
	// if (format === 'date-time') {
	// 	return formatToReadableDate(text);
	// }
	return text;
}