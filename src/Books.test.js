const axios = require('axios');

describe('Test de l\'API Open Library', () => {
it('La requête API pour le JSON renvoie un JSON', async () => {
try {
    //détails du livre en format JSON
    const response = await axios.get('https://openlibrary.org/works/OL29276W.json');
    
    //type de contenu de la réponse est JSON
    expect(response.headers['content-type']).toContain('application/json');
} catch (error) {
    console.log('Erreur lors de la requête JSON:', error);
}
});

it('La requête API pour l\'image renvoie un JPEG', async () => {
try {
    //obtenir l'image
    const response = await axios.get('https://covers.openlibrary.org/b/id/6506668-L.jpg', {
    responseType: 'arraybuffer' 
    });
    
    // Vérifiez contenu de la réponse est JPEG
    expect(response.headers['content-type']).toContain('image/jpeg');
} catch (error) {
    console.log('Erreur lors de la requête JPEG:', error);
}
});
});
