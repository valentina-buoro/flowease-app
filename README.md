# IMPORTANT!
- Do not merge this branch!
- Do not rename this branch! (branch name: `api`)

# FLOWEASE API DOCUMENTATION

## Overview

Backend of a Project Management Application that allows authenticated users to create and edit projects and add collaborators, break down the projects into milestones and assign the milestones to collaborators on the project, mark milestones as started (by the assigned collaborator) or as completed (either by the assigned collaborator or the project owner), filter by project name and list all milestones on the project whether created or assigned, view the overall progress status of a project. It also features sending of real-time notifications when projects and milestones are created and when milestones are started or completed, and sending of email notifications on sign-up, verification and assignment to a project. Users can view their complete profile showing created and assigned projects and update their profile picture, and also view a limited profile of other users.

## Base URL

The base URL for all API requests is:

`https://redundant-discussion-zesty-star-production.pipeops.app/api`

## Encryption

User passwords are securely salted and hashed before being stored in the database.

## Verification

Verification link is sent to the user's newly registered email. User cannot login without being verified.

### Authentication

Authentication is handled with JWT. The token expires in 3 hours and must be provided in the headers as Authorization for protected routes.

Below are returned responses when accessing protected routes

- When no token is provided: Status Code: 401 (Unauthorized)

```json
{
  "success": false,
  "message": "Unauthorized. Please login"
}

```

- When the token is invalid: Status Code: 401 (Unauthorized)

```json
{
  "success": false,
  "message": "invalid signature"
}

```

Status Code: 401 (Unauthorized)

```json
{
  "success": false,
  "message": "invalid token"
}

```

- When the token has expired: Status Code: 401 (Unauthorized)

```json
{
  "success": false,
  "message": "jwt expired"
}
```
