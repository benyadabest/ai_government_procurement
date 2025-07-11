import React, { useState } from 'react';
import { Download, Printer, Mail, Package, Clock, Weight, DollarSign, Users, Shield, MapPin } from 'lucide-react';

const QuotationDisplay = ({ quotation }) => {
  const [expandedItems, setExpandedItems] = useState({});

  if (!quotation) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600">No Quotation Generated</h2>
        <p className="text-gray-500">Upload a mission document to generate equipment quotations</p>
      </div>
    );
  }

  const toggleItemExpansion = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const exportQuotation = (format) => {
    if (format === 'csv') {
      const csvContent = [
        ['SKU', 'Item Name', 'Brand', 'Category', 'Unit Price', 'Quantity', 'Total Price', 'Assigned To', 'Lead Time (Days)', 'Weight (lbs)', 'Vendor', 'In Stock'],
        ...quotation.items.map(item => [
          item.sku,
          item.name,
          item.brand,
          item.category,
          `$${item.unitPrice.toFixed(2)}`,
          item.quantity,
          `$${item.totalPrice.toFixed(2)}`,
          item.assignedTo,
          item.leadTime,
          item.weight,
          item.vendor,
          item.inStock ? 'Yes' : 'No'
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${quotation.quotationId}_equipment_list.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'json') {
      const jsonContent = JSON.stringify(quotation, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${quotation.quotationId}_quotation.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Equipment Quotation
            </h1>
            <p className="text-gray-600 text-lg">
              {quotation.missionName}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Quotation ID: {quotation.quotationId}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(quotation.summary.total)}
            </div>
            <div className="text-sm text-gray-500">
              Valid until {formatDate(quotation.validUntil)}
            </div>
          </div>
        </div>

        {/* Mission Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              <div>
                <div className="text-sm text-blue-600 font-medium">Environment</div>
                <div className="text-blue-800 font-semibold capitalize">{quotation.environment}</div>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-purple-600 mr-2" />
              <div>
                <div className="text-sm text-purple-600 font-medium">Personnel</div>
                <div className="text-purple-800 font-semibold">{quotation.summary.totalQuantity} items</div>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-orange-600 mr-2" />
              <div>
                <div className="text-sm text-orange-600 font-medium">Max Lead Time</div>
                <div className="text-orange-800 font-semibold">{quotation.summary.maxLeadTime} days</div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Weight className="w-5 h-5 text-green-600 mr-2" />
              <div>
                <div className="text-sm text-green-600 font-medium">Total Weight</div>
                <div className="text-green-800 font-semibold">{quotation.summary.totalWeight} lbs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => exportQuotation('csv')}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={() => exportQuotation('json')}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </button>
        </div>
      </div>

      {/* Equipment Items */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-8 py-6 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Equipment Configuration</h2>
          <p className="text-gray-600 mt-1">{quotation.items.length} items configured for mission requirements</p>
        </div>

        <div className="divide-y divide-gray-200">
          {quotation.items.map((item, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 mr-3">
                      {item.name}
                    </h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {item.brand}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full ml-2">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                      <span className="font-medium">SKU:</span> {item.sku}
                    </div>
                    <div>
                      <span className="font-medium">Assigned to:</span> {item.assignedTo}
                    </div>
                    <div>
                      <span className="font-medium">Lead Time:</span> {item.leadTime} days
                    </div>
                    <div>
                      <span className="font-medium">Weight:</span> {item.weight} lbs each
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <span className="text-gray-500 text-sm ml-3">
                      Vendor: {item.vendor}
                    </span>
                  </div>
                </div>

                <div className="text-right ml-6">
                  <div className="text-sm text-gray-600">
                    {formatCurrency(item.unitPrice)} × {item.quantity}
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {formatCurrency(item.totalPrice)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow-xl p-8 mt-6">
        <div className="max-w-md ml-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal ({quotation.summary.totalItems} items):</span>
              <span className="font-medium">{formatCurrency(quotation.summary.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (8%):</span>
              <span className="font-medium">{formatCurrency(quotation.summary.tax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-medium">
                {quotation.summary.shipping === 0 ? 'Free' : formatCurrency(quotation.summary.shipping)}
              </span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-green-600">{formatCurrency(quotation.summary.total)}</span>
              </div>
            </div>
          </div>

          {quotation.summary.shipping === 0 && (
            <div className="mt-4 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
              🎉 Free shipping on orders over $10,000!
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      {quotation.specialRequirements && quotation.specialRequirements !== 'Standard operational requirements' && (
        <div className="bg-white rounded-lg shadow-xl p-8 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Special Requirements</h3>
          <p className="text-gray-700">{quotation.specialRequirements}</p>
        </div>
      )}
    </div>
  );
};

export default QuotationDisplay; 