import { Injectable } from '@angular/core';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [
    {id: 'p01', name: 'name 1', price: 100.50, photo: 'bolt.jpg'},
    {id: 'p02', name: 'name 2', price: 200.25, photo: 'paint.jpg'},
    {id: 'p03', name: 'name 3', price: 300, photo: 'cup.jpg'},
  ];

  getAll(): Product[] {
    return this.products;
  }

  getById(id: string): Product {
    return this.products.find(p => p.id === id);
  }

}
