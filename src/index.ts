import './scss/styles.scss';

import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/Events';
import { AppData } from './components/AppData';
import { Page } from './components/Page';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { ICard } from './types/myTypes';
import { Card } from './components/Card';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';

// доступ к функциям апи и эмиттера
const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

// Темплейты

const cardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

const order = ensureElement<HTMLElement>('#order');
const contacts = ensureElement<HTMLElement>('#contacts');
const success = ensureElement<HTMLElement>('#success');
const modalContent = ensureElement<HTMLElement>('#modal-container');
const test = ensureElement<HTMLElement>('.basket');

// Глобальные контейнеры
const data = {};
const page = new Page(document.body, events);
const appData = new AppData(data, events);
const modal = new Modal(modalContent, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);

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
	appData.addToBasket(item)	
	modal.close()
})

//Открытие корзины

events.on('basket:open', (items: HTMLElement[]) => {
	console.log(`I'm appData.basket`);
	console.log(appData.basket);
	
		
	modal.render({ content: basket.render(
  {items: appData.basket} 
	)});
});


// Изменение корзины

events.on('basketList:changed', (items: ICard[]) => {

	const basketList = ensureElement<HTMLElement>('.basket__list')

	basket.items = items.map((item) => {
		const card = new Card(cloneTemplate(cardBasket))
		
		return card.render({
						title: item.title,
						price: item.price
					})
	})

	console.log(`I'm your basket.items:`);
	
	console.log(basket.items);
	
 
	// basket.items.forEach((item) => {
	// 	basketList.appendChild(item)
	// })
})



//Зщлучить данные для превью

events.on('card:select', (item: ICard) => {
	appData.setPreview(item);
});

// Изменение товара в модальном окне

events.on('preview:changed', (item: ICard) => {
	const showCard = (item: ICard) => {
		const card = new Card(cloneTemplate(cardPreview), {
			onClick: () => events.emit('item:add', item),
		});
		modal.render({ content: card.render({
			image: item.image,
			category: item.category,
			title: item.title,
			description: item.description,
			price: item.price
		}) 
	});
	};

	if (item) {
		api.getProductItem(item.id)
				.then((result) => {
						item.description = result.description;
						showCard(item);
				})
				.catch((err) => {
						console.error(err);
				})
} else {
		modal.close();
}
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

api
	.getProductList()
	.then(appData.setItems.bind(appData))
	.catch((err) => console.log(err));
