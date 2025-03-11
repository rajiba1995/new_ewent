<div class="row mb-4">
    <style>
        .side-modal {
            position: fixed;
            top: 0;
            right: -400px; /* Initially hidden */
            width: 500px;
            height: 690px;
            background: #fff;
            box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            transition: right 0.3s ease-in-out;
            z-index: 10000;
        }

        .side-modal.open {
            right: 0;
        }

        .side-modal-content {
            display: flex;
            flex-direction: column;
            max-height: -webkit-fill-available;
            overflow-y: auto;
        }

        .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 20px;
            border: none;
            background: none;
            cursor: pointer;
        }

        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
        }
    </style>
    <div class="col-lg-12 justify-content-left">
       <h5 class="mb-0">Rider Management</h5>
       <div>
            <small class="text-dark fw-medium">Dashboard</small>
            <small class="text-light fw-medium arrow">Riders</small>
       </div>
    </div>
    <div class="col-lg-12 justify-content-left">
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
    
    <div class="col-lg-12 col-md-6 mb-md-0 my-4">
        <div class="row">
            <div class="col-12">
                <div class="card mb-6">
                    <div class="card-header px-0 pt-0">
                      <div class="nav-align-top">
                        <ul class="nav nav-tabs nav-fill" role="tablist">
                          <li class="nav-item" role="presentation" wire:click="tab_change(1)">
                            <button type="button" class="nav-link waves-effect {{$active_tab==1?"active":""}}" role="tab" data-bs-toggle="tab"
                              data-bs-target="#navs-justified-home" aria-controls="navs-justified-home" aria-selected="false"
                              tabindex="-1">
                              <span class="d-none d-sm-block">
                                <i class="tf-icons ri-user-3-line me-1_5"></i>
                                </i> Unverified <span
                                  class="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-secondary ms-1_5 pt-50">{{count($unverified_users)}}</span>
                                </span>
                                <i class="ri-user-3-line ri-20px d-sm-none"></i>
                          </li>
                          <li class="nav-item" role="presentation" wire:click="tab_change(2)">
                            <button type="button" class="nav-link waves-effect {{$active_tab==2?"active":""}}" role="tab" data-bs-toggle="tab"
                              data-bs-target="#navs-justified-profile" aria-controls="navs-justified-profile" aria-selected="false"
                              tabindex="-1">
                              <span class="d-none d-sm-block">
                                <i class="tf-icons ri-user-3-line me-1_5"></i>
                                </i> Verified <span
                                  class="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-success ms-1_5 pt-50">{{count($verified_users)}}</span>
                                </span>
                                <i class="ri-user-3-line ri-20px d-sm-none"></i>
                            </button>
                          </li>
                          <li class="nav-item" role="presentation" wire:click="tab_change(3)">
                            <button type="button" class="nav-link waves-effect {{$active_tab==3?"active":""}}" role="tab" data-bs-toggle="tab"
                              data-bs-target="#navs-justified-messages" aria-controls="navs-justified-messages" aria-selected="true">
                              <span class="d-none d-sm-block">
                                <i class="tf-icons ri-user-3-line me-1_5"></i>
                                </i> Rejected <span
                                  class="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger ms-1_5 pt-50">{{count($rejected_users)}}</span>
                                </span>
                                <i class="ri-user-3-line ri-20px d-sm-none"></i>
                            </button>
                          </li>
                          {{-- <span class="tab-slider" style="left: 681.312px; width: 354.688px; bottom: 0px;"></span> --}}
                        </ul>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="tab-content p-0">
                        <div class="tab-pane fade {{$active_tab==1?"active show":""}}" id="navs-justified-home" role="tabpanel">
                            <div class="col-lg-6 col-6 my-auto text-end mb-2">
                                <div class="d-flex align-items-center justify-content-end">
                                    <input type="text" wire:model.debounce.300ms="search" 
                                           class="form-control border border-2 p-2 custom-input-sm" 
                                           placeholder="Search by name, mobile,email or rider id">
                                    <button type="button" wire:click="btn_search" 
                                            class="btn btn-primary text-white mb-0 custom-input-sm ms-2">
                                        <span class="material-icons">search</span>
                                    </button>
                                    <!-- Refresh Button -->
                                    <button type="button" wire:click="reset_search" 
                                            class="btn btn-outline-danger waves-effect mb-0 custom-input-sm ms-2">
                                        <span class="material-icons">refresh</span>
                                    </button>
                                </div>
                            </div>
                            <div class="table-responsive p-0">
                                <table class="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">SL</th>
                                            <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">Riders</th>
                                            <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">Rider ID</th>
                                            <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">KYC Uploaded Date/Time</th>
                                            <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">Status</th>
                                            <th class="text-end text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle px-4">Documents</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                        @foreach($unverified_users as $k => $un_user)
                                        @php
                                            $colors = ['bg-label-primary', 'bg-label-success', 'bg-label-info', 'bg-label-secondary', 'bg-label-danger', 'bg-label-warning'];
                                            $colorClass = $colors[$k % count($colors)]; // Rotate colors based on index
                                        @endphp
                                            <tr>
                                                <td class="align-middle text-center">{{ $k + 1 }}</td>
                                                <td class="sorting_1">
                                                    <div class="d-flex justify-content-start align-items-center customer-name">
                                                        <div class="avatar-wrapper me-3">
                                                            <div class="avatar avatar-sm">
                                                                @if ($un_user->profile_image)
                                                                    <img src="{{ asset($un_user->profile_image) }}" alt="Avatar" class="rounded-circle">
                                                                @else
                                                                    <div class="avatar-initial rounded-circle {{$colorClass}}">
                                                                        {{ strtoupper(substr($un_user->name, 0, 1)) }}{{ strtoupper(substr(strrchr($un_user->name, ' '), 1, 1)) }}
                                                                    </div>
                                                                @endif
                                                            </div>
                                                        </div>
                                                        <div class="d-flex flex-column">
                                                            <a href="{{ route('admin.customer.details', $un_user->id) }}"
                                                                class="text-heading"><span class="fw-medium text-truncate">{{ ucwords($un_user->name) }}</span>
                                                            </a>
                                                            <small class="text-truncate">{{ $un_user->email }} | {{$un_user->country_code}} {{ $un_user->mobile }}</small>
                                                        <div>
                                                    </div>
                                                </td>
                                                <td class="align-middle text-start">{{$un_user->customer_id?$un_user->customer_id:"...."}}</td>
                                                <td class="align-middle text-start">150</td>
                                                <td class="align-middle text-sm text-center">
                                                    <div class="form-check form-switch">
                                                        <input 
                                                            class="form-check-input ms-auto" 
                                                            type="checkbox" 
                                                            id="flexSwitchCheckDefault{{ $un_user->id }}" 
                                                            wire:click="toggleStatus({{ $un_user->id }})"
                                                            @if($un_user->status) checked @endif>
                                                    </div>
                                                </td>
                                                <td class="align-middle text-end px-4">
                                                    <button class="btn btn-outline-success waves-effect mb-0 custom-input-sm ms-2"
                                                            wire:click="showCustomerDetails({{ $un_user->id}})">
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                                <div class="d-flex justify-content-end mt-3 paginator">
                                    {{ $unverified_users->links() }} <!-- Pagination links -->
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade {{$active_tab==2?"active show":""}}" id="navs-justified-profile" role="tabpanel">
                            <div class="col-lg-6 col-6 my-auto text-end mb-2">
                                <div class="d-flex align-items-center justify-content-end">
                                    <input type="text" wire:model.debounce.300ms="search" 
                                           class="form-control border border-2 p-2 custom-input-sm" 
                                           placeholder="Search by name, mobile,email or rider id">
                                    <button type="button" wire:click="btn_search" 
                                            class="btn btn-primary text-white mb-0 custom-input-sm ms-2">
                                        <span class="material-icons">search</span>
                                    </button>
                                    <!-- Refresh Button -->
                                    <button type="button" wire:click="reset_search" 
                                            class="btn btn-outline-danger waves-effect mb-0 custom-input-sm ms-2">
                                        <span class="material-icons">refresh</span>
                                    </button>
                                </div>
                            </div>
                            <div class="table-responsive p-0">
                                <table class="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">SL</th>
                                            <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">Customer</th>
                                            <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">Customer ID</th>
                                            <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">Total Order</th>
                                            <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">Total Spent</th>
                                            <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">Status</th>
                                            <th class="text-end text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle px-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                        @foreach($verified_users as $k => $v_user)
                                        @php
                                            $colors = ['bg-label-primary', 'bg-label-success', 'bg-label-info', 'bg-label-secondary', 'bg-label-danger', 'bg-label-warning'];
                                            $colorClass = $colors[$k % count($colors)]; // Rotate colors based on index
                                        @endphp
                                            <tr>
                                                <td class="align-middle text-center">{{ $k + 1 }}</td>
                                                <td class="sorting_1">
                                                    <div class="d-flex justify-content-start align-items-center customer-name">
                                                        <div class="avatar-wrapper me-3">
                                                            <div class="avatar avatar-sm">
                                                                @if ($v_user->image)
                                                                    <img src="{{ asset($v_user->image) }}" alt="Avatar" class="rounded-circle">
                                                                @else
                                                                    <div class="avatar-initial rounded-circle {{$colorClass}}">
                                                                        {{ strtoupper(substr($v_user->name, 0, 1)) }}{{ strtoupper(substr(strrchr($v_user->name, ' '), 1, 1)) }}
                                                                    </div>
                                                                @endif
                                                            </div>
                                                        </div>
                                                        <div class="d-flex flex-column">
                                                            <a href="{{ route('admin.customer.details', $v_user->id) }}"
                                                                class="text-heading"><span class="fw-medium text-truncate">{{ ucwords($v_user->name) }}</span>
                                                            </a>
                                                            <small class="text-truncate">{{ $v_user->email }} | {{$v_user->country_code}} {{ $v_user->mobile }}</small>
                                                        <div>
                                                    </div>
                                                </td>
                                                <td class="align-middle text-start">{{$v_user->customer_id?$v_user->customer_id:"...."}}</td>
                                                <td class="align-middle text-start">150</td>
                                                <td class="align-middle text-start">{{env('APP_CURRENCY')}}5000</td>
                                                <td class="align-middle text-sm text-center">
                                                    <div class="form-check form-switch">
                                                        <input 
                                                            class="form-check-input ms-auto" 
                                                            type="checkbox" 
                                                            id="flexSwitchCheckDefault{{ $v_user->id }}" 
                                                            wire:click="toggleStatus({{ $v_user->id }})"
                                                            @if($v_user->status) checked @endif>
                                                    </div>
                                                </td>
                                                <td class="align-middle text-end px-4">
                                                    <a href="{{ route('admin.customer.details', $v_user->id) }}" title="View Details of {{ ucwords($v_user->name) }}">
                                                        <span class="control"></span>
                                                    </a>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                                <div class="d-flex justify-content-end mt-3 paginator">
                                    {{ $verified_users->links() }} <!-- Pagination links -->
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade {{$active_tab==3?"active show":""}}" id="navs-justified-messages" role="tabpanel">
                            <div class="col-lg-6 col-6 my-auto text-end mb-2">
                                <div class="d-flex align-items-center justify-content-end">
                                    <input type="text" wire:model.debounce.300ms="search" 
                                           class="form-control border border-2 p-2 custom-input-sm" 
                                           placeholder="Search by name, mobile,email or rider id">
                                    <button type="button" wire:click="btn_search" 
                                            class="btn btn-primary text-white mb-0 custom-input-sm ms-2">
                                        <span class="material-icons">search</span>
                                    </button>
                                    <!-- Refresh Button -->
                                    <button type="button" wire:click="reset_search" 
                                            class="btn btn-outline-danger waves-effect mb-0 custom-input-sm ms-2">
                                        <span class="material-icons">refresh</span>
                                    </button>
                                </div>
                            </div>
                            <div class="table-responsive p-0">
                                <table class="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">SL</th>
                                            <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">Customer</th>
                                            <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">Customer ID</th>
                                            <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">Total Order</th>
                                            <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">Total Spent</th>
                                            <th class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle">Status</th>
                                            <th class="text-end text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle px-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                        @foreach($rejected_users as $k => $r_user)
                                        @php
                                            $colors = ['bg-label-primary', 'bg-label-success', 'bg-label-info', 'bg-label-secondary', 'bg-label-danger', 'bg-label-warning'];
                                            $colorClass = $colors[$k % count($colors)]; // Rotate colors based on index
                                        @endphp
                                            <tr>
                                                <td class="align-middle text-center">{{ $k + 1 }}</td>
                                                <td class="sorting_1">
                                                    <div class="d-flex justify-content-start align-items-center customer-name">
                                                        <div class="avatar-wrapper me-3">
                                                            <div class="avatar avatar-sm">
                                                                @if ($r_user->image)
                                                                    <img src="{{ asset($r_user->image) }}" alt="Avatar" class="rounded-circle">
                                                                @else
                                                                    <div class="avatar-initial rounded-circle {{$colorClass}}">
                                                                        {{ strtoupper(substr($r_user->name, 0, 1)) }}{{ strtoupper(substr(strrchr($r_user->name, ' '), 1, 1)) }}
                                                                    </div>
                                                                @endif
                                                            </div>
                                                        </div>
                                                        <div class="d-flex flex-column">
                                                            <a href="{{ route('admin.customer.details', $r_user->id) }}"
                                                                class="text-heading"><span class="fw-medium text-truncate">{{ ucwords($r_user->name) }}</span>
                                                            </a>
                                                            <small class="text-truncate">{{ $r_user->email }} | {{$r_user->country_code}} {{ $r_user->mobile }}</small>
                                                        <div>
                                                    </div>
                                                </td>
                                                <td class="align-middle text-start">{{$r_user->customer_id?$r_user->customer_id:"...."}}</td>
                                                <td class="align-middle text-start">150</td>
                                                <td class="align-middle text-start">{{env('APP_CURRENCY')}}5000</td>
                                                <td class="align-middle text-sm text-center">
                                                    <div class="form-check form-switch">
                                                        <input 
                                                            class="form-check-input ms-auto" 
                                                            type="checkbox" 
                                                            id="flexSwitchCheckDefault{{ $r_user->id }}" 
                                                            wire:click="toggleStatus({{ $r_user->id }})"
                                                            @if($r_user->status) checked @endif>
                                                    </div>
                                                </td>
                                                <td class="align-middle text-end px-4">
                                                    <a href="{{ route('admin.customer.details', $r_user->id) }}" title="View Details of {{ ucwords($r_user->name) }}">
                                                        <span class="control"></span>
                                                    </a>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                                <div class="d-flex justify-content-end mt-3 paginator">
                                    {{ $rejected_users->links() }} <!-- Pagination links -->
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
    <!-- Side Modal (Drawer) -->
    @if($isModalOpen)
    <div class="side-modal {{ $isModalOpen ? 'open' : '' }}">
        @if($selectedCustomer)
            <div class="m-0 lh-1 border-bottom template-customizer-header position-relative py-4">
                <div class="d-flex justify-content-start align-items-center customer-name">
                    <div class="avatar-wrapper me-3">
                        <div class="avatar avatar-sm">
                        @if ($selectedCustomer->image)
                        <img src="{{ asset($selectedCustomer->image) }}" alt="Avatar" class="rounded-circle">
                        @else
                        <div class="avatar-initial rounded-circle {{$colorClass}}">
                            {{ strtoupper(substr($selectedCustomer->name, 0, 1)) }}{{ strtoupper(substr(strrchr($selectedCustomer->name, ' '), 1, 1)) }}
                        </div>
                        @endif
                        </div>
                    </div>
                    <div class="d-flex flex-column">
                        <a href="javascript:vid(0)" class="text-heading"><span
                            class="fw-medium text-truncate">{{ ucwords($selectedCustomer->name) }}</span>
                        </a>
                        <small class="text-truncate">{{ $selectedCustomer->email }} | {{$selectedCustomer->country_code}}
                        {{ $selectedCustomer->mobile }}</small>
                        <div>
                        </div>
                        <div class="d-flex align-items-center gap-2 position-absolute end-0 top-0 mt-6 me-5">
                        <a href="javascript:void(0)" wire:click="closeModal"
                            class="template-customizer-close-btn fw-light text-body" tabindex="-1">
                            <i class="ri-close-line ri-24px"></i>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="side-modal-content">
                @if(session()->has('modal_message'))
                    <div class="alert alert-success" id="modalflashMessage">
                        {{ session('modal_message') }}
                    </div>
                @endif
                <div class="nav-align-top">
                    <ul class="nav nav-tabs nav-fill" role="tablist">
                      <li class="nav-item" role="presentation"> 
                        <button type="button" class="nav-link waves-effect modal-nav active" role="tab" data-bs-toggle="tab"
                          data-bs-target="#navs-justified-overview" aria-controls="navs-justified-overview" aria-selected="false"
                          tabindex="-1">
                          <span class="d-none d-sm-block">Overview 
                            </span>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button type="button" class="nav-link waves-effect" role="tab" data-bs-toggle="tab"
                          data-bs-target="#navs-justified-history" aria-controls="navs-justified-history" aria-selected="false"
                          tabindex="-1">
                          <span class="d-none d-sm-block">
                            History 
                            </span>
                        </button>
                      </li>
                    </ul>
                </div>
                <div class="tab-content p-0 mt-6">
                    <div class="tab-pane fade active show" id="navs-justified-overview" role="tabpanel">
                        <div style="border-bottom: 1px solid #8d58ff;" class="mb-3">
                            <div class="d-flex align-items-center mb-3">
                                <!-- Icon -->
                                <div class="avatar me-3" style=" width:1.5rem; height: 1.5rem;">
                                  <div class="avatar-initial rounded 
                                        bg-label-dark document_type">
                                    <i class="ri-roadster-line ri-15px"></i>
                                  </div>
                                </div>
                                <!-- Document Name -->
                                <div>
                                    <span class="fw-medium text-truncate text-dark">Driving License</span>
                                </div>
                            </div>
                            @if($selectedCustomer->driving_license_status>0)
                            <div class="d-flex">
                               <div class="col-6">
                                <div class="card academy-content shadow-none border mx-2" style="width:150px">
                                    <div class="p-2">
                                      <div class="cursor-pointer">
                                       <img src="{{asset($selectedCustomer->driving_license)}}" alt="" style="max-width: 150px;max-height: 130px; width: 100%;">
                                      </div>
                                      <div class="text-center fw-medium text-truncate">Front</div>
                                    </div>
                                </div>
                               </div>
                                <div class="col-6">
                                    <div class="card academy-content shadow-none border mx-2" style="width:150px">
                                        <div class="p-2">
                                          <div class="cursor-pointer">
                                           <img src="{{asset($selectedCustomer->driving_license_back)}}" alt="" style="max-width: 150px;max-height: 130px; width: 100%;">
                                          </div>
                                          <div class="text-center fw-medium text-truncate">Back</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex my-4">
                                <div class="col-6 text-center cursor-pointer">
                                    <span class="badge rounded-pill bg-label-secondary">Preview</span>
                                </div>
                                <div class="col-6 text-center cursor-pointer">
                                    <select 
                                        class="badge-select 
                                            {{ $selectedCustomer->driving_license_status == 0 ? 'bg-label-warning' : 
                                            ($selectedCustomer->driving_license_status == 1 ? 'bg-label-info' : 
                                            ($selectedCustomer->driving_license_status == 2 ? 'bg-label-success' : 'bg-label-danger')) }}" 
                                        wire:model="status" 
                                        wire:change="updateStatus({{$selectedCustomer->id}},'driving_license_status', $event.target.value)" >
                                        <option value="1" {{$selectedCustomer->driving_license_status==1?"selected":""}} class="text-info">Uploaded</option>
                                        <option value="2" {{$selectedCustomer->driving_license_status==2?"selected":""}} class="text-success">Verified</option>
                                        <option value="3" {{$selectedCustomer->driving_license_status==3?"selected":""}} class="text-danger">Rejected</option>
                                    </select>
                                </div>
                            </div>
                            @else
                                <div class="alert alert-danger">
                                    Driving license not uploaded
                                </div>
                            @endif
                        </div>
                        <div style="border-bottom: 1px solid #8d58ff;" class="mb-3">
                            @if($selectedCustomer->govt_id_card_status>0)
                                <div class="d-flex align-items-center mb-3">
                                    <!-- Icon -->
                                    <div class="avatar me-3" style=" width:1.5rem; height: 1.5rem;">
                                    <div class="avatar-initial rounded 
                                            bg-label-dark document_type">
                                        <i class="ri-passport-line ri-15px"></i>
                                    </div>
                                    </div>
                                    <!-- Document Name -->
                                    <div>
                                        <span class="fw-medium text-truncate text-dark">Govt. ID Card</span>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-6">
                                        <div class="card academy-content shadow-none border mx-2" style="width:150px">
                                            <div class="p-2">
                                            <div class="cursor-pointer">
                                            <img src="{{asset($selectedCustomer->govt_id_card)}}" alt="" style="max-width: 150px;max-height: 130px; width: 100%;">
                                            </div>
                                            <div class="text-center fw-medium text-truncate">Front</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="card academy-content shadow-none border mx-2" style="width:150px">
                                            <div class="p-2">
                                                <div class="cursor-pointer">
                                                <img src="{{asset($selectedCustomer->govt_id_card_back)}}" alt="" style="max-width: 150px;max-height: 130px; width: 100%;">
                                                </div>
                                                <div class="text-center fw-medium text-truncate">Back</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex my-4">
                                    <div class="col-6 text-center cursor-pointer">
                                        <span class="badge rounded-pill bg-label-secondary"> Preview</span>
                                    </div>
                                    <div class="col-6 text-center cursor-pointer">
                                        <select 
                                            class="badge-select 
                                                {{ $selectedCustomer->govt_id_card_status == 0 ? 'bg-label-warning' : 
                                                ($selectedCustomer->govt_id_card_status == 1 ? 'bg-label-info' : 
                                                ($selectedCustomer->govt_id_card_status == 2 ? 'bg-label-success' : 'bg-label-danger')) }}" 
                                            wire:model="status" 
                                            wire:change="updateStatus({{$selectedCustomer->id}},'govt_id_card_status', $event.target.value)" >
                                            <option value="1" {{$selectedCustomer->govt_id_card_status==1?"selected":""}} class="text-info">Uploaded</option>
                                            <option value="2" {{$selectedCustomer->govt_id_card_status==2?"selected":""}} class="text-success">Verified</option>
                                            <option value="3" {{$selectedCustomer->govt_id_card_status==3?"selected":""}} class="text-danger">Rejected</option>
                                        </select>
                                    </div>
                                </div>
                            @else
                                <div class="alert alert-danger">
                                    Govt. ID not uploaded
                                </div>
                            @endif
                        </div>
                        <div style="border-bottom: 1px solid #8d58ff;" class="mb-3">
                            <div class="d-flex align-items-center mb-3">
                                <!-- Icon -->
                                <div class="avatar me-3" style=" width:1.5rem; height: 1.5rem;">
                                  <div class="avatar-initial rounded 
                                        bg-label-dark document_type">
                                    <i class="ri-bank-line ri-15px"></i>
                                  </div>
                                </div>
                                <!-- Document Name -->
                                <div>
                                    <span class="fw-medium text-truncate text-dark">Cancelled Cheque</span>
                                </div>
                            </div>
                            <div class="d-flex">
                               <div class="col-6">
                                <div class="card academy-content shadow-none border mx-2" style="width:150px">
                                    <div class="p-2">
                                      <div class="cursor-pointer">
                                       <img src="https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template/demo/assets/img/elements/20.jpg" alt="" style="max-width: 150px;max-height: 130px; width: 100%;">
                                      </div>
                                      <div class="text-center fw-medium text-truncate">Front</div>
                                    </div>
                                </div>
                               </div>
                                <div class="col-6">
                                    <div class="card academy-content shadow-none border mx-2" style="width:150px">
                                        <div class="p-2">
                                          <div class="cursor-pointer">
                                           <img src="https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template/demo/assets/img/elements/20.jpg" alt="" style="max-width: 150px;max-height: 130px; width: 100%;">
                                          </div>
                                          <div class="text-center fw-medium text-truncate">Back</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex my-4">
                                <div class="col-4 text-center cursor-pointer">
                                    <span class="badge rounded-pill bg-label-secondary">Preview</span>
                                </div>
                                <div class="col-4 text-center cursor-pointer">
                                    <span class="badge rounded-pill bg-label-success"><i class="ri-check-line"></i> Approve</span>
                                </div>
                                <div class="col-4 text-center cursor-pointer">
                                    <span class="badge rounded-pill bg-label-danger"><i class="ri-close-line"></i> Reject</span>
                                </div>
                            </div>
                        </div>
                        <div style="border-bottom: 1px solid #8d58ff;" class="mb-3">
                            <div class="d-flex align-items-center mb-3">
                                <!-- Icon -->
                                <div class="avatar me-3" style=" width:1.5rem; height: 1.5rem;">
                                  <div class="avatar-initial rounded 
                                        bg-label-dark document_type">
                                    <i class="ri-home-line ri-15px"></i>
                                  </div>
                                </div>
                                <!-- Document Name -->
                                <div>
                                    <span class="fw-medium text-truncate text-dark">Current Address Proof</span>
                                </div>
                            </div>
                            <div class="d-flex">
                               <div class="col-6">
                                <div class="card academy-content shadow-none border mx-2" style="width:150px">
                                    <div class="p-2">
                                      <div class="cursor-pointer">
                                       <img src="https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template/demo/assets/img/elements/20.jpg" alt="" style="max-width: 150px;max-height: 130px; width: 100%;">
                                      </div>
                                      <div class="text-center fw-medium text-truncate">Front</div>
                                    </div>
                                </div>
                               </div>
                                <div class="col-6">
                                    <div class="card academy-content shadow-none border mx-2" style="width:150px">
                                        <div class="p-2">
                                          <div class="cursor-pointer">
                                           <img src="https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template/demo/assets/img/elements/20.jpg" alt="" style="max-width: 150px;max-height: 130px; width: 100%;">
                                          </div>
                                          <div class="text-center fw-medium text-truncate">Back</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex my-4">
                                <div class="col-4 text-center cursor-pointer">
                                    <span class="badge rounded-pill bg-label-secondary"> Preview</span>
                                </div>
                                <div class="col-4 text-center cursor-pointer">
                                    <span class="badge rounded-pill bg-label-success"><i class="ri-check-line"></i> Approve</span>
                                </div>
                                <div class="col-4 text-center cursor-pointer">
                                    <span class="badge rounded-pill bg-label-danger"><i class="ri-close-line"></i> Reject</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="navs-justified-history" role="tabpanel">
                        <ul class="timeline pb-0 mb-0">
                            <li class="timeline-item timeline-item-transparent border-primary">
                              <span class="timeline-point timeline-point-primary"></span>
                              <div class="timeline-event">
                                <div class="timeline-header mb-1">
                                  <h6 class="mb-0">Aadhar | Pending</h6>
                                  <small class="text-muted">08 Nov 2024 11:29 AM</small>
                                </div>
                                <code>Remarks</code>
                                <p class="mt-1 mb-3">Your order has been placed successfully</p>
                              </div>
                            </li>
                            <li class="timeline-item timeline-item-transparent border-primary">
                              <span class="timeline-point timeline-point-primary"></span>
                              <div class="timeline-event">
                                <div class="timeline-header mb-1">
                                    <h6 class="mb-0">Aadhar | Pending</h6>
                                    <small class="text-muted">08 Nov 2024 11:29 AM</small>
                                  </div>
                                  <code>Remarks</code>
                                  <p class="mt-1 mb-3">Your order has been placed successfully</p>
                              </div>
                            </li>
                          </ul>
                    </div>
                </div>
            </div>
        @endif
    </div>
    @endif
    <!-- Overlay -->
    @if($isModalOpen)
        <div class="overlay" wire:click="closeModal"></div>
    @endif
</div>
@section('page-script')
<script>
    setTimeout(() => {
        const flashMessage = document.getElementById('modalflashMessage');
        if (flashMessage) flashMessage.remove();
    }, 3000); // Auto-hide flash message after 3 seconds
    setTimeout(() => {
        const flashMessage = document.getElementById('flashMessage');
        if (flashMessage) flashMessage.remove();
    }, 3000); // Auto-hide flash message after 3 seconds
</script>
@endsection
