const MINUTE_MS = 1000 * 60;
const HOUR_MS   = 60 * MINUTE_MS;
const DAY_MS    = 24 * HOUR_MS;

const fullOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric"
}

const shortOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
}

type Post = {
    username: string,
    profileImage: string,
    datePosted: string,
    postContent: string,
    notes: Array<string>
}

// currently only supports en-US locale
function formatDate(dateString: string) {
    const now      = new Date();
    const date     = new Date(dateString);
    const interval = now.getTime() - date.getTime();

    // if a previous year, print the whole date
    if (now.getFullYear() != date.getFullYear()) {
        return date.toLocaleDateString("en-US", fullOptions);
    }

    // if over a day ago, and in the same year, omit the year
    if (interval > DAY_MS) {
        return date.toLocaleDateString("en-US", shortOptions);
    }

    // if the date is a day or less ago but more than 1 hour, 
    // give the hours since the post only
    if (interval > HOUR_MS) {
        return Math.floor(interval / HOUR_MS).toString() + "h";
    }

    // if the date is an hour or less ago but more than 1 minute, 
    // give the minutes since the post only
    if (interval > MINUTE_MS) {
        return Math.floor(interval / MINUTE_MS).toString() + "m";
    }

    // if the date is within the last minute
    return "just now";
}


// 
function loadPostsClassicStyle(posts: Array<Post>): string {
    if (posts.length == 1) {
        return `<article class="post">
                    <p><span class="username">${posts[0].username}</span>:</p>
                    <blockquote>
                       ${posts[0].postContent}
                    </blockquote>
                </article>`
    }

    let currentPost = posts.pop();
    if (!currentPost) {return "";}

    return `<article class="post">
                <p><span class="username">${currentPost.username}</span>:</p>
                <blockquote>
                    ${loadPostsClassicStyle(posts)}
                    ${currentPost.postContent}
                </blockquote>
            </article>`
}


function loadPosts(posts: Array<Post>) {
    const query = URL.parse(location.href);

    if (query && query.searchParams.get("page-style") === "classic") {
        const allPosts = loadPostsClassicStyle(posts);
        document.body.innerHTML += allPosts;
        return;
    }

    for (const [i, post] of posts.entries()) {
        var postElement   = document.createElement("article");
        let timeFormatted = formatDate(post.datePosted);
        
        var notesHTML;
        if (post.notes) {
            notesHTML = '<p class="hashtag">#' 
                + post.notes.join('</p>\n<p class="hashtag">#') 
                + "</p>";
        }

        var firstPost = "";
        if (i == 0) {
            firstPost = 'id="original-post"'
        }

        // I know this is goofy, but it beats using React 
        // (or PHP) to do literally only this
        postElement.innerHTML = `<div class="post post-header">
                <div class="info-box">
                    <div class="reblog-modifier">
                        <img class="profile-pic" src="${post.profileImage}">
                        <img ${firstPost} class="reblog-icon" src="./images/icons/reblog.png">
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
    .then(loadPosts)
    .catch((err) => console.error(`Promise resolution error: ${err}`))