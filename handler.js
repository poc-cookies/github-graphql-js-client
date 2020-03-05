'use strict';

const { GraphQLClient } = require('graphql-request')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const graphqlEP = 'https://api.github.com/graphql'
const client = new GraphQLClient(graphqlEP, {
  headers: {
    authorization: `Bearer ${GITHUB_TOKEN}`,
  },
})

const findRepoId = (client, owner, repoName) => {

  // Built with https://github.com/prisma-labs/graphql-request#using-variables
  const query = /* GraphQL */ `
  query findRepoId($owner: String!, $repoName: String!) {
    repository(owner:$owner, name:$repoName) {
      id
    }
  }`

  const vars = {
    owner,
    repoName,
  }

  // As an alternative Template Literals could be used (no need to use vars object)
  // const query = `{
  //   repository(owner:"${owner}", name:"${repoName}") {
  //     id
  //   }
  // }`

  return client.request(query, vars)
}

const createIssue = (client, repoId, title, body) => {

  const mutation = /* GraphQL */ `
  mutation createIssue($repoId: ID!, $title: String!, $body: String!) {
    createIssue(input:{repositoryId:$repoId, title:$title, body:$body}) {
      issue {
        title,
        body
      }
    }
  }`

  const vars = {
    repoId,
    title,
    body,
  }

  return client.request(mutation, vars)
}

module.exports.hello = async event => {

  const repoIdRes = await findRepoId(client, "poc-cookies", "friendlyhello");
  const {issueTitle, issueBody} = event;
  await createIssue(client, repoIdRes.repository.id, issueTitle, issueBody) // Check the list of issues of the target repo

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        repoId: repoIdRes.repository.id,
        issueTitle,
        issueBody,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
