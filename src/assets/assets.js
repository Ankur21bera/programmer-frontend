// --- Imports ---
import tech_banner from './tech-banner.jpg'
import tech_header from './tech_header.jpg'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import tech_contact from './tech-contact.jpg'
import tech_about from './tech-about.jpg'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'

// Course thumbnails
import web_development1 from './web-development1.jpg'
import web_development2 from './web-development2.jpg'
import web_development3 from './web-development3.jpg'
import digital_marketing1 from './digital-marketing1.jpg'
import digital_marketing2 from './digital-marketing2.jpg'
import digital_marketing3 from './digital.jpg'
import cyber_security1 from './cyber-security1.jpg'
import cyber_security2 from './cyber-security2.jpg'
import cyber_security3 from './cyber-security3.jpg'
import data_science1 from './data-science1.jpg'
import data_science2 from './data-science2.jpg'
import data_science3 from './data-science3.jpg'
import app_development1 from './app-development1.jpg'
import app_development2 from './app-development2.jpg'
import app_development3 from './app-development3.jpg'
import ui_ux1 from './ui-ux1.jpg'
import ui_ux2 from './ui-ux2.jpg'
import ui_ux3 from './ui-ux3.jpg'
import graphic_design1 from './graphic-design1.jpg'
import graphic_design2 from './graphic-design2.jpg'
import graphic_design3 from './graphic-design3.jpg'

// Category icons
import web_development from './web-development1.jpg'
import digital_marketing from './digital-marketing1.jpg'
import cyber_security from './cyber-security.jpg'
import data_science from './data-science.jpg'
import app_development from './app-developer.jpg'
import ui_ux from './ui-ux.jpg'
import graphic_design from './graphic-design.jpg'

// Mentors
import mentor_1 from './img1.jpg'
import mentor_2 from './img2.jpg'
import mentor_3 from './img3.jpg'
import mentor_4 from './img4.jpg'
import mentor_5 from './img5.jpg'
import mentor_6 from './img6.jpg'
import mentor_7 from './img7.jpg'
import mentor_8 from './img8.jpg'
import mentor_9 from './img9.jpg'
import mentor_10 from './img10.jpg'
import mentor_11 from './img11.jpg'
import mentor_12 from './img12.jpg'
import mentor_13 from './img13.jpg'
import mentor_14 from './img14.jpg'
import mentor_15 from './img15.jpg'
import mentor_16 from './img16.jpg'
import mentor_17 from './img17.jpg'
import mentor_18 from './img18.jpg'

// --- Assets ---
export const assets = {
  tech_banner,
  tech_header,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  tech_contact,
  tech_about,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
}

// --- Categories ---
export const specialityData = [
  { speciality: 'Web Development', image: web_development },
  { speciality: 'Digital Marketing', image: digital_marketing },
  { speciality: 'Cyber Security', image: cyber_security },
  { speciality: 'Data Science', image: data_science },
  { speciality: 'App Development', image: app_development },
  { speciality: 'UI/UX', image: ui_ux },
  { speciality: 'Graphic Design', image: graphic_design },
]


export const courses = [
  // --- Web Development (3) ---
  {
    _id: 'course1',
    title: 'Full-Stack Web Development',
    image: web_development1,
    category: 'Web Development',
    duration: '3 Months',
    level: 'Beginner to Advanced',
    mentor: { name: 'John Doe', image: mentor_1, role: 'Senior Web Developer' },
    about: 'This course covers both front-end and back-end web development. Students will learn to create responsive websites, dynamic web applications, and RESTful APIs using modern technologies including HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB. By the end of the course, learners will build a fully functional full-stack project.',
    price: 199,
    modules: ['HTML & CSS Fundamentals', 'JavaScript & DOM Manipulation', 'React.js Basics & Advanced Concepts', 'Node.js & Express APIs', 'MongoDB Database Integration', 'Final Project'],
  },
  {
    _id: 'course2',
    title: 'Advanced React Development',
    image: web_development2,
    category: 'Web Development',
    duration: '2 Months',
    level: 'Intermediate',
    mentor: { name: 'Sophia Green', image: mentor_2, role: 'React Specialist' },
    about: 'Focuses on advanced React skills including React Hooks, Context API, state management with Redux, performance optimization, and testing with Jest. Students will work on real-world projects and learn best practices for building scalable and maintainable React applications.',
    price: 179,
    modules: ['React Hooks', 'Context API', 'Redux Toolkit', 'React Performance', 'Testing with Jest'],
  },
  {
    _id: 'course3',
    title: 'Backend with Node.js & Express',
    image: web_development3,
    category: 'Web Development',
    duration: '3 Months',
    level: 'Intermediate',
    mentor: { name: 'David Clark', image: mentor_3, role: 'Backend Developer' },
    about: 'Covers server-side development with Node.js and Express. Students will learn to build APIs, handle authentication with JWT, manage databases, and implement security practices. The course emphasizes practical applications and hands-on projects to build backend expertise.',
    price: 189,
    modules: ['Node.js Basics', 'Express.js Setup', 'REST APIs', 'Authentication & JWT', 'Database Integration'],
  },

  // --- Digital Marketing (3) ---
  {
    _id: 'course4',
    title: 'Digital Marketing Mastery',
    image: digital_marketing1,
    category: 'Digital Marketing',
    duration: '2 Months',
    level: 'Beginner',
    mentor: { name: 'Sophia Lee', image: mentor_4, role: 'Marketing Strategist' },
    about: 'A comprehensive course on digital marketing techniques. Learn SEO, social media marketing, content strategy, email campaigns, and Google Ads. Students will work on real campaigns to understand how to drive traffic, increase conversions, and grow online presence.',
    price: 149,
    modules: ['SEO & Keyword Research', 'Content Marketing', 'Social Media Strategies', 'Email Marketing', 'Google Ads & PPC Campaigns'],
  },
  {
    _id: 'course5',
    title: 'Social Media Marketing',
    image: digital_marketing2,
    category: 'Digital Marketing',
    duration: '1.5 Months',
    level: 'Beginner',
    mentor: { name: 'Lucas Adams', image: mentor_5, role: 'Social Media Expert' },
    about: 'Students learn how to grow a brand’s presence on Instagram, Facebook, LinkedIn, and TikTok. This course covers content creation, engagement strategies, paid advertising, and analytics to measure success and optimize campaigns.',
    price: 129,
    modules: ['Content Creation', 'Instagram Growth', 'Facebook Ads', 'LinkedIn Marketing', 'Analytics & Insights'],
  },
  {
    _id: 'course6',
    title: 'SEO & Content Strategy',
    image: digital_marketing3,
    category: 'Digital Marketing',
    duration: '1 Month',
    level: 'Intermediate',
    mentor: { name: 'Ava Taylor', image: mentor_6, role: 'SEO Specialist' },
    about: 'Focuses on improving website visibility using on-page SEO, technical SEO, keyword research, backlinks, and content optimization. Students will gain hands-on experience optimizing websites for search engines and analyzing performance metrics.',
    price: 139,
    modules: ['On-page SEO', 'Technical SEO', 'Keyword Research', 'Backlink Building', 'Content Optimization'],
  },

  // --- Cyber Security (3) ---
  {
    _id: 'course7',
    title: 'Cyber Security Essentials',
    image: cyber_security1,
    category: 'Cyber Security',
    duration: '4 Months',
    level: 'Intermediate',
    mentor: { name: 'Michael Brown', image: mentor_7, role: 'Cyber Security Expert' },
    about: 'Covers ethical hacking fundamentals, penetration testing, and security principles. Students will learn to secure systems, analyze vulnerabilities, and implement defense mechanisms against cyber threats.',
    price: 249,
    modules: ['Networking Fundamentals', 'Linux for Security', 'Ethical Hacking Basics', 'Web Application Security', 'Penetration Testing Labs'],
  },
  {
    _id: 'course8',
    title: 'Ethical Hacking Bootcamp',
    image: cyber_security2,
    category: 'Cyber Security',
    duration: '3 Months',
    level: 'Advanced',
    mentor: { name: 'Ethan Wright', image: mentor_8, role: 'Ethical Hacker' },
    about: 'Hands-on ethical hacking training including vulnerability assessment, system exploitation, and penetration testing. Students practice using tools like Metasploit and Wireshark to simulate real-world security attacks ethically.',
    price: 269,
    modules: ['Footprinting & Recon', 'System Hacking', 'Web App Exploits', 'Metasploit Framework', 'Real-World Case Studies'],
  },
  {
    _id: 'course9',
    title: 'Network Security Fundamentals',
    image: cyber_security3,
    category: 'Cyber Security',
    duration: '2 Months',
    level: 'Beginner',
    mentor: { name: 'Grace Hall', image: mentor_9, role: 'Network Security Analyst' },
    about: 'Teaches how to secure networks, routers, and firewalls while preventing vulnerabilities. Students will understand networking protocols, threat detection, and network monitoring strategies to maintain secure infrastructures.',
    price: 199,
    modules: ['Networking Basics', 'Firewalls', 'VPNs', 'IDS/IPS', 'Network Monitoring'],
  },

  // --- Data Science (3) ---
  {
    _id: 'course10',
    title: 'Data Science & Machine Learning',
    image: data_science1,
    category: 'Data Science',
    duration: '5 Months',
    level: 'Advanced',
    mentor: { name: 'Emma Wilson', image: mentor_10, role: 'Data Scientist' },
    about: 'Covers Python programming, data analysis, visualization, statistics, machine learning, and AI. Students work on real datasets and predictive models to solve real-world business problems and understand how to leverage data for decision-making.',
    price: 299,
    modules: ['Python for Data Analysis', 'Statistics & Probability', 'Data Visualization', 'Machine Learning Models', 'Deep Learning Basics'],
  },
  {
    _id: 'course11',
    title: 'Python for Data Analysis',
    image: data_science2,
    category: 'Data Science',
    duration: '2 Months',
    level: 'Beginner',
    mentor: { name: 'Daniel Evans', image: mentor_11, role: 'Data Analyst' },
    about: 'Learn data science using Python libraries like Pandas, NumPy, and Matplotlib. Students will clean, manipulate, and visualize data to derive actionable insights from datasets.',
    price: 149,
    modules: ['Python Basics', 'Pandas', 'NumPy', 'Data Cleaning', 'Data Visualization'],
  },
  {
    _id: 'course12',
    title: 'AI & Deep Learning',
    image: data_science3,
    category: 'Data Science',
    duration: '4 Months',
    level: 'Advanced',
    mentor: { name: 'Mia Scott', image: mentor_12, role: 'AI Engineer' },
    about: 'Covers neural networks and deep learning with TensorFlow and PyTorch. Students will build CNNs, RNNs, and other models to work on AI projects, including image recognition, natural language processing, and predictive analytics.',
    price: 329,
    modules: ['Neural Networks', 'TensorFlow Basics', 'PyTorch Basics', 'CNNs', 'RNNs & LSTMs'],
  },

  // --- App Development (3) ---
  {
    _id: 'course13',
    title: 'Mobile App Development',
    image: app_development1,
    category: 'App Development',
    duration: '3 Months',
    level: 'Beginner',
    mentor: { name: 'David Kim', image: mentor_13, role: 'Mobile App Developer' },
    about: 'Students learn to build cross-platform mobile applications using React Native, integrating APIs and managing state efficiently. Projects include building apps for Android and iOS with real-world functionality.',
    price: 199,
    modules: ['React Native Basics', 'UI Components & Navigation', 'API Integration', 'State Management', 'Deploying to Play Store & App Store'],
  },
  {
    _id: 'course14',
    title: 'iOS Development with Swift',
    image: app_development2,
    category: 'App Development',
    duration: '3 Months',
    level: 'Intermediate',
    mentor: { name: 'Noah Rivera', image: mentor_14, role: 'iOS Developer' },
    about: 'Covers building iOS apps with Swift and Xcode, focusing on UIKit and SwiftUI. Students learn app architecture, UI design, and how to publish apps on the App Store.',
    price: 229,
    modules: ['Swift Basics', 'UIKit Fundamentals', 'SwiftUI', 'APIs & JSON', 'App Deployment'],
  },
  {
    _id: 'course15',
    title: 'Android Development with Kotlin',
    image: app_development3,
    category: 'App Development',
    duration: '3 Months',
    level: 'Intermediate',
    mentor: { name: 'Sophia Green', image: mentor_15, role: 'Android Developer' },
    about: 'Students learn to create modern Android applications using Kotlin. Covers layouts, UI/UX principles, API integration, Firebase, and publishing apps on Google Play Store.',
    price: 219,
    modules: ['Kotlin Basics', 'Android Studio Setup', 'UI Layouts', 'API & Firebase', 'Publishing Apps'],
  },

  // --- Graphic Design (3) ---
  {
    _id: 'course16',
    title: 'Graphic Design Fundamentals',
    image: graphic_design1,
    category: 'Graphic Design',
    duration: '2 Months',
    level: 'Beginner',
    mentor: { name: 'Isabella Perez', image: mentor_16, role: 'Graphic Designer' },
    about: 'Introduces design principles, typography, color theory, and software skills in Photoshop and Illustrator. Students complete hands-on projects to build a strong foundation in graphic design.',
    price: 119,
    modules: ['Design Principles', 'Typography & Color Theory', 'Photoshop Basics', 'Illustrator Basics', 'Branding Projects'],
  },
  {
    _id: 'course17',
    title: 'Advanced Illustrator & Branding',
    image: graphic_design2,
    category: 'Graphic Design',
    duration: '1.5 Months',
    level: 'Intermediate',
    mentor: { name: 'Olivia Martinez', image: mentor_17, role: 'Senior Designer' },
    about: 'Focuses on advanced vector illustration, logo design, and branding workflows. Students create professional brand identities and understand design guidelines and industry practices.',
    price: 149,
    modules: ['Advanced Illustrator Techniques', 'Logo Design Process', 'Brand Guidelines', 'Packaging Mockups', 'Portfolio Project'],
  },
  {
    _id: 'course18',
    title: 'Photoshop & Creative Projects',
    image: graphic_design3,
    category: 'Graphic Design',
    duration: '1.5 Months',
    level: 'Intermediate',
    mentor: { name: 'Liam Johnson', image: mentor_18, role: 'Creative Artist' },
    about: 'Covers Adobe Photoshop techniques for photo editing, digital painting, and compositing. Students work on creative projects to build a professional portfolio.',
    price: 139,
    modules: ['Photo Editing', 'Digital Painting', 'Layer Mastery', 'Compositing', 'Creative Portfolio'],
  },

  // --- UI/UX (3) ---
  {
    _id: 'course19',
    title: 'UI/UX Design Bootcamp',
    image: ui_ux1,
    category: 'UI/UX',
    duration: '2 Months',
    level: 'Beginner',
    mentor: { name: 'James Foster', image: mentor_1, role: 'Product Designer' },
    about: 'Introduces design thinking, user research, wireframing, prototyping, and Figma tools. Students learn to create user-centered designs for web and mobile applications.',
    price: 129,
    modules: ['Design Thinking Process', 'User Research & Personas', 'Wireframing & Prototyping', 'Figma & Design Tools', 'Usability Testing'],
  },
  {
    _id: 'course20',
    title: 'Advanced Figma & Prototyping',
    image: ui_ux2,
    category: 'UI/UX',
    duration: '1.5 Months',
    level: 'Intermediate',
    mentor: { name: 'Charlotte Young', image: mentor_2, role: 'UX Researcher' },
    about: 'Covers high-fidelity prototyping, design systems, collaboration tools, and usability testing. Students gain skills to produce professional design prototypes and work effectively with teams.',
    price: 159,
    modules: ['Figma Advanced Tools', 'Interactive Prototypes', 'Design Systems', 'Collaboration Tools', 'User Testing'],
  },
  {
    _id: 'course21',
    title: 'UX Research & Usability Testing',
    image: ui_ux3,
    category: 'UI/UX',
    duration: '1.5 Months',
    level: 'Intermediate',
    mentor: { name: 'Daniel Evans', image: mentor_3, role: 'UX Specialist' },
    about: 'Focuses on UX research methods, usability testing, and analyzing user behavior. Students learn how to improve product experience, interpret data, and design better interfaces.',
    price: 149,
    modules: ['Research Methods', 'User Interviews', 'A/B Testing', 'Heuristic Evaluation', 'Usability Reports'],
  },
];


