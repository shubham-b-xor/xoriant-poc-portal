export interface Contributor {
  name: string;
  email: string;
  designation: string;
}

export interface POC {
  _id: string;
  name: string;
  logoUrl: string;
  shortDescription: string;
  description: string;
  url: string;
  status: 'Active' | 'Completed' | 'Planned';
  contributors: Contributor[];
}
