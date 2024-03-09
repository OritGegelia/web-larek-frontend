import { ensureElement, createElement } from "../../utils/utils";
import { Component } from "../base/component";

export interface IBasket {
  items: HTMLElement
}

export class Basket extends Component<IBasket> {
  protected _list: HTMLElement
  protected _button: HTMLButtonElement

  constructor(container: HTMLElement) {
    super(container);

    this._list = ensureElement<HTMLElement>('')
  }

  set items(items: HTMLElement[]) {
    if (items.length) {
        this._list.replaceChildren(...items);
    } else {
        this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
            textContent: 'Корзина пуста'
        }));
    }
}
}