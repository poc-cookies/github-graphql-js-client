# Getting Fun with GitHub Graphql API & Serverless JS

## Prerequisites

1. npm 6+
2. nodejs 12+
3. serverless

## Commands

Invoke the Function on your machine:

    GITHUB_TOKEN={your_github_token} serverless invoke local -f hello -l

Deploy the service (requires AWS credentials):

    serverless deploy -v

Remove the service (requires AWS credentials):

    serverless remove
