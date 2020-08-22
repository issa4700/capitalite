import { axios } from 'axios'
import { cheerio } from 'cheerio'

let stockQuote = async stockNum => {
    let URI = 'https://klse.i3investor.com/servlets/stk/'+ stockNum + '.jsp'
    
    const html = await axios.get(URI)
    const $ = await cheerio.load(html.data)
    
    const tickerName = $('#stcompany').text()
    
    return tickerName
}

stockQuote(7113).then(log())