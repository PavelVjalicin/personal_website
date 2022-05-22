export const fetchAPI = (endpoint, method, body) => fetch(endpoint, {
    method: method,
    body: JSON.stringify(body),
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },

})