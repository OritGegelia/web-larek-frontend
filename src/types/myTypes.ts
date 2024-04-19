// Модальное окно
export interface IModal {
	сloseButton: HTMLButtonElement;
	_сontent: HTMLTemplateElement;
	open(): void;
	close(): void;
	render(): HTMLElement;
}

// Корзина
export interface IBasket {
	_list: HTMLElement;
	_total: HTMLElement;
	_button: HTMLButtonElement;
	items: ICard[];
}

// Интерфейс данных карточки
export interface ICard {
	id: string;
	title: string;
	price: number;
	description?: string;
	image?: string;
	category?: string;
	preview?: string;
	button?: HTMLButtonElement;
}

// Интерфейс страницы
export interface IPage {
	_cardList: HTMLElement;
	_basket: HTMLElement;
	_basket_counter: HTMLElement;
	_pageWrapper: HTMLElement;
}

// Данные для покупки

export interface IOrder {
	email: string;
	phone: string;
	address: string;
	payment: string;
	total: number;
	items: [];
}

// Апи Ларька
export interface ILarekApi {
	cdn: string;
	getProductList: () => Promise<ICard[]>;
	getProductItem: (id: string) => Promise<ICard>;
}

// Общий класс работы с данными
export interface IAppData {
	items: ICard[];
	catalog: ICard[];
	basket: ICard[];
	preview: null | string;
	order: IOrder;
	setItems(items: ICard[]): [];
	setPreview(item: ICard): void;
	addToBasket(item: ICard): [];
}
