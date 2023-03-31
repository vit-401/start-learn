import express from 'express'

const cheerio = require('cheerio');
const axios = require('axios');
const app = express()


const port = process.env.PORT || 5001


const startApp = async () => {
  const scrapeSiteWithPagination: any = async (url: string, page = 1, results: {
    title: string,
    price: string
  }[] = []) => {
    const response = await axios.get(`${url}&page=${page}`);
    const $ = cheerio.load(response.data);
    // Extract the data you need using Cheerio, such as the product titles and prices.
    const titles = $('.css-16v5mdi').map((i: any, el: any) => $(el).text()).get();
    const prices = $('p[data-testid="ad-price"]').map((i: any, el: any) => $(el).text()).get();
    //   const title = $(element).find('.css-16v5mdi').text().trim();
    //   const price = $(element).find('p[data-testid="ad-price"]').text().trim().substr(0, $(element).find('p[data-testid="ad-price"]').text()

    // Combine the titles and prices into an array of objects.
    const pageResults = titles.map((title: string, i: number) => ({title, price: prices[i]}));

    // Add the page results to the overall results array.
    results.push(...pageResults);

    // Check if there is a "next page" button or link.
    const nextPageLink = $(`a[data-testid="pagination-link-${page}"]`);
    console.log(page)
    if (nextPageLink && page <= 24) {
      // If there is a next page, recursively call the function for the next page.
      return scrapeSiteWithPagination(url, page + 1, results);
    } else {
      // If there are no more pages, return the overall results array.
      return results;
    }
  };

  app.get('/parse-product', async (req, res) => {
    try {
      const {url} = req.query;
      if (!url) {
        throw new Error('No URL provided');
      }

      const data = await scrapeSiteWithPagination(url)
      // Make GET request to provided URL
      // const response = await axios.get(url);
      // const htmlContent = response.data;
      //
      // // Load HTML content into cheerio for parsing
      // const $ = cheerio.load(htmlContent);
      //
      // // Extract product information from HTML using CSS selectors
      // const productInfo = $('.css-u2ayx9');
      // const products: { id: any; title: any; price: any; }[] = [];
      //
      // productInfo.each((index:number, element:any) => {
      //   const title = $(element).find('.css-16v5mdi').text().trim();
      //   const price = $(element).find('p[data-testid="ad-price"]').text().trim().substr(0, $(element).find('p[data-testid="ad-price"]').text().indexOf('грн.')+4);
      //
      //   products.push({ id: index, title, price });
      // });
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Error parsing product data'});
    }
  })


  app.listen(port, () => {
    console.log(`App started: ${port}`)
  })
}

startApp()
