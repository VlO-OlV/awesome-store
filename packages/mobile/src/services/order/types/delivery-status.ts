export enum DeliveryStatus {
	PENDING = 'PENDING',
	IN_TRANSIT = 'IN_TRANSIT',
	DELIVERED = 'DELIVERED',
}

export const RENDER_DELIVERY_STATUS = Object.freeze({
	[DeliveryStatus.IN_TRANSIT]: 'In transit',
	[DeliveryStatus.DELIVERED]: 'Delivered',
	[DeliveryStatus.PENDING]: 'Pending',
});
