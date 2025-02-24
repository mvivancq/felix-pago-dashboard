export interface Row {
    transaction_id: string;
    sender_whatsapp: string;
    receiver_whatsapp: string;
    amount_sent: number;
    exchange_rate: number;
    amount_received: number;
    status: string;
    payment_method: string;
    date: Date;
    currency: string;
}