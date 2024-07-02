const { v4: uuidv4 } = require('uuid');

// Helper functions for generating random data
const randomUUID = () => uuidv4();

const randomFirstName = () => {
  const firstNames = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Emma',
    'Frank',
    'Grace',
    'Henry',
    'Isabel',
    'Jack',
  ];
  return firstNames[Math.floor(Math.random() * firstNames.length)];
};

const randomLastName = () => {
  const lastNames = [
    'Adams',
    'Brown',
    'Clark',
    'Davis',
    'Evans',
    'Ford',
    'Garcia',
    'Harris',
    'Irwin',
    'Jones',
  ];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
};

const randomEmail = () => {
  const domains = ['example.com', 'test.org', 'company.net', 'web.dev'];
  const firstName = randomFirstName().toLowerCase();
  const lastName = randomLastName().toLowerCase();
  return `${firstName}.${lastName}@${
    domains[Math.floor(Math.random() * domains.length)]
  }`;
};

const randomDepartment = () => {
  const departments = [
    'Sales',
    'Marketing',
    'Engineering',
    'Finance',
    'Human Resources',
  ];
  return departments[Math.floor(Math.random() * departments.length)];
};

const randomStatus = () => {
  const statuses = ['Active', 'Inactive'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Function to generate random user data
export const generateRandomUserData = (numUsers = 100) => {
  const userData = [];

  for (let i = 0; i < numUsers; i++) {
    userData.push({
      id: randomUUID(),
      name: randomFirstName(),
      email: randomEmail(),
      lastName: randomLastName(),
      businessUnit: randomDepartment(),
      status: randomStatus(),
    });
  }

  return userData;
};
