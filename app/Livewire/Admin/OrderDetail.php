<?php

namespace App\Livewire\Admin;

use Livewire\Component;
use App\Models\Order;
use App\Models\OrderItem;
class OrderDetail extends Component
{
    public $order;
    public $customer_total_order = 0;
    public $order_items;
    public function mount($id){
        $this->order = Order::findOrFail($id);
        $this->order_items = OrderItem::where('order_id', $id)->get();
        if (!$this->order) {
            abort(404, 'Order details not found.');
        }
        $this->customer_total_order = Order::where('user_id', $this->order->user_id)->count();
    }
    public function render()
    {
        return view('livewire.admin.order-detail');
    }
}
