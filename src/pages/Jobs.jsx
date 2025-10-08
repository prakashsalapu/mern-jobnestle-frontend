import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const location = useLocation();

  // initialize filters from URL query params (q, loc, type)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    const loc = params.get('loc') || '';
    const t = params.get('type') || '';
    if (q) setSearchTerm(q);
    if (loc) setLocationFilter(loc);
    if (t) setTypeFilter(t);
  }, [location.search]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_BASE}/api/jobs`);
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const data = await res.json();
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs(getSampleJobs());
    } finally {
      setLoading(false);
    }
  };

  const getSampleJobs = () => [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp',
  location: 'Banglore, Karnataka',
      job_type: 'Full-time',
  salary_range: '₹80,000 - ₹120,000',
      description: 'We are looking for a talented Frontend Developer to join our team.',
      requirements: ['3+ years experience', 'Strong portfolio', 'Team player'],
      skills_required: ['React', 'JavaScript', 'CSS', 'HTML'],
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Backend Developer',
      company: 'DataSystems Inc',
  location: 'Hyderabad, Telangana',
      job_type: 'Full-time',
  salary_range: '₹90,000 - ₹130,000',
      description: 'Join our backend team to build scalable APIs and microservices.',
      requirements: ['5+ years experience', 'Database design', 'API development'],
      skills_required: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
  location: 'Banglore, Karnataka',
      job_type: 'Full-time',
  salary_range: '₹100,000 - ₹150,000',
      description: 'Looking for a full stack developer to work on our innovative product.',
      requirements: ['4+ years experience', 'Startup experience preferred', 'Self-motivated'],
      skills_required: ['React', 'Node.js', 'TypeScript', 'AWS'],
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'UI/UX Designer',
      company: 'DesignStudio',
    location: 'Chennai, Tamil Nadu',
      job_type: 'Contract',
    salary_range: '₹60,000 - ₹90,000',
      description: 'We need a creative UI/UX designer to help us redesign our product.',
      requirements: ['Portfolio required', 'User research', 'Prototyping'],
      skills_required: ['Figma', 'Sketch', 'Adobe XD', 'User Research'],
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      company: 'CloudTech',
    location: 'Gurugram, Haryana',
      job_type: 'Full-time',
    salary_range: '₹110,000 - ₹140,000',
      description: 'Seeking experienced DevOps engineer to manage our cloud infrastructure.',
      requirements: ['AWS/Azure experience', 'Docker & Kubernetes', 'CI/CD pipelines'],
      skills_required: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '6',
      title: 'Data Scientist',
      company: 'AI Innovations',
    location: 'Hyderabad, Telangana',
      job_type: 'Full-time',
    salary_range: '₹120,000 - ₹160,000',
      description: 'Join our data science team to work on machine learning models.',
      requirements: ['PhD or Masters preferred', 'ML experience', 'Python expert'],
      skills_required: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis'],
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '7',
      title: 'QA Engineer',
      company: 'QualityWorks',
  location: 'Hyderabad, Telangana',
      job_type: 'Full-time',
  salary_range: '₹75,000 - ₹100,000',
      description: 'Responsible for designing and executing test plans for web applications.',
      requirements: ['3+ years QA', 'Automated testing experience', 'Attention to detail'],
      skills_required: ['Selenium', 'Cypress', 'JavaScript', 'Test Automation'],
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '8',
      title: 'Product Manager',
      company: 'MarketLead',
  location: 'Banglore, Karnataka',
      job_type: 'Full-time',
  salary_range: '₹110,000 - ₹145,000',
      description: 'Lead cross-functional teams to build and ship product features.',
      requirements: ['3+ years PM experience', 'Roadmap planning', 'Stakeholder management'],
      skills_required: ['Product Strategy', 'User Research', 'Roadmapping', 'Communication'],
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '9',
      title: 'Mobile Engineer (iOS)',
      company: 'AppForge',
      location: 'Jaipur, Rajasthan',
      job_type: 'Full-time',
  salary_range: '₹95,000 - ₹130,000',
      description: 'Build and maintain high-quality iOS applications with great user experience.',
      requirements: ['3+ years iOS', 'Swift expertise', 'App Store experience'],
      skills_required: ['Swift', 'Objective-C', 'iOS SDK', 'REST APIs'],
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '10',
      title: 'Content Writer',
      company: 'WriteRight Media',
      location: 'Kochi, Kerala',
      job_type: 'Part-time',
  salary_range: '₹35,000 - ₹55,000',
      description: 'Create compelling technical and marketing content for our audience.',
      requirements: ['Strong writing skills', 'SEO knowledge', 'Portfolio required'],
      skills_required: ['SEO', 'Copywriting', 'WordPress', 'Content Strategy'],
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = locationFilter
      ? job.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;

    const matchesType = typeFilter ? job.job_type === typeFilter : true;

    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Your Next Job</h1>
          <p className="text-lg text-gray-600">Browse through {jobs.length} available positions</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-blue-600 font-medium">{job.company}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {job.job_type}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {job.location}
                  </div>
                  {job.salary_range && (
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                      {job.salary_range}
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    Posted {new Date(job.created_at).toLocaleDateString()}
                  </div>
                </div>

                {job.skills_required && job.skills_required.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills_required.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
