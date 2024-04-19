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

