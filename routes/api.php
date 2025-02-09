<?php
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\OrderController;

Route::prefix('customer')->group(function () {
    // User Registration Route
    Route::post('register', [AuthController::class, 'register']);

    // User Login Route
    Route::post('login', [AuthController::class, 'login']);
    Route::post('requestotp', [AuthController::class, 'requestotp']);
    Route::post('verifyOtp', [AuthController::class, 'verifyOtp']);
    Route::post('resetPassword', [AuthController::class, 'resetPassword']);

     // Protected routes for authenticated users
    //  Route::middleware('auth:sanctum')->group(function () {
        // User Profile Route
        Route::get('profile/{id}', [AuthController::class, 'userProfile']);
        Route::get('home-page',[AuthController::class,'HomePage']);
        Route::get('banners', [AuthController::class, 'fetchBanners']);
        Route::get('faqs', [AuthController::class, 'fetchFaqs']);
        Route::get('product-list', [AuthController::class, 'ProductList']);
        Route::get('product-details/{id}', [AuthController::class, 'ProductDetails']);
        
        // Change Password Route
        Route::post('changePassword', [AuthController::class, 'changePassword']);
        Route::post('update-profile', [AuthController::class, 'updateProfile']);
        Route::get('document-status/{id}', [AuthController::class, 'DocumentStatus']);
        Route::post('update-document', [AuthController::class, 'updateDocument']);
        Route::get('revokeTokens/{id}', [AuthController::class, 'revokeTokens']);

        Route::get('offer-list', [AuthController::class,'OfferList']);
        Route::get('order-history/{user_id}', [AuthController::class,'OrderHistory']);
        Route::get('sell-order-history/{user_id}', [AuthController::class,'SellOrderHistory']);
        Route::get('rent-order-history/{user_id}', [AuthController::class,'RentOrderHistory']);
        Route::get('order-details/{order_id}', [AuthController::class, 'OrderDetails']);
        Route::get('company-policies', [AuthController::class, 'CompanyPolicy']);
        Route::get('company-policy/details/{id}', [AuthController::class, 'CompanyPolicyDetails']);

        Route::get('order/existing-payment-type', [OrderController::class, 'ExistingPaymentType']);
        Route::post('apply/coupon', [OrderController::class, 'ApplyCoupon']);
        Route::post('order/create', [OrderController::class, 'createOrder']);
    // });
});
