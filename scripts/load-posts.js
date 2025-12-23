const postTemplate = document.getElementsByClassName("post")[0];
const profilePic   = postTemplate.querySelector(".profile-pic");


function formatDate(dateString) {
    let now  = new Date();
    let date = new Date(dateString);
    
    if (now.getFullYear() != date.getFullYear()) {
        return date.toLocaleDateString
    }
    if (now.getSeconds() == date.getSeconds()) {
        return "now"
    } 
    if (now.getMinutes() == date.getMinutes()) {
        return "now"
    }
}


function fillInData(posts) {
    for (const post of posts) {
        var postElement   = document.createElement("article");
        let timeFormatted = formatDate(post.datePosted);
        let notesHTML     = '<p class="hashtag">#' + post.notes.join('</p>\n<p class="hashtag">#') + "</p>";

        // I know this is goofy, but it beats using React 
        // (or PHP) to do literally only this
        postElement.innerHTML = `<div class="post post-header">
                <div class="info-box">
                    <div class="reblog-modifier">
                        <img class="profile-pic" src="${post.profileImage}">
                        <img class="reblog-icon" src="./images/icons/reblog.png">
                    </div>
                    <div class="post user-info">
                        <p class="username">${post.username}</p>
                        <p class="post post-date">${timeFormatted}</p>
                    </div>
                </div>
                <div class="post-controls">
                    <button title="This button does nothing." class="follow">Follow</button>
                    <img class="triple-dot-img" src="./images/icons/3-horizontal-dots-icon.webp">
                </div>
            </div>
            <p class="post post-content">
                ${post.postContent}
            </p>
            <div class="post post-footer">
                ${notesHTML}
            </div>`
        document.body.append(postElement);
    }
}

fetch("./posts.json")
    .then((resp) => resp.json())
    .then(fillInData)
    .catch((err) => console.error(`Promise resolution error: ${err}`))