/**
 * Default subjects for Electronics and Communication Engineering (ECE / ECED)
 * Keyed by semester number (3–8). Semesters 1–2 are common and not included.
 * Each entry has { name, code }.
 */
const ecedDefaults = {
    3: [
        { name: 'Electromagnetic Theory', code: 'ECN13101' },
        { name: 'Signals and Systems', code: 'ECN13102' },
        { name: 'Data Structures and Operating Systems', code: 'CSN13404' },
        { name: 'Networks and Systems', code: 'EEN13401' },
        { name: 'Microprocessor and Its Applications', code: 'ECN13103' },
        { name: 'Solid State Devices and Circuits', code: 'ECN13104' },
        { name: 'Business Economics', code: 'HSN13602' },
    ],
    4: [
        { name: 'VLSI Technology', code: 'ECN14101' },
        { name: 'Digital Communication', code: 'ECN14102' },
        { name: 'Automatic Control Systems', code: 'EEN14401' },
        { name: 'Antenna and Wave Propagation', code: 'ECN14103' },
        { name: 'Microcontrollers and Embedded Systems', code: 'ECN14104' },
        { name: 'Management Concepts and Applications', code: 'HSN14601' },
    ],
    5: [
        { name: 'Digital Signal Processing', code: 'ECN15101' },
        { name: 'Computer Architecture', code: 'ECN15102' },
        { name: 'Data Communication Networks', code: 'ECN15103' },
        { name: 'Electronic Circuit Design', code: 'ECN15104' },
        { name: 'Optical Communication', code: 'ECN15105' },
        { name: 'VLSI Design', code: 'ECN15106' },
    ],
    6: [
        { name: 'Digital Image Processing', code: 'ECN16101' },
        { name: 'RF and Microwave Engineering', code: 'ECN16102' },
        { name: 'Semiconductor Devices and Modeling', code: 'ECN16103' },
        { name: 'Soft Skills and Personality Development', code: 'HSN16XXX' },
    ],
    7: [
        { name: 'Mobile and Wireless Communication', code: 'ECN17101' },
        { name: 'Nano Electronics and Its Applications', code: 'ECN17102' },
        { name: 'Project', code: 'ECN17351' },
    ],
    8: [
        { name: 'Project/Internship', code: 'ECN18351' },
    ],
};

export default ecedDefaults;
