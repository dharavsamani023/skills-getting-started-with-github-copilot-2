document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Function to fetch activities from API
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      // Clear loading message
      activitiesList.innerHTML = "";

      // Populate activities list
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft = details.max_participants - details.participants.length;

        const participantsList = details.participants
          .map((participant) => `<li>${participant}</li>`)
          .join("");

        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>
          <p><strong>Schedule:</strong> ${details.schedule}</p>
          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>
          <div class="participants-section">
            <strong>Participants:</strong>
            <ul>${participantsList || "<li>No participants yet</li>"}</ul>
          </div>
          <button class="unregister-btn" data-activity="${name}">Unregister</button>
        `;

        activitiesList.appendChild(activityCard);

        // Add option to select dropdown
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
      });

      // Add event listeners for unregister buttons
      document.querySelectorAll(".unregister-btn").forEach((button) => {
        button.addEventListener("click", async (event) => {
          const activityName = event.target.dataset.activity;
          const email = prompt("Enter your email to unregister:");

          if (email) {
            try {
              const response = await fetch(
                `/activities/${encodeURIComponent(activityName)}/unregister?email=${encodeURIComponent(email)}`,
                {
                  method: "POST",
                }
              );

              const result = await response.json();

              if (response.ok) {
                alert(result.message);
                fetchActivities(); // Refresh activities list
              } else {
                alert(result.detail || "An error occurred");
              }
            } catch (error) {
              console.error("Error unregistering:", error);
              alert("Failed to unregister. Please try again.");
            }
          }
        });
      });
    } catch (error) {
      activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();

        // Update the activity card dynamically
        const activityCard = Array.from(document.querySelectorAll(".activity-card"))
          .find((card) => card.querySelector("h4")?.textContent === activity);

        if (activityCard) {
          const participantsSection = activityCard.querySelector(".participants-section ul");
          const spotsLeftElement = activityCard.querySelector("p:nth-of-type(3)");

          if (participantsSection) {
            // Add the new participant to the list
            const newParticipant = document.createElement("li");
            newParticipant.textContent = email;
            participantsSection.appendChild(newParticipant);
          }

          if (spotsLeftElement) {
            // Update spots left
            const spotsLeftText = spotsLeftElement.textContent.match(/\d+/);
            if (spotsLeftText) {
              const spotsLeft = parseInt(spotsLeftText[0], 10) - 1;
              spotsLeftElement.textContent = `Availability: ${spotsLeft} spots left`;
            }
          }
        }
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      console.error("Error signing up:", error);
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
    }
  });

  // Initialize app
  fetchActivities();
});
