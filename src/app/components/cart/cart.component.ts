import { Component, OnInit } from '@angular/core';
import {Item} from '../../models/item.model';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  items: Item[] = [];
  total = 0;

  constructor(
    private route: ActivatedRoute,
    private pdService: ProductService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id;

      if (id) {
        const item: Item = {
          product: this.pdService.getById(id),
          quantity: 1
        };

        if (localStorage.getItem('cart') === null) {
          const cart: string[] = [];
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          const cart: string[] = JSON.parse(localStorage.getItem('cart'));
          const index = cart.findIndex(itemStr => JSON.parse(itemStr).product.id === id);

          if (index === -1) {
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
            const existingItem: Item = JSON.parse(cart[index]);
            existingItem.quantity += 1;
            cart[index] = JSON.stringify(existingItem);
            localStorage.setItem('cart', JSON.stringify(cart));
          }
        }

        this.loadCart();

      } else {
        this.loadCart();
      }
    });
  }

  loadCart(): void {
    this.total = 0;
    this.items = [];
    const cart: string[] = JSON.parse(localStorage.getItem('cart'));

    cart.forEach(itemStr => {
      const item: Item = JSON.parse(itemStr);
      this.items.push(item);
      this.total += item.product.price * item.quantity;
    });
  }

  remove(id: string): void {
    const cart: string[] = JSON.parse(localStorage.getItem('cart'));

    const index = cart.findIndex(itemStr => JSON.parse(itemStr).product.id === id);
    cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
  }

}
