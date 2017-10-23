export const getImage = (collection) => {
  return fetch(`https://api.unsplash.com/photos/random/?collections=${collection}&client_id=bb1476fb6a53f4d59e6bf868591a6fb0bcdfb0d5171c58c6b13d09ccfbf5effa`, {
      method: 'GET',
      mode: 'cors',  // no-cors by default
      headers: new Headers({
          'Content-Type': 'application/json; charset=utf-8'
      })
  })
    .then((response) => response.json())
    .then((image) => image.urls.full)
}