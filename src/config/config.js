const API_DOMAIN = 'https://backend-project-ii.netlify.app'

const cacheBusting = () => `?_${Date.now().toString()}`

const apiRoutes = {
  listNews: '/.netlify/functions/newsFindAll',
  addNews: '/.netlify/functions/newsInsert',
  deleteNews: '/.netlify/functions/newsDelete'
}

const categories = [
  'politics',
  'sports', 
  'economy',
  'culture',
  'social',
  'showbiz',
  'police',
  'legal',
  'scientific',
  'health',
  'technology',
  'education',
  'environment'
].sort().map(x => (x.toUpperCase()))

export {
  API_DOMAIN,
  apiRoutes,
  cacheBusting,
  categories
}