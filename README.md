# Local Library Management System

## Project Overview

This full-stack web application emulates the catalog system of a local library. It provides a user-friendly platform for managing a vast collection of books, authors, genres, and user accounts.

## Key Features

- **Catalog Management**: Allows librarians to create, read, update, and delete information about books, authors, and genres.
- **Search Functionality(TODO)**: Users can search the entire catalog to find specific books or authors.
- **User Accounts**: Patrons can sign up, log in, and manage their profiles.
- **Loan System**: Enables checking out books, tracking due dates, and managing returns.
- **Admin Interface**: A backend interface for librarians to oversee library operations.

## Challenges Faced

### Data Modeling
- **Problem**: Establishing a scalable database schema to handle complex relationships with minimal redundancy.
- **Solution**: Designed normalized schemas and utilized Mongoose for object modeling, ensuring efficient data organization.

### Relationship Management
- **Problem**: Implementing and querying one-to-many and many-to-many relationships in MongoDB.
- **Solution**: Used references for one-to-many and embedded documents for many-to-many relationships, leveraging MongoDB's aggregation framework for complex queries.

### Data Integrity
- **Problem**: Maintaining referential integrity during updates and deletions.
- **Solution**: Applied Mongoose middleware to automate cascading effects across related documents.

### Performance
- **Problem**: Ensuring the system remains performant with growing data.
- **Solution**: Instituted indexing strategies and optimized queries to enhance response times.

### User Interface
- **Problem**: Presenting interrelated data in an intuitive manner.
- **Solution**: Developed a clear and navigable interface, allowing users to easily interact with the system.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: Pug templates, HTML, CSS, JavaScript

## Project Outcome

The project has been successful in delivering an operational and efficient system to manage library tasks. It has honed my backend development expertise, particularly in handling complex databases and creating robust user interfaces.
