import './scss/styles.scss';

import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/Events';
import { AppData } from './components/AppData';
import { Page } from './components/Page';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ICard, IOrder, IContact } from './types/myTypes';
import { Card } from './components/Card';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { PaymentForm } from './components/Payment';
import { ContactsForm } from './components/Order';
import { Success } from './components/Success';

// доступ к функциям апи и эмиттера
const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

// Темплейты

const cardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

const order = ensureElement<HTMLTemplateElement>('#order');
const contacts = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const modalContent = ensureElement<HTMLElement>('#modal-container');


// Глобальные контейнеры
const data = {};
const page = new Page(document.body, events);
const appData = new AppData(data, events);
const modal = new Modal(modalContent, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const paymentForm = new PaymentForm(cloneTemplate(order), events);
const contactsForm = new ContactsForm(cloneTemplate(contacts), events)

// Отслеживаем ввсе собыития
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Отрисовка карточек на сраницу

events.on('items:change', (items: ICard[]) => {
	page.productList = items.map((item) => {
		const card = new Card(cloneTemplate(cardCatalog), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render(item);
	});
});

//  Добавить товар в корзину

events.on('item:add', (item: ICard) => {
	appData.addToBasket(item);
	modal.close();
});

// Удалить товар из корзины

events.on('item:remove', (item: ICard) => {
	appData.removeItem(item.id);
	modal.render({
		content: basket.render({
			items: appData.basket,
			total: appData.getTotal(),
		}),
	});
});

//Открытие корзины

events.on('basket:open', (items: HTMLElement[]) => {
	modal.render({
		content: basket.render({
			items: appData.basket,
			total: appData.getTotal(),
		}),
	});
});

// Изменение корзины

events.on('basketList:changed', (items: ICard[]) => {
	page.counter = Object.keys(items).length;
	appData.basket = items;
});

//Получить данные для превью

events.on('card:select', (item: ICard) => {
	appData.setPreview(item);
});

// Переход к оформлению заказа

events.on('order:open', () => {
	modal.render({
		content: paymentForm.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

// Выбор способа оплаты

events.on('paymentMethod:changed', (paymentType: HTMLButtonElement) => {
	paymentForm.setPaymentButton(paymentType.name)
})

// Переход к заполнению контактных данных при оформлении заказа

events.on('contacts:open', () => {
	modal.render({ content: contactsForm.render({
		email: '',
		phone: '',
		valid: false,
		errors: [],
	}) });
});

events.on('contacts:submit', () => {
	appData.setOrderData();
	api
		.sendOrder(appData.order)
		.then(() => {
			const success = new Success(
				cloneTemplate(successTemplate),
				{
					onClick: () => {
						modal.close();
						appData.clearOrder();
					},
				},
				appData.getTotal()
			);

			modal.render({
				content: success.render({}),
			});

			paymentForm.setPaymentButton('');
			appData.clearOrder();
		})
		.catch((err) => {
			console.error(err);
		});
});

// Изменение товара в модальном окне

events.on('preview:changed', (item: ICard) => {
	const card = new Card(cloneTemplate(cardPreview), {
		onClick: () => events.emit('item:add', item),
	});
	const showCard = (item: ICard) => {
		modal.render({
			content: card.render({
				image: item.image,
				category: item.category,
				title: item.title,
				description: item.description,
				price: item.price,
			}),
		});
	};

	if (appData.isItemSelected(item)) {
		card.setDisabled(card._button, true)
		card.markAsSelected()
	} else {
		card.setDisabled(card._button, false)
	}

	if (item) {
		api
			.getProductItem(item.id)
			.then((result) => {
				item.description = result.description;
				showCard(item);
			})
			.catch((err) => {
				console.error(err);
			});
	} else {
		modal.close();
	}
});

// Обрабатывает изменения в ошибках

events.on('formErrors:change', (errors: Partial<IOrder>) => {
	const { email, phone, address, payment } = errors;
	paymentForm.valid = !address && !payment;
	contactsForm.valid = !email && !phone;
	paymentForm.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
	contactsForm.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});


// Обработка данных

events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IContact; value: string }) => {
		appData.setContacts(data.field, data.value);
	}
);

events.on(/^order\..*:change/, (data: { value: string }) => {
	appData.setAddress(data.value);
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

// Получили массив карточек с сервера

api
	.getProductList()
	.then(appData.setItems.bind(appData))
	.catch((err) => console.log(err));

	
