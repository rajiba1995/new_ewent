<?php

namespace App\Livewire\Admin;

use Livewire\Component;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderItemReturn;

class OrderIndex extends Component
{
    public $search = '';
    public $data = [];
    public $orders;
    public function mount(){
        $this->data = [
            'pending_orders' => Order::where('status', 'pending')->count(),

            'completed_orders' => Order::where('status', 'completed')->count(),

            'rented_orders' => Order::where('order_type', 'Rent')->count(),

            'sell_orders' => Order::where('order_type', 'Sell')->count(),
            'order_types' => Order::select('order_type')->get()->toArray(),
        ];
    }
    public function render()
    {
        $this->orders = Order::query()
            ->when($this->search, function ($query) {
                $query->where(function ($query) {
                    $query->where('order_type', 'like', '%' . $this->search . '%')
                        ->orWhere('order_number', 'like', '%' . $this->search . '%')
                        ->orWhere('total_price', 'like', '%' . $this->search . '%')
                        ->orWhere('shipping_address', 'like', '%' . $this->search . '%')
                        ->orWhere('rent_duration', 'like', '%' . $this->search . '%');
                })
                ->orWhereHas('user', function ($query) {
                    $query->where('customer_id', 'like', '%' . $this->search . '%')
                        ->orWhere('name', 'like', '%' . $this->search . '%')
                        ->orWhere('email', 'like', '%' . $this->search . '%')
                        ->orWhere('mobile', 'like', '%' . $this->search . '%');
                });
            })->with(['user'])
            ->get();
        return view('livewire.admin.order-index', [
            'orders' => $this->orders
        ]);
    }
}
