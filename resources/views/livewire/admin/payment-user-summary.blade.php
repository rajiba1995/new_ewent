<div>
    <div class="card my-4">
        <div class="card-header pb-0">
          <h6>Payment Summary</h6>
          <div class="row my-3 g-2 align-items-end">
            
            <!-- Rider Filter -->
            <div class="col-md-3">
              <label for="rider" class="form-label text-uppercase small">Select Riders</label>
              <select id="rider" wire:model="rider" class="form-select border border-2 p-2 custom-input-sm">
                <option value="">All Riders</option>
                <option value="1">ImranHashmi</option>
                <option value="2">JohnDoe</option>
              </select>
            </div>
      
            <!-- Product Type -->
            <div class="col-md-2">
              <label class="form-label text-uppercase small">Product Type</label>
              <select wire:model="productType" class="form-select border border-2 p-2 custom-input-sm">
                <option value="">All Types</option>
                <option value="Rental Renewal Charges Weekly">Rental Renewal Charges Weekly</option>
              </select>
            </div>
      
            <!-- Payment Status -->
            <div class="col-md-2">
              <label class="form-label text-uppercase small">Payment Status</label>
              <select wire:model="paymentStatus" class="form-select border border-2 p-2 custom-input-sm">
                <option value="">All</option>
                <option value="created">Created</option>
                <option value="paid">Paid</option>
              </select>
            </div>
      
            <!-- Start Date -->
            <div class="col-md-2">
              <label class="form-label text-uppercase small">Start Date</label>
              <input type="date" wire:model="startDate" class="border border-2 p-2 custom-input-sm form-control">
            </div>
      
            <!-- End Date -->
            <div class="col-md-2">
              <label class="form-label text-uppercase small">End Date</label>
              <input type="date" wire:model="endDate" class="border border-2 p-2 custom-input-sm form-control">
            </div>
      
            <!-- Export Button -->
            <div class="col-md-1 d-grid">
              <button wire:click="exportExcel" class="btn btn-primary mt-3">
                <i class="ri-download-line"></i> Export
              </button>
            </div>
          </div>
        </div>
      
        <div class="card-body px-0 pb-2">
          <div class="table-responsive p-0">
            <table class="table align-items-center mb-0 product-list">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Rider Name / Mobile</th>
                  <th>Product Type</th>
                  <th class="text-center">Vehicle Type</th>
                  <th class="text-center">Amount</th>
                  <th>Transaction ID</th>
                  <th class="text-center">Status</th>
                  <th class="text-center">Action</th>
                  <th class="text-center">Payment Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td><input type="checkbox"></td>
                    <td>ImranHashmi / 8882813229</td>
                    <td>Rental Renewal Charges Weekly</td>
                    <td class="text-center">Kyari</td>
                    <td class="text-center">₹0</td>
                    <td>Order_Q7pZ5KwxolOw5Q</td>
                    <td class="text-center">
                      <span class="badge bg-info text-dark">Created</span>
                    </td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-outline-dark">Sync Payment</button>
                    </td>
                    <td class="text-center">17 Mar 2025<br>4:20 PM</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></td>
                    <td>ImranHashmi / 8882813229</td>
                    <td>Rental Renewal Charges Weekly</td>
                    <td class="text-center">Kyari</td>
                    <td class="text-center">₹0</td>
                    <td>Order_Q7pMJsUn1t7erE</td>
                    <td class="text-center">
                      <span class="badge bg-info text-dark">Created</span>
                    </td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-outline-dark">Sync Payment</button>
                    </td>
                    <td class="text-center">17 Mar 2025<br>4:08 PM</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></td>
                    <td>ImranHashmi / 8882813229</td>
                    <td>Rental Renewal Charges Weekly</td>
                    <td class="text-center">Kyari</td>
                    <td class="text-center">₹1995</td>
                    <td>Order-661345185075</td>
                    <td class="text-center">
                      <span class="badge bg-success">Paid</span>
                    </td>
                    <td class="text-center">NA</td>
                    <td class="text-center">17 Mar 2025<br>4:07 PM</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></td>
                    <td>ImranHashmi / 8882813229</td>
                    <td>Rental Renewal Charges Weekly</td>
                    <td class="text-center">Kyari</td>
                    <td class="text-center">₹1995</td>
                    <td>Order524625563049</td>
                    <td class="text-center">
                      <span class="badge bg-success">Paid</span>
                    </td>
                    <td class="text-center">NA</td>
                    <td class="text-center">17 Mar 2025<br>4:04 PM</td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
</div>
