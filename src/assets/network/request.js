function get(url, token) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type':'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': `Bearer ${token}`
            },
          }).then((response) => response.json())
          .then((response) => {
              resolve(response);
          }).catch(err => reject(err));
    });
}

function post(url, token, body) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type':'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
          }).then((response) => response.json())
          .then((response) => {
              resolve(response);
          }).catch(err => reject(err));
    });
}

function remove(url, token) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type':'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': `Bearer ${token}`
            },
          }).then((response) => response.json())
          .then((response) => {
              resolve(response);
          }).catch(err => reject(err));
    });
}

function update(url, token, body) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type':'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
          }).then((response) => response.json())
          .then((response) => {
              resolve(response);
          }).catch(err => reject(err));
    });
}

module.exports = {
    get,
    post,
    remove,
    update,
}