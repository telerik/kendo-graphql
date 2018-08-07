import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLFloat,
} from 'graphql';

module.exports = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        ProductID: { type: GraphQLID },
        ProductName: { type: GraphQLString },
        UnitPrice: { type: GraphQLFloat },
        UnitsInStock: { type: GraphQLFloat }
    })
});