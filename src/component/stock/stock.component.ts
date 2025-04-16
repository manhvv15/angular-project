import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from '../../types/stock';
import { StockService } from '../../service/StockService';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  stocks: Stock[] = [];
  stockForm: FormGroup;
  isEditing: boolean = false;
  isCreating: boolean = false;
  currentStockId: string | null = null;

  constructor(
    private stockService: StockService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.stockForm = new FormGroup({
      symbol: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      companyName: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      purchase: new FormControl(0, [Validators.required, Validators.min(0)]),
      lastDiv: new FormControl(0),
      industry: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      marketCap: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadStocks();

    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.currentStockId = id;
        this.loadStock(id);
      }
    });
  }

  loadStocks() {
    this.stockService.getStocks().then(
      (response) => {
        if (response && response.data.items) {
          this.stocks = response.data.items;
        }
      },
      (error) => {
        console.error('Error loading stocks:', error);
      }
    );
  }

  loadStock(id: string) {
    this.stockService.getStock(id).then(
      (response) => {
        const data = response.data;
        this.currentStockId = id;
        this.isEditing = true;
        this.isCreating = false;
        this.stockForm.setValue({
          symbol: data.symbol,
          companyName: data.companyName,
          purchase: data.purchase,
          lastDiv: data.lastDiv,
          industry: data.industry,
          marketCap: data.marketCap,
        });
      },
      (error) => {
        console.error('Error loading stock:', error);
      }
    );
  }

  onEdit(id: string) {
    this.router.navigate([`/stocks/${id}`]);
  }

  onSubmit() {
    if (this.stockForm.valid) {
      if (this.isEditing && this.currentStockId) {
        this.stockService
          .updateStock({ ...this.stockForm.value, id: this.currentStockId })
          .then(
            (response) => {
              console.log('Stock updated successfully', response);
              this.router.navigate(['/stocks']);
              this.isEditing = false;
              this.loadStocks();
            },
            (error) => {
              console.error('Error updating stock', error);
            }
          );
      } else {
        this.stockService.createStock(this.stockForm.value).then(
          (response) => {
            console.log('Stock created successfully', response);
            this.router.navigate(['/stocks']);
            this.isCreating = false;
            this.loadStocks();
          },
          (error) => {
            console.error('Error creating stock', error);
          }
        );
      }
    }
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this stock?')) {
      this.stockService.deleteStock(id).then(
        (response) => {
          console.log('Stock deleted successfully', response);
          this.loadStocks();
        },
        (error) => {
          console.error('Error deleting stock:', error);
        }
      );
    }
  }

  onCreate() {
    this.isCreating = true;
    this.isEditing = false;
  }

  onCancel() {
    this.isCreating = false;
    this.isEditing = false;
  }
}
