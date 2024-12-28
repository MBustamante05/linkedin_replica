import { format, parseISO, isValid } from "date-fns";

export const formatDate = (dateString: string) => {
	const date = parseISO(dateString);
	return isValid(date) ? format(date, "MMM yyyy") : "Present";
};