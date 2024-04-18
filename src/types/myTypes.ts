// Модальное окно
export interface IModal {
  modalCloseButton: HTMLButtonElement;
  modalContent: HTMLTemplateElement;
  openModal(currentModal: string): void;
  closeModal(): void;
  changeModalContent(changeButton: HTMLButtonElement): HTMLElement;
}

// Данные для карточек
export interface ICard {
	id: string;
	title: string;
	price: number;
	description?: string;
	image?: string;
	category?: string;
	preview?: string;
}

// Интерфейс карточки

export interface CardList {
	cards: ICard[];
	addCards(): void;
	deleteCard(cardID: string): void;
	showCard(card: ICard): void;
    addCardToBasket(currentCard: ICard): HTMLElement;
	createCard(newCard: ICard): HTMLElement;
}

// Данные для покупки

export interface IOrder {
		email: string,
		phone: string,
		address: string,
		payment: string,
		total: number,
		items: [],
 };


// Корзина
interface Basket  {
  changeButtonCondition(): void;
  sendOrderData(userData: IOrder[]): void;
  paymentSum(price: number): number;
}
