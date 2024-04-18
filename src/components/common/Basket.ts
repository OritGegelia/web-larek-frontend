import { ensureElement, createElement, cloneTemplate } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export interface IBasket {
	items: HTMLElement[];
	total: number;
}

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;
	

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container); 
		this._list = ensureElement<HTMLElement>('.basket__list');
		this._button = this.container.querySelector('.basket__button')
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}
}
