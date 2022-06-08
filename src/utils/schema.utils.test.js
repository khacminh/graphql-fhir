const { GraphQLInputObjectType, GraphQLString } = require('graphql');
const { mapJsonToSchema } = require('./schema.utils');

// Sample GraphQL Object Type
const PersonSchema = new GraphQLInputObjectType({
  name: 'PersonSchema',
  description: 'Random Information',
  fields: {
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
  },
});

const ContactSchema = new GraphQLInputObjectType({
  name: 'ContactSchema',
  description: 'Random Information',
  fields: {
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    person: { type: PersonSchema },
  },
});

describe('Schema Utils Test', () => {
  describe('mapJsonToSchema', () => {
    test('should take a schema and some JSON and return properties', () => {
      const json = {
        city: 'Foo',
        state: 'Bar',
        person: { first_name: 'Joe' },
      };

      const result = mapJsonToSchema(json, ContactSchema);

      expect(result).toEqual(json);
    });

    test('should return an error when not being able to coerce values', () => {
      const json = {
        city: 'Foo',
        state: 'Bar',
        badProperty: 'fubar',
      };

      expect(() => {
        mapJsonToSchema(json, ContactSchema);
      }).toThrow();
    });
  });
});
