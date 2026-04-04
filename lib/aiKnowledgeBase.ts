// AI Knowledge Base for Massaba Consulting
// This contains all the information the AI assistant can use to answer questions

export const aiKnowledgeBase = {
  // Company Information
  company: {
    name: "Massaba Consulting",
    description: "Expert consultancy services connecting people and opportunities across Africa, Middle East, and global markets.",
    founded: "2010",
    mission: "To provide exceptional consultancy services that connect people and businesses with opportunities across the globe.",
    vision: "To become the leading consultancy firm bridging Africa, the Middle East, and global markets.",
    contact: {
      email: "massaba555@yahoo.fr",
      phone: "+971525019802",
      whatsapp: "+971525019802",
      address: "Al Hamra Industrial Zone, FZ, RAK, UAE",
      hours: "Sunday-Thursday 9:00 AM - 6:00 PM"
    }
  },

  // Services with detailed pricing and features
  services: {
    "B2B Consultancy": {
      description: "Strategic advisory for corporate growth and high-value partnerships across Africa and global markets.",
      features: [
        "Market entry strategies",
        "Partnership development",
        "Corporate growth planning",
        "Cross-border business advisory",
        "Investment opportunities",
        "Trade facilitation"
      ],
      pricing: "Starting from 5,000 AED",
      target: "Entreprises, corporations, SMEs"
    },
    "Education Consultancy": {
      description: "Expert guidance for international students seeking admission to top-tier universities.",
      features: [
        "University selection guidance",
        "Application assistance",
        "Visa guidance",
        "Pre-departure orientation",
        "Scholarship guidance",
        "Accommodation assistance"
      ],
      pricing: "Starting from 3,500 AED",
      target: "Étudiants internationaux, parents"
    },
    "Government Liaison": {
      description: "Seamless PRO services, document clearing, and official approvals.",
      features: [
        "Document clearing",
        "Official approvals",
        "PRO services",
        "Corporate compliance",
        "License processing",
        "Government tenders"
      ],
      pricing: "Starting from 2,500 AED",
      target: "Entreprises, institutions"
    },
    "Omra Travel": {
      description: "Premium spiritual journey packages including VIP accommodation and professional guides.",
      features: [
        "VIP accommodations",
        "Professional guides",
        "Complete travel arrangements",
        "Visa processing",
        "Airport transfers",
        "24/7 support"
      ],
      pricing: "Starting from 4,500 AED",
      target: "Particuliers, familles, groupes"
    },
    "Visa Services": {
      description: "Visitor, business, and golden visa assistance for Gulf countries.",
      features: [
        "Tourist visas",
        "Business visas",
        "Golden visa assistance",
        "Residency permits",
        "Document attestation",
        "Express processing"
      ],
      pricing: "Starting from 850 AED",
      target: "Voyageurs, professionnels, investisseurs"
    },
    "Vehicle Import/Export": {
      description: "Source new and used vehicles globally with expert logistics.",
      features: [
        "Global vehicle sourcing",
        "Shipping logistics",
        "Customs clearance",
        "Quality inspection",
        "Door-to-door delivery",
        "Financing options"
      ],
      pricing: "Custom pricing based on vehicle value",
      target: "Particuliers, entreprises, concessionnaires",
      customs: "5% customs duty on vehicle value",
      vat: "5% VAT applies"
    }
  },

  // University Partners
  partners: {
    rvu: {
      name: "Royal Victorian University",
      country: "Arménie",
      programs: ["Bachelor", "Master"],
      fees: "À partir de 2 500 USD/an",
      languages: ["Anglais", "Russe"],
      highlights: ["Coûts abordables", "Accompagnement visa", "Environnement moderne"]
    },
    aurak: {
      name: "American University of Ras Al Khaimah",
      country: "Émirats Arabes Unis",
      programs: ["Bachelor", "Master"],
      fees: "Bourses disponibles",
      languages: ["Anglais"],
      highlights: ["Style américain", "45+ nationalités", "Transfert vers USA", "Stages obligatoires"]
    },
    cbtc: {
      name: "Cobel Business Training Center",
      country: "Côte d'Ivoire",
      programs: ["Certificats", "Diplômes", "Formations professionnelles"],
      fees: "Prix accessibles, paiement échelonné",
      languages: ["Français"],
      highlights: ["Formations certifiantes", "Cours flexibles", "Formateurs expérimentés"]
    }
  },

  // FAQ - Common questions and answers
  faq: [
    {
      question: "Comment postuler pour une formation ?",
      answer: "Vous pouvez postuler directement via notre formulaire de contact ou nous envoyer un email à massaba555@yahoo.fr. Notre équipe vous contactera dans les 24h."
    },
    {
      question: "Quels sont les frais de visa ?",
      answer: "Les frais de visa varient selon le pays et le type de visa. Pour les Émirats Arabes Unis, comptez entre 850 AED pour un visa touriste et 15 000 AED pour le Golden Visa. Contactez-nous pour un devis personnalisé."
    },
    {
      question: "Proposez-vous des bourses ?",
      answer: "Oui, nous avons des partenariats avec plusieurs universités qui offrent des bourses aux étudiants Massaba. Contactez-nous pour connaître les opportunités disponibles."
    },
    {
      question: "Comment se passe l'importation de véhicule ?",
      answer: "Nous gérons l'ensemble du processus : sourcing, expédition, dédouanement (5% de droits de douane), livraison. Contactez-nous avec le modèle de véhicule souhaité pour un devis."
    },
    {
      question: "Quels documents sont nécessaires pour postuler ?",
      answer: "Généralement : CV, relevés de notes, diplômes, lettre de motivation, passeport. Pour les visas, des documents supplémentaires peuvent être requis."
    },
    {
      question: "Combien de temps prend le traitement d'un visa ?",
      answer: "Le délai varie selon le pays : 3-5 jours pour un visa touriste UAE, 2-4 semaines pour un visa étudiant, 2-3 mois pour un Golden Visa."
    }
  ],

  // Dynamic responses based on keywords
  responses: {
    greeting: [
      "Bonjour ! Je suis l'assistant virtuel de Massaba Consulting. Comment puis-je vous aider aujourd'hui ?",
      "Bienvenue chez Massaba Consulting ! Je suis là pour répondre à vos questions sur nos services.",
      "Bonjour ! Posez-moi vos questions sur nos services de consulting, formation, visa, ou importation de véhicules."
    ],
    farewell: [
      "Merci pour votre visite ! N'hésitez pas à revenir si vous avez d'autres questions.",
      "Au plaisir de vous accompagner dans vos projets ! À bientôt.",
      "Merci de votre confiance. L'équipe Massaba reste à votre disposition."
    ],
    pricing: "Les tarifs varient selon le service. Nos prix commencent à partir de : B2B (5 000 AED), Education (3 500 AED), Visa (850 AED), Omra (4 500 AED). Contactez-nous pour un devis personnalisé.",
    timing: "Notre équipe est disponible du dimanche au jeudi de 9h à 18h (GST). Vous pouvez aussi nous joindre par email 24/7.",
    location: "Notre bureau principal est situé à Ras Al Khaimah, UAE. Nous accompagnons des clients partout dans le monde."
  }
}

// Function to find best answer based on user input
export function findBestAnswer(userMessage) {
  const message = userMessage.toLowerCase()
  
  // Check for greetings
  if (message.match(/bonjour|salut|hello|hi|hey/)) {
    return aiKnowledgeBase.responses.greeting[Math.floor(Math.random() * aiKnowledgeBase.responses.greeting.length)]
  }
  
  // Check for farewells
  if (message.match(/merci|au revoir|bye|thanks|ciao/)) {
    return aiKnowledgeBase.responses.farewell[Math.floor(Math.random() * aiKnowledgeBase.responses.farewell.length)]
  }
  
  // Check for pricing questions
  if (message.match(/prix|tarif|coût|combien|coute?/)) {
    return aiKnowledgeBase.responses.pricing
  }
  
  // Check for timing/hours
  if (message.match(/horaire|quand|disponible|jour|heure/)) {
    return aiKnowledgeBase.responses.timing
  }
  
  // Check for location/address
  if (message.match(/adresse|localisation|où se trouve|bureau/)) {
    return aiKnowledgeBase.responses.location
  }
  
  // Service-specific responses
  if (message.match(/b2b|consulting|entreprise|partenariat/)) {
    const service = aiKnowledgeBase.services["B2B Consultancy"]
    return `${service.description}\n\nCe que nous offrons: ${service.features.join(", ")}\n\n${service.pricing}`
  }
  
  if (message.match(/education|université|étudiant|formation/)) {
    const service = aiKnowledgeBase.services["Education Consultancy"]
    return `${service.description}\n\nCe que nous offrons: ${service.features.join(", ")}\n\n${service.pricing}`
  }
  
  if (message.match(/visa|passeport|consulat|immigration/)) {
    const service = aiKnowledgeBase.services["Visa Services"]
    return `${service.description}\n\nTypes de visas disponibles: ${service.features.slice(0, 5).join(", ")}\n\n${service.pricing}`
  }
  
  if (message.match(/omra|mecque|médine|spirituel/)) {
    const service = aiKnowledgeBase.services["Omra Travel"]
    return `${service.description}\n\nNotre offre: ${service.features.join(", ")}\n\n${service.pricing}`
  }
  
  if (message.match(/voiture|vehicle|import|export|automobile|douane/)) {
    const service = aiKnowledgeBase.services["Vehicle Import/Export"]
    return `${service.description}\n\n${service.features.join(", ")}\n\n${service.customs}\n\n${service.pricing}`
  }
  
  if (message.match(/gouvernement|liaison|pro|document|approbation/)) {
    const service = aiKnowledgeBase.services["Government Liaison"]
    return `${service.description}\n\nServices: ${service.features.join(", ")}\n\n${service.pricing}`
  }
  
  // Check FAQ
  for (const faq of aiKnowledgeBase.faq) {
    const questionWords = faq.question.toLowerCase().split(' ')
    const matchCount = questionWords.filter(word => message.includes(word)).length
    if (matchCount >= 2) {
      return faq.answer
    }
  }
  
  // Default response
  return "Je n'ai pas bien compris votre question. Pouvez-vous préciser ? Je peux vous renseigner sur nos services de consulting B2B, éducation, visa, Omra, importation de véhicules, ou nos partenaires universitaires (RVU, AURAK, CBTC)."
}