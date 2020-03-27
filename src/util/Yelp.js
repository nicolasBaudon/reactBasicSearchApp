const apiKey = 'YHzZ41V4BRcw1_azbCzMunwYKoC-Nx1caCIu_mxj1RW5bekgd7K7BbhxeW63jLFrVbWEhEW32lH6yq0e6arTTmSbO92LUmMJ0lyIpSjUBLb7fXh8Y0qh22wxnvB9XnYx';

const yelp = {
    search(term, location, sortBy){
        const apiUrl = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
        // Se agregar en el inicio de la ruta esa url para obteber los permisos cross-origin y que se pueda hacer la request
        //Siempre que tire error por CORS, agregar antes de la ruta deseada, esta ruta
        return fetch(`https://cors-anywhere.herokuapp.com/${apiUrl}`, {
            headers : {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error('Request failed!');
        }, networkError => {
            console.log(networkError.message);
        }).then(jsonResponse => {
            if(jsonResponse.businesses){
                return jsonResponse.businesses.map(business => {
                    return {
                        id : business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    };
                })
            }else{

            }
        });
    }
};


export default yelp;