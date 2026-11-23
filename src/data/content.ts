/**
 * OnlyPhysio - Centralized Content & Configuration
 * Single source of truth for all brand copy, contacts, services, and media.
 * Mark any customizable client values with TODO.
 */

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface BentoItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  size: "large" | "medium" | "small";
  icon: string;
}

export interface ConditionItem {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  symptoms: string[];
  rehabApproach: string;
  icon: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  highlight: string;
  details: string[];
  image?: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  age: number;
  condition: string;
  location: string;
  quote: string;
  rating: number;
  duration: string;
}

export interface ServiceOffering {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  ctaLabel: string;
  badge: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const siteContent = {
  brand: {
    name: "OnlyPhysio",
    tagline: "Expert Homecare Physiotherapy",
    subtagline: "Relieve Pain · Restore Strength · Reclaim Your Freedom",
    description: "Premium in-home and neighbourhood clinical physiotherapy. Evidence-based care delivered with empathy right in the comfort of your home.",
    logoPath: "/images/logo.jpg",
  },

  contact: {
    // Official OnlyPhysio Clinical Helpline
    phone: "+91 90427 18811",
    phoneDisplay: "+91 90427 18811",
    email: "Onlyphysio21@gmail.com",
    address: {
      line1: "No-23, 12, Mariamman Kovil St",
      line2: "KK Nagar West, Nesapakkam",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600078",
      country: "India",
      googleMapsUrl: "https://www.google.com/maps/place/Only+Physio+%7C+Home+Care+Physiotherapy,+Chennai/@13.03973,80.191313,15z/data=!4m6!3m5!1s0x3a52673435b449e3:0xa7f6bd8f4d5dd11!8m2!3d13.0397303!4d80.191313!16s%2Fg%2F11rsp9hz8x?hl=en&entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D",
    },
    hours: "Open All Days · 9:00 AM – 9:00 PM",
    emergencySupport: "Home visits available 7 days a week across Chennai.",
    whatsappNumber: "919042718811",
    whatsappDefaultMessage: "Hello OnlyPhysio! I would like to consult with a senior physiotherapist for homecare treatment in Chennai. Guide me.",
  },

  socials: {
    youtube: "https://www.youtube.com/@onlyphysio5993",
    instagram: "https://www.instagram.com/only_physio/",
    facebook: "https://www.facebook.com/onlyphysio/",
    whatsapp: "https://wa.me/919042718811",
  },

  navigation: [
    { label: "About Our Service", href: "#about-therapy" },
    { label: "Conditions", href: "#conditions" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "About OnlyPhysio", href: "#about-us" },
    { label: "Services & Rental", href: "#other-services" },
    { label: "FAQ", href: "#faq" },
    { label: "PhysioTute's", href: "https://www.youtube.com/@physiotutes", isExternal: true },
  ] as NavItem[],

  hero: {
    eyebrow: "ABOUT OUR THERAPY",
    headlinePart1: "A One Stop Centre in Your Neighbourhood for All Your",
    headlineHighlight: "Physio Needs",
    description:
      "Expert physiotherapy delivered directly to your doorstep and in your local neighbourhood. Compassionate, clinically verified rehabilitation tailored to help you live pain-free.",
    rotatingPrefix: "Get Care Today For",
    rotatingLines: [
      "Relieve Your Pain, Restore Your Strength",
      "Move Better, Feel Better",
      "Empowering Your Body to Heal Naturally",
      "Flexibility and Freedom, One Step at a Time",
    ],
    primaryCta: "Book a Session",
    secondaryCta: "Watch PhysioTute's",
    trustStrip: [
      { label: "Certified Therapists", desc: "BPT & MPT Licensed Specialists" },
      { label: "Home Visits", desc: "Zero Commute, In-Home Comfort" },
      { label: "Personalized Plans", desc: "Tailored 1-on-1 Clinical Regimes" },
    ],
    experienceBadge: {
      years: "10+",
      label: "Years Experience",
    },
    patientBadge: {
      count: "10,000+",
      label: "Happy Patients",
    },
    ratingBadge: {
      score: "4.9 / 5.0",
      reviewCount: "850+ Verified Reviews",
    },
  },

  bentoTherapy: {
    eyebrow: "OUR CLINICAL EXPERTISE",
    title: "Comprehensive Care Tailored to Every Movement Need",
    description:
      "Whether recovering from surgery, managing chronic stiffness, or regaining athletic peak performance, our evidence-backed treatment protocols address the root cause of physical limitation.",
    cards: [
      {
        id: "personalized-care",
        title: "Personalized Care",
        badge: "Core Philosophy",
        description:
          "Individualized 1-on-1 assessment evaluating musculoskeletal biomechanics, posture, and lifestyle patterns.",
        size: "large",
        icon: "UserCheck",
      },
      {
        id: "injury-recovery",
        title: "Injury Recovery",
        badge: "Acute & Sub-acute",
        description:
          "Accelerated soft-tissue healing and structural stability restoration following sprains, tears, and trauma.",
        size: "medium",
        icon: "ShieldAlert",
      },
      {
        id: "chronic-pain",
        title: "Chronic Pain Treatment",
        badge: "Long-term Relief",
        description:
          "Targeted relief for persistent lower back aches, neck stiffness, sciatica, and osteoarthritis.",
        size: "medium",
        icon: "Activity",
      },
      {
        id: "rehab-services",
        title: "Rehabilitation Services",
        badge: "Neuromuscular",
        description:
          "Holistic physical restoration helping stroke survivors, Parkinson's patients, and nerve injury sufferers regain autonomy.",
        size: "large",
        icon: "HeartPulse",
      },
      {
        id: "post-surgery",
        title: "Post-Surgery Recovery",
        badge: "Clinical Protocols",
        description:
          "Structured post-op care for joint replacements, spine decompression, ACL reconstructions, and fractures.",
        size: "medium",
        icon: "Stethoscope",
      },
      {
        id: "mobility-improvement",
        title: "Mobility Improvement",
        badge: "Range of Motion",
        description:
          "Progressive joint mobilization, flexibility stretching, and fascial release to banish daily stiffness.",
        size: "medium",
        icon: "Compass",
      },
      {
        id: "overall-wellbeing",
        title: "Overall Well-being",
        badge: "Preventative",
        description:
          "Ergonomic guidance, functional fitness, core strengthening, and proactive vitality enhancement.",
        size: "small",
        icon: "Sparkles",
      },
    ] as BentoItem[],
  },

  conditions: {
    eyebrow: "CONDITIONS WE TREAT",
    title: "Specialized Treatment for Real Everyday Conditions",
    description:
      "Explore the most common musculoskeletal, neurological, and post-surgical challenges we treat comfortably at your home.",
    featured: [
      {
        id: "chronic-pain",
        name: "Chronic Pain",
        category: "Spine & Joints",
        shortDesc: "Enduring lower back, cervical spine, and degenerative disc pain relief through manual release and core stabilization.",
        fullDesc: "Chronic pain often stems from altered motor control, muscular imbalances, or repetitive stress injuries. Our gentle home treatment re-educates movement patterns to decompress nerves and re-establish painless function.",
        symptoms: ["Constant dull lower back ache", "Radiating sciatica down leg", "Morning stiffness & spasm", "Restricted bending"],
        rehabApproach: "Spinal decompression exercises, myofascial trigger-point therapy, isometric core stabilizing, ergonomic posture re-training.",
        icon: "Flame",
      },
      {
        id: "post-surgery-recovery",
        name: "Post-Surgery Recovery",
        category: "Orthopedic",
        shortDesc: "Guided safe rehabilitation following Total Knee/Hip Replacement, ACL repair, arthroscopy, and spinal fusion.",
        fullDesc: "Surgery repairs the anatomy, but physiotherapy restores the life. We ensure scar tissue is minimized, joint effusion is managed, and safe weight-bearing protocols are achieved without risking re-injury.",
        symptoms: ["Post-op surgical stiffness", "Surgical swelling & edema", "Muscular atrophy & weakness", "Apprehension with walking"],
        rehabApproach: "Passive & active-assisted ROM, lymphatic drainage massage, progressive quad/glute activation, gait re-training with assistive aids.",
        icon: "Bandage",
      },
      {
        id: "balance-coordination",
        name: "Balance & Coordination",
        category: "Neurological & Geriatric",
        shortDesc: "Fall-prevention drills, vestibular re-training, and neuromuscular stimulation for elders and neurological patients.",
        fullDesc: "Safeguard loved ones from dangerous falls. We assess dynamic balance, sensory integration, and home hazards to build dependable stability and confidence in every step.",
        symptoms: ["Unsteadiness when standing up", "Fear of falling", "Shuffling gait pattern", "Loss of coordination in turns"],
        rehabApproach: "Proprioceptive balance pad training, tandem walking, dual-task cognitive gait drills, safety home modification audit.",
        icon: "Footprints",
      },
      {
        id: "sports-injuries",
        name: "Sports Injuries",
        category: "Sports Medicine",
        shortDesc: "Rapid return-to-sport therapy for rotator cuff impingement, tennis elbow, hamstring strains, and ankle sprains.",
        fullDesc: "Whether an amateur runner or dedicated weekend warrior, recover faster with targeted sports biomechanics, eccentric loading protocols, and sport-specific plyometric progressions.",
        symptoms: ["Sharp pain on explosive movement", "Joint laxity & instability", "Localized swelling & bruising", "Inability to load joint"],
        rehabApproach: "P.R.I.C.E. phase transition, kinetic chain alignment, high-velocity eccentric conditioning, return-to-play functional tests.",
        icon: "Trophy",
      },
      {
        id: "joint-pain",
        name: "Joint Pain & Arthritis",
        category: "Degenerative & Rheumatic",
        shortDesc: "Cartilage-protective therapy, synovial fluid stimulation, and joint unloading for knee, shoulder, and hip osteoarthritis.",
        fullDesc: "Arthritis does not mean resigning to immobility. Non-impact strengthening and manual articulation relieve compression on damaged cartilage, preserving natural joints and delaying surgical intervention.",
        symptoms: ["Crepitus (cracking sounds)", "Pain with stair climbing", "Loss of full knee extension", "Weather-sensitive flare-ups"],
        rehabApproach: "Open and closed chain unloaded resistance, peri-articular muscle strengthening, therapeutic heat/cold contrast, joint lubrication mobilization.",
        icon: "Bone",
      },
    ] as ConditionItem[],

    // Expanded directory of 20+ conditions shown in the searchable modal
    allConditions: [
      { name: "Lower Back Pain & Sciatica", category: "Spine", urgency: "High", desc: "Herniated disc, degenerative disc disease, lumbar radiculopathy." },
      { name: "Cervical Spondylosis & Neck Pain", category: "Spine", urgency: "Medium", desc: "Tech-neck, pinched nerve, facet joint arthrosis, cervical radiculopathy." },
      { name: "Frozen Shoulder (Adhesive Capsulitis)", category: "Upper Limb", urgency: "High", desc: "Stage 1-3 capsular stretching, pain modulation, end-range restoration." },
      { name: "Knee Osteoarthritis", category: "Lower Limb", urgency: "Medium", desc: "Grade I-IV non-surgical preservation and quad/hamstring rebalancing." },
      { name: "Total Knee Replacement (TKR) Rehab", category: "Post-Op", urgency: "High", desc: "Day 1 to 90 days milestone rehabilitation protocol at home." },
      { name: "Total Hip Replacement (THR) Rehab", category: "Post-Op", urgency: "High", desc: "Dislocation precautions, hip abductor activation, independent gait." },
      { name: "ACL Reconstruction Recovery", category: "Sports", urgency: "High", desc: "Graft protection, full extension achievement, quad index rebuilding." },
      { name: "Stroke Hemiplegia Rehabilitation", category: "Neuro", urgency: "High", desc: "Bobath/NDT neuro-developmental facilitation, spasticity management." },
      { name: "Parkinson's Disease Mobility", category: "Neuro", urgency: "Medium", desc: "LSVT BIG movement strategies, freezing-of-gait prevention, cueing." },
      { name: "Bell's Palsy / Facial Palsy", category: "Neuro", urgency: "High", desc: "Facial neuromuscular re-education, neuromuscular tapping, syncinesis control." },
      { name: "Rotator Cuff Tears & Tendinitis", category: "Upper Limb", urgency: "Medium", desc: "Scapular dyskinesis correction, rotator cuff eccentric loading." },
      { name: "Tennis Elbow & Golfer's Elbow", category: "Upper Limb", urgency: "Low", desc: "Forearm extensor/flexor tendinopathy relief, counterforce bracing." },
      { name: "Carpal Tunnel Syndrome", category: "Upper Limb", urgency: "Low", desc: "Median nerve gliding, wrist ergonomics, tendon gliding exercises." },
      { name: "Ankle Sprain & Ligament Tears", category: "Lower Limb", urgency: "Medium", desc: "ATFL/CFL recovery, wobble board training, chronic instability fix." },
      { name: "Plantar Fasciitis & Heel Spur", category: "Lower Limb", urgency: "Low", desc: "Gastroc-soleus release, plantar aponeurosis loading, foot arch support." },
      { name: "Geriatric Deconditioning & Fall Risk", category: "Geriatric", urgency: "High", desc: "Strength preservation, bed-mobility training, chair-rise confidence." },
      { name: "Pediatric Physical Therapy", category: "Pediatric", urgency: "Medium", desc: "Gross motor milestone delay, cerebral palsy, torticollis, flat head." },
      { name: "Scoliosis & Kyphosis Correction", category: "Spine", urgency: "Medium", desc: "Schroth method principles, asymmetric core strengthening." },
      { name: "Post-Fracture Stiffness", category: "Orthopedic", urgency: "Medium", desc: "Mobilization post-plaster cast removal, bone consolidation exercises." },
      { name: "Fibromyalgia & Myofascial Pain", category: "Rheumatic", urgency: "Medium", desc: "Low-impact aerobic conditioning, trigger point dry release, pacing." },
      { name: "Post-Covid Respiratory Weakness", category: "Cardiopulmonary", urgency: "Medium", desc: "Diaphragmatic breathing, thoracic expansion, energy conservation." },
    ],
  },

  howItWorks: {
    title: "How It Works",
    subtitle: "Your Journey to Better Movement and Pain-Free Living.",
    description: "Your Journey to Better Movement and Pain-Free Living.",
    steps: [
      {
        number: "01",
        title: "Book Your Appointment",
        highlight: "Effortless Scheduling",
        description:
          "Patients can instantly book an appointment through our website or WhatsApp by selecting their preferred date, time, and describing their health concerns.",
        details: [
          "Choose between Home Visit or Clinic Consultation.",
          "Available 7 days a week, from 9 AM to 9 PM.",
          "Transparent pricing with no hidden charges.",
        ],
        image: "/images/how-it-works/step-1-booking.jpg",
      },
      {
        number: "02",
        title: "Comprehensive Home Assessment",
        highlight: "Root-Cause Diagnosis",
        description:
          "An experienced physiotherapist visits your home and conducts a comprehensive 45-minute assessment to understand your condition and identify the root cause of your problem.",
        details: [
          "Range of Motion assessment (joint and muscle mobility).",
          "Posture, spine, and gait evaluation.",
          "Neurological and muscle strength assessment.",
        ],
        image: "/images/how-it-works/step-2-assessment.jpg",
      },
      {
        number: "03",
        title: "Personalized Treatment Plan",
        highlight: "Clinical Precision",
        description:
          "Based on your individual needs, we create a personalized recovery roadmap and begin your treatment with a targeted approach.",
        details: [
          "Hands-on manual therapy and mobilization techniques.",
          "Advanced electrotherapy and modern treatment equipment.",
          "Clear recovery milestones with specific pain-relief goals.",
        ],
        image: "/images/how-it-works/step-3-treatment.jpg",
      },
      {
        number: "04",
        title: "Progressive Recovery & Follow-up",
        highlight: "Long-term Independence",
        description:
          "We monitor your progress during every session, measure improvements, and provide self-management exercises and continuous guidance to help prevent recurring pain.",
        details: [
          "Reassessment after every 5 sessions.",
          "Video-guided home exercises for daily practice.",
          "Direct support through WhatsApp and phone calls with your therapist.",
        ],
        image: "/images/how-it-works/step-4-recovery.jpg",
      },
    ] as StepItem[],
  },

  ctaBanner: {
    eyebrow: "GET STARTED TODAY",
    title: "Unlock Tailored Solutions to Your Problems with Just One Click",
    description:
      "Don't let aches restrict your family time, career, or freedom. Speak to an expert physiotherapist today and start your journey towards natural recovery.",
    primaryBtn: "Book Now",
    secondaryBtn: "More Information",
    badge: "Available Today Across Your City",
  },

  aboutOnlyPhysio: {
    eyebrow: "ABOUT ONLYPHYSIO",
    title: "Restoring Human Movement with Empathy and Evidence",
    subtitle: "Bengaluru's Trusted Home Healthcare Physiotherapy Network",
    description1:
      "OnlyPhysio was founded on a singular conviction: true recovery thrives in familiar, stress-free environments. For over a decade, we have removed the friction of traveling to overcrowded clinics by bringing hospital-grade physiotherapy directly to your bedside.",
    description2:
      "Our team of licensed Bachelor and Master of Physiotherapy (BPT & MPT) practitioners combine international manual therapy methods, clinical electrotherapy, and progressive biomechanics to treat everything from acute sports trauma to geriatric mobility.",
    yearsExperience: "10+",
    experienceTagline: "Years of Clinical Excellence in Home Care",
    checkpoints: [
      {
        title: "Expert Therapists",
        desc: "Strictly university-credentialed, verified, and background-checked senior clinicians.",
      },
      {
        title: "Personalized Physiotherapy Care",
        desc: "Dedicated 60-minute uninterrupted sessions focused 100% on you.",
      },
      {
        title: "Latest Treatment Techniques",
        desc: "Maitland, Mulligan, Dry Needling, Kinesio Taping, and IASTM protocols.",
      },
      {
        title: "Clinical Excellence",
        desc: "Evidence-guided clinical pathways audited by chief orthopedic advisors.",
      },
      {
        title: "Patient Satisfaction",
        desc: "Over 98% patient satisfaction rate with measurable mobility improvements.",
      },
      {
        title: "Recovery-Focused Care",
        desc: "Empowering you with independent movement rather than lifetime dependency.",
      },
    ],
  },

  stats: {
    headline: "Numbers That Reflect Our Commitment to Healing",
    items: [
      {
        value: 10000,
        suffix: "+",
        label: "Happy Patients",
        sublabel: "Treated and Counting",
      },
      {
        value: 10,
        suffix: "+",
        label: "Years of Experience",
        sublabel: "Specialized In-Home Care",
      },
      {
        value: 100,
        suffix: "%",
        label: "All Days Availability",
        sublabel: "Open 365 Days a Year",
      },
      {
        value: 120,
        suffix: "°",
        label: "Avg. ROM Regained",
        sublabel: "Post-Surgical Knee & Shoulder",
      },
    ] as StatItem[],
  },

  testimonials: [
    {
      id: "review-1",
      name: "Dr. Arvind Ramesh",
      age: 68,
      condition: "Post-Total Knee Replacement",
      location: "Indiranagar",
      quote:
        "After my bilateral knee surgery, traveling to a clinic every morning was unbearable. OnlyPhysio sent Dr. Priya to my home. Her gentleness, precise gait analysis, and encouragement had me walking without a walker in just 3 weeks. Outstanding medical standard.",
      rating: 5,
      duration: "6 weeks of care",
    },
    {
      id: "review-2",
      name: "Meera Krishnan",
      age: 34,
      condition: "Severe Lumbar Disc Bulge (Sciatica)",
      location: "HSR Layout",
      quote:
        "I was bedridden with sharp sciatic nerve pain and had been advised spine surgery. OnlyPhysio's core stabilization and nerve mobilization completely alleviated my pain without any injections. I am back to work and running again!",
      rating: 5,
      duration: "4 weeks of care",
    },
    {
      id: "review-3",
      name: "Rajeshwar Rao",
      age: 74,
      condition: "Stroke Neuro-Rehabilitation",
      location: "Whitefield",
      quote:
        "The patience shown by OnlyPhysio during my father's post-stroke recovery has been a blessing for our entire family. His hand grip and balance improved drastically. They treat patients like their own elders.",
      rating: 5,
      duration: "3 months of care",
    },
  ] as TestimonialItem[],

  otherServices: [
    {
      id: "home-care",
      title: "Home Care Physiotherapy",
      tagline: "One-on-One Personalized Sessions",
      description:
        "Comprehensive in-home physical therapy designed for patients recovering from surgery, stroke, spinal pain, or age-related mobility restrictions.",
      image: "/images/hero-physio.jpg",
      highlights: [
        "Zero travel discomfort or risk of reinjury",
        "Full equipment brought to your residence",
        "Flexible morning & evening scheduling",
      ],
      ctaLabel: "Schedule Home Visit",
      badge: "Most Popular",
    },
    {
      id: "equipment-sale",
      title: "Physio Equipment for Sale",
      tagline: "Certified Clinical & Rehab Devices",
      description:
        "High-grade physical therapy instruments, orthopedic braces, lumbar supports, resistance systems, and balance equipment curated by our clinicians.",
      image: "/images/equipment-sale.jpg",
      highlights: [
        "Doctor-approved medical quality",
        "Includes setup guidance & home instructions",
        "Full warranty with fast local delivery",
      ],
      ctaLabel: "Inquire Equipment",
      badge: "Direct Purchase",
    },
    {
      id: "equipment-rent",
      title: "Physio Equipment for Rent",
      tagline: "Affordable Short-term Medical Rentals",
      description:
        "Rent hospital beds, motorized CPM machines, electrical stimulation units, wheelchairs, and walking frames during temporary rehabilitation.",
      image: "/images/equipment-rent.jpg",
      highlights: [
        "Cost-effective weekly & monthly rental terms",
        "Sanitized, tested, and calibrated devices",
        "Free home delivery, installation, and pickup",
      ],
      ctaLabel: "Browse Rentals",
      badge: "Cost Saver",
    },
  ] as ServiceOffering[],

  faqs: [
    {
      id: "faq-1",
      question: "How does an in-home physiotherapy session work?",
      answer:
        "On the appointed day and time, our certified senior physiotherapist arrives at your home equipped with all required therapeutic instruments (such as portable electrotherapy/TENS machines, resistance bands, and mobilization aids). We start with a comprehensive health assessment, review your doctor's prescriptions or surgical reports, and provide hands-on manual therapy followed by guided functional movements. Every session lasts 45 to 60 minutes.",
    },
    {
      id: "faq-2",
      question: "What is the duration and frequency of treatment?",
      answer:
        "A standard session lasts between 45 to 60 minutes. Treatment frequency depends entirely on your clinical condition: acute post-operative recovery usually requires 5 to 6 sessions a week, whereas chronic postural stiffness or maintenance may require 2 to 3 sessions per week. Your therapist presents a clear milestone roadmap during your initial assessment.",
    },
    {
      id: "faq-3",
      question: "Who needs home physiotherapy instead of visiting a clinic?",
      answer:
        "Home physiotherapy is ideal for anyone who finds traveling difficult, painful, or risky. This includes patients recovering from total knee/hip replacements, stroke survivors, seniors with mobility or balance concerns, individuals with acute back spasm, and busy working professionals who value saving 2 hours in city traffic.",
    },
    {
      id: "faq-4",
      question: "How do your physio equipment rentals work?",
      answer:
        "We offer flexible weekly and monthly rentals for rehabilitation devices like Continuous Passive Motion (CPM) machines for knee surgery, motorized hospital beds, portable TENS/IFT units, oxygen concentrators, and wheelchairs. Our technician delivers, sanitizes, and demonstrates the equipment at your home, and collects it once your recovery period is complete.",
    },
    {
      id: "faq-5",
      question: "What payment methods do you accept, and do you support health insurance?",
      answer:
        "We accept UPI (Google Pay, PhonePe, Paytm), credit/debit cards, net banking, and direct bank transfers. We provide detailed clinical invoices, therapist registration credentials, and session logs that you can submit to your health insurance provider for reimbursement under outpatient (OPD) or domiciliary hospitalization policies.",
    },
    {
      id: "faq-6",
      question: "Which neighbourhood areas do you cover?",
      answer:
        "We currently cover all major neighbourhoods across Bengaluru, including Indiranagar, Koramangala, HSR Layout, Bellandur, Sarjapur Road, Whitefield, JP Nagar, Jayanagar, Malleshwaram, and Hebbal. Our local therapist pods ensure a licensed physiotherapist reaches your home promptly within your scheduled time window.",
    },
  ] as FaqItem[],

  bookingOptions: {
    conditions: [
      "Lower Back Pain / Sciatica",
      "Neck & Shoulder Pain",
      "Post-Knee / Hip Replacement",
      "Stroke / Neuro Rehabilitation",
      "Sports Injury / Ligament Sprain",
      "Geriatric Balance & Fall Prevention",
      "Arthritis & Joint Stiffness",
      "Physio Equipment Rental / Sale",
      "General Consultation / Other",
    ],
    timeSlots: [
      "Morning (09:00 AM - 12:00 PM)",
      "Afternoon (12:00 PM - 04:00 PM)",
      "Evening (04:00 PM - 09:00 PM)",
    ],
    serviceTypes: [
      { id: "home-visit", label: "Home Visit (Recommended)", desc: "Therapist visits your home" },
      { id: "clinic", label: "Neighbourhood Centre", desc: "Visit our local partner clinic" },
    ],
  },

  marqueeKeywords: [
    "REHABILITATION",
    "MOBILITY",
    "STRENGTH",
    "RECOVERY",
    "BALANCE",
    "WELLNESS",
    "PAIN RELIEF",
    "FLEXIBILITY",
    "POSTURE",
    "INDEPENDENCE",
  ],
};
