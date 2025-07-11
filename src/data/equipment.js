// Comprehensive military equipment database
export const EQUIPMENT_DATABASE = {
  infantry: {
    protection: [
      {
        sku: "5M9-BP-PRAR6-BA-3ST-BC",
        name: "Predator Armor Level III",
        brand: "Predator Armor",
        category: "Body Armor",
        price: 175.00,
        weight_lbs: 8.5,
        description: "Level III steel body armor, Shooters Cut design for enhanced mobility",
        specifications: {
          protection_level: "Level III",
          material: "Steel",
          cut_style: "Shooters Cut",
          sizes_available: ["S", "M", "L", "XL", "XXL"]
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 5
      },
      {
        sku: "AS-501-GEN2",
        name: "ArmorSource AS-501 Gen2 Helmet",
        brand: "ArmorSource",
        category: "Helmets",
        price: 765.00,
        weight_lbs: 2.8,
        description: "Level IIIA high-cut advanced tactical helmet with superior protection",
        specifications: {
          protection_level: "Level IIIA",
          style: "High-cut",
          shell_material: "Aramid composite",
          sizes_available: ["S", "M", "L", "XL"]
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1544966503-7e0dbad7f2cd?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 7
      },
      {
        sku: "3PE-APC-CP3A-CPC-RG-SM-MD-IIIA",
        name: "Premier Body Armor Carrier",
        brand: "Premier Body Armor",
        category: "Plate Carriers",
        price: 275.00,
        weight_lbs: 3.2,
        description: "Modular plate carrier with Level IIIA cummerbund and MOLLE compatibility",
        specifications: {
          protection_level: "Level IIIA",
          color: "Ranger Green",
          molle_compatible: true,
          adjustable: true
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 3
      }
    ],
    footwear: [
      {
        sku: "OAKLEY-SI-LIGHT-ASSAULT",
        name: "Oakley SI Light Assault Boots",
        brand: "Oakley",
        category: "Tactical Boots",
        price: 130.00,
        weight_lbs: 2.1,
        description: "Lightweight tactical leather boots for extended operations",
        specifications: {
          material: "Leather",
          sole_type: "Vibram",
          height: "6 inch",
          sizes_available: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13", "14"]
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 2
      }
    ],
    eye_protection: [
      {
        sku: "OAKLEY-SI-M-FRAME",
        name: "Oakley SI Ballistic M Frame",
        brand: "Oakley",
        category: "Eye Protection",
        price: 85.00,
        weight_lbs: 0.3,
        description: "Ballistic eye protection with anti-fog coating and interchangeable lenses",
        specifications: {
          ballistic_rating: "ANSI Z87.1",
          lens_material: "Plutonite",
          anti_fog: true,
          interchangeable_lenses: true
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 1
      }
    ]
  },

  medic: {
    medical_storage: [
      {
        sku: "60MP00OD",
        name: "BlackHawk Special Operations Medical Backpack",
        brand: "BlackHawk",
        category: "Medical Bags",
        price: 185.00,
        weight_lbs: 4.2,
        description: "Modular full opening medical backpack with S.T.R.I.K.E. webbing system",
        specifications: {
          capacity: "3000 cubic inches",
          opening_style: "Full opening",
          molle_compatible: true,
          color: "Olive Drab"
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 4
      },
      {
        sku: "TT-M5-MEDIC",
        name: "Tactical Tailor M5 Medic Pack",
        brand: "Tactical Tailor",
        category: "Medical Bags",
        price: 225.00,
        weight_lbs: 6.8,
        description: "Large capacity medical pack designed for platoon-level medical support",
        specifications: {
          capacity: "5000 cubic inches",
          compartments: 8,
          hydration_compatible: true,
          color: "Coyote Brown"
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 6
      }
    ],
    trauma_care: [
      {
        sku: "BFG-NOW-NANO",
        name: "Blue Force Gear NOW Trauma Nano Kit",
        brand: "Blue Force Gear",
        category: "Trauma Kits",
        price: 125.00,
        weight_lbs: 1.8,
        description: "Compact bleeding control kit with MOLLE compatibility",
        specifications: {
          contents: ["Combat Gauze", "Pressure Bandage", "Chest Seal", "Tourniquet"],
          molle_compatible: true,
          water_resistant: true
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccf?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 3
      },
      {
        sku: "AMK-MOLLE-TRAUMA-05",
        name: "Adventure Medical Kits .5 MOLLE Trauma",
        brand: "Adventure Medical Kits",
        category: "Trauma Kits",
        price: 95.00,
        weight_lbs: 1.2,
        description: "Comprehensive trauma kit with trauma pad, tourniquet, and medical gloves",
        specifications: {
          contents: ["Trauma Pad", "CAT Tourniquet", "Nitrile Gloves", "Bandages"],
          molle_compatible: true,
          compact_design: true
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccf?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 2
      }
    ],
    first_aid: [
      {
        sku: "15-0021016000",
        name: "Voodoo Tactical Individual First Aid Kit",
        brand: "Voodoo Tactical",
        category: "First Aid Kits",
        price: 45.00,
        weight_lbs: 0.8,
        description: "Dual pouch MOLLE compatible IFAK, empty for custom configuration",
        specifications: {
          pouch_style: "Dual compartment",
          molle_compatible: true,
          contents: "Empty - for customization",
          color: "Coyote"
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccf?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 1
      },
      {
        sku: "ROTHCO-IFAK-STOCKED",
        name: "Rothco IFAK",
        brand: "Rothco",
        category: "First Aid Kits",
        price: 75.00,
        weight_lbs: 1.5,
        description: "Pre-stocked individual first aid kit, field-ready configuration",
        specifications: {
          contents: ["Bandages", "Gauze", "Tape", "Antiseptic", "Pain Relief"],
          pre_stocked: true,
          field_ready: true
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccf?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 2
      }
    ]
  },

  communications: {
    headsets: [
      {
        sku: "MT53H7A4610",
        name: "3M Peltor PowerCom Plus 2-Way Radio Headset",
        brand: "3M Peltor",
        category: "Communication Headsets",
        price: 640.00,
        weight_lbs: 1.4,
        description: "Integrated radio headset with noise-canceling and ruggedized design",
        specifications: {
          noise_reduction: "26 dB",
          battery_life: "16 hours",
          water_resistant: "IP68",
          radio_integration: "Built-in"
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 8
      }
    ],
    antennas: [
      {
        sku: "EA00125004S",
        name: "Revolve Emergency VHF Antenna",
        brand: "Revolve",
        category: "Antennas",
        price: 175.00,
        weight_lbs: 0.8,
        description: "Rollable, waterproof, high-visibility emergency VHF antenna",
        specifications: {
          frequency_range: "136-174 MHz",
          gain: "2.15 dBi",
          waterproof: true,
          rollable_design: true
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 5
      }
    ],
    pouches: [
      {
        sku: "10022-6",
        name: "Tactical Tailor Radio Pouch Large",
        brand: "Tactical Tailor",
        category: "Radio Pouches",
        price: 35.00,
        weight_lbs: 0.4,
        description: "Large MOLLE compatible radio pouch in Ranger Green",
        specifications: {
          size: "Large",
          molle_compatible: true,
          color: "Ranger Green",
          closure: "Velcro flap"
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 2
      }
    ]
  },

  desert: {
    clothing: [
      {
        sku: "1834044",
        name: "TRU-SPEC OCP Hot Weather Pants",
        brand: "TRU-SPEC",
        category: "Desert Clothing",
        price: 65.00,
        weight_lbs: 1.2,
        description: "Lightweight, breathable desert camouflage pants for hot weather operations",
        specifications: {
          pattern: "OCP",
          weather_type: "Hot weather",
          material: "65% Polyester, 35% Cotton",
          features: ["Ripstop fabric", "Reinforced knees", "Cargo pockets"]
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 3
      },
      {
        sku: "4744",
        name: "TRU-SPEC OCP Hot Weather Shirt",
        brand: "TRU-SPEC",
        category: "Desert Clothing",
        price: 55.00,
        weight_lbs: 0.8,
        description: "Quick-drying, moisture-wicking desert camouflage shirt",
        specifications: {
          pattern: "OCP",
          weather_type: "Hot weather",
          features: ["Moisture-wicking", "Quick-dry", "Ventilation panels"],
          sleeve_type: "Long sleeve with roll-up option"
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 2
      }
    ],
    footwear: [
      {
        sku: "TR960Z",
        name: "Belleville TR960Z Desert Boots",
        brand: "Belleville",
        category: "Desert Footwear",
        price: 155.00,
        weight_lbs: 2.4,
        description: "Breathable desert boots with side-zip for quick on/off",
        specifications: {
          height: "8 inch",
          closure: "Side-zip with lace-up",
          sole: "Vibram",
          features: ["Breathable", "Sand-resistant", "Quick-dry"]
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 5
      }
    ]
  },

  cold: {
    clothing: [
      {
        sku: "AS-TACTICAL-PANTS",
        name: "Arctic Shield Tactical Pants",
        brand: "Arctic Shield",
        category: "Cold Weather Clothing",
        price: 95.00,
        weight_lbs: 2.1,
        description: "Insulated, windproof, water-resistant tactical pants for extreme cold",
        specifications: {
          insulation: "Synthetic fill",
          waterproof: "DWR coating",
          windproof: true,
          temperature_rating: "-20°F comfort"
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 4
      },
      {
        sku: "KRYPTEK-AS-JACKET",
        name: "Kryptek Arctic Shield Insulated Jacket",
        brand: "Kryptek",
        category: "Cold Weather Clothing",
        price: 165.00,
        weight_lbs: 3.4,
        description: "Heavy insulation jacket with snow camouflage and weatherproof design",
        specifications: {
          insulation: "600-fill down",
          pattern: "Snow camouflage",
          weatherproof: true,
          features: ["Hood", "Multiple pockets", "Reinforced shoulders"]
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 6
      }
    ],
    footwear: [
      {
        sku: "C755",
        name: "Belleville C755 Extreme Cold Weather Boots",
        brand: "Belleville",
        category: "Cold Weather Footwear",
        price: 185.00,
        weight_lbs: 3.8,
        description: "Waterproof, insulated boots rated for subzero performance",
        specifications: {
          insulation: "400g Thinsulate",
          waterproof: "Gore-Tex membrane",
          temperature_rating: "-25°F",
          height: "9 inch"
        },
        vendor: "OpticsPlanet",
        image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
        in_stock: true,
        lead_time_days: 8
      }
    ]
  }
};

// Equipment combinations and compatibility matrix
export const EQUIPMENT_COMPATIBILITY = {
  infantry: {
    required: ["protection", "footwear", "eye_protection"],
    optional: ["load_bearing", "accessories"],
    environmental_required: true
  },
  medic: {
    required: ["medical_storage", "trauma_care", "first_aid"],
    optional: ["medical_organization"],
    environmental_required: true
  },
  communications: {
    required: ["headsets", "pouches"],
    optional: ["antennas"],
    environmental_required: false
  }
};

// Vendor information
export const VENDOR_INFO = {
  OpticsPlanet: {
    name: "OpticsPlanet",
    website: "https://www.opticsplanet.com",
    contact: "1-800-504-5897",
    shipping_policy: "Standard 3-5 business days",
    return_policy: "30 day returns",
    military_discount: true,
    gsa_contract: true
  }
}; 