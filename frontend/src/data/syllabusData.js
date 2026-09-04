// Syllabus topics per subject
const syllabusData = {
    "VLSI TECHNOLOGY": [
        "Unit 1 – Introduction and basic fabrication steps",
        "Unit 2 – Oxidation, diffusion, ion implantation",
        "Unit 3 – Lithography and etching",
        "Unit 4 – Metallization and interconnects",
        "Unit 5 – CMOS process integration"
    ],
    "DIGITAL COMMUNICATION": [
        "Unit 1 – Sampling and quantization",
        "Unit 2 – Digital modulation techniques",
        "Unit 3 – Error control coding",
        "Unit 4 – Spread spectrum techniques",
        "Unit 5 – Information theory"
    ],
    "AUTOMATIC CONTROL SYSTEMS": [
        "Unit 1 – Control system fundamentals",
        "Unit 2 – Time domain analysis",
        "Unit 3 – Frequency domain analysis",
        "Unit 4 – Stability analysis",
        "Unit 5 – State space analysis"
    ],
    "ANTENNA AND WAVE PROPAGATION": [
        "Unit 1 – Antenna fundamentals",
        "Unit 2 – Wire antennas",
        "Unit 3 – Antenna arrays",
        "Unit 4 – Aperture and reflector antennas",
        "Unit 5 – Wave propagation"
    ],
    "MICROCONTROLLERS AND EMBEDDED SYSTEMS": [
        "Unit 1 – Microcontroller architecture",
        "Unit 2 – Instruction set and programming",
        "Unit 3 – Timers, interrupts and I/O",
        "Unit 4 – Serial communication interfaces",
        "Unit 5 – Embedded system design basics"
    ],
    "MANAGEMENT CONCEPTS AND APPLICATIONS": [
        "Unit 1 – Basics of management",
        "Unit 2 – Planning and organizing",
        "Unit 3 – Staffing and directing",
        "Unit 4 – Controlling",
        "Unit 5 – Modern management practices"
    ],
    "OPERATING SYSTEMS": [
        "Unit 1 – OS introduction and process management",
        "Unit 2 – CPU scheduling",
        "Unit 3 – Memory management",
        "Unit 4 – File systems",
        "Unit 5 – I/O systems and protection"
    ],
    "DATABASE MANAGEMENT SYSTEMS": [
        "Unit 1 – ER model and relational model",
        "Unit 2 – SQL and relational algebra",
        "Unit 3 – Normalization",
        "Unit 4 – Transaction management",
        "Unit 5 – Indexing and hashing"
    ],
    "COMPUTER NETWORKS": [
        "Unit 1 – Network models and physical layer",
        "Unit 2 – Data link layer",
        "Unit 3 – Network layer",
        "Unit 4 – Transport layer",
        "Unit 5 – Application layer"
    ],
    "DESIGN AND ANALYSIS OF ALGORITHMS": [
        "Unit 1 – Algorithm analysis and asymptotic notations",
        "Unit 2 – Divide and conquer",
        "Unit 3 – Greedy algorithms",
        "Unit 4 – Dynamic programming",
        "Unit 5 – Graph algorithms and NP-completeness"
    ],
    "SOFTWARE ENGINEERING": [
        "Unit 1 – Software process models",
        "Unit 2 – Requirements engineering",
        "Unit 3 – Software design",
        "Unit 4 – Testing strategies",
        "Unit 5 – Project management"
    ],
    "DISCRETE MATHEMATICS": [
        "Unit 1 – Logic and proofs",
        "Unit 2 – Set theory and relations",
        "Unit 3 – Graph theory",
        "Unit 4 – Combinatorics",
        "Unit 5 – Algebraic structures"
    ],
    "ELECTRICAL MACHINES-I": [
        "Unit 1 – Magnetic circuits and transformers",
        "Unit 2 – Single phase transformers",
        "Unit 3 – Three phase transformers",
        "Unit 4 – DC generators",
        "Unit 5 – DC motors"
    ],
    "POWER ELECTRONICS-I": [
        "Unit 1 – Power semiconductor devices",
        "Unit 2 – AC-DC converters",
        "Unit 3 – DC-DC converters",
        "Unit 4 – DC-AC inverters",
        "Unit 5 – AC voltage controllers"
    ],
    "ELECTRICAL MEASUREMENT & MEASURING INSTRUMENTS": [
        "Unit 1 – Measurement fundamentals",
        "Unit 2 – Analog instruments",
        "Unit 3 – Bridge circuits",
        "Unit 4 – Electronic instruments",
        "Unit 5 – Transducers"
    ],
    "SIGNALS & SYSTEMS": [
        "Unit 1 – Continuous-time signals and systems",
        "Unit 2 – Discrete-time signals and systems",
        "Unit 3 – Fourier series and transforms",
        "Unit 4 – Laplace and Z-transforms",
        "Unit 5 – Sampling and reconstruction"
    ],
    "DIGITAL ELECTRONICS": [
        "Unit 1 – Number systems and Boolean algebra",
        "Unit 2 – Combinational logic design",
        "Unit 3 – Sequential logic and flip-flops",
        "Unit 4 – Counters and shift registers",
        "Unit 5 – Memory and programmable logic devices"
    ],
    "ENGINEERING ECONOMICS & INDUSTRIAL MANAGEMENT": [
        "Unit 1 – Basics of engineering economics",
        "Unit 2 – Cost concepts and break-even analysis",
        "Unit 3 – Time value of money",
        "Unit 4 – Project evaluation techniques",
        "Unit 5 – Industrial management fundamentals"
    ],
    "WEB TECHNOLOGIES": [
        "Unit 1 – HTML, CSS and JavaScript",
        "Unit 2 – Server-side scripting",
        "Unit 3 – Databases for web",
        "Unit 4 – Web frameworks",
        "Unit 5 – Web security and APIs"
    ],
    "THERMODYNAMICS": [
        "Unit 1 – Basic concepts and laws",
        "Unit 2 – Properties of pure substances",
        "Unit 3 – First law applications",
        "Unit 4 – Second law and entropy",
        "Unit 5 – Gas power cycles"
    ],
    "FLUID MECHANICS": [
        "Unit 1 – Fluid properties and statics",
        "Unit 2 – Fluid kinematics",
        "Unit 3 – Fluid dynamics",
        "Unit 4 – Viscous flow",
        "Unit 5 – Boundary layer theory"
    ],
    "STRENGTH OF MATERIALS": [
        "Unit 1 – Stress and strain",
        "Unit 2 – Shear force and bending moment",
        "Unit 3 – Deflection of beams",
        "Unit 4 – Torsion",
        "Unit 5 – Columns and struts"
    ],
    "MANUFACTURING TECHNOLOGY": [
        "Unit 1 – Casting processes",
        "Unit 2 – Welding and joining",
        "Unit 3 – Metal forming",
        "Unit 4 – Machining processes",
        "Unit 5 – Non-traditional machining"
    ],
    "STRUCTURAL ANALYSIS": [
        "Unit 1 – Statically determinate structures",
        "Unit 2 – Influence lines",
        "Unit 3 – Energy methods",
        "Unit 4 – Slope deflection method",
        "Unit 5 – Moment distribution method"
    ],
    "SURVEYING": [
        "Unit 1 – Fundamentals of surveying",
        "Unit 2 – Leveling",
        "Unit 3 – Theodolite surveying",
        "Unit 4 – Tacheometric surveying",
        "Unit 5 – Curves"
    ],
    "BUILDING MATERIALS": [
        "Unit 1 – Stones and bricks",
        "Unit 2 – Cement and concrete",
        "Unit 3 – Timber",
        "Unit 4 – Metals and alloys",
        "Unit 5 – Modern construction materials"
    ],
    "GEOTECHNICAL ENGINEERING": [
        "Unit 1 – Soil properties and classification",
        "Unit 2 – Permeability and seepage",
        "Unit 3 – Compaction and consolidation",
        "Unit 4 – Shear strength",
        "Unit 5 – Earth pressure and slope stability"
    ]
};

export default syllabusData;
