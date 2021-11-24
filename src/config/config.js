const API_DOMAIN = 'https://backend-project-ii.netlify.app'

const cacheBusting = () => `?_${Date.now().toString()}`

const apiRoutes = {
  listNews: '/.netlify/functions/newsFindAll'
}

export {
  API_DOMAIN,
  apiRoutes,
  cacheBusting
}