import { EQUIPMENT_DATABASE } from '../data/equipment.js';

// Equipment kits for different roles
const EQUIPMENT_KITS = {
  infantry: {
    name: "Infantry Rifleman Kit",
    items: [
      { from: "infantry.protection", index: 0 }, // Predator Armor
      { from: "infantry.protection", index: 1 }, // ArmorSource Helmet
      { from: "infantry.footwear", index: 0 },   // Oakley Boots
      { from: "infantry.eye_protection", index: 0 } // Oakley Glasses
    ]
  },
  medic: {
    name: "Combat Medic Kit",
    items: [
      { from: "medic.medical_storage", index: 0 }, // BlackHawk Medical Backpack
      { from: "medic.trauma_care", index: 0 },     // Blue Force Gear Trauma Kit
      { from: "medic.trauma_care", index: 1 },     // Adventure Medical Trauma Kit
      { from: "medic.first_aid", index: 0 }        // Voodoo Tactical IFAK
    ]
  },
  communications: {
    name: "Communications Kit",
    items: [
      { from: "communications.headsets", index: 0 },  // 3M Peltor Headset
      { from: "communications.antennas", index: 0 },   // Revolve VHF Antenna
      { from: "communications.pouches", index: 0 }     // Tactical Tailor Radio Pouch
    ]
  }
};

// Environment-specific packages
const ENVIRONMENT_PACKAGES = {
  desert: {
    name: "Desert Environment Package",
    items: [
      { from: "desert.clothing", index: 0 },  // TRU-SPEC Hot Weather Pants
      { from: "desert.clothing", index: 1 },  // TRU-SPEC Hot Weather Shirt
      { from: "desert.footwear", index: 0 }   // Belleville Desert Boots
    ]
  },
  cold: {
    name: "Cold Weather Package",
    items: [
      { from: "cold.clothing", index: 0 },    // Arctic Shield Tactical Pants
      { from: "cold.clothing", index: 1 },    // Kryptek Insulated Jacket
      { from: "cold.footwear", index: 0 }     // Belleville Cold Weather Boots
    ]
  }
};

// Helper function to get item from database path
const getItemFromPath = (path, index) => {
  const parts = path.split('.');
  let current = EQUIPMENT_DATABASE;
  
  for (const part of parts) {
    current = current[part];
    if (!current) return null;
  }
  
  return current[index] || null;
};

export const generateQuotation = (missionData) => {
  const quotationItems = [];
  let grandTotal = 0;

  // Add base kit items for each personnel type
  missionData.personnel.forEach(person => {
    const kit = EQUIPMENT_KITS[person.role];
    if (kit) {
      kit.items.forEach(itemRef => {
        const item = getItemFromPath(itemRef.from, itemRef.index);
        if (item) {
          const lineItem = {
            sku: item.sku,
            name: item.name,
            brand: item.brand,
            category: item.category,
            unitPrice: item.price,
            quantity: person.count,
            totalPrice: item.price * person.count,
            assignedTo: `${person.role} (${person.count}x)`,
            leadTime: item.lead_time_days,
            weight: item.weight_lbs,
            vendor: item.vendor,
            inStock: item.in_stock
          };
          quotationItems.push(lineItem);
          grandTotal += lineItem.totalPrice;
        }
      });
    }
  });

  // Add environment package if specified
  if (missionData.location_type !== 'Not included' && ENVIRONMENT_PACKAGES[missionData.location_type]) {
    const envPackage = ENVIRONMENT_PACKAGES[missionData.location_type];
    const totalPersonnel = missionData.personnel.reduce((sum, p) => sum + p.count, 0);
    
    envPackage.items.forEach(itemRef => {
      const item = getItemFromPath(itemRef.from, itemRef.index);
      if (item) {
        const lineItem = {
          sku: item.sku,
          name: item.name,
          brand: item.brand,
          category: item.category,
          unitPrice: item.price,
          quantity: totalPersonnel,
          totalPrice: item.price * totalPersonnel,
          assignedTo: `${missionData.location_type} package (${totalPersonnel}x)`,
          leadTime: item.lead_time_days,
          weight: item.weight_lbs,
          vendor: item.vendor,
          inStock: item.in_stock
        };
        quotationItems.push(lineItem);
        grandTotal += lineItem.totalPrice;
      }
    });
  }

  // Calculate tax and shipping
  const subtotal = grandTotal;
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 10000 ? 0 : 500; // Free shipping over $10k
  const total = subtotal + tax + shipping;

  // Calculate total weight and lead time
  const totalWeight = quotationItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
  const maxLeadTime = Math.max(...quotationItems.map(item => item.leadTime));

  return {
    quotationId: `MPS-${Date.now()}`,
    missionName: missionData.mission_name,
    missionType: missionData.mission_type,
    environment: missionData.location_type,
    threatLevel: missionData.threat_level,
    duration: missionData.duration_days,
    created: new Date().toISOString(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    items: quotationItems,
    summary: {
      totalItems: quotationItems.length,
      totalQuantity: quotationItems.reduce((sum, item) => sum + item.quantity, 0),
      totalWeight: Math.round(totalWeight * 10) / 10, // Round to 1 decimal
      maxLeadTime: maxLeadTime,
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      shipping: shipping,
      total: Math.round(total * 100) / 100
    },
    personnel: missionData.personnel,
    specialRequirements: missionData.special_requirements
  };
};

// Generate sample quotation for demo purposes
export const generateSampleQuotation = () => {
  const sampleMissionData = {
    mission_name: "Operation Desert Falcon",
    mission_type: "reconnaissance",
    location_type: "desert",
    threat_level: "medium",
    duration_days: 21,
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

  return generateQuotation(sampleMissionData);
}; 