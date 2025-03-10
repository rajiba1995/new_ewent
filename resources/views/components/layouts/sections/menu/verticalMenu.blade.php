<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">

  <!-- ! Hide app brand if navbar-full -->
  <div class="app-brand demo">
    <a href="{{url('/')}}" class="app-brand-link">
      {{-- <span class="app-brand-logo demo me-1">
        @include('_partials.macros',["height"=>20])
      </span> --}}
      <img src="{{asset('assets/img/new-logo.png')}}" alt="" style="width: 80px; height: auto;">
      <span class="app-brand-text demo menu-text fw-semibold ms-2">Ewent</span>
    </a>

    <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto">
      <i class="menu-toggle-icon d-xl-block align-middle"></i>
    </a>
  </div>

  <div class="menu-inner-shadow"></div>

  <ul class="menu-inner py-1 ps">
    
    <li class="menu-item {{ (request()->is('admin/dashboard*')) ? 'open' : '' }}">
      <a href="{{route('admin.dashboard')}}" class="menu-link">
        <i class="menu-icon tf-icons ri-home-smile-line"></i>
        <div>Dashboards</div>
      </a>
    </li>
    <li class="menu-item {{ (request()->is('admin/master*')) ? 'open' : '' }}">
      <a href="#" class="menu-link menu-toggle waves-effect" target="_blank">
        <i class="menu-icon tf-icons ri-stock-line"></i>
        <div>Master Management</div>
      </a>
      <ul class="menu-sub">
        <li class="menu-item {{ (request()->is('admin/master/banner*')) ? 'open' : '' }}">
          <a href="{{route('admin.banner.index')}}" class="menu-link">
            <div>Banner</div>
          </a>
        </li>
        <li class="menu-item {{ (request()->is('admin/master/why-ewent*')) ? 'open' : '' }}">
          <a href="{{route('admin.why-ewent')}}" class="menu-link">
            <div>Why Ewent</div>
          </a>
        </li>
        <li class="menu-item {{ (request()->is('admin/master/faq*')) ? 'open' : '' }}">
          <a href="{{route('admin.faq.index')}}" class="menu-link">
            <div>FAQ</div>
          </a>
        </li>
        <li class="menu-item {{ (request()->is('admin/master/policy-details*')) ? 'open' : '' }}">
          <a href="{{route('admin.policy-details')}}" class="menu-link">
            <div>Policy Details</div>
          </a>
        </li>
      </ul>
    </li>
    <li class="menu-item {{ (request()->is('admin/master*')) ? 'open' : '' }}">
      <a href="#" class="menu-link menu-toggle waves-effect" target="_blank">
        <i class="menu-icon tf-icons ri-stock-line"></i>
        <div>Location Management</div>
      </a>
      <ul class="menu-sub">
        <li class="menu-item {{ (request()->is('admin/location/city*')) ? 'open' : '' }}">
          <a href="{{route('admin.city.index')}}" class="menu-link">
            <div>Cities</div>
          </a>
        </li>
        <li class="menu-item {{ (request()->is('admin/location/pincodes*')) ? 'open' : '' }}">
          <a href="{{route('admin.pincode.index')}}" class="menu-link">
            <div>Pincodes</div>
          </a>
        </li>
      </ul>
    </li>
    <li class="menu-item {{ (request()->is('admin/rider*')) ? 'open' : '' }}">
      <a href="#" class="menu-link menu-toggle waves-effect" target="_blank">
        <i class="menu-icon tf-icons ri-stock-line"></i>
        <div>Rider Management</div>
      </a>
      <ul class="menu-sub">
      <li class="menu-item {{ (request()->is('admin/rider*')) ? 'open' : '' }}">
          <a href="{{route('admin.customer.list')}}" class="menu-link">
            <div>Riders</div>
          </a>
        </li>
        {{-- <li class="menu-item ">
          <a href="https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template/demo-1/app/ecommerce/customer/details/notifications" class="menu-link">
            <div>Customer Details</div>
          </a>
        </li> --}}
      </ul>
    </li>
    <li class="menu-item {{ (request()->is('admin/stock*')) ? 'open' : '' }}" style="">
      <a href="#" class="menu-link menu-toggle waves-effect" target="_blank">
        <i class="menu-icon tf-icons ri-store-line"></i>
        <div>Stock Management</div>
      </a>
      <ul class="menu-sub">
        <li class="menu-item {{ (request()->is('admin/stock/list')) ? 'open' : '' }}">
          <a href="{{route('admin.product.stocks')}}" class="menu-link">
            <div>Product Stock</div>
          </a>
        </li>
      </ul>
    </li>
    <li class="menu-item {{ (request()->is('admin/products*')) ? 'open' : '' }}" style="">
      <a href="#" class="menu-link menu-toggle waves-effect" target="_blank">
        <i class="menu-icon tf-icons ri-store-line"></i>
        <div>Product Management</div>
      </a>
      <ul class="menu-sub">
        <li class="menu-item {{ (request()->is('admin/products/categories*')) ? 'open' : '' }}">
          <a href="{{route('admin.product.categories')}}" class="menu-link">
            <div>Category</div>
          </a>
        </li>
  
        <li class="menu-item {{ (request()->is('admin/products/sub-categories*')) ? 'open' : '' }}">
          <a href="{{route('admin.product.sub_categories')}}" class="menu-link">
            <div>Sub Category</div>
          </a>
        </li>
        <li class="menu-item {{ (request()->is('admin/products/type*')) ? 'open' : '' }}">
          <a href="{{route('admin.product.type')}}" class="menu-link">
            <div>Product Keywords</div>
          </a>
  
        </li>

        <li class="menu-item {{ (request()->is('admin/products/list*')) ? 'open' : '' }}">
          <a href="{{route('admin.product.index')}}" class="menu-link">
            <div>Product list</div>
          </a>
        </li>
      </ul>
    </li>
    <li class="menu-item {{ (request()->is('admin/offer*')) ? 'open' : '' }}" style="">
      <a href="#" class="menu-link menu-toggle waves-effect" target="_blank">
        <i class="menu-icon tf-icons ri-store-line"></i>
        <div>Offer Management</div>
      </a>
      <ul class="menu-sub">
        <li class="menu-item {{ (request()->is('admin/offer/list*')) ? 'open' : '' }}">
          <a href="{{route('admin.offer.list')}}" class="menu-link">
            <div>Offer List</div>
          </a>
        </li>
      </ul>
    </li>
    <li class="menu-item {{ (request()->is('admin/order*')) ? 'open' : '' }}" style="">
      <a href="#" class="menu-link menu-toggle waves-effect" target="_blank">
        <i class="menu-icon tf-icons ri-store-line"></i>
        <div>Order Management</div>
      </a>
      <ul class="menu-sub">
        <li class="menu-item {{ (request()->is('admin/order/list*')) ? 'open' : '' }}">
          <a href="{{route('admin.order.list')}}" class="menu-link">
            <div>Order List</div>
          </a>
        </li>
      </ul>
    </li>
   
    <div class="ps__rail-x" style="left: 0px; bottom: 0px;">
      <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
    </div>
    <div class="ps__rail-y" style="top: 0px; right: 4px;">
      <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div>
    </div>
  </ul>
</aside>
