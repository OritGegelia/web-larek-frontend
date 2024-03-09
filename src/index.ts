import './scss/styles.scss';

import { LarekApi } from './components/larekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { AppData } from './components/AppData';
// проверь какой импорт в онотебенадо
import { Page } from './components/page';
import { Modal } from './components/common/modal';
// тут тоже проверь
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
// большой вопрос по Modal
import { Basket } from './components/common/bascet';
// возможно здесь понадобится что-то еще

// доступ к функциям апи и эмиттера
const events = new EventEmitter();
const api = new LarekApi(API_URL, CDN_URL);

// Темплейты

// const cardCatalog = ensureElement<HTMLElement>('#card-catalog');
// const cardPreview = ensureElement<HTMLElement>('#card-preview');
// const cardBasket = ensureElement<HTMLElement>('#card-basket');
// const basket = ensureElement<HTMLElement>('#basket');
// const order = ensureElement<HTMLElement>('#order');
// const contacts = ensureElement<HTMLElement>('#contacts');
// const success = ensureElement<HTMLElement>('#success');

// Глобальные контейнеры

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events)

const appData = new AppData(events);

api
	.getProductList()
	.then(appData.setItems.bind(appData))
  .then(products => {
    console.log(products);
    
  })
	.catch((err) => console.log(err));