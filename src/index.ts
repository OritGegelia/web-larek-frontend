import './scss/styles.scss';

// Модальное окно
interface Modal {
  modalCloseButton: HTMLButtonElement;
  modalContent: HTMLElement;
  openModal(currentModal: string): void;
  closeModal(): void;
  changeModalContent(currentButton: HTMLElement): HTMLElement;
}

// Данные для карточек
interface Card {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

// Интерфейс карточки

interface CardList {
	cards: Card[];
	addCard(newCard: Card): HTMLElement;
  addCardToBasket(currentCard: Card): HTMLElement;
	deleteCard(cardID: string): void;
	initializeCards(initialCards: Card[]): void;
	showCard(card: Card): void;
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
