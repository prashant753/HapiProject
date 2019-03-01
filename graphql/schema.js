const graphql = require('graphql');
const paintingType = require('./paintingType');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
}= graphql;

const rootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        paintings : {
            type:paintingType,
            args: {id : {type:GraphQLString}},
            resolve(parent,args){

            }
        }
    }
});
module.exports=new GraphQLSchema({
    query : rootQuery
})