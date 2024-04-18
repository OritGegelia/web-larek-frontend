// Это будет файл для работы с карточками.
import { ICard } from '../types/myTypes';
import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';

interface IAction {
	onClick(event: MouseEvent): void;
}

export class Card<T> extends Component<ICard> {
	protected _id: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _description?: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _category?: HTMLElement;
	protected _button: HTMLButtonElement;

	protected _categoryColor = new Map<string, string>([
		['софт-скил', '_soft'],
		['другое', '_other'],
		['дополнительное', '_additional'],
		['кнопка', '_button'],
		['хард-скил', '_hard'],
	]);

	constructor(container: HTMLElement, action?: IAction) {
		super(container);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);

		this._category = container.querySelector(`.card__category`);
		this._image = container.querySelector(`.card__image`);
		this._description = container.querySelector(`.card__text`);
		this._button = container.querySelector(`.card__button`);

		if (action?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', action.onClick);
			} else {
				container.addEventListener('click', action.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}
	get id() {
		return this.container.dataset.id;
	}
	set title(value: string) {
		this.setText(this._title, value);
	}

	get title() {
		return this._title.textContent;
	}
	set price(value: string) {
		if (value) {
			this.setText(this._price, `${value} синапсов`);
		} else {
			this.setText(this._price, 'Бесценно');
		}

		if (this._button) {
			this._button.disabled = !value;
		}
	}

	get price() {
		return this._price.textContent;
	}
	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set category(value: string) {
		this.setText(this._category, value);
		this._category?.classList?.remove('card__category_soft');
		this._category?.classList?.remove('card__category_other');
		this._category?.classList?.add(
			`card__category${this._categoryColor.get(value)}`
		);
	}

	get category() {
		return this._category.textContent;
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set button(value: string) {
		this.setText(this._button, value);
	}
}

