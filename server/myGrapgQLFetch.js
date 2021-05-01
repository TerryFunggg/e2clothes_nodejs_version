const fetch = require('isomorphic-fetch');

const gqlServerURL = process.env.GRAPHQL_ENDPOINT

async function gqlFetch(query, token = '') {
  try {
    const data = await fetch(gqlServerURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ query })
    })
    return await data.json()
  }
  catch (error) {
    console.log(error);
  }
}


module.exports = gqlFetch
