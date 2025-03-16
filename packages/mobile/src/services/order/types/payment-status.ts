export enum PaymentStatus {
	PENDING = 'PENDING',
	COMPLETE = 'COMPLETE',
	FAILED = 'FAILED',
}

export const RENDER_PAYMENT_STATUS = Object.freeze({
	[PaymentStatus.PENDING]: 'Pending',
	[PaymentStatus.COMPLETE]: 'Success',
	[PaymentStatus.FAILED]: 'Failed',
});
