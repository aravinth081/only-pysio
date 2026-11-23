export interface PhysioTubeVideo {
  id: string;
  title: string;
  description: string;
  category: "Joint Biomechanics" | "Anatomy" | "Muscle Physiology" | "Pain Science" | "History";
  duration: string;
  views?: string;
  youtubeUrl: string;
  thumbnail: string;
  thumbnailMax: string;
  isShort?: boolean;
}

export const physioTubeVideos: PhysioTubeVideo[] = [
  {
    id: "4rDLbskPtM4",
    title: "Types of Synovial Joints - Clinical Breakdown",
    description: "Detailed biomechanical analysis of synovial joint categories, articulation mechanics, synovial fluid function, and joint degree of freedom.",
    category: "Joint Biomechanics",
    duration: "1:16",
    youtubeUrl: "https://www.youtube.com/watch?v=4rDLbskPtM4",
    thumbnail: "/images/physiotubes/4rDLbskPtM4.jpg",
    thumbnailMax: "/images/physiotubes/4rDLbskPtM4-max.jpg",
  },
  {
    id: "bHUbFbwM7Xs",
    title: "Classification of Joints Based on Structure & Function",
    description: "Comprehensive classification comparing fibrous, cartilaginous, and synovial joints by structural composition and clinical functional mobility.",
    category: "Joint Biomechanics",
    duration: "1:31",
    youtubeUrl: "https://www.youtube.com/watch?v=bHUbFbwM7Xs",
    thumbnail: "/images/physiotubes/bHUbFbwM7Xs.jpg",
    thumbnailMax: "/images/physiotubes/bHUbFbwM7Xs-max.jpg",
  },
  {
    id: "gEYB-D_M-Go",
    title: "Trapezius Muscle: Origin, Insertion, Nerve Supply & Action",
    description: "In-depth functional anatomy of the upper, middle, and lower trapezius fibers, accessory cranial nerve supply, and scapulothoracic kinematics.",
    category: "Muscle Physiology",
    duration: "1:24",
    youtubeUrl: "https://www.youtube.com/watch?v=gEYB-D_M-Go",
    thumbnail: "/images/physiotubes/gEYB-D_M-Go.jpg",
    thumbnailMax: "/images/physiotubes/gEYB-D_M-Go-max.jpg",
  },
  {
    id: "v7L31fvOVT4",
    title: "Muscles of the Back: Comprehensive Anatomical Overview",
    description: "Postural muscles overview from superficial latissimus dorsi to deep erector spinae and transversospinalis complexes stabilizing spinal curvature.",
    category: "Anatomy",
    duration: "2:06",
    youtubeUrl: "https://www.youtube.com/watch?v=v7L31fvOVT4",
    thumbnail: "/images/physiotubes/v7L31fvOVT4.jpg",
    thumbnailMax: "/images/physiotubes/v7L31fvOVT4-max.jpg",
  },
  {
    id: "c6fTiJXHsKE",
    title: "History & Evolution of Modern Physiotherapy",
    description: "Tracing physical therapy origins from early hydrotherapy and Swedish gymnastics to modern evidence-based neuro-musculoskeletal rehabilitation.",
    category: "History",
    duration: "1:59",
    youtubeUrl: "https://www.youtube.com/watch?v=c6fTiJXHsKE",
    thumbnail: "/images/physiotubes/c6fTiJXHsKE.jpg",
    thumbnailMax: "/images/physiotubes/c6fTiJXHsKE-max.jpg",
  },
  {
    id: "iHsyqlKhSCQ",
    title: "Trapezius Actions & Scapular Elevation Mechanics",
    description: "Rapid anatomical video explaining trapezius muscle actions, shrugging mechanics, and scapular retraction control in under 60 seconds.",
    category: "Muscle Physiology",
    duration: "0:58",
    views: "7.4K views",
    youtubeUrl: "https://www.youtube.com/shorts/iHsyqlKhSCQ",
    thumbnail: "/images/physiotubes/iHsyqlKhSCQ.jpg",
    thumbnailMax: "/images/physiotubes/iHsyqlKhSCQ-max.jpg",
    isShort: true,
  },
  {
    id: "GEJ3K1qSMas",
    title: "Pain Gate Theory: How Spinal Modulation Controls Pain",
    description: "How mechanoreceptor activation (massage, manual therapy) closes the neural gate in the dorsal horn to stop nociceptive pain signals.",
    category: "Pain Science",
    duration: "0:52",
    views: "211 views",
    youtubeUrl: "https://www.youtube.com/shorts/GEJ3K1qSMas",
    thumbnail: "/images/physiotubes/GEJ3K1qSMas.jpg",
    thumbnailMax: "/images/physiotubes/GEJ3K1qSMas-max.jpg",
    isShort: true,
  },
  {
    id: "Fu1hP2TQCaU",
    title: "Triceps Brachii: Heads, Attachments & Biomechanics",
    description: "Essential anatomy of the three heads of triceps brachii powering posterior arm extension and stabilizing shoulder abduction.",
    category: "Anatomy",
    duration: "0:59",
    views: "188 views",
    youtubeUrl: "https://www.youtube.com/shorts/Fu1hP2TQCaU",
    thumbnail: "/images/physiotubes/Fu1hP2TQCaU.jpg",
    thumbnailMax: "/images/physiotubes/Fu1hP2TQCaU-max.jpg",
    isShort: true,
  },
  {
    id: "894HOL12PX4",
    title: "Biceps Brachii: Short & Long Head Kinetics",
    description: "Origin, insertion, and kinesiological role of biceps brachii in forearm supination, elbow flexion, and glenohumeral stability.",
    category: "Anatomy",
    duration: "0:54",
    views: "170 views",
    youtubeUrl: "https://www.youtube.com/shorts/894HOL12PX4",
    thumbnail: "/images/physiotubes/894HOL12PX4.jpg",
    thumbnailMax: "/images/physiotubes/894HOL12PX4-max.jpg",
    isShort: true,
  },
  {
    id: "_B70fCiMbsQ",
    title: "Superficial Muscles of Anterior Forearm",
    description: "Clinical dissection review of pronator teres, flexor carpi radialis, palmaris longus, and flexor carpi ulnaris.",
    category: "Anatomy",
    duration: "0:48",
    views: "45 views",
    youtubeUrl: "https://www.youtube.com/shorts/_B70fCiMbsQ",
    thumbnail: "/images/physiotubes/_B70fCiMbsQ.jpg",
    thumbnailMax: "/images/physiotubes/_B70fCiMbsQ-max.jpg",
    isShort: true,
  },
];
