<div class="row mb-4">
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
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <div class="customer-avatar-section">
                            <div class="d-flex align-items-center flex-column">
                              <img class="img-fluid rounded mb-4"
                                src="{{ $user->image?asset($user->image):asset('assets/img/profile-image.webp') }}"
                                height="120" width="120" alt="User avatar">
                              <div class="customer-info text-center mb-6">
                                <h5 class="mb-0">{{$user->name}}</h5>
                                <span>Customer ID #{{$user->customer_id??'TEST00001'}}</span>
                              </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-around flex-wrap mb-6 gap-0 gap-md-3 gap-lg-4">
                            <div class="d-flex align-items-center gap-4 me-5">
                              <div class="avatar">
                                <div class="avatar-initial rounded bg-label-primary"><i class="ri-shopping-cart-line ri-24px"></i>
                                </div>
                              </div>
                              <div>
                                <h5 class="mb-0">184</h5>
                                <span>Orders</span>
                              </div>
                            </div>
                            <div class="d-flex align-items-center gap-4">
                              <div class="avatar">
                                <div class="avatar-initial rounded bg-label-primary"><i class="ri-money-dollar-circle-line ri-24px"></i>
                                </div>
                              </div>
                              <div>
                                <h5 class="mb-0">{{ env('APP_CURRENCY', '₹') }} 12,378</h5>
                                <span>Spent</span>
                              </div>
                            </div>
                        </div>

                        <div class="info-container">
                            <h5 class="border-bottom text-capitalize pb-4 mt-6 mb-4">Details</h5>
                            <ul class="list-unstyled mb-6">
                              <li class="mb-2">
                                <span class="h6 me-1">Email:</span>
                                <span>{{$user->email}}</span>
                              </li>
                              <li class="mb-2">
                                <span class="h6 me-1">Status:</span>
                                @if($user->status==1)
                                <span class="badge bg-label-success rounded-pill">Active</span>
                                @else
                                <span class="badge bg-label-danger rounded-pill">Inactive</span>
                                @endif
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
                                <button class="btn btn-primary w-100 waves-effect waves-light" wire:click="activeEditModal">Edit Details</button>
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
            <div class="col-8">
                <div class="nav-align-top">
                    <ul class="nav nav-pills flex-column flex-md-row mb-6 row-gap-2">
                        <li class="nav-item">
                            <a class="nav-link {{ $activeTab == 'overview' ? 'active' : '' }} waves-effect waves-light" 
                               href="javascript:void(0);" 
                               wire:click="setActiveTab('overview')">
                                <i class="ri-group-line me-1_5"></i>Overview
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link {{ $activeTab == 'security' ? 'active' : '' }} waves-effect waves-light" 
                               href="javascript:void(0);" 
                               wire:click="setActiveTab('security')">
                                <i class="ri-lock-2-line me-1_5"></i>Security
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link {{ $activeTab == 'address' ? 'active' : '' }} waves-effect waves-light" 
                               href="javascript:void(0);" 
                               wire:click="setActiveTab('address')">
                                <i class="ri-map-pin-line me-1_5"></i>Address &amp; Billing
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link {{ $activeTab == 'documents' ? 'active' : '' }} waves-effect waves-light" 
                              href="javascript:void(0);" 
                              wire:click="setActiveTab('documents')">
                                <i class="ri-file-text-line me-1_5"></i>Documents
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link {{ $activeTab == 'orders' ? 'active' : '' }} waves-effect waves-light" 
                              href="javascript:void(0);" 
                              wire:click="setActiveTab('orders')">
                                <i class="ri-file-text-line me-1_5"></i>Orders
                            </a>
                        </li>
                         <!-- Add new tabs for bike_reviews and admin_ratings -->
                        <li class="nav-item">
                            <a class="nav-link {{ $activeTab == 'bike_reviews' ? 'active' : '' }} waves-effect waves-light" 
                              href="javascript:void(0);" 
                              wire:click="setActiveTab('bike_reviews')">
                                <i class="ri-star-line me-1_5"></i>Bike Reviews
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link {{ $activeTab == 'admin_ratings' ? 'active' : '' }} waves-effect waves-light" 
                              href="javascript:void(0);" 
                              wire:click="setActiveTab('admin_ratings')">
                                <i class="ri-shield-star-line me-1_5"></i>Admin Ratings
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="row text-nowrap">
                    @if($activeTab=='overview')
                        <div class="col-md-6 mb-6">
                        <div class="card h-100">
                            <div class="card-body">
                            <div class="card-icon mb-2">
                                <div class="avatar">
                                <div class="avatar-initial rounded bg-label-primary"><i class="ri-money-dollar-circle-line ri-24px"></i>
                                </div>
                                </div>
                            </div>
                            <div class="card-info">
                                <h5 class="card-title mb-2">Account Balance</h5>
                                <div class="d-flex align-items-baseline gap-1">
                                <h5 class="text-primary mb-0">$2345</h5>
                                <p class="mb-0"> Credit Left</p>
                                </div>
                                <p class="mb-0 text-truncate">Account balance for next purchase</p>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-6 mb-6">
                        <div class="card">
                            <div class="card-body">
                            <div class="card-icon mb-2">
                                <div class="avatar">
                                <div class="avatar-initial rounded bg-label-success"><i class="ri-gift-line ri-24px"></i>
                                </div>
                                </div>
                            </div>
                            <div class="card-info">
                                <h5 class="card-title mb-2">Loyalty Program</h5>
                                <span class="badge bg-label-success mb-2 rounded-pill">Platinum member</span>
                                <p class="mb-0">3000 points to next tier</p>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-6 mb-6">
                        <div class="card">
                            <div class="card-body">
                            <div class="card-icon mb-2">
                                <div class="avatar">
                                <div class="avatar-initial rounded bg-label-warning"><i class="ri-star-smile-line ri-24px"></i>
                                </div>
                                </div>
                            </div>
                            <div class="card-info">
                                <h5 class="card-title mb-2">Wishlist</h5>
                                <div class="d-flex align-items-baseline gap-1">
                                <h5 class="text-warning mb-0">15</h5>
                                <p class="mb-0">Items in wishlist</p>
                                </div>
                                <p class="mb-0 text-truncate">Receive notification when items go on sale</p>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-6 mb-6">
                        <div class="card">
                            <div class="card-body">
                            <div class="card-icon mb-2">
                                <div class="avatar">
                                <div class="avatar-initial rounded bg-label-info"><i class="ri-vip-crown-line ri-24px"></i>
                                </div>
                                </div>
                            </div>
                            <div class="card-info">
                                <h5 class="card-title mb-2">Coupons</h5>
                                <div class="d-flex align-items-baseline gap-1">
                                <h5 class="text-info mb-0">21</h5>
                                <p class="mb-0">Coupons you win</p>
                                </div>
                    
                                <p class="mb-0 text-truncate">Use coupon on next purchase</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    @elseif($activeTab=='security')
                        <div class="card mb-6">
                            <h5 class="card-header">Change Password</h5>
                           <div class="card-body">
                              <form wire:submit.prevent="updatePassword" class="fv-plugins-bootstrap5 fv-plugins-framework" novalidate="novalidate">
                                  <!-- Flash Message for Success/Error -->
                                  @if (session()->has('message'))
                                      <div class="alert alert-success alert-dismissible" role="alert">
                                          {{ session('message') }}
                                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                      </div>
                                  @endif

                                  @if (session()->has('error'))
                                      <div class="alert alert-danger alert-dismissible" role="alert">
                                          {{ session('error') }}
                                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                      </div>
                                  @endif

                                  <div class="alert alert-warning alert-dismissible" role="alert">
                                      <h5 class="alert-heading mb-1">Ensure that these requirements are met</h5>
                                      <span>Minimum 6 characters long, uppercase &amp; symbol</span>
                                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                  </div>

                                  <div class="row gx-5">
                                      <div class="mb-4 col-12 col-sm-6 form-password-toggle fv-plugins-icon-container">
                                          <div class="input-group input-group-merge">
                                              <div class="form-floating form-floating-outline">
                                                  <input class="form-control" type="password" id="newPassword" name="newPassword" 
                                                        placeholder="············" wire:model="newPassword">
                                                  <label for="newPassword">New Password</label>
                                              </div>
                                              <span class="input-group-text cursor-pointer"><i class="ri-eye-off-line ri-20px"></i></span>
                                          </div>
                                          @error('newPassword') <span class="text-danger">{{ $message }}</span> @enderror
                                      </div>

                                      <div class="mb-4 col-12 col-sm-6 form-password-toggle fv-plugins-icon-container">
                                          <div class="input-group input-group-merge">
                                              <div class="form-floating form-floating-outline">
                                                  <input class="form-control" type="password" name="confirmPassword" id="confirmPassword"
                                                        placeholder="············" wire:model="confirmPassword">
                                                  <label for="confirmPassword">Confirm New Password</label>
                                              </div>
                                              <span class="input-group-text cursor-pointer"><i class="ri-eye-off-line ri-20px"></i></span>
                                          </div>
                                          @error('confirmPassword') <span class="text-danger">{{ $message }}</span> @enderror
                                      </div>

                                      <div class="text-end">
                                          <button type="submit" class="btn btn-primary me-2 waves-effect waves-light">Change Password</button>
                                      </div>
                                  </div>
                              </form>
                            </div>
                        </div>
                        <div class="card mb-6">
                            <h5 class="card-header">Recent Devices</h5>
                            <div class="table-responsive">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th class="text-truncate">Browser</th>
                                    <th class="text-truncate">Device</th>
                                    <th class="text-truncate">Location</th>
                                    <th class="text-truncate">Recent Activities</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td class="text-truncate"><img
                                        src="https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template/demo/assets/img/icons/brands/chrome.png"
                                        alt="Chrome" class="me-4" width="22" height="22"><span class="text-heading">Chrome on Windows</span></td>
                                    <td class="text-truncate">HP Spectre 360</td>
                                    <td class="text-truncate">Switzerland</td>
                                    <td class="text-truncate">10, July 2021 20:07</td>
                                  </tr>
                                  <tr>
                                    <td class="text-truncate"><img
                                        src="https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template/demo/assets/img/icons/brands/chrome.png"
                                        alt="Chrome" class="me-4" width="22" height="22"><span class="text-heading">Chrome on iPhone</span></td>
                                    <td class="text-truncate">iPhone 12x</td>
                                    <td class="text-truncate">Australia</td>
                                    <td class="text-truncate">13, July 2021 10:10</td>
                                  </tr>
                                  <tr>
                                    <td class="text-truncate"><img
                                        src="https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template/demo/assets/img/icons/brands/chrome.png"
                                        alt="Chrome" class="me-4" width="22" height="22"><span class="text-heading">Chrome on Android</span></td>
                                    <td class="text-truncate">Oneplus 9 Pro</td>
                                    <td class="text-truncate">Dubai</td>
                                    <td class="text-truncate">14, July 2021 15:15</td>
                                  </tr>
                                  <tr>
                                    <td class="text-truncate"><img
                                        src="https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template/demo/assets/img/icons/brands/chrome.png"
                                        alt="Chrome" class="me-4" width="22" height="22"><span class="text-heading">Chrome on MacOS</span></td>
                                    <td class="text-truncate">Apple iMac</td>
                                    <td class="text-truncate">India</td>
                                    <td class="text-truncate">16, July 2021 16:17</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                        </div>
                    @elseif($activeTab=='address')
                        <div class="card card-action mb-6">
                            <div class="card-header align-items-center flex-wrap gap-2">
                            <h5 class="card-action-title mb-0">Address Book</h5>
                            </div>
                            <div class="card-body">
                              <div class="accordion accordion-arrow-left" id="ecommerceBillingAccordionAddress">
                                  @forelse ($user->userAddress as $address)
                                      <div class="accordion-item @if($loop->first) active @endif">
                                          <div class="accordion-header d-flex justify-content-between align-items-center flex-wrap flex-sm-nowrap"
                                              id="heading{{ $address->id }}">
                                              <a class="accordion-button px-2" data-bs-toggle="collapse" data-bs-target="#ecommerceBillingAddress{{ $address->id }}"
                                              aria-expanded="true" aria-controls="heading{{ $address->id }}" role="button">
                                                  <span>
                                                      <span class="d-flex gap-2 mb-1 align-items-baseline">
                                                          <span class="h6 mb-0">{{ $address->type }}</span>
                                                          @if($address->is_default==1)
                                                              <span class="badge bg-label-success rounded-pill">Default Address</span>
                                                          @endif
                                                      </span>
                                                      <span class="mb-0 text-body fw-normal">{{ $address->street_address }}</span>
                                                  </span>
                                              </a>
                                              <div class="d-flex gap-4 p-4 p-sm-2 py-sm-0 pt-0 ms-4 ms-sm-0">
                                                  <a href="javascript:void(0);"><i class="ri-edit-box-line ri-22px "></i></a>
                                                  <a href="javascript:void(0);"><i class="ri-delete-bin-7-line text-danger ri-22px "></i></a>
                                                  <button class="btn p-0" data-bs-toggle="dropdown" aria-expanded="false" role="button"><i
                                                      class="ri-more-2-line ri-22px "></i></button>
                                                  <ul class="dropdown-menu">
                                                      <li><a class="dropdown-item waves-effect" href="javascript:void(0);">Set as default address</a></li>
                                                  </ul>
                                              </div>
                                          </div>
                                          <div id="ecommerceBillingAddress{{ $address->id }}" class="accordion-collapse collapse @if($loop->first) show @endif"
                                              data-bs-parent="#ecommerceBillingAccordionAddress">
                                              <div class="accordion-body ps-6 ms-6">
                                                  <p class="mb-1">{{ $address->street_address }},</p>
                                                  <p class="mb-1">{{ $address->city }},</p>
                                                  <p class="mb-1">{{ $address->country }}</p>
                                                  <p class="mb-1">{{ $address->pincode }}</p>
                                              </div>
                                          </div>
                                      </div>
                                  @empty
                                      <p>No address found</p>
                                  @endforelse
                              </div>
                          </div>
                          
                        </div>
                        {{-- Payment accordion --}}
                        <div class="card card-action mb-6">
                            <div class="card-header align-items-center flex-wrap gap-2">
                              <h5 class="card-action-title mb-0">Payment Methods</h5>
                            </div>
                            <div class="card-body">
                              <div class="accordion accordion-arrow-left" id="ecommerceBillingAccordionPayment">
                          
                                <div class="accordion-item">
                                  <div class="accordion-header d-flex justify-content-between align-items-center flex-wrap flex-sm-nowrap"
                                    id="headingPaymentMaster">
                                    <a class="accordion-button collapsed px-2" data-bs-toggle="collapse"
                                      data-bs-target="#ecommerceBillingPaymentMaster" aria-expanded="false" aria-controls="headingPaymentMaster"
                                      role="button">
                                      <span class="accordion-button-information d-flex align-items-center gap-4">
                                        <span class="accordion-button-image">
                                          <img
                                            src="https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template/demo/assets/img/icons/payments/master-light.png"
                                            class="img-fluid w-px-50 h-px-30" alt="master-card"
                                            data-app-light-img="icons/payments/master-light.png"
                                            data-app-dark-img="icons/payments/master-dark.png">
                                        </span>
                                        <span class="d-flex flex-column">
                                          <span class="h6 mb-1">Mastercard</span>
                                          <span class="mb-0 text-body fw-normal">Expires Apr 2028</span>
                                        </span>
                                      </span>
                                    </a>
                                    <div class="d-flex gap-4 p-4 p-sm-2 py-sm-0 pt-0 ms-4 ms-sm-0">
                                      <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#editCCModal"><i
                                          class="ri-edit-box-line ri-22px "></i></a>
                                      <a href="javascript:void(0);">
                                        <i class="ri-delete-bin-7-line text-danger ri-22px "></i>
                                    </a>
                                      <button class="btn p-0" data-bs-toggle="dropdown" aria-expanded="false" role="button"><i
                                          class="ri-more-2-line ri-22px "></i></button>
                                      <ul class="dropdown-menu">
                                        <li><a class="dropdown-item waves-effect" href="javascript:void(0);">Set as Primary</a></li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div id="ecommerceBillingPaymentMaster" class="accordion-collapse collapse"
                                    data-bs-parent="#ecommerceBillingAccordionPayment">
                                    <div
                                      class="accordion-body d-flex align-items-baseline flex-wrap flex-xl-nowrap flex-sm-nowrap flex-md-wrap ms-6 ps-4 table-responsive">
                                      <table class="table table-sm table-borderless text-nowrap">
                                        <tbody>
                                          <tr>
                                            <td class="w-50">Name</td>
                                            <td class="h6">Violet Mendoza</td>
                                          </tr>
                                          <tr>
                                            <td>Number</td>
                                            <td class="h6">**** 4487</td>
                                          </tr>
                                          <tr>
                                            <td>Expires</td>
                                            <td class="h6">04/2028</td>
                                          </tr>
                                          <tr>
                                            <td>Type</td>
                                            <td class="h6">Mastercard credit card</td>
                                          </tr>
                                          <tr>
                                            <td>Issuer</td>
                                            <td class="h6">VICBANK</td>
                                          </tr>
                                          <tr>
                                            <td>ID</td>
                                            <td class="h6">id_4325df90sdf8</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <table class="table table-sm table-borderless text-nowrap">
                                        <tbody>
                                          <tr>
                                            <td class="w-50">Billing Phone</td>
                                            <td class="h6">USA</td>
                                          </tr>
                                          <tr>
                                            <td>Number</td>
                                            <td class="h6">Not provided</td>
                                          </tr>
                                          <tr>
                                            <td>Email</td>
                                            <td class="h6">vafgot@vultukir.org</td>
                                          </tr>
                                          <tr>
                                            <td>Origin</td>
                                            <td class="h6">United States <i class="fis fi fi-us rounded-circle me-2 fs-5"> </i></td>
                                          </tr>
                                          <tr>
                                            <td>CVC check</td>
                                            <td class="h6">Passed <span class="badge bg-label-success rounded-circle p-0"><i
                                                  class="ri-check-line"></i></span></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                          
                                <div class="accordion-item">
                                  <div class="accordion-header d-flex justify-content-between align-items-center flex-wrap flex-sm-nowrap"
                                    id="headingPaymentExpress">
                                    <a class="accordion-button collapsed px-2" data-bs-toggle="collapse"
                                      data-bs-target="#ecommerceBillingPaymentExpress" aria-expanded="false" aria-controls="headingPaymentExpress"
                                      role="button">
                                      <span class="accordion-button-information d-flex align-items-center gap-4">
                                        <span class="accordion-button-image">
                                          <img
                                            src="https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template/demo/assets/img/icons/payments/ae-light.png"
                                            class="img-fluid w-px-50 h-px-30" alt="american-express-card"
                                            data-app-light-img="icons/payments/ae-light.png" data-app-dark-img="icons/payments/ae-dark.png">
                                        </span>
                                        <span>
                                          <span class="d-flex gap-2 flex-wrap align-items-baseline">
                                            <span class="h6 mb-1 text-nowrap">American Express</span>
                                            <span class="badge bg-label-success rounded-pill">Primary</span>
                                          </span>
                                          <span class="mb-0 text-body fw-normal">45 Roker Terrace</span>
                                        </span>
                                      </span>
                                    </a>
                                    <div class="d-flex gap-4 p-6 p-sm-2 py-sm-0 pt-0 ms-4 ms-sm-0">
                                      <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#editCCModal"><i
                                          class="ri-edit-box-line ri-22px "></i></a>
                                      <a href="javascript:void(0);"><i class="ri-delete-bin-7-line text-danger ri-22px "></i></a>
                                      <button class="btn p-0" data-bs-toggle="dropdown" aria-expanded="false" role="button"><i
                                          class="ri-more-2-line ri-22px "></i></button>
                                      <ul class="dropdown-menu">
                                        <li><a class="dropdown-item waves-effect" href="javascript:void(0);">Set as Primary</a></li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div id="ecommerceBillingPaymentExpress" class="accordion-collapse collapse"
                                    aria-labelledby="headingPaymentExpress" data-bs-parent="#ecommerceBillingAccordionPayment">
                                    <div
                                      class="accordion-body d-flex align-items-baseline flex-wrap flex-xl-nowrap flex-sm-nowrap flex-md-wrap ms-6 ps-4 table-responsive">
                                      <table class="table table-sm table-borderless text-nowrap">
                                        <tbody>
                                          <tr>
                                            <td class="w-50">Name</td>
                                            <td class="h6">Violet Mendoza</td>
                                          </tr>
                                          <tr>
                                            <td>Number</td>
                                            <td class="h6">**** 4487</td>
                                          </tr>
                                          <tr>
                                            <td>Expires</td>
                                            <td class="h6">08/2028</td>
                                          </tr>
                                          <tr>
                                            <td>Type</td>
                                            <td class="h6">Mastercard credit card</td>
                                          </tr>
                                          <tr>
                                            <td>Issuer</td>
                                            <td class="h6">VICBANK</td>
                                          </tr>
                                          <tr>
                                            <td>ID</td>
                                            <td class="h6">DH73DJ8</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <table class="table table-sm table-borderless text-nowrap">
                                        <tbody>
                                          <tr>
                                            <td class="w-50">Billing Phone</td>
                                            <td class="h6">USA</td>
                                          </tr>
                                          <tr>
                                            <td>Number</td>
                                            <td class="h6">+7634 983 637</td>
                                          </tr>
                                          <tr>
                                            <td>Email</td>
                                            <td class="h6">vafgot@vultukir.org</td>
                                          </tr>
                                          <tr>
                                            <td>Origin</td>
                                            <td class="h6">United States <i class="fis fi fi-us rounded-circle me-2 fs-5"> </i></td>
                                          </tr>
                                          <tr>
                                            <td>CVC check</td>
                                            <td class="h6">Passed <span class="badge bg-label-success rounded-circle p-0"><i
                                                  class="ri-check-line"></i></span></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                          
                                  </div>
                                </div>
                          
                                <div class="accordion-item">
                                  <div class="accordion-header d-flex justify-content-between align-items-center flex-wrap flex-sm-nowrap"
                                    id="headingPaymentVisa">
                                    <a class="accordion-button collapsed px-2" data-bs-toggle="collapse"
                                      data-bs-target="#ecommerceBillingPaymentVisa" aria-expanded="false" aria-controls="headingPaymentVisa"
                                      role="button">
                                      <span class="accordion-button-information d-flex align-items-center gap-4">
                                        <span class="accordion-button-image">
                                          <img
                                            src="https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template/demo/assets/img/icons/payments/visa-light.png"
                                            class="img-fluid w-px-50 h-px-30" alt="visa-card" data-app-light-img="icons/payments/visa-light.png"
                                            data-app-dark-img="icons/payments/visa-dark.png">
                                        </span>
                                        <span class="d-flex flex-column">
                                          <span class="h6 mb-1">Visa</span>
                                          <span class="mb-0 text-body fw-normal">512 Water Plant</span>
                                        </span>
                                      </span>
                                    </a>
                                    <div class="d-flex gap-4 p-4 p-sm-2 py-sm-0 pt-0 ms-4 ms-sm-0">
                                      <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#editCCModal"><i
                                          class="ri-edit-box-line ri-22px "></i></a>
                                      <a href="javascript:void(0);"><i class="ri-delete-bin-7-line text-danger ri-22px "></i></a>
                                      <button class="btn p-0" data-bs-toggle="dropdown" aria-expanded="false" role="button"><i
                                          class="ri-more-2-line ri-22px "></i></button>
                                      <ul class="dropdown-menu">
                                        <li><a class="dropdown-item waves-effect" href="javascript:void(0);">Set as Primary</a></li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div id="ecommerceBillingPaymentVisa" class="accordion-collapse collapse" aria-labelledby="headingPaymentVisa"
                                    data-bs-parent="#ecommerceBillingAccordionPayment">
                                    <div
                                      class="accordion-body d-flex align-items-baseline flex-wrap flex-xl-nowrap flex-sm-nowrap flex-md-wrap ms-6 ps-4 table-responsive">
                                      <table class="table table-sm table-borderless text-nowrap">
                                        <tbody>
                                          <tr>
                                            <td class="w-50">Name</td>
                                            <td class="h6">Violet Mendoza</td>
                                          </tr>
                                          <tr>
                                            <td>Number</td>
                                            <td class="h6">**** 5155</td>
                                          </tr>
                                          <tr>
                                            <td>Expires</td>
                                            <td class="h6">02/2022</td>
                                          </tr>
                                          <tr>
                                            <td>Type</td>
                                            <td class="h6">Visa credit card</td>
                                          </tr>
                                          <tr>
                                            <td>Issuer</td>
                                            <td class="h6">VICBANK</td>
                                          </tr>
                                          <tr>
                                            <td>ID</td>
                                            <td class="h6">id_w2r84jdy723</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <table class="table table-sm table-borderless text-nowrap">
                                        <tbody>
                                          <tr>
                                            <td class="w-50">Billing Phone</td>
                                            <td class="h6">USA</td>
                                          </tr>
                                          <tr>
                                            <td>Number</td>
                                            <td class="h6">+7634 983 637</td>
                                          </tr>
                                          <tr>
                                            <td>Email</td>
                                            <td class="h6">vafgot@vultukir.org</td>
                                          </tr>
                                          <tr>
                                            <td>Origin</td>
                                            <td class="h6">United States <i class="fis fi fi-us rounded-circle me-2 fs-5"></i></td>
                                          </tr>
                                          <tr>
                                            <td>CVC check</td>
                                            <td class="h6">Passed <span class="badge bg-label-success rounded-circle p-0"><i
                                                  class="ri-check-line"></i></span></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                    @elseif($activeTab=='documents')
                      @foreach($documents as $key => $ditem)
                          <div class="col-md-6 mb-4">
                              <div class="card h-100">
                                  <div class="card-body">
                                      <div class="d-flex align-items-center mb-3">
                                          <!-- Icon -->
                                          <div class="avatar me-3">
                                              <div class="avatar-initial rounded 
                                                  {{ $ditem['status'] == 0 ? 'bg-label-warning' : 
                                                    ($ditem['status'] == 1 ? 'bg-label-info' : 
                                                    ($ditem['status'] == 2 ? 'bg-label-success' : 'bg-label-danger')) }}">
                                                  <i class="{{ $ditem['icon'] }} ri-24px"></i>
                                              </div>
                                          </div>
                                          <!-- Document Name -->
                                          <div>
                                              <h5 class="mb-0">{{ $ditem['name'] }}</h5>
                                              <div>
                                                  <select 
                                                      class="badge-select 
                                                          {{ $ditem['status'] == 0 ? 'bg-label-warning' : 
                                                            ($ditem['status'] == 1 ? 'bg-label-info' : 
                                                            ($ditem['status'] == 2 ? 'bg-label-success' : 'bg-label-danger')) }}" 
                                                      wire:model="status" 
                                                      wire:change="updateStatus('{{ $ditem['tag'] }}', $event.target.value)"
                                                  >
                                                      <option value="0" {{$ditem['status']==0?"selected":""}} class="text-warning">Pending</option>
                                                      <option value="1" {{$ditem['status']==1?"selected":""}} class="text-info">Uploaded</option>
                                                      <option value="2" {{$ditem['status']==2?"selected":""}} class="text-success">Verified</option>
                                                      <option value="3" {{$ditem['status']==3?"selected":""}} class="text-danger">Cancelled</option>
                                                  </select>
                                              </div>
                                          </div>
                                      </div>
                                      <!-- Download Button -->
                                      @if($ditem['status'] > 0)
                                          <div class="text-end">
                                              <a href="{{ asset($ditem['doc']) }}" class="btn {{ $ditem['status'] == 0 ? 'btn-outline-warning' : 
                                                            ($ditem['status'] == 1 ? 'btn-outline-info' : 
                                                            ($ditem['status'] == 2 ? 'btn-outline-success' : 'btn-outline-danger')) }} btn-sm" download>
                                                  <i class="ri-download-line"></i> Download
                                              </a>
                                          </div>
                                      @endif
                                  </div>
                              </div>
                          </div>
                      @endforeach
                
                    @elseif($activeTab=='orders')
                      <!--/ DataTable with Buttons -->
                      <div class="card card-action mb-6">
                          <div class="card-header align-items-center flex-wrap gap-2">
                            <h5 class="card-action-title mb-0">Order History</h5>
                          </div>
                          <div class="card-body">
                            <div class="accordion accordion-arrow-left" id="OrderHistory">

                              <div class="accordion-item">
                                <div class="accordion-header d-flex justify-content-between align-items-center flex-wrap flex-sm-nowrap"
                                  id="headingPaymentMaster">
                                  <a class="accordion-button collapsed px-2" data-bs-toggle="collapse"
                                    data-bs-target="#ecommerceBillingPaymentMaster" aria-expanded="false" aria-controls="headingPaymentMaster"
                                    role="button">
                                    <span class="accordion-button-information d-flex align-items-center gap-4">
                                      <span class="accordion-button-image">
                                        <img
                                          src="https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template/demo/assets/img/icons/payments/master-light.png"
                                          class="img-fluid w-px-50 h-px-30" alt="master-card"
                                          data-app-light-img="icons/payments/master-light.png"
                                          data-app-dark-img="icons/payments/master-dark.png">
                                      </span>
                                      <span class="d-flex flex-column">
                                        <span class="h6 mb-1">EW-ORDER0212</span>
                                        <span class="mb-0 text-body fw-normal">Order was placed <span class="text-primary">12-01-2025 10.20AM</span></span>
                                      </span>
                                    </span>
                                  </a>
                                  <div class="d-flex gap-4 p-4 p-sm-2 py-sm-0 pt-0 ms-4 ms-sm-0">
                                    <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#editCCModal"><i
                                        class="ri-edit-box-line ri-22px "></i></a>
                                    <a href="javascript:void(0);">
                                      <i class="ri-delete-bin-7-line text-danger ri-22px "></i>
                                  </a>
                                    <button class="btn p-0" data-bs-toggle="dropdown" aria-expanded="false" role="button"><i
                                        class="ri-more-2-line ri-22px "></i></button>
                                    <ul class="dropdown-menu">
                                      <li><a class="dropdown-item waves-effect" href="javascript:void(0);">Set as Primary</a></li>
                                    </ul>
                                  </div>
                                </div>
                                <div id="ecommerceBillingPaymentMaster" class="accordion-collapse collapse"
                                  data-bs-parent="#OrderHistory">
                                  <div class="accordion-body table-responsive text-nowrap">
                                    <table class="table table-striped">
                                      <tbody>
                                        <tr>
                                          <td class="w-50">Name</td>
                                          <td class="h6">Violet Mendoza</td>
                                        </tr>
                                        <tr>
                                          <td>Number</td>
                                          <td class="h6">**** 4487</td>
                                        </tr>
                                        <tr>
                                          <td>Expires</td>
                                          <td class="h6">04/2028</td>
                                        </tr>
                                        <tr>
                                          <td>Type</td>
                                          <td class="h6">Mastercard credit card</td>
                                        </tr>
                                        <tr>
                                          <td>Issuer</td>
                                          <td class="h6">VICBANK</td>
                                        </tr>
                                        <tr>
                                          <td>ID</td>
                                          <td class="h6">id_4325df90sdf8</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table class="table table-sm table-borderless text-nowrap">
                                      <tbody>
                                        <tr>
                                          <td class="w-50">Billing Phone</td>
                                          <td class="h6">USA</td>
                                        </tr>
                                        <tr>
                                          <td>Number</td>
                                          <td class="h6">Not provided</td>
                                        </tr>
                                        <tr>
                                          <td>Email</td>
                                          <td class="h6">vafgot@vultukir.org</td>
                                        </tr>
                                        <tr>
                                          <td>Origin</td>
                                          <td class="h6">United States <i class="fis fi fi-us rounded-circle me-2 fs-5"> </i></td>
                                        </tr>
                                        <tr>
                                          <td>CVC check</td>
                                          <td class="h6">Passed <span class="badge bg-label-success rounded-circle p-0"><i
                                                class="ri-check-line"></i></span></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    @else
                        notifications
                    @endif
                </div>
            </div>
        </div>
    </div>
    <div class="loader-container" wire:loading>
      <div class="loader"></div>
    </div>
</div>

