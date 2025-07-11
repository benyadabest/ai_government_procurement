// OpenAI parser for mission documents

const MISSION_SCHEMA = {
  type: "object",
  properties: {
    mission_name: {
      type: "string",
      description: "Name or title of the mission/operation"
    },
    location_type: {
      type: "string",
      enum: ["desert", "cold", "Not included"],
      description: "Environment type - must be either 'desert', 'cold', or 'Not included'"
    },
    mission_type: {
      type: "string",
      enum: ["reconnaissance", "assault", "humanitarian", "training", "logistics", "Not included"],
      description: "Type of military mission"
    },
    personnel: {
      type: "array",
      items: {
        type: "object",
        properties: {
          role: {
            type: "string",
            enum: ["infantry", "medic", "communications"],
            description: "Personnel role - must be infantry, medic, or communications"
          },
          count: {
            type: "integer",
            minimum: 1,
            description: "Number of personnel in this role"
          },
          task_assignment: {
            type: "string",
            description: "Specific tasks assigned to this role"
          }
        },
        required: ["role", "count", "task_assignment"]
      }
    },
    duration_days: {
      type: "integer",
      minimum: 1,
      description: "Mission duration in days"
    },
    special_requirements: {
      type: "string",
      description: "Any special equipment or operational requirements"
    },
    threat_level: {
      type: "string",
      enum: ["low", "medium", "high", "Not included"],
      description: "Assessed threat level for the operation"
    }
  },
  required: ["mission_name", "location_type", "mission_type", "personnel", "duration_days", "special_requirements", "threat_level"]
};

export const parseFileWithOpenAI = async (fileContent) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    // For demo purposes, simulate parsing if no API key is provided
    return simulateParsing(fileContent);
  }

  const systemPrompt = `You are a military logistics expert that extracts structured information from mission documents.

CRITICAL INSTRUCTIONS:
1. Extract ONLY the information that is explicitly stated in the document
2. For any field not clearly specified, use "Not included" exactly as shown
3. For personnel roles, ONLY use: "infantry", "medic", or "communications" 
4. For location_type, ONLY use: "desert", "cold", or "Not included"
5. Map similar terms:
   - Infantry: soldier, rifleman, grunt, warfighter, trooper
   - Medic: corpsman, medical, doc, healthcare
   - Communications: comms, radio, signal, RTO
   - Desert: hot, arid, middle east, sand, dry
   - Cold: arctic, winter, snow, mountain, freezing

Extract all relevant information and structure it according to the provided schema.`;

  const userPrompt = `Extract mission information from this document:

${fileContent}

Return structured data following the exact schema requirements.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4-1106-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "mission_extraction",
            schema: MISSION_SCHEMA,
            strict: true
          }
        },
        temperature: 0.1
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const extractedData = JSON.parse(data.choices[0].message.content);
    
    return {
      success: true,
      data: extractedData,
      confidence: calculateConfidence(extractedData)
    };

  } catch (error) {
    console.error('Error parsing file with OpenAI:', error);
    return {
      success: false,
      error: error.message,
      data: null
    };
  }
};

// Simulate parsing for demo purposes when no API key is available
const simulateParsing = (fileContent) => {
  // Simple pattern matching for demo
  const text = fileContent.toLowerCase();
  
  // Extract mission name (first line usually)
  const lines = fileContent.split('\n').filter(line => line.trim());
  const missionName = lines[0] || "Demo Mission";
  
  // Detect environment
  let locationType = "Not included";
  if (text.includes('desert') || text.includes('hot') || text.includes('arid') || text.includes('sand')) {
    locationType = "desert";
  } else if (text.includes('cold') || text.includes('winter') || text.includes('snow') || text.includes('arctic')) {
    locationType = "cold";
  }
  
  // Detect mission type
  let missionType = "Not included";
  if (text.includes('reconnaissance') || text.includes('recon')) missionType = "reconnaissance";
  else if (text.includes('assault') || text.includes('attack')) missionType = "assault";
  else if (text.includes('humanitarian') || text.includes('relief')) missionType = "humanitarian";
  else if (text.includes('training') || text.includes('exercise')) missionType = "training";
  else if (text.includes('logistics') || text.includes('supply')) missionType = "logistics";
  
  // Extract personnel (simple pattern matching)
  const personnel = [];
  const infantryMatch = text.match(/(\d+).*(?:infantry|soldier|rifleman|trooper)/);
  const medicMatch = text.match(/(\d+).*(?:medic|corpsman|medical|doc)/);
  const commsMatch = text.match(/(\d+).*(?:communications|comms|radio|signal)/);
  
  if (infantryMatch) {
    personnel.push({
      role: "infantry",
      count: parseInt(infantryMatch[1]),
      task_assignment: "Security and reconnaissance operations"
    });
  } else {
    // Default if no specific mention
    personnel.push({
      role: "infantry",
      count: 4,
      task_assignment: "Security and reconnaissance operations"
    });
  }
  
  if (medicMatch) {
    personnel.push({
      role: "medic",
      count: parseInt(medicMatch[1]),
      task_assignment: "Medical support and casualty care"
    });
  } else if (personnel.length > 2) {
    personnel.push({
      role: "medic",
      count: 1,
      task_assignment: "Medical support and casualty care"
    });
  }
  
  if (commsMatch) {
    personnel.push({
      role: "communications",
      count: parseInt(commsMatch[1]),
      task_assignment: "Communication and coordination"
    });
  }
  
  // Extract duration
  const durationMatch = text.match(/(\d+).*(?:days?|weeks?)/);
  let duration = 7; // default
  if (durationMatch) {
    duration = parseInt(durationMatch[1]);
    if (text.includes('week')) duration *= 7;
  }
  
  // Extract threat level
  let threatLevel = "medium"; // default
  if (text.includes('low threat') || text.includes('minimal threat')) threatLevel = "low";
  else if (text.includes('high threat') || text.includes('extreme') || text.includes('hostile')) threatLevel = "high";
  
  const extractedData = {
    mission_name: missionName,
    location_type: locationType,
    mission_type: missionType,
    personnel: personnel,
    duration_days: duration,
    special_requirements: text.includes('special') ? "Enhanced protection and specialized equipment required" : "Standard operational requirements",
    threat_level: threatLevel
  };
  
  return {
    success: true,
    data: extractedData,
    confidence: calculateConfidence(extractedData)
  };
};

const calculateConfidence = (data) => {
  let score = 0;
  let totalFields = 6;

  if (data.mission_name && data.mission_name !== 'Not included') score++;
  if (data.location_type && data.location_type !== 'Not included') score++;
  if (data.mission_type && data.mission_type !== 'Not included') score++;
  if (data.personnel && data.personnel.length > 0) score++;
  if (data.special_requirements && data.special_requirements !== 'Not included') score++;
  if (data.threat_level && data.threat_level !== 'Not included') score++;

  return Math.round((score / totalFields) * 100);
}; 