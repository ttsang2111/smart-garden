export function getRandomNumber(min: number, max: number): number { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
  
// Helper function to generate a list of consecutive dates starting from a specific date
export function generateDateList(startDate: Date, count: number): Date[] {
    return Array.from({ length: count }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        return date;
    });
}

// Helper function to ensure all date and month values are two digits
export function padToTwoDigits(num: number): string {
    return num.toString().padStart(2, '0');
}