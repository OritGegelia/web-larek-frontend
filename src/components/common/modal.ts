import { Component} from "../base/Component"
import { IModal} from "../../types/myTypes";
import {IEvents} from "../base/Events";
import {ensureElement} from "../../utils/utils";

interface IModalData {
    content: HTMLElement;
}
export class Modal extends Component<IModalData> {

    closeButton: HTMLButtonElement;
    _content: HTMLElement;

    constructor (container: HTMLElement, protected events: IEvents) {
        super(container);

        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container)

        this.closeButton.addEventListener('click', this.close.bind(this))
        this.container.addEventListener('click', this.close.bind(this))
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    close() {
        this.container.classList.remove('modal_active');
        this.content = null;
        this.events.emit('modal:close');
    }

    render(data: IModalData): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}