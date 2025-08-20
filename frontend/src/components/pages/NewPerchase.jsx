import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Package, Building, AlertCircle, Save, X, Eraser,IndianRupee} from 'lucide-react';

const NewPurchase = ({setCurrentPage}) => {
  // Form States
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedBase, setSelectedBase] = useState('');
  const [isNewAsset, setIsNewAsset] = useState(false);
  const [showAssetDetails, setShowAssetDetails] = useState(false);
  
  // Data States
  const [assets, setAssets] = useState([]);
  const [bases, setBases] = useState([]);
  const [loading, setLoading] = useState(false);
   
  // Asset Form Data
  const [assetForm, setAssetForm] = useState({
    asset_name: '',
    category: '',
    asset_serial_number: '',
    manufacturer: '',
    model: '',
    year_manufactured: new Date().getFullYear(),
    condition_status: 'Excellent',
    warranty_expiry: ''
  });

  // Purchase Form Data
  const [purchaseForm, setPurchaseForm] = useState({
    purchase_order_number: '',
    quantity: 1,
    unit_price: '',
    total_amount: '',
    purchase_date: new Date().toISOString().split('T')[0],
    status: 'Pending',
    supplier: ''
  });


  const categories = ['Weapons', 'Vehicles', 'Ammunition', 'Electronics', 'Communications', 'Medical', 'Others'];
  const statusOptions = ['Pending', 'Approved', 'Delivered', 'Cancelled'];
  const conditionOptions = ['Excellent', 'Good', 'Fair', 'Poor'];

  const backToPurchase = ()=>{
       setCurrentPage('purchases')
  }

  const takeAssest = async()=>{
        try{
            const response= await axios.get("http://localhost:3000/asset/getall");
            // setAssetArray(response.data);
            if(response.status ===200){
                console.log("asset details"+response.data);
                setAssets(response.data);
            }
      
        }
        catch(err){
            alert("Failed to fetch asset"+err);
            console.log(err);
        }
  }

  const takeBase = async ()=>{
    try{
        const response= await axios.get("http://localhost:3000/user/getbases");
        if(response.status ===200){
            console.log("base details"+response.data);
            setBases(response.data);
        }
    }
    catch(err){
        alert("Failed to fetch base"+err);
        console.log(err);
    }
  }

  useEffect(() => {
    // Simulate API calls
    takeAssest();
    takeBase();
  }, []);


  
  // Calculate total amount when quantity or unit price changes
  useEffect(() => {
    const quantity = parseFloat(purchaseForm.quantity) || 0;
    const unitPrice = parseFloat(purchaseForm.unit_price) || 0;
    const total = (quantity * unitPrice).toFixed(2);
    setPurchaseForm(prev => ({ ...prev, total_amount: total }));
  }, [purchaseForm.quantity, purchaseForm.unit_price]);

  // Handle asset selection
  const handleAssetChange = (assetId) => {
    setSelectedAsset(assetId);
    
    if (assetId === 'new') {
      setIsNewAsset(true);
      setShowAssetDetails(true);
      // Reset asset form
      setAssetForm({
        asset_name: '',
        category: '',
        asset_serial_number: '',
        manufacturer: '',
        model: '',
        year_manufactured: new Date().getFullYear(),
        condition_status: 'Excellent',
        warranty_expiry: ''
      });
    } else if (assetId) {
      setIsNewAsset(false);
      const asset = assets.find(a => a.asset_id === parseInt(assetId));
      if (asset) {
        setAssetForm({
          asset_name: asset.asset_name,
          category: asset.category,
          asset_serial_number: asset.asset_serial_number,
          manufacturer: asset.manufacturer,
          model: asset.model,
          year_manufactured: asset.year_manufactured || new Date().getFullYear(),
          condition_status: asset.condition_status,
          warranty_expiry: asset.warranty_expiry
        });
        setShowAssetDetails(true);
      }
    } else {
      setIsNewAsset(false);
      setShowAssetDetails(false);
    }
  };

  // Generate Purchase Order Number
  const generatePONumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PO-${year}-${random}`;
  };

  // Handle form submissions
  const handleSubmit = async () => {
    setLoading(true);

    try {
      // // Validate required fields
      if (!selectedBase) {
        alert('Please select a base');
        setLoading(false);
        return;
      }

      if (!selectedAsset && !isNewAsset) {
        alert('Please select an asset or choose to create new');
        setLoading(false);
        return;
      }

      if (!purchaseForm.purchase_order_number || !purchaseForm.unit_price || !purchaseForm.supplier) {
        alert('Please fill all required purchase fields');
        setLoading(false);
        return;
      }

      if (isNewAsset && (!assetForm.asset_name || !assetForm.category || !assetForm.asset_serial_number)) {
        alert('Please fill all required asset fields');
        setLoading(false);
        return;
      }

      // // Prepare data for submission

      const assetData = isNewAsset ? {
        ...assetForm,
        base_id: parseInt(selectedBase),
        total_quantity: parseInt(purchaseForm.quantity),
        available: parseInt(purchaseForm.quantity),
        assigned: 0,
        purchase_price: purchaseForm.total_amount,
        purchase_date: purchaseForm.purchase_date,
        current_status: 'Available'
      } : null;
      const purchaseData = {
        ...purchaseForm,
        base_id: parseInt(selectedBase),
        asset_id:isNewAsset?null:parseInt(selectedAsset),
      };
       
      // console.log('Purchase Data:', purchaseData);
      console.log('Asset Data:', assetData);
     
      if(isNewAsset){
           const response = await axios.post("http://localhost:3000/asset/create",assetData);
           if(response.status===200){
               console.log("asset was created");
           } 
           const AssetRespose = await axios.get("http://localhost:3000/asset/getassetid",{params:{asset_serial_number: assetForm.asset_serial_number}});
            console.log("Assets backend data"+AssetRespose.data.asset_id);
            purchaseData.asset_id = AssetRespose.data.asset_id;

           const resposeOfPurchase = await axios.post("http://localhost:3000/purchase/create",purchaseData);
           if(resposeOfPurchase.status === 200){
              console.log("purchase was created");
           }
      }
      else{
            const resopnseToCheckAssetAndBase = await axios.post("http://localhost:3000/purchase/checkassetandbase",{asset_id:parseInt(selectedAsset),base_id:parseInt(selectedBase)});
            if(resopnseToCheckAssetAndBase.status === 200){
              console.log("Asset and Base match found");
              const responoseOfAsset = await axios.get("http://localhost:3000/asset/getassetbyid",{params:{asset_id:parseInt(selectedAsset)}});
              console.log("Asset data from backend"+responoseOfAsset.data);
              const OldAssetData = responoseOfAsset.data;
              const updatedAssetData = {
                ...OldAssetData,
                available: OldAssetData.available + parseInt(purchaseForm.quantity),
                total_quantity: OldAssetData.total_quantity + parseInt(purchaseForm.quantity),
                purchase_price: purchaseForm.total_amount,
                purchase_date: purchaseForm.purchase_date,
                warranty_expiry: purchaseForm.warranty_expiry
              };
              const updateAssetResponse  = await axios.put("http://localhost:3000/asset/updateasseet",updatedAssetData);
              if(updateAssetResponse.status === 200){
                console.log("Asset updated successfully");
              }
              const resposeOfPurchase = await axios.post("http://localhost:3000/purchase/create",purchaseData);
              if(resposeOfPurchase.status === 200){
                     console.log("purchase was created");
                 }

            }
            else if (resopnseToCheckAssetAndBase.status === 201){
              console.log("Asset and Base do not match");
              
               const responoseOfAsset = await axios.get("http://localhost:3000/asset/getassetbyid",{params:{asset_id:parseInt(selectedAsset)}});
               console.log("msg "+responoseOfAsset);
               const OldAssetData = responoseOfAsset.data;
              
                const newAssetData = {
                      ...OldAssetData,
                      asset_id: undefined, // let DB auto-generate
                      base_id: parseInt(selectedBase),
                      total_quantity: parseInt(purchaseForm.quantity),
                      available: parseInt(purchaseForm.quantity),
                      assigned: 0,
                      purchase_price: purchaseForm.total_amount,
                      purchase_date: purchaseForm.purchase_date,
                      warranty_expiry: purchaseForm.warranty_expiry
                   };

                   const createAssetResponse = await axios.post("http://localhost:3000/asset/create", newAssetData);
                   if (createAssetResponse.status === 200) {
                    console.log("New asset created for this base");
                   }

                   const AssetRespose = await axios.get("http://localhost:3000/asset/getassetid", {
                         params: { asset_serial_number: OldAssetData.asset_serial_number, base_id: selectedBase }
                        });

                    purchaseData.asset_id = AssetRespose.data.asset_id;

                    const resposeOfPurchase = await axios.post("http://localhost:3000/purchase/create", purchaseData);
                    if (resposeOfPurchase.status === 200) {
                           console.log("purchase was created with new base-specific asset");
                    }

            }
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500));

      alert('Purchase order created successfully!');
      
      // // Reset forms
      resetForms();

    } catch (error) {
       console.log(error);
      // console.error('Error creating purchase:', error);
      alert('Failed to create purchase order');
    } finally {
      setLoading(false);
    }
  };

  const resetForms = () => {
    setSelectedAsset('');
    setSelectedBase('');
    setIsNewAsset(false);
    setShowAssetDetails(false);
    setAssetForm({
      asset_name: '',
      category: '',
      asset_serial_number: '',
      manufacturer: '',
      model: '',
      year_manufactured: new Date().getFullYear(),
      condition_status: 'Excellent',
      warranty_expiry: ''
    });
    setPurchaseForm({
      purchase_order_number: '',
      quantity: 1,
      unit_price: '',
      total_amount: '',
      purchase_date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      supplier: ''
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Purchase Order</h1>
            <p className="text-gray-600 mt-1">Create a new purchase order for assets</p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPurchaseForm(prev => ({ ...prev, purchase_order_number: generatePONumber() }))}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Generate PO #
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Base and Asset Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building className="w-5 h-5" />
               Base & Asset Selection
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Base Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Base *
              </label>
              <select
                value={selectedBase}
                onChange={(e) => setSelectedBase(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose a base...</option>
                {bases.map(base => (
                  <option key={base.base_id} value={base.base_id}>
                    {base.base_name} ({base.base_code}) - {base.location}
                  </option>
                ))}
              </select>
            </div>

            {/* Asset Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Asset *
              </label>
              <select
                value={selectedAsset}
                onChange={(e) => handleAssetChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose an asset...</option>
                <option value="new" className="font-semibold text-blue-600">
                  + Create New Asset
                </option>
                <optgroup label="Existing Assets">
                  {assets.map(asset => (
                    <option key={asset.asset_id} value={asset.asset_id}>
                      {asset.asset_name} ({asset.asset_serial_number}) - {asset.category}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>
        </div>

        {/* Asset Details */}
        {showAssetDetails && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5" />
                {isNewAsset ? 'New Asset Details' : 'Asset Information'}
              </h3>
              {!isNewAsset && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Existing Asset
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asset Name *
                </label>
                <input
                  type="text"
                  value={assetForm.asset_name}
                  onChange={(e) => setAssetForm(prev => ({ ...prev, asset_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isNewAsset}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={assetForm.category}
                  onChange={(e) => setAssetForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isNewAsset}
                >
                  <option value="">Select category...</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serial Number *
                </label>
                <input
                  type="text"
                  value={assetForm.asset_serial_number}
                  onChange={(e) => setAssetForm(prev => ({ ...prev, asset_serial_number: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isNewAsset}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Manufacturer
                </label>
                <input
                  type="text"
                  value={assetForm.manufacturer}
                  onChange={(e) => setAssetForm(prev => ({ ...prev, manufacturer: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isNewAsset}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model
                </label>
                <input
                  type="text"
                  value={assetForm.model}
                  onChange={(e) => setAssetForm(prev => ({ ...prev, model: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isNewAsset}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Manufactured
                </label>
                <input
                  type="number"
                  value={assetForm.year_manufactured}
                  onChange={(e) => setAssetForm(prev => ({ ...prev, year_manufactured: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  disabled={!isNewAsset}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition Status
                </label>
                <select
                  value={assetForm.condition_status}
                  onChange={(e) => setAssetForm(prev => ({ ...prev, condition_status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!isNewAsset}
                >
                  {conditionOptions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Warranty Expiry
                </label>
                <input
                  type="date"
                  value={assetForm.warranty_expiry}
                  onChange={(e) => setAssetForm(prev => ({ ...prev, warranty_expiry: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Purchase Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <IndianRupee className="w-5 h-5" />
            Purchase Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Order Number *
              </label>
              <input
                type="text"
                value={purchaseForm.purchase_order_number}
                onChange={(e) => setPurchaseForm(prev => ({ ...prev, purchase_order_number: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="PO-2025-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                value={purchaseForm.quantity}
                onChange={(e) => setPurchaseForm(prev => ({ ...prev, quantity: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit Price *
              </label>
              <input
                type="number"
                step="0.01"
                value={purchaseForm.unit_price}
                onChange={(e) => setPurchaseForm(prev => ({ ...prev, unit_price: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Amount
              </label>
              <input
                type="text"
                value={`${purchaseForm.total_amount}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Date *
              </label>
              <input
                type="date"
                value={purchaseForm.purchase_date}
                onChange={(e) => setPurchaseForm(prev => ({ ...prev, purchase_date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={purchaseForm.status}
                onChange={(e) => setPurchaseForm(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supplier *
              </label>
              <input
                type="text"
                value={purchaseForm.supplier}
                onChange={(e) => setPurchaseForm(prev => ({ ...prev, supplier: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter supplier name"
              />
            </div>
          </div>
        </div>

        {/* Summary Card */}
        {(selectedAsset || showAssetDetails) && selectedBase && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{purchaseForm.quantity || 0}</div>
                <div className="text-sm text-gray-600">Quantity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">${purchaseForm.unit_price || '0.00'}</div>
                <div className="text-sm text-gray-600">Unit Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">${purchaseForm.total_amount || '0.00'}</div>
                <div className="text-sm text-gray-600">Total Amount</div>
              </div>
            </div>
            {isNewAsset && (
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">New Asset Creation</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  This will create a new asset "{assetForm.asset_name}" and add {purchaseForm.quantity} units to inventory.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={resetForms}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eraser className="w-4 h-4 inline mr-2" />
            clear
          </button>
          <button
            type="button"
            onClick={backToPurchase}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4 inline mr-2" />
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <>Processing...</>
            ) : (
              <>
                <Save className="w-4 h-4 inline mr-2" />
                Create Purchase Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPurchase;