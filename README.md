This API provides endpoints for user management, including authentication, profile management, and admin operations.

## Endpoints

### 1. Create User

- **Method**: POST
- **URL**: `localhost/api/users/`
- **Description**: Create a new user.
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - `201 Created` - User successfully created.
  - `400 Bad Request` - Invalid user data.

---

### 2. Get All Users

- **Method**: GET
- **URL**: `localhost/api/users/`
- **Description**: Retrieve all users from the database.
- **Response**:
  - `200 OK` - List of users successfully retrieved.
  - `500 Internal Server Error` - Failed to retrieve users.

---

### 3. Get Current User

- **Method**: GET
- **URL**: `localhost/api/users/profile`
- **Description**: Retrieve the profile of the currently logged-in user.
- **Response**:
  - `200 OK` - User profile successfully retrieved.
  - `401 Unauthorized` - User not authenticated.

---

### 4. Get User Profile

- **Method**: GET
- **URL**: `localhost/api/users/:id`
- **Description**: Retrieve a user by their ID.
- **Request Params**:
  - `id` (required): The ID of the user to be retrieved.
- **Response**:
  - `200 OK` - User successfully retrieved.
  - `404 Not Found` - User not found.

---

### 5. User Login

- **Method**: POST
- **URL**: `localhost/api/users/auth`
- **Description**: Log in a user with their credentials.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - `200 OK` - User successfully logged in.
  - `401 Unauthorized` - Invalid credentials.

---

### 6. Delete User by ID

- **Method**: DELETE
- **URL**: `localhost/api/users/:id`
- **Description**: Delete a user by their ID.
- **Request Params**:
  - `id` (required): The ID of the user to be deleted.
- **Response**:
  - `200 OK` - User successfully deleted.
  - `404 Not Found` - User not found.


## Essential User Management Routes

### User Registration
- **Method**: POST
- **URL**: `/api/users/`

### User Login
- **Method**: POST
- **URL**: `/api/users/auth`

### User Logout
- **Method**: POST
- **URL**: `/api/users/logout`

### Get Current User Profile
- **Method**: GET
- **URL**: `/api/users/profile`

### Update Current User Profile
- **Method**: PUT
- **URL**: `/api/users/profile`

### Get All Users
- **Method**: GET
- **URL**: `/api/users/`

### Get User by ID
- **Method**: GET
- **URL**: `/api/users/{id}`

### Update User by ID
- **Method**: PUT
- **URL**: `/api/users/{id}`

### Delete User by ID
- **Method**: DELETE
- **URL**: `/api/users/{id}`
