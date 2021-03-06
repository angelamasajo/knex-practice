require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

// console.log('knex and driver installed correctly')

// knexInstance.from('amazong_products').select('*')
//   .then(result => {
//     console.log(result)
//   })

// const qry = knexInstance 
//   .select('product_id', 'name', 'price', 'category')
//   .from('amazong_products')
//   .where({ name: 'Point of view gun' })
//   .first()
//   .toQuery()
//   // .then(result => {
//   //   console.log(result)
//   // })

// console.log(qry)


// //this is building a query that allows customers to search amazong_products table
// //for products that contain a word
// const searchTerm = 'holo'

// function searchByProduceName(searchTerm) {
//   knexInstance  
//     .select('product_id', 'name', 'price', 'category')
//     .from('amazong_products')
//     .where('name', 'ILIKE', `%${searchTerm}%`)
//     .then (result => {
//       console.log(result)
//     })
// }

// searchByProduceName('holo')


// //query that allows customers to paginate the amazong_products table products
// //10 products at a time
// function paginateProducts(page) {
//   const productsPerPage = 10
//   const offset = productsPerPage * (page - 1)
//   knexInstance
//     .select('product_id', 'name', 'price', 'category')
//     .from('amazong_products')
//     .limit(productsPerPage)
//     .offset(offset)
//     .then(result => {
//       console.log(result)
//     })
// }

// paginateProducts(2)


// //filter amazong_products table for products that have images
// function getProductsWithImages() {
//   knexInstance
//     .select('product_id', 'name', 'price', 'category', 'image')
//     .from('amazong_products')
//     .whereNotNull('image')
//     .then(result => {
//       console.log(result)
//     })
// }

// getProductsWithImages()


//query to see most popular videos at Whopipe by region for the last 30 days
function mostPopularVideosForDays(days) {
  knexInstance
    .select('video_name', 'region')
    .count('date_viewed AS views')
    .where(
      'date_viewed', 
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
    )
    .from('whopipe_video_views')
    .groupBy('video_name', 'region')
    .orderBy([
      { column: 'region', order: 'ASC' },
      { column: 'views', order: 'DESC' },
    ])
    .then(result => {
      console.log(result)
    })
}

mostPopularVideosForDays(30)
