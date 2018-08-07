import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import uuidv1 from 'uuid/v1';
import products from '../data/products';
import Product from './types/product';

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        products: {
            type: new GraphQLList(Product),
            resolve(parent, args){
                return products;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        AddProduct: {
            type: Product,
            args:{
                ProductName: { type: new GraphQLNonNull(GraphQLString) },
                UnitPrice: { type: new GraphQLNonNull(GraphQLFloat) },
                UnitsInStock: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parent, args) {
                let newProduct = {
                    ProductID: uuidv1(),
                    ProductName: args.ProductName,
                    UnitsInStock: args.UnitsInStock,
                    UnitPrice: args.UnitPrice
                }
                products.unshift(newProduct);

                return newProduct;
            }
        },
        UpdateProduct: {
            type: Product,
            args:{
                ProductID: { type: new GraphQLNonNull(GraphQLID) },
                ProductName: { type: new GraphQLNonNull(GraphQLString) },
                UnitPrice: { type: new GraphQLNonNull(GraphQLFloat) },
                UnitsInStock: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parent, args) {
                let index = products.findIndex(product => product.ProductID == args.ProductID);
                let product = products[index];

                product.ProductName = args.ProductName;
                product.UnitsInStock = args.UnitsInStock;
                product.UnitPrice = args.UnitPrice;

                return product;
            }
        },
        DeleteProduct: {
            type: Product,
            args:{
                ProductID: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let index = products.findIndex(product => product.ProductID == args.ProductID);
                products.splice(index, 1);

                return { ProductID: args.ProductID };
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});