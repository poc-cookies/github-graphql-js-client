# Getting Fun with GitHub Graphql API & Serverless JS

## Prerequisites

1. npm 6+
2. nodejs 12+
3. serverless

## Commands

Invoke the Function on your local machine:

    GITHUB_TOKEN={your_github_token} serverless invoke local -f hello -l

Invoke the Function on you local machine with params:

    GITHUB_TOKEN={your_github_token} serverless invoke local -f hello -l --data '{"issueTitle": "title1", "issueBody": "body1"}'

Deploy the service (requires AWS credentials):

    serverless deploy -v

Remove the service (requires AWS credentials):

    serverless remove
