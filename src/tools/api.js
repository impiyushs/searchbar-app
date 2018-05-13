import 'whatwg-fetch';

const api = {
    get: function (url) {
        return fetch(url,{

        })
        .then(function(response){
            return response.json();
        });
    }
};

export default api;