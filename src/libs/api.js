let url;

if (process.env.NODE_ENV === 'production') {
    url = `https://api.unsplash.com/photos/random/?collections=${collection}&client_id=${UNSPLASH_CLIENT_ID}`;
}

export const getImage = (collection) => {
  return fetch(url, {
      method: 'GET',
      mode: 'cors',  // no-cors by default
      headers: new Headers({
          'Content-Type': 'application/json; charset=utf-8'
      })
  })
    .then((response) => response.json())
    .then((image) => image.urls.full)
    .catch(err => {
        // fallback api (only works in browser)
        return `https://source.unsplash.com/collection/410546/1600x900`;
    })
}