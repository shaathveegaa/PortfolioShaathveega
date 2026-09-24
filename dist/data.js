// Add only verified details. Empty values remain unavailable in the interface.
export const profile = { name:'Shaathveegaa Rajeshkannan',firstName:'Shaathveegaa',degree:'BSc (Hons) in Computer Science',status:'Undergraduate',university:'University of Vavuniya',country:'Sri Lanka',email:'',github:'https://github.com/shaathveegaa',linkedin:'https://www.linkedin.com/in/shaathveegaa-rajeshkannan-03127a420/',resume:'',portrait:'',contactEndpoint:'' };
export const skills = {
 'Programming languages':['C','C++','Java','Python','SQL','MATLAB'],
 'Web development':['HTML','CSS','JavaScript','Front-end Development','Web Application Development','Basic Back-end Development','Node.js','npm','Sass / SCSS'],
 'Databases':['PostgreSQL','SQL','Database Design','Relational Databases','Database Management','Queries & Data Manipulation'],
 'Artificial intelligence':['Artificial Intelligence','Machine Learning','Deep Learning','Computer Vision','Convolutional Neural Networks','Transfer Learning','Model Evaluation','Data Preprocessing'],
 'Data science & analytics':['Data Cleaning','Data Preprocessing','Data Analysis','Data Visualization','Data Interpretation','Statistical Concepts','Data Analytics'],
 'Computer science':['Data Structures & Algorithms','Object-Oriented Programming','Operating Systems','Computer Networks','Computer Architecture','Parallel Computing','Software Engineering','System Analysis & Design','Human-Computer Interaction'],
 'UI / UX':['UI Design','UX Concepts','Prototyping','Usability Concepts','Axure RP'],
 'Tools & technologies':['Git','GitHub','PostgreSQL','MATLAB','Laragon','Node.js','npm','Sass / SCSS','Notepad++','Axure RP','OpenCV','PyTorch','Keras']
};
export const interests = [
 ['Software development','Turning concepts into practical, structured applications.','</>'],
 ['Web development','Creating accessible experiences for the connected world.','⌘'],
 ['Artificial intelligence','Exploring how intelligent systems learn and reason.','✳'],
 ['Machine learning','Finding patterns and learning from data.','⠿'],
 ['Data science & analytics','Asking better questions through data and visualization.','◷'],
 ['Database development','Organizing information with thoughtful relational design.','▤'],
 ['Computer vision','Understanding visual information through computing.','◎'],
 ['Software engineering','Building a foundation in reliable software practices.','⌥'],
 ['UI / UX','Making technology more intuitive and human-centered.','◈']
];
// Placeholder slots: these do not claim completed projects or outcomes.
export const projects = [
 {id:'web',title:'Web development',category:'Web',summary:'Web application studies and practical development.'},
 {id:'ai',title:'AI & machine learning',category:'AI / ML',summary:'Explorations in intelligent systems and learning from data.'},
 {id:'database',title:'Database applications',category:'Database',summary:'Academic work with relational data and database concepts.'},
 {id:'academic',title:'Computer science in practice',category:'Academic',summary:'OOP, networking, MATLAB, parallel programming and UI/UX studies.'}
].map(p=>({...p,description:'Project details will be added here when available.',technologies:[],image:'',github:'',liveDemo:'',status:'Details coming soon',year:'',placeholder:true}));
export const constellation = [
 {name:'Python',related:['Machine learning','PyTorch','Keras','OpenCV','Data science'],x:29,y:28},
 {name:'SQL',related:['PostgreSQL','Database design','Data manipulation'],x:73,y:31},
 {name:'JavaScript',related:['HTML','CSS','Node.js','npm','Sass'],x:71,y:72},
 {name:'C / C++',related:['Algorithms','Computer architecture','Parallel computing'],x:27,y:72},
 {name:'Java',related:['Object-oriented programming','Data structures','Software development'],x:50,y:14},
 {name:'MATLAB',related:['Data analysis','Visualization','Numerical computing'],x:50,y:87}
];
