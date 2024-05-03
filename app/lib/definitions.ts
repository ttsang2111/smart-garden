export type Record = {
    action: 'lighting' | 'heating' | 'watering';
    date: string;
    status: 'success' | 'failure';
}