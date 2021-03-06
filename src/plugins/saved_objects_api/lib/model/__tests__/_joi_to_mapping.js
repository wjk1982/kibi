import expect from 'expect.js';
import Joi from 'joi';
import joiToMapping from '../_joi_to_mapping';

describe('saved_objects_api', function () {

  describe('model', function () {

    describe('JoiToMapping', function () {

      it('should convert a Joi schema to Elasticsearch mapping properties.', function () {
        let schema = Joi.object().keys({
          id: Joi.number().integer(),
          title: Joi.string(),
          created: Joi.date(),
          json: Joi.object()
        });

        expect(joiToMapping(schema)).to.eql({
          id: {
            type: 'integer'
          },
          title: {
            type: 'string'
          },
          created: {
            type: 'date'
          },
          json: {
            type: 'string'
          }
        });
      });

      it('should throw an error if a Joi type is not recognized.', function () {
        let schema = Joi.object().keys({
          id: Joi.number()
        });

        expect(() => {joiToMapping(schema);}).to.throwError();
      });

    });

  });

});
