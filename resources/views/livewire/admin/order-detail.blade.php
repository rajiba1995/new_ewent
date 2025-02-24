<div class="row mb-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 gap-3">
        <div class="d-flex flex-column justify-content-center">
          <div class="d-flex align-items-center mb-1">
            <h5 class="mb-0">Order #{{$order->order_number}}</h5>
            <span class="badge bg-label-success me-2 ms-2 rounded-pill">{{ucwords($order->payment_status)}}</span>
            <span class="badge bg-label-info rounded-pill">{{$order->status}}</span>
          </div>
          <p class="mt-1 mb-3">{{ \Carbon\Carbon::parse($order->created_at)->format('M d, Y, h:i A') }}</p>
        
        </div>
        <div class="d-flex align-content-center flex-wrap gap-2">
            <a class="btn btn-dark btn-sm" href="{{route('admin.order.list')}}" role="button">
                <i class="ri-arrow-go-back-line ri-16px me-0 me-sm-2 align-baseline"></i>
                Back
            </a>
        </div>
    </div>
    <div class="col-lg-12 col-md-6 mb-md-0 mb-4">
        <div class="row">
            @if(session()->has('message'))
                <div class="alert alert-success" id="flashMessage">
                    {{ session('message') }}
                </div>
            @endif
            
            @if(session()->has('error'))
                <div class="alert alert-danger" id="flashMessage">
                    {{ session('error') }}
                </div>
            @endif
        </div>
    </div>
    <div class="col-lg-8 col-md-12 mb-md-0 mb-4">
        <div class="row">
            <div class="col-12">
                <div class="card my-4">
                    <div class="card-header pb-0">
                        <div class="row">
                            @if(session()->has('message'))
                                <div class="alert alert-success" id="flashMessage">
                                    {{ session('message') }}
                                </div>
                            @endif
                            
                            @if(session()->has('error'))
                                <div class="alert alert-danger">
                                    {{ session('error') }}
                                </div>
                            @endif
                        </div>
                    </div>
                    <div class="card-body px-0 pb-2 mt-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center mb-0 product-list">
                                <thead>
                                    <tr>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">
                                            SL No
                                        </th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">
                                            products
                                        </th>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">
                                            price
                                        </th>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle" width="25%">
                                            qty
                                        </th>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">
                                            total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($order_items as $k=>$item)
                                        <tr>
                                            <td class="align-middle text-center">{{$k+1}}</td>
                                            <td class="sorting_1">
                                                @if($item->product)
                                                <a href="{{route('admin.product.update', $item->product->id)}}">
                                                    <div class="d-flex justify-content-start align-items-center product-name">
                                                        <div class="avatar-wrapper me-3">
                                                            <div class="avatar avatar-sm rounded-2 bg-label-secondary"><img
                                                                    src="{{asset($item->product->image)}}"
                                                                    alt="product-Wooden Chair" class="rounded-2"></div>
                                                        </div>
                                                        <div class="d-flex flex-column">
                                                            <span class="text-nowrap text-heading fw-medium">{{$item->product->title}}</span>
                                                            <small
                                                                class="text-truncate d-none d-sm-block">{{$item->product->types}}</small></div>
                                                    </div>
                                                </a>
                                                @else
                                                    N/A
                                                @endif
                                            </td>
                                            <td class="align-middle text-center">
                                                {{env('APP_CURRENCY')}}{{$item->price}}
                                            </td>
                                            <td class="align-middle text-center">
                                                {{$item->quantity}}
                                            </td>
                                            <td class="align-middle text-center">
                                                {{env('APP_CURRENCY')}}{{$item->total_price}}
                                            </td>
                                        </tr>
                                    @endforeach
                                    @if($order->offer_id)
                                        <tr>
                                            <td colspan="3" class="text-end">
                                                <span class="w-px-100 text-heading">Applied Coupon:</span>
                                            </td>
                                            <td colspan="2" class="text-end">
                                                <a href="{{route('admin.offer.list')}}">
                                                <h6 class="mb-0">
                                                    <span class="badge bg-label-success">{{$order->offer->coupon_code}}</span>
                                                </h6></a>
                                            </td>
                                        </tr>
                                    @endif
                                </tbody>
                            </table>
                            <div class="d-flex justify-content-end align-items-center m-4 p-1 mb-0 pb-0">
                                <div class="order-calculations">
                                    <div class="d-flex justify-content-start gap-4 mb-2">
                                        <span class="w-px-100 text-heading">Subtotal:</span>
                                        <h6 class="mb-0">{{env('APP_CURRENCY')}}{{$order->total_price}}</h6>
                                    </div>
                                    @if($order->offer_id)
                                    <div class="d-flex justify-content-start gap-4 mb-2">
                                        <span class="w-px-100 text-heading">Discount:</span>
                                        <h6 class="mb-0">{{env('APP_CURRENCY')}}{{$order->discount_amount}}</h6>
                                    </div>
                                    @endif
                                    <div class="d-flex justify-content-start gap-4">
                                        <h6 class="w-px-100 mb-0">Total:</h6>
                                        <h6 class="mb-0">{{env('APP_CURRENCY')}}{{$order->final_amount}}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card mb-6">
                    <div class="card-header">
                        <h5 class="card-title m-0">Bike Ride Activity</h5>
                    </div>
                    <div class="card-body mt-3">
                        <ul class="timeline pb-0 mb-0">
                            @foreach($activities as $activity)
                                @php
                                    // Define status colors
                                    $statusColors = [
                                        'Ride Booked' => 'warning',
                                        'Payment Received' => 'success',
                                        'Ride Canceled' => 'danger',
                                        'Vehicle Assigned' => 'info',
                                        'Ride Started' => 'primary',
                                        'Ride Completed' => 'success',
                                    ];
                                    
                                    $color = $statusColors[$activity->status] ?? 'secondary';
                                @endphp
                                
                                <li class="timeline-item timeline-item-transparent border-{{ $color }}">
                                    <span class="timeline-point timeline-point-{{ $color }}"></span>
                                    <div class="timeline-event">
                                        <div class="timeline-header mb-1">
                                            <h6 class="mb-0">{{ $activity->status }} 
                                                @if($activity->status == 'Ride Booked') (Order ID: #{{ $activity->order->order_number }}) @endif
                                                @if($activity->status == 'Vehicle Assigned') (Vehicle No: {{ $activity->vehicle->vehicle_number }}) @endif
                                            </h6>
                                            <small class="text-muted">{{ $activity->created_at->format('l, d M Y h:i A') }}</small>
                                        </div>
                                        <p class="mt-1 mb-3">{{ $activity->description ?? 'No additional details.' }}</p>
                                    </div>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">Update Ride Status</h5>
                        </div>
                        <div class="card-body">
                            @if (session()->has('status_success'))
                                <div class="alert alert-success">{{ session('status_success') }}</div>
                            @endif
                            @if (session()->has('status_error'))
                                <div class="alert alert-danger">{{ session('status_error') }}</div>
                            @endif
                    
                            <form wire:submit.prevent="updateStatus">
                                <div class="mb-3">
                                    <label for="status" class="form-label">Select Status</label>
                                    <select id="status" class="form-control " wire:model="status">
                                        <option value="">-- Select Status --</option>
                                        {{-- <option value="Ride Booked">Ride Booked</option>
                                        <option value="Payment Received">Payment Received</option> --}}
                                        <option value="Ride Canceled">Ride Canceled</option>
                                        <option value="Vehicle Assigned">Vehicle Assigned</option>
                                        <option value="Ride Started">Ride Started</option>
                                        <option value="Ride Completed">Ride Completed</option>
                                    </select>
                                    @error('status') <span class="text-danger">{{ $message }}</span> @enderror
                                </div>
                                {{-- <div class="mb-3">
                                    <label for="rideId" class="form-label">Ride ID</label>
                                    <input type="text" id="rideId" class="form-control" wire:model="rideId" placeholder="Enter Ride ID">
                                    @error('rideId') <span class="text-danger">{{ $message }}</span> @enderror
                                </div> --}}
                    
                                <div class="text-end">
                                    <button type="submit" class="btn btn-primary">Update Status</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
    </div>
    <div class="col-lg-4 col-md-12 mb-md-0 mb-4">
        <div class="row">
            <div class="col-12">
                <div class="card my-4">
                    <div class="card-body pb-2 mt-2">
                        <h5 class="card-title mb-6">Customer Details</h5>
                        <div class="d-flex justify-content-start align-items-center mb-6">
                            <div class="avatar me-3">
                              <img
                                src="{{ $order->user->image ? asset($order->user->image) : asset('assets/img/profile-image.webp') }}"
                                alt="Avatar" class="rounded-circle">
                            </div>
                            <div class="d-flex flex-column">
                              <a
                                href="{{route('admin.customer.details', $order->user_id)}}">
                                <h6 class="mb-0">{{$order->user?$order->user->name:"N/A"}}</h6>
                              </a>
                              <span>Customer ID: #{{$order->user?$order->user->customer_id:"N/A"}}</span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-start align-items-center mb-6">
                            <span class="avatar rounded-circle bg-label-success me-3 d-flex align-items-center justify-content-center"><i
                                class="ri-shopping-cart-line ri-24px"></i></span>
                            <h6 class="text-nowrap mb-0">{{$customer_total_order}} Orders</h6>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6 class="mb-1">Contact info</h6>
                        </div>
                        <p class="mb-1">Email: {{$order->user->email}}</p>
                        <p class="mb-0">Mobile: {{env('APP_COUNTRY_CODE')}} {{$order->user->mobile}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

    {{-- Modal --}}

    <div class="loader-container" wire:loading>
      <div class="loader"></div>
    </div>
</div>