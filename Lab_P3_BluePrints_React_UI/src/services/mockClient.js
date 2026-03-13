const mockData = [
  {
    author: 'Arsw',
    name: 'House',
    points: [
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
      { x: 100, y: 200 },
      { x: 100, y: 100 },
    ],
  },
  {
    author: 'Arsw',
    name: 'Tree',
    points: [
      { x: 300, y: 300 },
      { x: 320, y: 250 },
      { x: 340, y: 300 },
    ],
  },
  {
    author: 'Juan',
    name: 'Garage',
    points: [
      { x: 10, y: 10 },
      { x: 50, y: 10 },
      { x: 50, y: 50 },
      { x: 10, y: 50 },
      { x: 10, y: 10 },
    ],
  },
]

const mockClient = {
  getAll: async () => {
    return { data: mockData }
  },
  getByAuthor: async (author) => {
    const data = mockData.filter((bp) => bp.author === author)
    return { data }
  },
  getByAuthorAndName: async (author, name) => {
    const data = mockData.find((bp) => bp.author === author && bp.name === name)
    return { data }
  },
  create: async (blueprint) => {
    mockData.push(blueprint)
    return { data: blueprint }
  },
}

export default mockClient
