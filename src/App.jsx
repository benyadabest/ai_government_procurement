import React, { useState } from 'react';
import { parseFileWithOpenAI } from './services/openaiParser';
import { generateQuotation } from './services/quotationGenerator';

function App() {
  const [currentStep, setCurrentStep] = useState('upload'); // upload, review, quotation
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [missionData, setMissionData] = useState(null);
  const [quotation, setQuotation] = useState(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [confidence, setConfidence] = useState(null);

  const LOCATION_TYPES = [
    { value: 'desert', label: 'Desert Environment' },
    { value: 'cold', label: 'Cold Weather Environment' },
    { value: 'Not included', label: 'Not Specified' }
  ];

  const handleFileUpload = async (uploadedFile) => {
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setProcessing(true);
    setError(null);

    try {
      const fileContent = await uploadedFile.text();
      const parseResult = await parseFileWithOpenAI(fileContent);
      
      if (parseResult.success) {
        setMissionData(parseResult.data);
        setConfidence(parseResult.confidence);
        setCurrentStep('review'); // Go to review step instead of quotation
      } else {
        setError(parseResult.error);
      }
    } catch (err) {
      setError(`Failed to process file: ${err.message}`);
    } finally {
      setProcessing(false);
    }
  };

  const handleFileInput = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      handleFileUpload(uploadedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const uploadedFile = event.dataTransfer.files[0];
    if (uploadedFile) {
      handleFileUpload(uploadedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleGenerateSample = () => {
    const sampleMissionData = {
      mission_name: "Operation Desert Falcon",
      mission_type: "reconnaissance", 
      location_type: "desert",
      threat_level: "medium",
      duration_days: 21,
      budget: "$105,000",
      personnel: [
        {
          role: "infantry",
          count: 4,
          task_assignment: "Security and reconnaissance operations"
        },
        {
          role: "medic", 
          count: 1,
          task_assignment: "Medical support and casualty care"
        },
        {
          role: "communications",
          count: 2,
          task_assignment: "Communication and coordination"
        }
      ],
      special_requirements: "Extra water storage capacity and sand protection required"
    };

    setMissionData(sampleMissionData);
    setConfidence(95);
    setCurrentStep('review'); // Go to review step for sample too
  };

  const handleConfirmAndProceed = () => {
    const newQuotation = generateQuotation(missionData);
    setQuotation(newQuotation);
    setCurrentStep('quotation');
  };

  const handleBackToUpload = () => {
    setCurrentStep('upload');
    setMissionData(null);
    setConfidence(null);
  };

  const handleReset = () => {
    setFile(null);
    setMissionData(null);
    setQuotation(null);
    setError(null);
    setProcessing(false);
    setConfidence(null);
    setCurrentStep('upload');
  };

  const handleMissionDataChange = (field, value) => {
    setMissionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePersonnelChange = (index, field, value) => {
    setMissionData(prev => ({
      ...prev,
      personnel: prev.personnel.map((person, i) => 
        i === index ? { ...person, [field]: value } : person
      )
    }));
  };

  const handleAddPersonnel = () => {
    setMissionData(prev => ({
      ...prev,
      personnel: [...prev.personnel, {
        role: "",
        count: 1,
        task_assignment: ""
      }]
    }));
  };

  const handleRemovePersonnel = (index) => {
    setMissionData(prev => ({
      ...prev,
      personnel: prev.personnel.filter((_, i) => i !== index)
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Group quotation items by personnel role
  const groupItemsByRole = (items) => {
    const grouped = {};
    items.forEach(item => {
      const role = item.assignedTo.split(' (')[0];
      if (!grouped[role]) {
        grouped[role] = [];
      }
      grouped[role].push(item);
    });
    return grouped;
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full max-w-none">
      {/* Main Content */}
      <main className="w-full">
        {currentStep === 'upload' && (
          <>
            {/* Header Section */}
            <div className="bg-white w-full">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
                {/* AI-Powered Section */}
                <div className="mb-8 sm:mb-16 w-full">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-12 text-center px-4">
                    AI-Powered Government Supplier Procurement<span className="text-green-600">.</span>
                  </h1>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12 w-full px-4">
                    {/* First Image */}
                    <div className="relative overflow-hidden rounded-lg shadow-2xl w-full">
                      <div 
                        className="h-48 sm:h-64 md:h-80 lg:h-96 bg-cover bg-center relative w-full"
                        style={{
                          backgroundImage: `url('/Rectangle-100.jpg')`
                        }}
                      >
                      </div>
                    </div>

                    {/* Second Image */}
                    <div className="relative overflow-hidden rounded-lg shadow-2xl w-full">
                      <div 
                        className="h-48 sm:h-64 md:h-80 lg:h-96 bg-cover bg-center relative w-full"
                        style={{
                          backgroundImage: `url('/Rectangle-102.jpg')`
                        }}
                      >
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center w-full px-4">
                  <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                    <button
                      onClick={handleGenerateSample}
                      className="bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-green-700 transition-colors shadow-lg w-full sm:w-auto"
                    >
                      Try Sample Mission
                    </button>
                    <button
                      onClick={() => document.getElementById('file-upload').click()}
                      className="border-2 border-green-600 text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-green-600 hover:text-white transition-colors w-full sm:w-auto"
                    >
                      Upload Documents
                    </button>
                  </div>

                </div>
              </div>
            </div>

            <div className="bg-white py-8 sm:py-16 w-full">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
                {/* How It Works */}
                <div className="text-center mb-8 sm:mb-12 px-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Solving Mission Variability & Equipment Complexity</h2>
                  <p className="text-lg sm:text-xl text-gray-600">Professional equipment quotations powered by AI analysis</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📋</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">1. Upload Documents</h3>
                    <p className="text-sm text-gray-600">Mission briefs, personnel rosters, or operational requirements</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🤖</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">2. AI Extraction</h3>
                    <p className="text-sm text-gray-600">Personnel count/roles, environment, mission type, and special requirements</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🔍</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">3. Review & Edit</h3>
                    <p className="text-sm text-gray-600">Verify and modify extracted data before kit generation</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">✅</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">4. Professional Quotation</h3>
                    <p className="text-sm text-gray-600">Role-based kits with SKUs, pricing, and delivery dates</p>
                  </div>
                </div>
              </div>

              {/* Upload Section */}
              <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-24">
                <div className="bg-gray-50 rounded-lg shadow-xl p-4 sm:p-8 w-full">
                  {processing ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
                      <h3 className="text-xl font-semibold text-gray-800">Processing Document...</h3>
                      <p className="text-gray-600">AI is analyzing your mission file</p>
                    </div>
                  ) : (
                    <>
                      <div 
                        className={`border-2 border-dashed rounded-lg p-12 text-center mb-6 transition-colors ${
                          dragOver ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'
                        }`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                      >
                        <input
                          type="file"
                          onChange={handleFileInput}
                          accept=".txt,.doc,.docx,.pdf"
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer w-full block">
                          <div className="space-y-4 sm:space-y-6 w-full">
                            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">📄</div>
                            <div className="w-full">
                              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Upload Mission Documents</h3>
                              <p className="text-gray-600 mt-2 text-sm sm:text-base">Click to browse or drag and drop your files here</p>
                              <p className="text-xs sm:text-sm text-gray-500 mt-3">
                                Supports multiple files: .txt, .doc, .docx, .pdf • Maximum size: 10MB each
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>

                      <div className="text-center">
                        <button
                          onClick={() => {
                            const sampleContent = `OPERATION DESERT FALCON
CLASSIFICATION: UNCLASSIFIED

MISSION BRIEF:
Operation Desert Falcon is a reconnaissance mission in arid desert terrain.

PERSONNEL REQUIREMENTS:
- 4x Infantry soldiers for reconnaissance and security
- 1x Combat medic for medical support  
- 2x Communications specialists for radio operations

OPERATIONAL ENVIRONMENT:
- Location: Desert region with extreme heat conditions
- Temperature: 110-120°F during day operations

MISSION DURATION: 21 days

BUDGET PARAMETERS:
- Allocated Budget: $15,000 per personnel
- Equipment Budget Cap: $105,000 total
- Budget Classification: Priority 2 - Standard procurement
- Funding Source: Operation Desert Shield Account 2024-OPS-7841
- Budget Constraints: Must not exceed authorized limits

SPECIAL REQUIREMENTS:
- Extra water storage capacity required
- Desert camouflage uniforms mandatory
- Sand protection for sensitive equipment

THREAT ASSESSMENT: Medium threat level`;

                            const blob = new Blob([sampleContent], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'operation_desert_falcon.txt';
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="text-green-600 hover:text-green-800 underline"
                        >
                          📥 Try Sample Mission File To Try The System
                        </button>
                      </div>
                    </>
                  )}

                  {/* Error Display */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-6">
                      <div className="flex items-start">
                        <span className="text-red-500 mr-3">⚠️</span>
                        <div>
                          <h3 className="text-red-800 font-semibold">Processing Error</h3>
                          <p className="text-red-700">{error}</p>
                          <button
                            onClick={() => setError(null)}
                            className="mt-2 text-red-600 hover:text-red-800 underline"
                          >
                            Try again
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {currentStep === 'review' && missionData && (
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Review & Edit Mission Data
              </h2>
              <p className="text-xl text-gray-600">
                Verify and modify the extracted information before generating equipment quotations
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8">
              {/* Confidence Score */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">AI Extraction Confidence</span>
                  <span className="text-sm font-medium text-gray-900">{confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      confidence >= 80 ? 'bg-green-500' : 
                      confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${confidence}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {confidence >= 80 ? 'High confidence - Data extraction looks accurate' :
                   confidence >= 60 ? 'Medium confidence - Please review carefully' :
                   'Low confidence - Please verify all extracted data'}
                </p>
              </div>

              {/* Editable Form */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Mission Overview */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <span className="mr-2">🎯</span> Mission Overview
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-1">Mission Name</label>
                      <input
                        type="text"
                        value={missionData.mission_name}
                        onChange={(e) => handleMissionDataChange('mission_name', e.target.value)}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-1">Mission Type</label>
                      <input
                        type="text"
                        value={missionData.mission_type}
                        onChange={(e) => handleMissionDataChange('mission_type', e.target.value)}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-1">Location Type</label>
                      <select
                        value={missionData.location_type}
                        onChange={(e) => handleMissionDataChange('location_type', e.target.value)}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {LOCATION_TYPES.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-1">Duration (days)</label>
                      <input
                        type="number"
                        value={missionData.duration_days}
                        onChange={(e) => handleMissionDataChange('duration_days', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-1">Budget</label>
                      <input
                        type="text"
                        value={missionData.budget || 'None specified'}
                        onChange={(e) => handleMissionDataChange('budget', e.target.value)}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., $100,000 or Not specified"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-1">Threat Level</label>
                      <input
                        type="text"
                        value={missionData.threat_level}
                        onChange={(e) => handleMissionDataChange('threat_level', e.target.value)}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Personnel Requirements */}
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                    <span className="mr-2">👥</span> Personnel Requirements
                  </h3>
                  <div className="space-y-4">
                    {missionData.personnel.map((person, index) => (
                      <div key={index} className="border-l-4 border-purple-300 pl-4 bg-white p-4 rounded">
                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <div>
                            <label className="block text-xs font-medium text-purple-700 mb-1">Role</label>
                            <select
                              value={person.role}
                              onChange={(e) => handlePersonnelChange(index, 'role', e.target.value)}
                              className="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                            >
                              <option value="">Select Role</option>
                              <option value="infantry">Infantry</option>
                              <option value="medic">Medic</option>
                              <option value="communications">Communications</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-purple-700 mb-1">Count</label>
                            <input
                              type="number"
                              value={person.count}
                              onChange={(e) => handlePersonnelChange(index, 'count', parseInt(e.target.value))}
                              className="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                              min="1"
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="block text-xs font-medium text-purple-700 mb-1">Task Assignment</label>
                          <textarea
                            value={person.task_assignment}
                            onChange={(e) => handlePersonnelChange(index, 'task_assignment', e.target.value)}
                            className="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                            rows="2"
                            placeholder="Describe the tasks and responsibilities for this role..."
                          />
                        </div>
                        {missionData.personnel.length > 1 && (
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleRemovePersonnel(index)}
                              className="text-red-600 hover:text-red-800 text-xs font-medium"
                            >
                              🗑️ Remove Role
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Add Personnel Button */}
                    <div className="text-center">
                      <button
                        onClick={handleAddPersonnel}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                      >
                        ➕ Add Personnel Role
                      </button>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-purple-200">
                      <span className="text-sm font-medium text-purple-700">Total Personnel:</span>
                      <span className="text-purple-900 font-bold ml-2">
                        {missionData.personnel.reduce((sum, p) => sum + p.count, 0)} individuals
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Requirements */}
              <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                  <span className="mr-2">⚠️</span> Special Requirements
                </h3>
                <textarea
                  value={missionData.special_requirements}
                  onChange={(e) => handleMissionDataChange('special_requirements', e.target.value)}
                  className="w-full px-3 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  rows="3"
                  placeholder="Enter any special requirements or constraints..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={handleBackToUpload}
                  className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  ← Back to Upload
                </button>
                <button
                  onClick={handleConfirmAndProceed}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Generate Equipment Quotation →
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'quotation' && quotation && (
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Quotation Header */}
            <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Equipment Quotation</h1>
                  <p className="text-gray-600 text-lg">{quotation.missionName}</p>
                  <p className="text-sm text-gray-500 mt-1">Quotation ID: {quotation.quotationId}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">
                    {formatCurrency(quotation.summary.total)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {quotation.summary.totalItems} items • {quotation.summary.totalWeight} lbs
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium">Environment</div>
                  <div className="text-blue-800 font-semibold capitalize">{quotation.environment}</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm text-purple-600 font-medium">Personnel</div>
                  <div className="text-purple-800 font-semibold">{quotation.summary.totalQuantity} items</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-sm text-orange-600 font-medium">Max Lead Time</div>
                  <div className="text-orange-800 font-semibold">{quotation.summary.maxLeadTime} days</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-600 font-medium">Total Weight</div>
                  <div className="text-green-800 font-semibold">{quotation.summary.totalWeight} lbs</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const csvContent = [
                      ['SKU', 'Item Name', 'Brand', 'Unit Price', 'Quantity', 'Total Price'],
                      ...quotation.items.map(item => [
                        item.sku, item.name, item.brand, 
                        `$${item.unitPrice.toFixed(2)}`, item.quantity, `$${item.totalPrice.toFixed(2)}`
                      ])
                    ].map(row => row.join(',')).join('\n');

                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${quotation.quotationId}_equipment_list.csv`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  📊 Export CSV
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  🖨️ Print
                </button>
                <button
                  onClick={handleReset}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📋 New Mission
                </button>
              </div>
            </div>

            {/* Personnel-Role Based Kits */}
            <div className="space-y-6">
              {quotation.personnel.map((person, index) => {
                const roleItems = quotation.items.filter(item => 
                  item.assignedTo.toLowerCase().includes(person.role.toLowerCase()) && 
                  !item.assignedTo.includes('package')
                );
                
                return (
                  <div key={index} className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="px-8 py-6 bg-gradient-to-r from-green-50 to-blue-50 border-b">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800 capitalize">
                            {person.role} Kit ({person.count}x)
                          </h2>
                          <p className="text-gray-600 mt-1">{person.task_assignment}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">
                            {formatCurrency(roleItems.reduce((sum, item) => sum + item.totalPrice, 0))}
                          </div>
                          <div className="text-sm text-gray-500">
                            {roleItems.length} items • {roleItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0).toFixed(1)} lbs
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="divide-y divide-gray-200">
                      {roleItems.map((item, itemIndex) => (
                        <div key={itemIndex} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                                <div><span className="font-medium">SKU:</span> {item.sku}</div>
                                <div><span className="font-medium">Brand:</span> {item.brand}</div>
                                <div><span className="font-medium">Category:</span> {item.category}</div>
                                <div><span className="font-medium">Lead Time:</span> {item.leadTime} days</div>
                              </div>
                              <div className="flex items-center">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {item.inStock ? 'In Stock' : 'Out of Stock'}
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
                );
              })}

              {/* Environment Package */}
              {quotation.items.some(item => item.assignedTo.includes('package')) && (
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                  <div className="px-8 py-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 capitalize">
                          {quotation.environment} Environment Package
                        </h2>
                        <p className="text-gray-600 mt-1">Environment-specific gear for all personnel</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">
                          {formatCurrency(quotation.items.filter(item => item.assignedTo.includes('package')).reduce((sum, item) => sum + item.totalPrice, 0))}
                        </div>
                        <div className="text-sm text-gray-500">
                          {quotation.items.filter(item => item.assignedTo.includes('package')).length} items
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {quotation.items.filter(item => item.assignedTo.includes('package')).map((item, itemIndex) => (
                      <div key={itemIndex} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                              <div><span className="font-medium">SKU:</span> {item.sku}</div>
                              <div><span className="font-medium">Brand:</span> {item.brand}</div>
                              <div><span className="font-medium">Category:</span> {item.category}</div>
                              <div><span className="font-medium">Lead Time:</span> {item.leadTime} days</div>
                            </div>
                            <div className="flex items-center">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {item.inStock ? 'In Stock' : 'Out of Stock'}
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
              )}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-lg shadow-xl p-8 mt-6">
              <div className="max-w-md ml-auto">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
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
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App; 