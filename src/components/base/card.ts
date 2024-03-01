interface IProduct {
  productName: string;
  price: number | string | null;
	image?: HTMLImageElement;
	cathegory?: string;
	description?: string;
	buyButton?: HTMLButtonElement;
	deleteButton?: HTMLButtonElement;
}

class Product {
  _productName: string;
  _price: number | string | null;
	_image?: HTMLImageElement;
	_category?: string;
	_description?: string;
	_buyButton?: HTMLButtonElement;
	_deleteButton?: HTMLButtonElement;

  constructor (productName: string, price: number | string | null, category: string, description: string ) {
  this._productName = productName;
  this._price = price
	this._category = category
	this._description = description
  }


  getData(data: any) {
    this._productName = data.title
    this._price = data.price
    this._category = data.category
	  this._description = data.description
  }
}
