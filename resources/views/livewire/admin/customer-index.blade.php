<div class="row mb-4">
    <div class="col-lg-12 d-flex justify-content-end">
        <a href="{{route('admin.customer.add')}}"  class="btn btn-primary">
            <i class="ri-add-line ri-16px me-0 me-sm-2 align-baseline"></i>
            Add Customer
        </a>
    </div>
    <div class="col-lg-12 col-md-6 mb-md-0 mb-4">
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
                                <div class="alert alert-danger" id="flashMessage">
                                    {{ session('error') }}
                                </div>
                            @endif
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-7">
                                <h6>Customers</h6>
                            </div>
                            <div class="col-lg-6 col-5 my-auto text-end">
                                <div class="d-flex align-items-center">
                                    <input type="text" wire:model.debounce.300ms="search" 
                                           class="form-control border border-2 p-2 custom-input-sm" 
                                           placeholder="Search by Name, Mobile, or Email">
                                    <button type="button" wire:click="searchButtonClicked" 
                                            class="btn btn-dark text-white mb-0 custom-input-sm ms-2">
                                        <span class="material-icons">search</span>
                                    </button>
                                    <!-- Refresh Button -->
                                    <button type="button" wire:click="resetSearch" 
                                            class="btn btn-danger text-white mb-0 custom-input-sm ms-2">
                                        <span class="material-icons">refresh</span>
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="card-body px-0 pb-2">
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
                                    @foreach($users as $k => $user)
                                        <tr>
                                            <td class="align-middle text-center">{{ $k + 1 }}</td>
                                            <td class="sorting_1">
                                                <div class="d-flex justify-content-start align-items-center customer-name">
                                                    <div class="avatar-wrapper me-3">
                                                        <div class="avatar avatar-sm"><img
                                                                src="{{ $user->image ? asset($user->image) : asset('assets/img/profile-image.webp') }}"
                                                                alt="Avatar" class="rounded-circle"></div>
                                                    </div>
                                                    <div class="d-flex flex-column">
                                                        <a href="{{ route('admin.customer.details', $user->id) }}"
                                                            class="text-heading"><span class="fw-medium text-truncate">{{ ucwords($user->name) }}</span>
                                                        </a>
                                                        <small class="text-truncate">{{ $user->email }} | {{ $user->mobile }}</small>
                                                    <div>
                                                </div>
                                            </td>
                                            <td class="align-middle text-start">{{$user->customer_id?$user->customer_id:"...."}}</td>
                                            <td class="align-middle text-start">150</td>
                                            <td class="align-middle text-start">{{env('APP_CURRENCY')}}5000</td>
                                            <td class="align-middle text-sm text-center">
                                                <div class="form-check form-switch">
                                                    <input 
                                                        class="form-check-input ms-auto" 
                                                        type="checkbox" 
                                                        id="flexSwitchCheckDefault{{ $user->id }}" 
                                                        wire:click="toggleStatus({{ $user->id }})"
                                                        @if($user->status) checked @endif>
                                                </div>
                                            </td>
                                            <td class="align-middle text-end px-4">
                                                <a href="{{ route('admin.customer.details', $user->id) }}" title="View Details of {{ ucwords($user->name) }}">
                                                    <span class="control"></span>
                                                </a>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                            <div class="d-flex justify-content-end mt-3">
                                {{ $users->links() }} <!-- Pagination links -->
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

<script>
    setTimeout(() => {
        const flashMessage = document.getElementById('flashMessage');
        if (flashMessage) flashMessage.remove();
    }, 3000); // Auto-hide flash message after 3 seconds
</script>
