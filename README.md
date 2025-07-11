# Military Procurement System

> **AI-Powered Equipment Configuration and Quotation Generation**

From Mission Requirements to Ready-to-Order Kits in Minutes.

## 🚀 Overview

The Military Procurement System is an intelligent platform that automatically generates equipment configurations and professional quotations from mission documents. Upload mission briefs, personnel rosters, or operational requirements and receive detailed equipment lists with real vendor data, pricing, and delivery information.

### Key Features

- **🤖 AI Document Parsing**: Extracts personnel requirements, environment, and mission parameters
- **📦 Smart Equipment Configuration**: Generates role-specific kits (Infantry, Medic, Communications)
- **🌡️ Environment Adaptation**: Automatic desert/cold weather equipment packages
- **💰 Professional Quotations**: Real SKUs, pricing, lead times, and vendor information
- **📊 Export Capabilities**: CSV, JSON, and printable formats

## 📋 How It Works

1. **Upload** mission briefs, personnel rosters, or operational requirements
2. **AI extracts** personnel count/roles, environment, mission type, and special requirements  
3. **System generates** intelligent equipment configurations using real vendor data
4. **Outputs** professional quotations with SKUs, pricing, and delivery information

### Example Workflow

```
Desert reconnaissance mission brief → 
AI extracts "4 infantry, 1 medic, desert environment" → 
System configures tactical gear + desert equipment → 
Generates $8,315 professional quotation with 23 line items
```

## 🛠️ Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd military-procurement-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment (Optional)**
   ```bash
   cp .env.example .env
   # Add your OpenAI API key to .env file
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🔧 Configuration

### OpenAI API Key (Optional)

For enhanced document parsing, you can add your OpenAI API key:

1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add to `.env` file:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

**Note**: The system includes intelligent fallback parsing and works without an API key for demonstration purposes.

## 📁 Project Structure

```
src/
├── components/
│   ├── MissionUpload.jsx     # Document upload and parsing interface
│   └── QuotationDisplay.jsx  # Equipment quotation display
├── data/
│   └── equipment.js          # Comprehensive equipment database
├── services/
│   ├── openaiParser.js       # AI document parsing service
│   └── quotationGenerator.js # Equipment configuration logic
└── App.jsx                   # Main application component
```

## 🎯 Features

### Equipment Database

- **Infantry**: Body armor, helmets, boots, eye protection
- **Medic**: Medical bags, trauma kits, first aid supplies
- **Communications**: Headsets, antennas, radio pouches
- **Environment Packages**: Desert and cold weather gear

### Intelligent Configuration

- **Role-based kits**: Automatic equipment selection by personnel role
- **Environment adaptation**: Climate-specific gear packages
- **Quantity calculation**: Automatic scaling based on personnel count
- **Compatibility matrix**: Ensures equipment compatibility

### Professional Quotations

- **Detailed line items**: SKU, brand, category, specifications
- **Pricing breakdown**: Unit price, quantity, totals, tax, shipping
- **Lead times**: Delivery schedules and availability
- **Export formats**: CSV, JSON, printable

## 📊 Sample Data

The system includes realistic equipment data sourced from OpticsPlanet with:

- **Real SKUs** and product names
- **Accurate pricing** and specifications  
- **Vendor information** and lead times
- **Weight and dimensional** data

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy

The built files in `dist/` can be deployed to any static hosting service:

- Vercel
- Netlify  
- AWS S3 + CloudFront
- GitHub Pages

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Adding New Equipment

1. Edit `src/data/equipment.js`
2. Add items to appropriate categories
3. Update equipment kits in `quotationGenerator.js`

### Customizing AI Parsing

1. Modify `src/services/openaiParser.js`
2. Update the mission schema
3. Adjust confidence scoring

## 🔒 Security & Privacy

- **No data persistence**: Documents are processed in-browser only
- **Optional API integration**: Works without external services
- **Client-side processing**: No server-side data storage

## 📈 System Capabilities

- **Document Types**: .txt, .doc, .docx, .pdf
- **Personnel Roles**: Infantry, Medic, Communications
- **Environments**: Desert, Cold Weather, Standard
- **Mission Types**: Reconnaissance, Assault, Humanitarian, Training, Logistics

## 🎬 Demo

Try the live demo with the included sample mission file or upload your own documents to see the system in action.

## 📞 Support

For questions, issues, or feature requests, please create an issue in the repository.

---

**Military Procurement System** - Streamlining equipment configuration for military operations. 