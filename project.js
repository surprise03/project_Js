
// Sidebar Buttons
const homeBtn = document.getElementById("home");
const trendingBtn = document.getElementById("trending");
const postBtn = document.getElementById("post");

// Containers
const homeContainer = document.getElementById("home_container");
const trendingContainer = document.getElementById("Trending_container");
const postContainer = document.getElementById("post_container");
const postedTrends = document.getElementById("postedTrends");

// URL
const url = "https://inky-handy-title.glitch.me/content";

// Show Sections
function setActive(button) {
    document.querySelectorAll(".side_container p").forEach(p => p.classList.remove("active"));
    button.classList.add("active");
}

function showSection(section) {
    homeContainer.style.display = "none";
    trendingContainer.style.display = "none";
    postContainer.style.display = "none";

    if (section == trendingContainer) {
        section.style.display = "flex";
    } else {
        section.style.display = "block";
    }
}

homeBtn.addEventListener("click", () => {
    showSection(homeContainer);
    setActive(homeBtn);
});

trendingBtn.addEventListener("click", () => {
    showSection(trendingContainer);
    setActive(trendingBtn);
    renderTrending();
});

postBtn.addEventListener("click", () => {
    showSection(postContainer);
    setActive(postBtn);
});

async function fetchUrl() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayData(data);
        }
    } catch (err) {
        console.error(err);
    }
}

function displayData(dataArray) {
    trendingContainer.innerHTML = ``;

    dataArray.forEach(data => {
        const div = document.createElement("div");
        div.className = "dataDisplay";

        div.innerHTML = `
            <div class="mainDiv">
            <img src="${data.image}" alt="" style="width: 100%;">
                <p><strong>${data.Title}</strong></p>
                <p>${data.description}</p>

                <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                   
                    <button class="open-btn" onclick="openPopup('${data.id}')" style="padding:10px;">
                    
                        Comments (${data.comments.length})
                    </button>
                </div>
            </div>
        `;

        trendingContainer.appendChild(div);

        // Create the popup separately (OUTSIDE the card)
        const popupOverlay = document.createElement("div");
        popupOverlay.className = "overlay";
        popupOverlay.id = `popupOverlay-${data.id}`;

        popupOverlay.innerHTML = `
            <div class="popup">
                <h3 style="text-align:center;">Comments</h3>
                <div id="commentList-${data.id}" style="max-height: 300px; overflow-y: auto; margin-bottom: 10px;">
                    ${data.comments.map(comment => `<p>• ${comment}</p>`).join("")}
                </div>
                <div class="popComment">
                    <input id="commentInput-${data.id}" type="text" placeholder="Add a comment..." />
                    <button class="open-btn" style="background: green;" onclick="addComment('${data.id}')">Post</button>
                    <button class="close-btn" onclick="closePopup('${data.id}')">Close</button>
                </div>
            </div>
        `;

        document.body.appendChild(popupOverlay); // Append it to the body not inside the card
    });
}

function openPopup(id) {
    const overlay = document.getElementById(`popupOverlay-${id}`);
    overlay.classList.add('active');
}

function closePopup(id) {
    const overlay = document.getElementById(`popupOverlay-${id}`);
    overlay.classList.remove('active');
}

async function addComment(id) {
    const input = document.getElementById(`commentInput-${id}`);
    const newComment = input.value.trim();

    if (newComment === "") return;

    try {
        // Fetch current data
        const res = await fetch(`${url}/${id}`);
        const trend = await res.json();

        const updatedComments = [...trend.comments, newComment];

        // Update the comments
        await fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ comments: updatedComments })
        });

        input.value = ""; // Clear input
        fetchUrl(); // Refresh the list
    } catch (error) {
        console.error("Failed to add comment:", error);
    }
}

// Posting new trend
async function submitdata() {
    const image = document.getElementById("image").value;
    const Title = document.getElementById("trendTitle").value;
    const description = document.getElementById("trendDesc").value;
    const comments = [];

   if (Title!="" && description!==""){
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ Title, description, comments })
    });
   }
   else{
    alert("enter data properly")
   }

    fetchUrl(); // Refresh after post
}

function renderTrending() {
    fetchUrl();
}

// Initial load
showSection(homeContainer);
