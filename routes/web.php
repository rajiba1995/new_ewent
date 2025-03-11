<?php

use Illuminate\Support\Facades\Route;
// Livewire Components
use App\Livewire\AdminLogin;
use App\Http\Controllers\Admin\AuthController;
use App\Livewire\Admin\{CustomerAdd, Dashboard, CustomerIndex, CustomerDetails,OrderIndex,OfferIndex, PolicyDetails, OrderDetail,CityIndex,PincodeIndex};
use App\Livewire\Product\{
    MasterCategory, MasterSubCategory, MasterProduct, AddProduct, UpdateProduct, 
    GalleryIndex, StockProduct, MasterProductType,ProductWiseVehicle,VehicleList
};
use App\Livewire\Master\{BannerIndex, FaqIndex, WhyEwentIndex};

// Public Route for Login

Route::get('admin/login', AdminLogin::class)->name('login');

Route::post('/admin/logout', [AuthController::class, 'logout'])->name('admin.logout');

// Default Root Route
Route::get('/', function () { return redirect()->route('login');});
// Admin Routes - Authenticated and Authorized
Route::middleware(['auth:admin'])->prefix('admin')->group(function () {
    // Dashboard and Customer Routes
    Route::get('dashboard', Dashboard::class)->name('admin.dashboard');
    Route::group(['prefix' => 'rider'], function () {
        Route::get('add', CustomerAdd::class)->name('admin.customer.add');
        Route::get('list', CustomerIndex::class)->name('admin.customer.list');
        Route::get('details/{id}', CustomerDetails::class)->name('admin.customer.details');
    });
    // Product Routes
    Route::group(['prefix' => 'models'], function () {
        Route::get('/list', MasterProduct::class)->name('admin.product.index');
        Route::get('/categories', MasterCategory::class)->name('admin.product.categories');
        Route::get('/sub-categories', MasterSubCategory::class)->name('admin.product.sub_categories');
        Route::get('/keywords', MasterProductType::class)->name('admin.product.type');
        Route::get('/new', AddProduct::class)->name('admin.product.add');
        Route::get('/update/{productId}', UpdateProduct::class)->name('admin.product.update');
        Route::get('/gallery/{product_id}', GalleryIndex::class)->name('admin.product.gallery');
    });

    Route::group(['prefix' => 'stock'], function () {
        Route::get('/list', StockProduct::class)->name('admin.product.stocks');
        Route::get('/vehicle/{product_id}', ProductWiseVehicle::class)->name('admin.product.stocks.vehicle');
    });
    Route::group(['prefix' => 'vehicle'], function () {
        Route::get('/list', VehicleList::class)->name('admin.vehicle.list');
        // Route::get('/vehicle/{product_id}', ProductWiseVehicle::class)->name('admin.product.stocks.vehicle');
    });
    // Order Management
    Route::group(['prefix'=>'order'], function(){
        Route::get('/list', OrderIndex::class)->name('admin.order.list');
        Route::get('/details/{id}', OrderDetail::class)->name('admin.order.detail');
    });
    // Offer Management
    Route::group(['prefix'=>'offer'], function(){
        Route::get('/list', OfferIndex::class)->name('admin.offer.list');
    });

    // Master Routes
    Route::group(['prefix' => 'master'], function () {
        Route::get('/banner', BannerIndex::class)->name('admin.banner.index');
        Route::get('/faq', FaqIndex::class)->name('admin.faq.index');
        Route::get('/why-ewent',WhyEwentIndex::class)->name('admin.why-ewent');
        Route::get('/policy-details',PolicyDetails::class)->name('admin.policy-details');
    });

    // Location Management
    Route::group(['prefix'=>'location'], function(){
        Route::get('/city', CityIndex::class)->name('admin.city.index');
        Route::get('/pincodes', PincodeIndex::class)->name('admin.pincode.index');
    });
});
