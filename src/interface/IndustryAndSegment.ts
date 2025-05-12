type SegmentType = string[]
type IndustryType = string[]
export interface IndustrySegemntType {
    industry: string,
    segment: string,
    presenterIndustry: string,
    presenterSegment: string,
}

// export const SegmentList:SegmentType = ['IT', 'Finance', 'Consulting', 'Sales & Marketing'];
export const IndustryList: IndustryType = ['IT', 'Finance', 'Consulting', 'Sales & Marketing']

// export const IndustryList: IndustryType = ['IT', 'Finance', 'Consulting', 'Sales & Marketing'];

export const SegmentList: Record<string, SegmentType> = {
    IT: [
        'Architect/Engineering',
        'Business Analyst/BPM',
        'Data Engineering',
        'Data Scientist',
        'GenAI',
        'GenAI/ML',
        'IaC/SRE/DevOps',
        'Infra/ Reliability Engg',
        'IT/Developer',
        'Programming/ Development',
        'Testing',
        'Product Management',
        'Project Management',
        'Infosec',
        'Developer'
    ],
    Finance: [
        'Audit/Risk & Compliance',
        'Commercial Underwriting',
        'Controllership',
        'Corporate Finance',
        'Structured Finance',
        'Investment Banking'
    ],
    Consulting: [
        'Business Consulting',
        'Business Intelligence',
        'Business Research',
        'Strategy'
    ],
    'Sales & Marketing': [
        'Branding',
        'Branding / Marketing',
        'Business Consulting',
        'Marketing',
        'Sales/BD',
        'Strategy'
    ]
};
