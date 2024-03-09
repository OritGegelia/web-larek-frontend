import { ICard } from "../types/myTypes";
import { IEvents } from "./base/events";
import { IBasket } from "./common/bascet";


export class AppData {
	items: ICard[] = [];
	// basket: IBasket = {
	// 	items: [],
	// 	total: 0,
	// };
	preview: ICard = null;
	// order: IOrder = {
	// 	email: '',
	// 	phone: '',
	// 	address: '',
	// 	payment: 'card',
	// 	total: 0,
	// 	items: [],
	// };

	constructor(protected events: IEvents) {}

	setItems(items: ICard[]) {
		this.items = items;
		this.events.emit('items:change', this.items);
	}
}