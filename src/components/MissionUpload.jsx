import React, { useState } from 'react';
import { Upload, Download, CheckCircle, AlertCircle, FileText, Loader } from 'lucide-react';
import { parseFileWithOpenAI } from '../services/openaiParser';

const MissionUpload = ({ onMissionParsed }) => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = async (uploadedFile) => {
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setProcessing(true);
    setError(null);
    setResult(null);

    try {
      const fileContent = await uploadedFile.text();
      const parseResult = await parseFileWithOpenAI(fileContent);
      
      if (parseResult.success) {
        setResult(parseResult);
        if (onMissionParsed) {
          onMissionParsed(parseResult.data);
        }
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

  const downloadSampleFile = () => {
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
  };

  const resetUpload = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Mission Equipment Configurator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Upload mission documents to automatically generate equipment configurations and quotations
        </p>
        <div className="mt-4 text-sm text-gray-500">
          From Mission Requirements to Ready-to-Order Kits in Minutes
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-xl p-8">
        {/* Upload Section */}
        {!result && (
          <>
            <div 
              className={`border-2 border-dashed rounded-lg p-12 text-center mb-6 transition-colors ${
                dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
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
                disabled={processing}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {processing ? (
                  <div className="space-y-4">
                    <Loader className="animate-spin rounded-full h-16 w-16 text-blue-600 mx-auto" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Processing Document...</h3>
                      <p className="text-gray-600">AI is analyzing your mission file</p>
                      <div className="mt-4 text-sm text-gray-500">
                        Extracting personnel requirements, environment, and mission parameters
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Upload Mission Document</h3>
                      <p className="text-gray-600 mt-2">Click to browse or drag and drop your file here</p>
                      <p className="text-sm text-gray-500 mt-3">
                        Supports .txt, .doc, .docx, .pdf files • Maximum size: 10MB
                      </p>
                    </div>
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        Mission Briefs
                      </div>
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        Personnel Rosters
                      </div>
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        Operation Orders
                      </div>
                    </div>
                  </div>
                )}
              </label>
            </div>

            <div className="text-center">
              <button
                onClick={downloadSampleFile}
                className="text-blue-600 hover:text-blue-800 underline flex items-center mx-auto transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download sample mission file to try the system
              </button>
            </div>
          </>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-red-500 mr-3 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-red-800 font-semibold text-lg">Processing Error</h3>
                <p className="text-red-700 mt-1">{error}</p>
                <button
                  onClick={resetUpload}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {result && result.success && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                <div>
                  <h3 className="text-green-800 font-semibold text-lg">
                    Mission Analysis Complete (Confidence: {result.confidence}%)
                  </h3>
                  <p className="text-green-700">Mission data extracted successfully and ready for equipment configuration</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-4 text-lg">Mission Overview</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Name:</span>
                    <span>{result.data.mission_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Type:</span>
                    <span className="capitalize">{result.data.mission_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Environment:</span>
                    <span className="capitalize">{result.data.location_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Duration:</span>
                    <span>{result.data.duration_days} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Threat Level:</span>
                    <span className="capitalize">{result.data.threat_level}</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-4 text-lg">Personnel Requirements</h4>
                <div className="space-y-3">
                  {result.data.personnel.map((person, index) => (
                    <div key={index} className="border-l-4 border-purple-300 pl-4">
                      <div className="font-semibold text-purple-900">
                        {person.count}x {person.role.charAt(0).toUpperCase() + person.role.slice(1)}
                      </div>
                      <div className="text-purple-700 text-sm mt-1">
                        {person.task_assignment}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {result.data.special_requirements !== 'Not included' && (
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-3 text-lg">Special Requirements</h4>
                <p className="text-yellow-700">{result.data.special_requirements}</p>
              </div>
            )}

            <div className="text-center space-x-4 pt-4">
              <button 
                onClick={resetUpload}
                className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Upload Another File
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionUpload; 