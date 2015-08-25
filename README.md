# BUG: sometimes the response comes incomplete (when using buffer)

run jsreport server with:

> node server

run the pdf rendering with:

> node client-render

Note:

run `client-render.js` many times in order to get incomplete responses (the correct buffer size for this test case is: 27776)
