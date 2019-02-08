const port = process.env.PORT || 4000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/Project-4'

module.exports = {
  port: port,
  dbURI: dbURI
}
