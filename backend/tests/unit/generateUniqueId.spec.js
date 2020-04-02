const generateUniqueId = require('../../src/utils/generateUniqId');
 

describe('Generete Unique ID', () => {
    it(' should generete unique ID', () => {

        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    });
});