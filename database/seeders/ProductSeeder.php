<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Beverages', 'description' => 'Drinks and beverage products'],
            ['name' => 'Breakfast', 'description' => 'Breakfast cereals and products'],
            ['name' => 'Confectionery', 'description' => 'Chocolates and sweets'],
            ['name' => 'Baby Food', 'description' => 'Baby nutrition products'],
            ['name' => 'Dairy', 'description' => 'Dairy and creamer products'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        $products = [
            [
                'name' => 'Nestlé Milo Powder 3kg',
                'description' => 'Malted chocolate drink mix rich in iron and calcium',
                'price' => 45.00,
                'image_url' => 'https://via.placeholder.com/400x400/00447C/ffffff?text=Milo+3kg',
                'category_id' => 1,
                'stock_quantity' => 50,
            ],
            [
                'name' => 'Nestlé Pure Life Water 500ml',
                'description' => 'Pure drinking water in convenient 500ml bottles (24 pack)',
                'price' => 12.00,
                'image_url' => 'https://via.placeholder.com/400x400/00447C/ffffff?text=Pure+Life+500ml',
                'category_id' => 1,
                'stock_quantity' => 100,
            ],
            [
                'name' => 'Nestlé Coffee Mate 1.5kg',
                'description' => 'Original creamer powder for coffee lovers',
                'price' => 38.00,
                'image_url' => 'https://via.placeholder.com/400x400/00447C/ffffff?text=Coffee+Mate+1.5kg',
                'category_id' => 5,
                'stock_quantity' => 30,
            ],
            [
                'name' => 'Nestlé Cerelac Wheat 400g',
                'description' => 'Iron-fortified infant cereal with wheat',
                'price' => 22.00,
                'image_url' => 'https://via.placeholder.com/400x400/00447C/ffffff?text=Cerelac+Wheat',
                'category_id' => 4,
                'stock_quantity' => 45,
            ],
            [
                'name' => 'Nestlé KitKat Bar 45g',
                'description' => 'Crispy wafer fingers covered in milk chocolate',
                'price' => 8.00,
                'image_url' => 'https://via.placeholder.com/400x400/00447C/ffffff?text=KitKat+Bar',
                'category_id' => 3,
                'stock_quantity' => 200,
            ],
            [
                'name' => 'Nestlé Nescafé Gold 200g',
                'description' => 'Premium instant coffee with rich aroma',
                'price' => 35.00,
                'image_url' => 'https://via.placeholder.com/400x400/00447C/ffffff?text=Nescafe+Gold',
                'category_id' => 1,
                'stock_quantity' => 60,
            ],
            [
                'name' => 'Nestlé Koko Krunch 330g',
                'description' => 'Chocolate flavored corn cereal',
                'price' => 18.00,
                'image_url' => 'https://via.placeholder.com/400x400/00447C/ffffff?text=Koko+Krunch',
                'category_id' => 2,
                'stock_quantity' => 75,
            ],
            [
                'name' => 'Nestlé Nido Fortified Milk 1.8kg',
                'description' => 'Whole milk powder with vitamins and minerals',
                'price' => 52.00,
                'image_url' => 'https://via.placeholder.com/400x400/00447C/ffffff?text=Nido+1.8kg',
                'category_id' => 5,
                'stock_quantity' => 25,
            ],
            [
                'name' => 'Nestlé Maggi 2-Minute Noodles',
                'description' => 'Instant noodles masala flavor (pack of 12)',
                'price' => 28.00,
                'image_url' => 'https://via.placeholder.com/400x400/00447C/ffffff?text=Maggi+Noodles',
                'category_id' => 1,
                'stock_quantity' => 8,
            ],
            [
                'name' => 'Nestlé Smarties 45g',
                'description' => 'Colorful chocolate candies in crispy shell',
                'price' => 6.00,
                'image_url' => 'https://via.placeholder.com/400x400/00447C/ffffff?text=Smarties',
                'category_id' => 3,
                'stock_quantity' => 150,
            ],
            [
                'name' => 'Nestlé Lactogen 1 400g',
                'description' => 'Infant formula for 0-6 months',
                'price' => 42.00,
                'image_url' => 'https://via.placeholder.com/400x400/00447C/ffffff?text=Lactogen+1',
                'category_id' => 4,
                'stock_quantity' => 0,
            ],
            [
                'name' => 'Nestlé Nescafé Classic 50g',
                'description' => 'Classic instant coffee for everyday enjoyment',
                'price' => 15.00,
                'image_url' => 'https://via.placeholder.com/400x400/00447C/ffffff?text=Nescafe+Classic',
                'category_id' => 1,
                'stock_quantity' => 90,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
