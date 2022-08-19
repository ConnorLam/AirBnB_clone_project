import Cookies from 'js-cookie'

export async function csrfFetch(url, options = {}){
    // defaults method to get if there is no method
    options.method = options.method || 'GET';
    // set headers to an empty obj if there is no headers
    options.headers = options.headers || {}

    // if the options.method is not 'GET', set "Content-Type" to 
    //application/json, and set the 'XSRF-token' header to value of the 
    // "XSRF-TOKEN" cookie
    if(options.method.toUpperCase() !== 'GET'){
        options.headers['Content-Type'] =
            options.headers['Content-Type'] || 'application/json'
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN')
    }
    // call the deafult window's fetch with the url and the options passed in
    const res = await window.fetch(url, options)

    // if the response status code is 400 or above, then throw an error with error 
    //being the response
    if (res.status >= 400) throw res;

    // if the res status code is under 400, then return the response to next promise chain
    return res;
}

// GET /api/csrf/restore route needs to be called when app is loaded
// get "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore')
}