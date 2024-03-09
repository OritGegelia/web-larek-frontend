// Модальное окно
interface Modal {
  modalCloseButton: HTMLElement;
  modalContent: HTMLElement;
  openModal(currentModal: string): void;
  closeModal(): void;
  changeModalContent(changeButton: HTMLButtonElement): HTMLElement;
}

// Данные для карточек
export interface ICard {
	id: string;
	description?: string;
	image?: string;
	title?: string;
	category?: string;
	price: number;
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

interface User {
	address: string;
	email: string;
	phoneNumber: string | number;
  payType: Boolean;
}


// Корзина
interface Basket  {
  changeButtonCondition(): void;
  sendOrderData(userData: User[]): void;
  paymentSum(price: number): number;
}
