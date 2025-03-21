<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Banner;
use App\Models\WhyEwent;
use App\Models\UserKycLog;
use App\Models\Faq;
use App\Models\Product;
use App\Models\Offer;
use App\Models\RentalPrice;
use App\Models\Order;
use App\Models\AsignedVehicle;
use App\Models\Policy;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    /**
     * Handle user registration.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

    //  private function storeFileWithCustomName($file, $directory)
    // {
    //     // Generate a custom filename: random 4 digits + timestamp + file extension
    //     $filename = rand(1000, 9999) . '_' . time() . '.' . $file->getClientOriginalExtension();

    //     // Store the file in the specified directory and return its path
    //     return $file->storeAs($directory, $filename, 'public');
    // }
    public function register(Request $request)
    {
       // Custom validation rules
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'mobile' => 'required|digits:10|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'address' => 'nullable|string|max:255',
            // 'driving_licence' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            // 'govt_id_card' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            // 'cancelled_cheque' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            // 'current_address_proof' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()->first()
            ], 422);
        }
        DB::beginTransaction();

        try {
            // Initialize paths to null
            // $drivinglicencePath = null;
            // $govtIdCardPath = null;
            // $cancelledChequePath = null;
            // $currentAddressProofPath = null;

            // // Handle file uploads with custom naming if files are provided
            // if ($request->hasFile('driving_licence')) {
            //     $drivinglicencePath = storeFileWithCustomName($request->file('driving_licence'), 'uploads/driving_licences');
            // }
            
            // if ($request->hasFile('govt_id_card')) {
            //     $govtIdCardPath = storeFileWithCustomName($request->file('govt_id_card'), 'uploads/govt_id_cards');
            // }
            
            // if ($request->hasFile('cancelled_cheque')) {
            //     $cancelledChequePath = storeFileWithCustomName($request->file('cancelled_cheque'), 'uploads/cancelled_cheques');
            // }
            
            // if ($request->hasFile('current_address_proof')) {
            //     $currentAddressProofPath = storeFileWithCustomName($request->file('current_address_proof'), 'uploads/address_proofs');
            // }
            // Create the user
            $user = User::create([
                'name' => ucwords($request->name),
                'customer_id' => MakingCustomerId(),
                'mobile' => $request->mobile,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'address' => $request->address,
                // 'driving_licence' => $drivinglicencePath,
                // 'govt_id_card' => $govtIdCardPath,
                // 'cancelled_cheque' => $cancelledChequePath,
                // 'current_address_proof' => $currentAddressProofPath,
            ]);

            // / Commit the transaction
            DB::commit();
            // Return a response with the created user data
            return response()->json([
                'message' => 'User successfully registered',
                'user' => $user
            ], 201);
        } catch (\Exception $e) {
            // Rollback the transaction if anything goes wrong
            DB::rollBack();

            // Return error response
            return response()->json([
                'message' => 'User registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Handle user login and issue token.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

    public function login(Request $request)
    {
     
        // Validate the login request
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string|min:6',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()->first(),
            ], 422);
        }
     
        // Determine if username is an email or mobile number
        $loginField = filter_var($request->username, FILTER_VALIDATE_EMAIL) ? 'email' : 'mobile';
     
        // Additional check for mobile format
        if ($loginField === 'mobile' && !preg_match('/^\d{10}$/', $request->username)) {
            return response()->json([
                'message' => 'Invalid mobile number. It must be a 10-digit number.',
            ], 422);
        }
       
        // Attempt login
        if (Auth::attempt([$loginField => $request->username, 'password' => $request->password])) {
            $user = Auth::guard('sanctum')->user();

            // Use user's name as the token name
            $tokenName = str_replace(' ', '_', $user->name) . '_' . $user->id . '_token';

            // Delete any existing tokens with the same name before generating a new one
            $user->tokens()->where('name', $tokenName)->delete();
        
            // Generate new token using Laravel Sanctum
            $token = $user->createToken($tokenName)->plainTextToken;
            $user->is_verified = CheckUserStatus($user->id);
            $user->rating = AdminRatings($user->id);
            // Return response with token
            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user,
            ], 200);
        }
        // If login fails, return an error response
        return response()->json([
            'message' => 'The provided credentials are incorrect.',
        ], 422);
    }

    // Step 1: Request OTP
    public function requestotp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mobile' => 'required|digits:10|exists:users,mobile',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()->first(),
            ], 422);
        }

        $mobile = $request->mobile;

        // Generate OTP
        // $otp = rand(100000, 999999);
        $otp = 1234;

        // Store OTP in a database or cache (e.g., Redis)
        DB::table('password_reset_tokens')->updateOrInsert(
            ['mobile' => $mobile],
            ['otp' => $otp, 'created_at' => now()]
        );

        // Send OTP to mobile (using a hypothetical sendSms function)
        // $this->sendSms($mobile, "Your OTP is: $otp");

        return response()->json([
            'message' => 'OTP sent to your mobile number.',
        ], 200);
    }

     // Step 2: Verify OTP
     public function verifyOtp(Request $request)
     {
         $validator = Validator::make($request->all(), [
             'mobile' => 'required|digits:10|exists:users,mobile',
             'otp' => 'required|digits:4',
         ]);
 
         if ($validator->fails()) {
             return response()->json([
                'status' => false,
                 'message' => 'Validation failed',
                 'errors' => $validator->errors()->first(),
             ], 422);
         }
 
         $mobile = $request->mobile;
         $otp = $request->otp;
 
         // Check OTP in the database
         $record = DB::table('password_reset_tokens')
             ->where('mobile', $mobile)
             ->where('otp', $otp)
             ->first();
             
         if (!$record || now()->diffInSeconds($record->created_at) > 60) {
             return response()->json([
                 'message' => 'Invalid or expired OTP.',
             ], 422);
         }
 
         // Mark OTP as verified (optional, cleanup can be added)
         return response()->json([
             'message' => 'OTP verified successfully.',
         ], 200);
     }

     // Step 3: Reset Password
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mobile' => 'required|digits:10|exists:users,mobile',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()->first(),
            ], 422);
        }

        $mobile = $request->mobile;
        $password = $request->password;

        // Update user's password
        $user = User::where('mobile', $mobile)->first();
        $user->password = Hash::make($password);
        $user->save();

        // Cleanup OTP record
        DB::table('password_reset_tokens')->where('mobile', $mobile)->delete();

        return response()->json([
            'message' => 'Password reset successfully.',
        ], 200);
    }

    protected function getAuthenticatedUser()
    {
        $user = Auth::guard('sanctum')->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthenticated'
            ], 401);
        }

        return $user;
    }
    public function userProfile()
    {
        $user = $this->getAuthenticatedUser();
        if ($user instanceof \Illuminate\Http\JsonResponse) {
            return $user; // Return the response if the user is not authenticated
        }
        
        // Check if the user exists
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found.',
            ], 404); // 404 Not Found
        }
    
        // Return the user profile data
        return response()->json([
            'data' => $user,
            'message' => 'User profile retrieved successfully.',
        ], 200);
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user' => 'required|exists:users,id', // Ensure the ID exists in the users table
            'current_password' => 'required',
            'new_password' => 'required|min:6|confirmed',
        ]);
        // dd($validator);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()->first()
            ], 422);
        }
        // Find the user by ID
        $user = User::find($request->user);
    
        // If the user is not found, return a response
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found.',
            ], 404); // 404 Not Found
        }
    
        // Verify the current password
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Current password is incorrect.',
            ], 400); // 400 Bad Request
        }
    
        // Update the password
        $user->update([
            'password' => Hash::make($request->new_password),
        ]);
    
        return response()->json([
            'status' => true,
            'message' => 'Password changed successfully.',
        ], 200);
    }
    public function fetchBanners()
    {
        // Fetch active banners (status = 1)
        $banners = Banner::where('status', 1)->orderBy('id', 'desc')->get();

        // Check if any banners are found
        if ($banners->isEmpty()) {
            // Return response if no active banners are found
            return response()->json([
                'status' => false,
                'message' => 'No active banners available.',
                'data' => [],
            ], 404); // 404 Not Found
        }

        // Return response with banners data
        return response()->json([
            'status' => true,
            'message' => 'Banners fetched successfully.',
            'data' => $banners,
        ], 200); // 200 OK
    }

    public function fetchFaqs()
    {
        $faqs = Faq::orderBy('question', 'ASC')->get();
    
        if ($faqs->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'No faqs available.',
                'data' => [],
            ], 404); 
        }

        return response()->json([
            'status' => true,
            'message' => 'Faqs fetched successfully.',
            'data' => $faqs,
        ], 200); 
    }

    // profile update
    public function updateProfile(Request $request){
         // Validate the request data
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:users,id', // Ensure the ID exists in the users table
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'email' => [
                'required',
                'email',
                // Check that the email is unique except for the given user_id
                Rule::unique('users', 'email')->ignore($request->id, 'id'),
            ],
            'mobile' => [
                'required',
                'digits:10',
                // Check that the mobile is unique except for the given user_id
                Rule::unique('users', 'mobile')->ignore($request->id, 'id'),
            ],
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()->first(),
            ], 422);
        }

        $user = User::where('id', $request->id)->first();
        $user->name = ucwords($request->name);
        $user->address = $request->address;
        $user->email = $request->email;
        $user->mobile = $request->mobile;
       // Handle image upload (if provided)
        if ($request->hasFile('image')) {
            $image = storeFileWithCustomName($request->file('image'), 'uploads/user');
            $user->profile_image = $image;
        }
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Profile updated successfully!',
            'data' => $user,
        ], 200); 
    }
    public function updateDocument(Request $request){
        $user = $this->getAuthenticatedUser();
        if ($user instanceof \Illuminate\Http\JsonResponse) {
            return $user; // Return the response if the user is not authenticated
        }
        $validator = Validator::make($request->all(), [
            'driving_licence' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'driving_licence_back' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'govt_id_card' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'govt_id_card_back' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'cancelled_cheque' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'cancelled_cheque_back' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'current_address_proof' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'current_address_proof_back' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()->first(),
            ], 422);
        }

        $user = User::where('id', $user->id)->first();
        // dd($request->hasFile('driving_licence'));
       // Handle image upload (if provided)
        if ($request->hasFile('driving_licence') || $request->hasFile('driving_licence_back')) {
            $driving_licence = storeFileWithCustomName($request->file('driving_licence'), 'uploads/driving_licences');
            $user->driving_licence = $driving_licence;
            $driving_licence_back = storeFileWithCustomName($request->file('driving_licence_back'), 'uploads/driving_licences');
            $user->driving_licence_back = $driving_licence_back;
            $user->driving_licence_status = 1;
          
            UserKycLog::updateOrCreate( 
            [
                'user_id' => $user->id, 
                'document_type' => 'Driving Licence' // Another condition
            ],
            [
                'status' => 'Uploaded', // Value to be updated/inserted
                'updated_at' => date('Y-m-d h:i:s') 
            ]);
        }
        if ($request->hasFile('govt_id_card') || $request->hasFile('govt_id_card_back')) {
            $govt_id_card = storeFileWithCustomName($request->file('govt_id_card'), 'uploads/govt_id_cards');
            $user->govt_id_card = $govt_id_card;
            $govt_id_card_back = storeFileWithCustomName($request->file('govt_id_card_back'), 'uploads/govt_id_cards');
            $user->govt_id_card_back = $govt_id_card_back;
            $user->govt_id_card_status = 1;
            UserKycLog::updateOrCreate( 
                [
                    'user_id' => $user->id, 
                    'document_type' => 'Govt ID Card' // Another condition
                ],
                [
                    'status' => 'Uploaded', // Value to be updated/inserted
                    'updated_at' => date('Y-m-d h:i:s') 
                ]);
        }
        if ($request->hasFile('cancelled_cheque') || $request->hasFile('cancelled_cheque_back')) {
            $cancelled_cheque = storeFileWithCustomName($request->file('cancelled_cheque'), 'uploads/cancelled_cheques');
            $user->cancelled_cheque = $cancelled_cheque;
            $cancelled_cheque_back = storeFileWithCustomName($request->file('cancelled_cheque_back'), 'uploads/cancelled_cheques');
            $user->cancelled_cheque_back = $cancelled_cheque_back;
            $user->cancelled_cheque_status = 1;
            UserKycLog::updateOrCreate( 
                [
                    'user_id' => $user->id, 
                    'document_type' => 'Cancelled Cheque' // Another condition
                ],
                [
                    'status' => 'Uploaded', // Value to be updated/inserted
                    'updated_at' => date('Y-m-d h:i:s') 
                ]);
        }
        if ($request->hasFile('current_address_proof') || $request->hasFile('current_address_proof_back')) {
            $current_address_proof = storeFileWithCustomName($request->file('current_address_proof'), 'uploads/address_proofs');
            $user->current_address_proof = $current_address_proof;
            $current_address_proof_back = storeFileWithCustomName($request->file('current_address_proof_back'), 'uploads/address_proofs');
            $user->current_address_proof_back = $current_address_proof_back;
            $user->current_address_proof_status = 1;
            UserKycLog::updateOrCreate( 
                [
                    'user_id' => $user->id, 
                    'document_type' => 'Current Address Proof' // Another condition
                ],
                [
                    'status' => 'Uploaded', // Value to be updated/inserted
                    'updated_at' => date('Y-m-d h:i:s') 
                ]);
        }
        $user->status = 1;
        $user->is_verified = 'unverified';
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Profile document updated successfully!',
            'data' => $user,
        ], 200); 
    }
    
    public function revokeTokens($id)
    {
        try {
            // Delete tokens where tokenable_id matches the user ID
            DB::table('personal_access_tokens')
                ->where('tokenable_id', $id)
                ->delete();
            return response()->json([
                'status' => true,
                'message' => 'All tokens for the user have been removed successfully.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to remove tokens.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function ProductList(Request $request)
    {
        // Capture the search term from the request
        $search = $request->input('search'); // Assuming 'search' is passed as a query parameter

        // Retrieve products based on the search criteria
        $products = Product::query()
        ->select(
            'id',
            'title',
            'position',
            'types',
            'short_desc',
            'is_driving_licence_required',
            'image',
            'status'
        )
        ->when($search, function ($query) use ($search) {
            // Group search conditions with OR logic
            $query->where(function ($query) use ($search) {
                $query->where('title', 'like', '%' . $search . '%')
                    ->orWhere('types', 'like', '%' . $search . '%');
            });
        })
        ->with([
            'rentalprice' => function ($query) {
                $query->select('id', 'product_id', 'duration','subscription_type', 'deposit_amount', 'rental_amount'); // Select only necessary columns
            },
            'category:id,title',      // Load specific columns for 'category'
            'subCategory:id,title',   // Load specific columns for 'subcategory'
            'features:id,product_id,title'       // Load specific columns for 'features'
        ])
        ->where('status', 1) // Filter active products
        ->orderBy('position', 'ASC') // First order by position
        ->orderBy('title', 'ASC') // Then order by title
        ->get();

        // Process each product to set rental price details
        foreach ($products as $product) {
            $rental = $product->rentalprice->first();
            $product->subscription_type = $rental ? $rental->subscription_type : 0;
            $product->deposit_amount = $rental ? $rental->deposit_amount : 0;
            $product->rental_duration = $rental ? $rental->duration : 0;
            $product->rental_amount = $rental ? $rental->rental_amount : 0;
        }
        // Return the product list as a JSON response
        return response()->json([
            'status' => true,
            'data' => $products,
            'message' => 'Getting product list.',
        ], 200);
    }
    
    public function ProductDetails($id)
    {
        $user = $this->getAuthenticatedUser();
        if ($user instanceof \Illuminate\Http\JsonResponse) {
            return $user; // Return the response if the user is not authenticated
        }

        // Retrieve the product by ID and ensure it's active (status = 1)
        $data = Product::where('id', $id)
            ->where('status', 1)
            ->with([
                'rentalprice' => function ($query) {
                    $query->select('id', 'product_id', 'duration', 'subscription_type','deposit_amount', 'rental_amount');
                },
                'ProductImages:product_id,image', // Eager load product images
                'category:id,title',             // Eager load category with specific columns
                'subCategory:id,title',           // Eager load sub-category with specific columns
                'features:id,product_id,title'           // Eager load sub-category with specific columns
            ])
            ->first();

 
        // Check if product exists
        if (!$data) {
            return response()->json(['status' => false, 'message' => 'Product not found'], 404);
        }

        // Combine all images into a single array
        $allImages = collect($data->ProductImages)
            ->pluck('image') // Get all images from the relationship
            ->prepend($data->image) // Add the main image at the beginning
            ->unique() // Ensure no duplicate images
            ->toArray(); // Convert to array

        $allfeatures = collect($data->features)
            ->pluck('title') // Get all images from the relationship
            ->unique() // Ensure no duplicate images
            ->toArray(); 
        $product_features = [];
        if(count($allfeatures)>0){
            foreach($allfeatures as $k=>$fitem){
                $product_features[] =$fitem;
            }
        }
        $related_products = Product::select(
            'id',
            'title',
            'position',
            'types',
            'short_desc',
            'image',
            'category_id',
            'sub_category_id',
            'status'
        )
        ->where('id', '!=', $data->id) // Exclude the current product
        ->where('status', 1) // Ensure the product is active
        ->where(function ($query) use ($data) {
            $query->where('category_id', $data->category_id) // Match the same category
                    ->orWhere('sub_category_id', $data->sub_category_id); // Or match the same sub-category
        })
        ->orderBy('position', 'ASC') // Order by position first
        ->orderBy('title', 'ASC') // Then order by title
        ->limit(10) // Limit to 10 results
        ->get();
            
        // Prepare product details object
        $product_data = (object) [];
        // $product_data->stock_qty = $data->stock_qty;
        $product_data->id = $data->id;
        $product_data->title = $data->title;
        $product_data->types = $data->types;
        $product_data->short_desc = $data->short_desc;
        // $product_data->long_desc = $data->long_desc;
        $product_data->category = $data->category ? $data->category->title : null;
        $product_data->sub_category = $data->subCategory ? $data->subCategory->title : null;
        // $product_data->is_selling = $data->is_selling;
        // $product_data->base_price = $data->base_price;
        // $product_data->display_price = $data->display_price;
        // $product_data->is_rent = $data->is_rent;
        // $product_data->rent_duration = $data->rent_duration;
        // $product_data->per_rent_price = $data->per_rent_price;
        $product_data->status = $data->status;
        $product_data->all_features = $product_features;
        $product_data->all_images = $allImages; // Set combined images array
        $product_data->rental_price = $data->rentalprice;
        $product_data->related_products = $related_products;
        $product_data->is_driving_licence_required = $data->is_driving_licence_required;
        $product_data->customer_reviews = ProductReviews($data->id);
        // Return the product details as a JSON response
        $features = $allfeatures;
        return response()->json([
            'status' => true,
            'data' => $product_data,
            'message' => 'Getting product details.'
        ], 200);
    }
    public function HomePage()
    {
        // Fetching the banners
        $banners = Banner::where('status', 1)->orderBy('id', 'desc')->get();
        $why_ewent = WhyEwent::where('status', 1)->orderBy('id', 'desc')->get();
        
        // Fetching the FAQs
        $faqs = Faq::orderBy('question', 'ASC')->get();
        
        // Fetching the products with eager loading
        $products = Product::select('id', 'title', 'position', 'types', 'short_desc', 'image', 'status', 'is_driving_licence_required')->where('status', 1)
            ->with([
                'rentalprice' => function ($query) {
                    $query->select('id', 'product_id', 'duration', 'subscription_type', 'deposit_amount', 'rental_amount'); // Select only necessary columns
                }     // Load specific columns for 'features'
            ])
            ->orderBy('position', 'ASC')
            ->orderBy('title', 'ASC') // Order products by title
            ->limit(10)
            ->get();
            foreach ($products as $product) {
                $rental = $product->rentalprice->first();
                $product->subscription_type = $rental ? $rental->subscription_type : 0;
                $product->deposit_amount = $rental ? $rental->deposit_amount : 0;
                $product->rental_duration = $rental ? $rental->duration : 0;
                $product->rental_amount = $rental ? $rental->rental_amount : 0;
            }
        // Check if there are any banners, FAQs, or products
        if ($banners->isEmpty() && $faqs->isEmpty() && $products->isEmpty()) {
            // Return a response if no data is found
            return response()->json([
                'status' => false,
                'message' => 'No data found',
            ], 404);
        }
    
        // Prepare a single array for the API response
        $response = [
            'why_ewent' => $why_ewent,
            'banners' => $banners,
            'faqs' => $faqs,
            'products' => $products
        ];
    
        // Return the data if found
        return response()->json([
            'status' => true,
            'response' => $response,
            'message' => 'Home page data',
        ], 200);
    }

    public function DocumentStatus(){
        $user = $this->getAuthenticatedUser();
        if ($user instanceof \Illuminate\Http\JsonResponse) {
            return $user; // Return the response if the user is not authenticated
        }
        $documents= [];
       
        $data = User::select('id', 'driving_licence as driving_licence_front', 'driving_licence_back','driving_licence_status', 'govt_id_card as govt_id_card_front', 'govt_id_card_back', 'govt_id_card_status', 'cancelled_cheque as cancelled_cheque_front', 'cancelled_cheque_back','cancelled_cheque_status', 'current_address_proof as current_address_front','current_address_proof_back', 'current_address_proof_status')->where('id',$user->id)->first();
         // Check if product exists
        if (!$data) {
            return response()->json(['status' => false, 'message' => 'User not found'], 404);
        }

        $documents['Driving Licence'] = [
            'front' =>$data->driving_licence_front,
            'back'=>$data->driving_licence_back,
            'status' =>$data->driving_licence_status,
        ];

        $documents['Govt ID Card'] = [
            'front' =>$data->govt_id_card_front,
            'back'=>$data->govt_id_card_back,
            'status' =>$data->govt_id_card_status,
        ];

        $documents['Cancelled Cheque'] = [
            'front' =>$data->cancelled_cheque_front,
            'back'=>$data->cancelled_cheque_back,
            'status' =>$data->cancelled_cheque_status,
        ];

        $documents['Current Address Proof'] = [
            'front' =>$data->current_address_front,
            'back'=>$data->current_address_proof_back,
            'status' =>$data->current_address_proof_status,
        ];


        $documents['Driving Licence']['history'] = UserKycLog::where('user_id', $user->id)->where('document_type', 'Driving Licence')->orderBy('id', 'ASC')->get()->map(function ($item) {
            $item->date = \Carbon\Carbon::parse($item->created_at)->format('d-m-Y h:i A'); // Format Date
            return $item;
        })->toArray();

        $documents['Govt ID Card']['history'] = UserKycLog::where('user_id', $user->id)->where('document_type', 'Govt ID Card')->orderBy('id', 'ASC')->get()->map(function ($item) {
            $item->date = \Carbon\Carbon::parse($item->created_at)->format('d-m-Y h:i A'); // Format Date
            return $item;
        })->toArray();

        $documents['Cancelled Cheque']['history'] = UserKycLog::where('user_id', $user->id)->where('document_type', 'Cancelled Cheque')->orderBy('id', 'ASC')->get()->map(function ($item) {
            $item->date = \Carbon\Carbon::parse($item->created_at)->format('d-m-Y h:i A'); // Format Date
            return $item;
        })->toArray();

        $documents['Current Address Proof']['history'] = UserKycLog::where('user_id', $user->id)->where('document_type', 'Current Address Proof')->orderBy('id', 'ASC')->get()->map(function ($item) {
            $item->date = \Carbon\Carbon::parse($item->created_at)->format('d-m-Y h:i A'); // Format Date
            return $item;
        })->toArray();

        // dd($documents);
        // Return the data if found
        return response()->json([
            'status' => true,
            'response' => $documents,
            'message' => 'User Document Status',
        ], 200);
    }

    public function OfferList(){
        $data = Offer::where('status', 'active')->orderBy('coupon_code', 'ASC')->get();
        if(count($data)==0){
            return response()->json(['status'=>false, 'message'=>'offer not found!'], 404);
        }
        return response()->json(['status'=>true, 'response'=>$data, 'message'=>'Offer Listing'], 200);
    }

    public function OrderHistory($user_id){
        $data = Order::where('user_id', $user_id)->orderBy('id', 'DESC')->get();
        if(count($data)==0){
            return response()->json(['status'=>false, 'message'=>'oder not found!'], 404);
        }

        return response()->json(['status'=>true, 'response'=>$data, 'message'=>'Order Listing'],200);
    }
    public function SellOrderHistory($user_id){
        $data = Order::where('user_id', $user_id)->where('order_type', 'Sell')->orderBy('id', 'DESC')->get();
        if(count($data)==0){
            return response()->json(['status'=>false, 'message'=>'Order not found!'], 404);
        }

        return response()->json(['status'=>true, 'response'=>$data, 'message'=>'Order listing'],200);
    }
    public function RentOrderHistory($user_id){
        $data = Order::where('user_id', $user_id)->where('order_type', 'Rent')->orderBy('id', 'DESC')->get();
        if(count($data)==0){
            return response()->json(['status'=>false, 'message'=>'Order not found!'], 404);
        }

        return response()->json(['status'=>true, 'response'=>$data, 'message'=>'Order listing'],200);
    }

    public function OrderDetails($order_id){
        $order = Order::where('id', $order_id)->first();
        if(!$order){
            return response()->json(['status'=>false, 'message'=>'data not found!'], 404);
        }
        return response()->json(['status'=>true, 'response'=>$order, 'message'=>'Data successfully retrieved'],200);
    }

    public function CompanyPolicy(){
        $data = Policy::orderBy('title', 'DESC')->get();
        if(count($data)==0){
            return response()->json(['status'=>false, 'message'=>'Data not found!'], 404);
        }

        return response()->json(['status'=>true, 'response'=>$data, 'message'=>'Data successfully retrieved'],200);
    }
    public function CompanyPolicyDetails($id){
        $data = Policy::where('id', $id)->first();
        if(!$data){
            return response()->json(['status'=>false, 'message'=>'data not found!'], 404);
        }
        return response()->json(['status'=>true, 'response'=>$data, 'message'=>'Data successfully retrieved'],200);
    }

    public function bookNow(Request $request){
        $user = $this->getAuthenticatedUser();
        if ($user instanceof \Illuminate\Http\JsonResponse) {
            return $user; // Return the response if the user is not authenticated
        }

        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id', // Ensure 'id' column exists
            'is_driving_licence_required' => 'required', // If it's a boolean
            'user_id' => 'required|exists:users,id', // Ensure 'id' column exists
            'subscription_type' => 'required|string|max:255',
            'deposit_amount' => 'required|numeric', // Ensure it's a number
            'rental_amount' => 'required|numeric',
            'total_amount' => 'required|numeric',
        ]);
        
       
        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed. Please check the errors below.',
                'errors' => $validator->errors()->first(), // Return all errors instead of only the first
            ], 422);
        }

        // // Check User Verification
        // if ($user->is_verified!=="verified") {
        //     return response()->json([
        //         'status' => false, 
        //         'message' => "Your KYC status is currently $user->is_verified Please verify your KYC to continue."
        //     ], 404);
        // }

        // // Check Driving Licence Verification
        // if ($request->is_driving_licence_required==1 && $user->driving_licence_status!=2) {
        //     return response()->json([
        //         'status' => false, 
        //         'message' => "Your driving licence verification is pending. Please complete the verification to continue."
        //     ], 404);
        // }

        // // Assuming assigned_vehicle holds the assigned vehicle data
        // $assigned_vehicle = AsignedVehicle::where('user_id', $user->id)->where('status', 'assigned')->get()->count();
        // if($assigned_vehicle>0){
        //     return response()->json([
        //         'status' => false, 
        //         'message' => "You already have an assigned vehicle. Please use it or return it before booking a new one."
        //     ], 404);
        // }


        $RentalPrice = RentalPrice::where('product_id', $request->product_id)->where('subscription_type', $request->subscription_type)->first();
        if(!$RentalPrice){
            return response()->json([
                'status' => false, 
                 'message' => "This vehicle is not available for the selected duration."
            ], 404);
        }

        $total_amount = $RentalPrice->deposit_amount+$RentalPrice->rental_amount;
        if($request->total_amount!=$total_amount){
            return response()->json([
                'status' => false, 
                  'message' => "The total amount does not match the required amount. Please check and try again."
            ], 404);
        }

        DB::beginTransaction();
        try{
            $existing_order = Order::where('user_id', $request->user_id)->where('rent_status', 'await')->orderBy('id', 'DESC')->first();
            if($existing_order){
                $existing_order->update([
                    'user_id' => $request->user_id,
                    'product_id' => (int)$request->product_id,
                    'deposit_amount' =>$RentalPrice->deposit_amount,
                    'rental_amount' => $RentalPrice->rental_amount,
                    'total_price' => $total_amount,
                    'final_amount' => $total_amount,
                    'quantity' => 1,
                    'payment_mode' => "Online",
                    // 'shipping_address' => $request->shipping_address,
                    'rent_duration' => $RentalPrice->duration,
                    'rent_status' => "await",
                ]);
                $order = $existing_order;
            }else{
                // dd($RentalPrice);
                $order = Order::create([
                    'user_id' => $request->user_id,
                    'order_type' => 'Rent',
                    'order_number' => generateOrderNumber(),
                    'product_id' => (int)$request->product_id,
                    'deposit_amount' =>$RentalPrice->deposit_amount,
                    'rental_amount' => $RentalPrice->rental_amount,
                    'total_price' => $total_amount,
                    'final_amount' => $total_amount,
                    'quantity' => 1,
                    'payment_mode' => "Online",
                    // 'shipping_address' => $request->shipping_address,
                    'rent_duration' => $RentalPrice->duration,
                    'rent_status' => "await",
                ]);
            }
                

                DB::commit();

                return response()->json([
                    'status' => true,
                    'message' => 'Order created successfully.',
                    'order' => $order,
                ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Failed to create order.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function myActiveSubscription(){
        $user = $this->getAuthenticatedUser();
        if ($user instanceof \Illuminate\Http\JsonResponse) {
            return $user; // Return the response if the user is not authenticated
        }
        $order = Order::with('vehicle','product')->where('user_id', $user->id)->whereIn('rent_status', ['await','active', 'suspended'])->first();
        if($order){
            $data= [
                'id' => $order->id,
                'order_type' =>$order->order_type,
                'order_number'=>$order->order_number,
                'deposit_amount'=>$order->deposit_amount,
                'rental_amount'=>$order->rental_amount,
                'final_amount'=>$order->final_amount,
                'payment_mode'=>$order->payment_mode,
                'payment_status'=>$order->payment_status,
                'rent_duration'=>$order->rent_duration.' Days',
                'rent_status'=>$order->rent_status,
                'model'=>$order->product?$order->product->title:"N/A",
                'vehicle'=>$order->vehicle?$order->vehicle->stock->vehicle_number:"N/A",
                'vehicle_status' =>$order->vehicle?$order->vehicle->status:"N/A",
                'rent_start_date' =>$order->vehicle?$order->vehicle->start_date:"N/A",
                'rent_end_date' =>$order->vehicle?$order->vehicle->end_date:"N/A",
                'assigned_at' =>$order->vehicle?$order->vehicle->assigned_at:"N/A",
            ];
            return response()->json([
                'status' => true, 
                'data' => $data, 
                'message' => "You have a subscription."
            ], 200);
        }else{
            return response()->json([
                'status' => false, 
                'message' => "No active subscription found."
            ], 404);
        }
        

    }

}
