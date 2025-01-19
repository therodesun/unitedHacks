import { HttpException, Injectable } from '@nestjs/common';
import { CustomLoggerService } from 'src/modules/logger/services';
import { ErrorCodeEnum } from 'src/modules/shared/types/enums';
import { DbContext } from '../context/db-context';
import { UserRoleEnum } from 'src/modules/user/types/enums';

@Injectable()
export class UserSeeder {
  constructor(
    private readonly dbContext: DbContext,
    private readonly logger: CustomLoggerService,
  ) {}

  public async run(): Promise<void> {
    // values
    const maleFirstNames = [
      'John',
      'Vishnu',
      'Soltan',
      'Michael',
      'William',
      'David',
      'Richard',
      'Joseph',
      'Thomas',
      'Charles',
      'Daniel',
      'Matthew',
      'Anthony',
      'Donald',
      'Mark',
      'Paul',
      'Steven',
      'Andrew',
      'Kenneth',
      'Joshua',
    ];
    const maleLastNames = [
      'Smith',
      'Johnson',
      'Williams',
      'Jones',
      'Brown',
      'Davis',
      'Miller',
      'Wilson',
      'Moore',
      'Taylor',
      'Anderson',
      'Thomas',
      'Jackson',
      'White',
      'Harris',
      'Martin',
      'Thompson',
      'Garcia',
      'Martinez',
      'Robinson',
    ];
    const femaleFirstNames = [
      'Erika',
      'Patricia',
      'Jennifer',
      'Linda',
      'Elizabeth',
      'Barbara',
      'Susan',
      'Jessica',
      'Sarah',
      'Karen',
      'Nancy',
      'Lisa',
      'Betty',
      'Dorothy',
      'Sandra',
      'Ashley',
      'Kimberly',
      'Donna',
      'Emily',
      'Michelle',
    ];
    const femaleLastNames = [
      'Smith',
      'Johnson',
      'Williams',
      'Jones',
      'Brown',
      'Davis',
      'Miller',
      'Wilson',
      'Moore',
      'Taylor',
      'Anderson',
      'Thomas',
      'Jackson',
      'White',
      'Harris',
      'Martin',
      'Thompson',
      'Garcia',
      'Martinez',
      'Robinson',
    ];

    const fields = [
      {
        label: 'Computer Science',
        skills: [
          'Programming',
          'Data Structures',
          'Algorithms',
          'Software Engineering',
          'Web Development',
          'Mobile Development',
          'Machine Learning',
          'Artificial Intelligence',
          'Computer Vision',
          'Natural Language Processing',
          'Databases',
          'Operating Systems',
          'Computer Networks',
          'Cybersecurity',
          'Cloud Computing',
          'DevOps',
          'Blockchain',
        ],
      },
      {
        label: 'Mathematics',
        skills: [
          'Algebra',
          'Calculus',
          'Geometry',
          'Trigonometry',
          'Statistics',
          'Probability',
          'Differential Equations',
          'Linear Algebra',
          'Number Theory',
          'Discrete Mathematics',
          'Topology',
          'Numerical Analysis',
          'Optimization',
          'Combinatorics',
          'Graph Theory',
          'Mathematical Logic',
          'Set Theory',
        ],
      },
      {
        label: 'Physics',
        skills: [
          'Classical Mechanics',
          'Quantum Mechanics',
          'Thermodynamics',
          'Electromagnetism',
          'Optics',
          'Relativity',
          'Astrophysics',
          'Particle Physics',
          'Nuclear Physics',
          'Plasma Physics',
          'Solid State Physics',
          'Fluid Dynamics',
          'Acoustics',
          'Biophysics',
          'Geophysics',
          'Materials Science',
          'Quantum Field Theory',
        ],
      },
      {
        label: 'Chemistry',
        skills: [
          'Physical Chemistry',
          'Organic Chemistry',
          'Inorganic Chemistry',
          'Analytical Chemistry',
          'Biochemistry',
          'Theoretical Chemistry',
          'Nuclear Chemistry',
          'Quantum Chemistry',
          'Environmental Chemistry',
          'Medicinal Chemistry',
          'Polymer Chemistry',
          'Surface Chemistry',
          'Thermochemistry',
          'Electrochemistry',
          'Photochemistry',
          'Spectroscopy',
          'Crystallography',
        ],
      },
      {
        label: 'Biology',
        skills: [
          'Cell Biology',
          'Genetics',
          'Evolution',
          'Ecology',
          'Botany',
          'Zoology',
          'Microbiology',
          'Immunology',
          'Biochemistry',
          'Molecular Biology',
          'Biotechnology',
          'Neuroscience',
          'Physiology',
          'Anatomy',
          'Biophysics',
          'Biostatistics',
          'Bioinformatics',
        ],
      },
      {
        label: 'Engineering',
        skills: [
          'Mechanical Engineering',
          'Civil Engineering',
          'Electrical Engineering',
          'Chemical Engineering',
          'Aerospace Engineering',
          'Computer Engineering',
          'Biomedical Engineering',
          'Materials Engineering',
          'Environmental Engineering',
          'Industrial Engineering',
          'Systems Engineering',
          'Software Engineering',
          'Petroleum Engineering',
          'Nuclear Engineering',
          'Marine Engineering',
          'Agricultural Engineering',
          'Mining Engineering',
        ],
      },
      {
        label: 'Medicine',
        skills: [
          'Anatomy',
          'Physiology',
          'Biochemistry',
          'Pharmacology',
          'Pathology',
          'Microbiology',
          'Immunology',
          'Parasitology',
          'Virology',
          'Epidemiology',
          'Public Health',
          'Internal Medicine',
          'Surgery',
          'Pediatrics',
          'Obstetrics and Gynecology',
          'Psychiatry',
          'Radiology',
          'Anesthesiology',
        ],
      },
      {
        label: 'Law',
        skills: [
          'Criminal Law',
          'Civil Law',
          'Constitutional Law',
          'Administrative Law',
          'International Law',
          'Human Rights Law',
          'Corporate Law',
          'Tax Law',
          'Intellectual Property Law',
        ],
      },
      {
        label: 'Business',
        skills: [
          'Accounting',
          'Finance',
          'Marketing',
          'Management',
          'Human Resources',
          'Operations',
          'Supply Chain Management',
          'Entrepreneurship',
          'Business Analytics',
          'Business Intelligence',
          'Business Strategy',
          'Business Development',
          'Business Process Management',
          'Business Continuity Management',
          'Business Transformation',
          'Business Process Reengineering',
          'Business Process Outsourcing',
        ],
      },
      {
        label: 'Economics',
        skills: [
          'Microeconomics',
          'Macroeconomics',
          'Econometrics',
          'Development Economics',
          'International Economics',
          'Labor Economics',
          'Health Economics',
          'Public Economics',
          'Environmental Economics',
          'Agricultural Economics',
          'Financial Economics',
          'Monetary Economics',
          'Industrial Organization',
          'Game Theory',
          'Behavioral Economics',
          'Experimental Economics',
          'Political Economy',
        ],
      },
      {
        label: 'Psychology',
        skills: [
          'Clinical Psychology',
          'Cognitive Psychology',
          'Developmental Psychology',
          'Social Psychology',
          'Educational Psychology',
          'Industrial Psychology',
          'Organizational Psychology',
          'Health Psychology',
          'Sports Psychology',
          'Forensic Psychology',
          'Counseling Psychology',
          'Community Psychology',
          'Environmental Psychology',
          'Positive Psychology',
          'Cross-Cultural Psychology',
          'Neuropsychology',
          'Psychometrics',
        ],
      },
      {
        label: 'Sociology',
        skills: [
          'Social Stratification',
          'Social Mobility',
          'Social Change',
          'Socialization',
          'Social Control',
          'Social Interaction',
          'Social Networks',
          'Social Structure',
          'Social Psychology',
          'Social Theory',
          'Sociological Methods',
          'Sociological Theories',
          'Sociological Research',
          'Sociological Perspectives',
          'Sociological Concepts',
          'Sociological Paradigms',
          'Sociological Models',
        ],
      },
      {
        label: 'History',
        skills: [
          'Ancient History',
          'Medieval History',
          'Modern History',
          'Contemporary History',
          'Military History',
          'Political History',
          'Economic History',
          'Social History',
          'Cultural History',
          'Intellectual History',
          'Diplomatic History',
          'Environmental History',
        ],
      },
    ];
    const degrees = ['BSc', 'MSc', 'PhD'];

    const locations = [
      'Tokyo (Japan)',
      'New York City (United States)',
      'London (United Kingdom)',
      'Paris (France)',
      'Berlin (Germany)',
      'Madrid (Spain)',
      'Rome (Italy)',
      'Moscow (Russia)',
      'Beijing (China)',
      'Seoul (South Korea)',
      'Bangkok (Thailand)',
      'New Delhi (India)',
      'Cairo (Egypt)',
      'Cape Town (South Africa)',
      'Sydney (Australia)',
      'Rio de Janeiro (Brazil)',
      'Buenos Aires (Argentina)',
      'Mexico City (Mexico)',
      'Toronto (Canada)',
      'Los Angeles (United States)',
    ];

    // Helper Functions
    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const getRandomSkills = (skillsArray) => {
      const shuffled = skillsArray.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 5);
    };

    const generateProfile = (gender) => {
      const firstName =
        gender === 'male'
          ? getRandom(maleFirstNames)
          : getRandom(femaleFirstNames);
      const lastName =
        gender === 'male'
          ? getRandom(maleLastNames)
          : getRandom(femaleLastNames);
      const field = getRandom(fields);
      const fieldLabel = field.label;
      const skills = getRandomSkills(field.skills);
      const experience = Math.floor(Math.random() * 7) + 1; // 1-7 years
      const salary = (Math.floor(Math.random() * 12) + 1) * 10000; // $10,000 to $120,000 per year
      const education = `${getRandom(degrees)} in ${fieldLabel}`;
      const location = getRandom(locations);

      return {
        firstName: firstName,
        lastName: lastName,
        education: education,
        field: fieldLabel,
        skills: skills.toString(),
        experience: `${experience} years`,
        location: location,
        salary: `$${salary.toLocaleString()}/year`,
      };
    };

    const candidatesCount = await this.dbContext.users.countDocuments({
      role: UserRoleEnum.CANDIDATE,
    });

    // candidates
    if (candidatesCount > 50) {
      this.logger.log('Candidates already seeded', 'Database');
      return;
    } else {
      this.logger.log('Seeding candidates ...', 'Database');
      // 100 Candidates
      const profiles = Array.from({ length: 100 }, () =>
        generateProfile(Math.random() < 0.5 ? 'male' : 'female'),
      ).map((profile) => {
        return {
          ...profile,
          role: UserRoleEnum.CANDIDATE,
        };
      });

      console.log(profiles);
      // todo - insert profiles into db
    }

    try {
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(ErrorCodeEnum.FAILED_OPERATION, 400, {
        description: 'Failed to seed plan',
      });
    }
  }
}
