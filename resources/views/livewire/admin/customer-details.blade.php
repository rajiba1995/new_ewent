<div class="row mb-4">
  <style>
    .avatar {
        position: relative;
        width: 1.5rem !important;
        height: 1.5rem !important;
        cursor: pointer;
    }
  </style>
    <div class="col-lg-12 col-md-6 mb-md-0 mb-4">
        <div class="row gx-4 mb-4">
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">Customer Details</h5>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
              <div class="nav-wrapper position-relative end text-end">
                <!-- Back Button -->
                <a class="btn btn-dark btn-sm" href="javascript:history.back();" role="button">
                  <i class="ri-arrow-go-back-line ri-16px me-0 me-sm-2 align-baseline"></i>
                  Back
                </a>
                 <button wire:click="exportAll" class="btn btn-primary btn-sm">
                  <i class="ri-download-line"></i> Export
                </button>
              </div>
            </div>
        </div>
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
        <div class="row" style="font-size: 11px !important;">
            <div class="col-3">
                <div class="card">
                    <div class="card-body">
                        <div class="customer-avatar-section">
                            <div class="d-flex align-items-center flex-column">
                              <img class="img-fluid rounded mb-4"
                                src="{{ $user->image?asset($user->image):asset('assets/img/profile-image.webp') }}"
                                height="85" width="85" alt="User avatar">
                              <div class="customer-info text-center mb-6">
                                <h6 class="mb-0">{{$user->name}}</h6>
                                 <span class="text-primary">{{$user->email}}</span> <br>
                                {{-- <span>Customer ID #{{$user->customer_id??'TEST00001'}}</span> --}}
                              </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-around flex-wrap mb-6 gap-0 gap-md-3 gap-lg-4">
                            <div class="d-flex align-items-center gap-4 me-5">
                              <div class="avatar">
                                <div class="avatar-initial rounded bg-label-primary"><i class="ri-shopping-cart-line"></i>
                                </div>
                              </div>
                              <div>
                                <h5 class="mb-0">{{$customer_total_order}}</h5>
                                <span>Rides</span>
                              </div>
                            </div>
                            <div class="d-flex align-items-center gap-4">
                              <div class="avatar">
                                <div class="avatar-initial rounded bg-label-primary"><i class="ri-money-rupee-circle-line ri-24px"></i>
                                </div>
                              </div>
                              <div>
                                <h5 class="mb-0"> {{ env('APP_CURRENCY', '₹') }}{{ number_format($total_payment_amount) }}</h5>
                                <span>Spent</span>
                              </div>
                            </div>
                        </div>

                        <div class="info-container">
                            <h5 class="border-bottom text-capitalize pb-4 mt-6 mb-4"></h5>
                            <ul class="list-unstyled mb-6">
                              <li class="mb-2">
                                <span class="h6 me-1">Reg. Date:</span>
                                <span>{{ date('d M y h:i A', strtotime($user->created_at)) }}</span>
                              </li>
                              <li class="mb-2">
                                <span class="h6 me-1">Mobile:</span>
                                <span>{{env('APP_COUNTRY_CODE', 91)}} {{$user->mobile}}</span>
                              </li>
                          
                              <li class="mb-2">
                                <span class="h6 me-1">Current Location:</span>
                                <span>{{$user->address}}</span>
                              </li>
                            </ul>
                            <div class="d-flex justify-content-center">
                               @if($user->status==1)
                                <button class="btn btn-success w-100 waves-effect waves-light">Active</button>
                              @else
                                <button class="btn btn-danger w-100 waves-effect waves-light">Inactive</button>
                              @endif
                                
                            </div>

                        
                            <!-- Edit User Modal -->
                            @if ($showEditModal)
                                  <div class="modal fade show d-block" tabindex="-1" role="dialog" style="background: rgba(0, 0, 0, 0.5);">
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">Edit User Details</h5>
                                                <button type="button" class="btn-close" wire:click="closeModal"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="mb-3">
                                                    <label for="name" class="form-label">Name</label>
                                                    <input type="text" id="name" class="form-control" wire:model.defer="user.name">
                                                    @error('user.name') <small class="text-danger">{{ $message }}</small> @enderror
                                                </div>
                                                <div class="mb-3">
                                                    <label for="email" class="form-label">Email</label>
                                                    <input type="email" id="email" class="form-control" wire:model.defer="user.email">
                                                    @error('user.email') <small class="text-danger">{{ $message }}</small> @enderror
                                                </div>
                                                <div class="mb-3">
                                                    <label for="mobile" class="form-label">Mobile</label>
                                                    <input type="text" id="mobile" class="form-control" wire:model.defer="user.mobile">
                                                    @error('user.mobile') <small class="text-danger">{{ $message }}</small> @enderror
                                                </div>
                                                <div class="mb-3">
                                                    <label for="address" class="form-label">Current Location(City)</label>
                                                    <input type="text" id="address" class="form-control" wire:model.defer="user.address">
                                                    @error('user.address') <small class="text-danger">{{ $message }}</small> @enderror
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-secondary" wire:click="closeModal">Cancel</button>
                                                <button class="btn btn-primary" wire:click="updateUser">Save Changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-9">
                <div class="row text-nowrap">
                      <!--/ DataTable with Buttons -->
                      <div class="card card-action mb-6">
                          <div class="card-header align-items-center flex-wrap gap-2">
                            <h5 class="card-action-title mb-0">Ride History</h5>
                              {{-- <div class="row">
                                <div class="col-lg-12 d-flex justify-content-end my-auto">
                                    <div class="d-flex align-items-center">
                                        <input type="text" wire:model.debounce.300ms="search" 
                                              class="form-control border border-2 p-2 custom-input-sm" 
                                              placeholder="Search here...">
                                        <button type="button" wire:click="searchButtonClicked" 
                                                class="btn btn-dark text-white mb-0 custom-input-sm ms-2">
                                            <span class="material-icons">search</span>
                                        </button>
                                        <!-- Refresh Button -->
                                        <button type="button" wire:click="resetSearch" class="btn btn-danger text-white mb-0 custom-input-sm ms-2">
                                                <i class="ri-restart-line"></i>
                                        </button>
                                    </div>
                                </div>
                              </div> --}}
                          </div>
                          <div class="card-body">
                            <div class="accordion accordion-arrow-left">
                              <div class="accordion-item">
                                <div class="accordion-collapse">
                                  <div class="accordion-body table-responsive text-nowrap p-0">
                                    <table class="table table-striped">
                                      <thead>
                                          <tr>
                                            <th class="h6">Vehicle</th>
                                            <th class="h6">Start Date</th>
                                            <th class="h6">End Date</th>
                                            <th class="h6">Rent</th>
                                            <th class="h6">Rent Status</th>
                                            <th class="h6">Action By</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                        @foreach ($history as $item)
                                          <tr>
                                            <td class="">
                                                <small class="text-dark"> {{$item->stock?$item->stock->vehicle_number:"N/A"}}</small><br>
                                                <small><code>{{ $item->stock && $item->stock->product ? $item->stock->product->title : "N/A" }}</code></small>

                                            </td>
                                            <td class="">
                                                <small class="text-muted">{{ date('d M y h:i A', strtotime($item->start_date)) }}</small>
                                            </td>
                                            <td class="">
                                              <small class="text-muted">{{ date('d M y h:i A', strtotime($item->end_date)) }}</small>
                                            </td>
                                            <td class="">
                                              <small class="text-muted">{{ $item->order?ENV('APP_CURRENCY').''.number_format($item->order->rental_amount):0.00 }}</small>
                                            </td>
                                            <td class="">
                                              <small class="text-muted">{{ ucwords($item->status)}}</small>
                                            </td>
                                            <td class="">
                                              @if($item->exchanged_by)
                                                <small class="text-primary">{{$item->admin?$item->admin->email:'....'}}</small>
                                              @elseif($item->assigned_by)
                                                <small class="text-primary">{{$item->admin?$item->admin->email:'....'}}</small>
                                              @else
                                                <small class="text-success">{{$item->user?$item->user->email:"N/A"}}</small>
                                              @endif
                                              
                                            </td>
                                          </tr>
                                        @endforeach
                                      </tbody>
                                    </table>
                                    <div class="d-flex justify-content-end mt-2">
                                      {{ $history->links() }}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                </div>
            </div>
        </div>
    </div>
    <div class="loader-container" wire:loading>
      <div class="loader"></div>
    </div>
</div>

