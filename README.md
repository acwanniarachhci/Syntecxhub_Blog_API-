# Syntecxhub Blog API

A REST API for blog posts with pagination, filtering and sorting, built with Node.js, Express and MongoDB (Mongoose).
Created as part of the Syntecxhub Back-End Development Internship (Week 2, Project 2).

## Features

- Full CRUD for blog posts (title, body, author, tags)
- Pagination using `limit` and `skip`
- Filtering by tag, author and date range
- Sorting by newest or oldest
- Get a single post by ID
- Input validation and proper HTTP status codes

## Tech Stack

Node.js, Express, MongoDB + Mongoose, dotenv, nodemon (dev)

## Getting Started

1. Clone the repo and run `npm install`
2. Create a `.env` file:

3. Run `npm run dev`

## API Endpoints

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| POST   | /api/posts       | Create a post        |
| GET    | /api/posts       | List posts           |
| GET    | /api/posts/:id   | Get a single post    |
| PUT    | /api/posts/:id   | Update a post        |
| DELETE | /api/posts/:id   | Delete a post        |

## Query Parameters (GET /api/posts)

| Param  | Example                          | Description                         |
|--------|----------------------------------|-------------------------------------|
| tag    | `?tag=nodejs`                    | Filter by tag                       |
| author | `?author=kamal`                  | Filter by author (case-insensitive) |
| from   | `?from=2026-10-01`               | Posts created on/after this date    |
| to     | `?to=2026-10-31`                 | Posts created on/before this date   |
| sort   | `?sort=oldest`                   | `newest` (default) or `oldest`      |
| limit  | `?limit=5`                       | Posts per request (default 10, max 100) |
| skip   | `?skip=5`                        | Number of posts to skip             |

Combined example: `/api/posts?tag=backend&sort=oldest&limit=2&skip=0`

## Post Schema

| Field  | Type     | Rules                          |
|--------|----------|--------------------------------|
| title  | String   | Required, 3-150 characters     |
| body   | String   | Required, min 10 characters    |
| author | String   | Required                       |
| tags   | [String] | Optional, stored lowercase     |

## Status Codes

| Code | Meaning                       |
|------|-------------------------------|
| 200  | Success                       |
| 201  | Created                       |
| 400  | Validation error / invalid ID |
| 404  | Post or route not found       |
| 500  | Server error                  |

## Screenshots

Screenshot 2026-10-15 215711.png
Screenshot 2026-10-15 215746.png
Screenshot 2026-10-15 215827.png
Screenshot 2026-10-15 215848.png
Screenshot 2026-10-15 215914.png

## Author

acwanniarachchi 