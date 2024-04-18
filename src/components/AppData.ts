import { ICard, IOrder } from '../types/myTypes';
import { Model } from './base/Model';
import { IBasket } from './common/Basket';

export class AppData extends Model<ICard> {
	items: ICard[] = [];
	catalog: ICard[] = []
	basket: ICard[] = []

	preview: null| string;

	order: IOrder = {
		email: '',
		phone: '',
		address: '',
		payment: 'card',
		total: 0,
		items: [],
	};

	setItems(items: ICard[]) {
		this.items = items;
		this.events.emit('items:change', this.items);
		return this.items;
	}

	setPreview(item:ICard) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	addToBasket(item: ICard) {
		if (this.basket.includes(item)) return;
		this.basket.push(item);
		this.emitChanges('basketList:changed', this.basket);
	}

	getBasket() {
		 return this.basket;
	}

}
