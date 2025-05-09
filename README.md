# Mergington High School Management System

A simple web application that allows students to view, sign up for, and unregister from extracurricular activities at Mergington High School.

## Features

- View a list of available extracurricular activities.
- Sign up for activities by providing an email address.
- Unregister from activities.
- Dynamically update the UI to reflect changes without refreshing the page.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: FastAPI (Python)
- **Styling**: Responsive design with CSS
- **Data**: In-memory database for activities and participants

## Project Structure

```
/workspaces/skills-getting-started-with-github-copilot-2/
├── src/
│   ├── app.py                # FastAPI backend
│   ├── static/
│   │   ├── index.html        # Frontend HTML
│   │   ├── styles.css        # Styling for the application
│   │   ├── app.js            # Frontend JavaScript logic
│   └── ...
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd skills-getting-started-with-github-copilot-2
   ```

2. **Install Dependencies**:
   Ensure you have Python 3 installed. Install FastAPI and Uvicorn:
   ```bash
   pip3 install fastapi uvicorn
   ```

3. **Run the Application**:
   Start the FastAPI server:
   ```bash
   uvicorn src.app:app --reload
   ```

4. **Access the Application**:
   Open your browser and navigate to:
   ```
   http://127.0.0.1:8000/static/index.html
   ```

## API Endpoints

### `GET /activities`
- **Description**: Retrieve the list of available activities.
- **Response**: JSON object containing activity details.

### `POST /activities/{activity_name}/signup`
- **Description**: Sign up a student for an activity.
- **Parameters**:
  - `activity_name` (path): Name of the activity.
  - `email` (query): Student's email address.
- **Response**: Success or error message.

### `POST /activities/{activity_name}/unregister`
- **Description**: Unregister a student from an activity.
- **Parameters**:
  - `activity_name` (path): Name of the activity.
  - `email` (query): Student's email address.
- **Response**: Success or error message.

## Frontend Features

- **Dynamic Activity List**: Activities are fetched from the backend and displayed dynamically.
- **Sign-Up Form**: Allows students to sign up for activities.
- **Unregister Button**: Allows students to unregister from activities directly from the activity card.

## Future Enhancements

- Add persistent storage (e.g., a database) for activities and participants.
- Implement user authentication for better security.
- Add email notifications for sign-ups and unregistrations.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

