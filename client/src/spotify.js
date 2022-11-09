const URL = "http://localhost:5000"

// Map for localStorage keys
const SESSIONSTORAGE_KEYS = {
    accessToken: 'access_token',
    refreshToken: 'refresh_token',
    expireTime: 'expire_time',
    timestamp: 'timestamp',
  }
  
  // Map to retrieve localStorage values
  const SESSIONSTORAGE_VALUES = {
    accessToken: window.sessionStorage.getItem(SESSIONSTORAGE_KEYS.accessToken),
    refreshToken: window.sessionStorage.getItem(SESSIONSTORAGE_KEYS.refreshToken),
    expireTime: window.sessionStorage.getItem(SESSIONSTORAGE_KEYS.expireTime),
    timestamp: window.sessionStorage.getItem(SESSIONSTORAGE_KEYS.timestamp),
};

/**
 * Checks if the amount of time that has elapsed between the timestamp in localStorage
 * and now is greater than the expiration time of 3600 seconds (1 hour).
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
const hasTokenExpired = () => {
    const { accessToken, timestamp, expireTime } = SESSIONSTORAGE_VALUES;
    if (!accessToken || !timestamp) {
        return false;
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed / 1000) > Number(expireTime);
}

const refreshToken = async () => {
    try {
        if (!SESSIONSTORAGE_VALUES.refreshToken || SESSIONSTORAGE_VALUES.refreshToken === 'undefined'
            || (Date.now() - Number(SESSIONSTORAGE_VALUES.timestamp) / 1000) < 1000) {
                console.error('No refresh token available');
                logout();
            }
        const data = { refresh_token: SESSIONSTORAGE_VALUES.refreshToken };
        fetch(URL + "/refresh_token", { method: "POST", body: data, headers: {"content-type":"application/json; charset=UTF-8"} })
            .then(response => {
                window.sessionStorage.setItem(SESSIONSTORAGE_KEYS.accessToken, response.access_token);
                window.sessionStorage.setItem(SESSIONSTORAGE_KEYS.timestamp, Date.now());
                window.location.reload();
            })
    }
    catch (e) {
        console.error(e);
    }
}

const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const queryParams = {
        [SESSIONSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [SESSIONSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [SESSIONSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };
    const hasError = urlParams.get('error')

    // If there's an error OR the token in localStorage has expired, refresh the token
    if (hasError || hasTokenExpired() || SESSIONSTORAGE_VALUES.accessToken === 'undefined') {
        refreshToken();
    }

    // If there's a valid access token in SessionStorage, use that
    if (SESSIONSTORAGE_VALUES.accessToken && SESSIONSTORAGE_VALUES.accessToken  !== 'undefined') {
        return SESSIONSTORAGE_VALUES.accessToken;
    }

    // If there's a token in the URL query params, user is logging in for the first time
    if (queryParams[SESSIONSTORAGE_KEYS.accessToken]) {
        // Store the query params in SessionStorage
        for (const property in queryParams) {
            window.sessionStorage.setItem(property, queryParams[property]);
        }
        // Set timestamp
        window.sessionStorage.setItem(SESSIONSTORAGE_KEYS.timestamp, Date.now());
        // Return access token from query params
        return queryParams[SESSIONSTORAGE_KEYS.accessToken];
    }

    // We should never get here
    return false;
    
}

export const accessToken = getAccessToken();

export const logout = () => {
    // Clear all sessionStorage items
    for (const property in SESSIONSTORAGE_KEYS) {
        window.sessionStorage.removeItem(SESSIONSTORAGE_KEYS[property]);
    }
    // Navigate to homepage
    window.location = window.location.origin;
}

export const searchForSongs = async (searchText) => {
    var query = 'https://api.spotify.com/v1/search?q=' + searchText + '&type=track&limit=5'

    var searchParameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    }

    var results = await fetch(query, searchParameters)
        .then(response => response.json())

    return results
}

export const getSongRecommendations = async (songId) => {
    var query = 'https://api.spotify.com/v1/recommendations?seed_tracks=' + songId + '&limit=5';

    var searchParameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    }

    var results = await fetch(query, searchParameters)
        .then(response => response.json())

    return results
}