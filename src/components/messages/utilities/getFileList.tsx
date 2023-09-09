export function getFileList() {

  let getsResultDataUrl = process.env.REACT_APP_RESULTDATA_DIRECT === "true"
    ? window.location.protocol + "//" + window.location.hostname +
    ":" + window.location.port + "/resultdata/getmedia"
    : process.env.REACT_APP_WEB_DATA_URL + "/resultdata/getmedia"

  // need exception !!!
  // endpoint notworking 
  return fetch(getsResultDataUrl)
    .then(response => response.json())
    .catch((error) => {
      console.log(error)
      return null
    })
}
