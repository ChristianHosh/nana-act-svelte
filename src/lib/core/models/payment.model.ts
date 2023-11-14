export interface Payment {
    creationTimestamp: number;
    updateTimestamp: number;
    id: number;
    amount: number;
    fullyPaid: boolean;
}