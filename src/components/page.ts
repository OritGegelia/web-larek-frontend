import { Component } from './base/component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

interface IPage {
	productList: HTMLElement[];
	basket: HTMLElement;
}

export class Page extends Component<IPage> {
	protected _productList: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._productList = ensureElement<HTMLElement>('.gallery');
		// this._basket = ensureElement<HTMLElement>('');
	}

	set productList(items: HTMLElement[]) {
		this._productList.replaceChildren(...items);
	}
}
