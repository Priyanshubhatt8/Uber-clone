# Captain Registration and Login Endpoint Documentation

## Endpoint: Captain Register

`POST /captains/register`

### Description
Registers a new captain (driver) in the system. Validates input, hashes the password, creates a captain, and returns an authentication token with captain data.

### Request Body
```
{
  "email": "captain@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```
- `email` (string, required): Valid email address, min 5 characters.
- `fullname` (object, required):
  - `firstname` (string, required): Min 3 characters.
  - `lastname` (string, optional): Min 3 characters if provided.
- `password` (string, required): Min 6 characters.
- `vehicle` (object, required):
  - `color` (string, required): Min 3 characters.
  - `plate` (string, required): Min 3 characters.
  - `capacity` (number, required): Min 1.
  - `vehicleType` (string, required): One of `car`, `motorcycle`, `auto`.

### Responses
- **201 Created**
  ```json
  {
    "token": "<jwt_token>",
    "captain": { ... },
    "message": "Captain registered successfully"
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ "..." ] }
  ```
- **500 Internal Server Error**
  ```json
  { "error": "Error message" }
  ```

---

## Endpoint: Captain Login

`POST /captains/login`

### Description
Authenticates a captain with email and password. Returns a JWT token and captain data on success.

### Request Body
```
{
  "email": "captain@example.com",
  "password": "yourpassword"
}
```
- `email` (string, required): Valid email address.
- `password` (string, required): Min 6 characters.

### Responses
- **200 OK**
  ```json
  {
    "token": "<jwt_token>",
    "captain": { ... },
    "message": "Login successful"
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ "..." ] }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Invalid email or password" }
  ```
- **500 Internal Server Error**
  ```json
  { "error": "Error message" }
  ```

# User Registration and Login Endpoint Documentation

## Endpoint: Register User

`POST /users/register`

### Description
Registers a new user in the system. Validates input, hashes the password, creates a user, and returns an authentication token with user data.

### Request Body
```
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "yourpassword"
}
```
- `email` (string, required): Valid email address.
- `fullname` (object, required):
  - `firstname` (string, required): Min 3 characters.
  - `lastname` (string, required): Min 1 character.
- `password` (string, required): Min 6 characters.

### Responses
- **201 Created**
  ```json
  {
    "token": "<jwt_token>",
    "user": { ... },
    "message": "User registered successfully"
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ "..." ] }
  ```
- **500 Internal Server Error**
  ```json
  { "error": "Error message" }
  ```

---

## Endpoint: User Login

`POST /users/login`

### Description
Authenticates a user with email and password. Returns a JWT token and user data on success.

### Request Body
```
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```
- `email` (string, required): Valid email address.
- `password` (string, required): Min 6 characters.

### Responses
- **200 OK**
  ```json
  {
    "token": "<jwt_token>",
    "user": { ... },
    "message": "Login successful"
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ "..." ] }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Invalid email or password" }
  ```
- **500 Internal Server Error**
  ```json
  { "error": "Error message" }
  ```

---

## Endpoint: Get User Profile

`GET /users/profile`

### Description
Retrieves the authenticated user's profile information. Requires authentication (JWT token in cookie or Authorization header).

### Headers
- `Authorization: Bearer <jwt_token>` (if not using cookie)

### Responses
- **200 OK**
  ```json
  {
    "user": { ... },
    "message": "User profile retrieved successfully"
  }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Authentication required" }
  ```

---

## Endpoint: Logout User

`GET /users/logout`

### Description
Logs out the authenticated user by blacklisting the JWT token and clearing the authentication cookie. Requires authentication.

### Headers
- `Authorization: Bearer <jwt_token>` (if not using cookie)

### Responses
- **200 OK**
  ```json
  { "message": "User logged out successfully" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Authentication token is missing" }
  ```

---

## Notes
- All required fields must be provided for registration and login.
- Passwords are securely hashed.
- JWT token is required for protected routes (profile, logout).
- On logout, the token is blacklisted for 24 hours and the cookie is cleared.
