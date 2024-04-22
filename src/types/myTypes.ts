// Типы

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export type OrderResult = Pick<IOrder, 'total'> & {
	id: string;
};

// Модальное окно
export interface IModal {
	content: HTMLElement;
}

// Корзина
export interface IBasket {
	total: number;
	items: ICard[];
}

// Карточка в корзине

export interface IBasketItem {
	counter: number;
	title: string;
	price: number;
}

// Действия на клик

export interface IAction {
	onClick(event: MouseEvent): void;
}

// Интерфейс данных карточки
export interface ICard {
	id: string;
	title: string;
	price: number | null;
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

// Работа с полями заказа

export interface IOrder extends IContact, IPayment {
	total: number;
	items: string[];
}

// Контактные данные
export interface IContact {
	email: string;
	phone: string;
}

// Оплата

export interface IPayment {
	payment: string;
	address: string;
}

// Апи Ларька
export interface ILarekApi {
	cdn: string;
	getProductList: () => Promise<ICard[]>;
	getProductItem: (id: string) => Promise<ICard>;
}

// Общий класс работы с формами
export interface IForm {
	valid: boolean;
	errors: string[];
}

// Завершение покупки

export interface ISuccess {
	totalPrice: number;
}

// Действия в последней модалке

export interface ISuccessActions {
	onClick: () => void;
}