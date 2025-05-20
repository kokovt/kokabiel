function generateRandomString() {
  let randomString = '';
  const randomNumber = Math.floor(Math.random() * 10);

  for (let i = 0; i < 20 + randomNumber; i++) {
    randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94));
  }

  return randomString;
}


async function setupOAuth() {
  try {
    const fragment = new URLSearchParams(new URL(window.location.href).search);
    const [code] = [fragment.get('code')];

    if (!code) return window.location.href = "https://discord.com/oauth2/authorize?client_id=1371399304782286900&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5500%2Fdiscord%2Fauth.html&scope=identify+guilds+email";

    const STATE = generateRandomString();
    localStorage.setItem("oauth-state", STATE);

    const data = JSON.parse(await (await fetch("http://localhost:3000/discord/oauth?code=" + code + "&state=" + btoa(STATE))).text());

    console.log(data.discord_data.access_token)

    document.cookie = `discordtoken=${data.discord_data.access_token}; expires=${new Date().getTime() + data.expires_in * 1000}; path=/`;
    document.cookie = `refreshtoken=${data.discord_data.refresh_token}; expire=${new Date().now + 10 * 365 * 24 * 60 * 60 * 1000}; path=/`;
  } catch (err) { }
}

function oauth() {
  setupOAuth();
  window.opener.location.reload();
  window.close();
}

window.onload = async (href) => {
}
