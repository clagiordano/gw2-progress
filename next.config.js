/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_GW_BASE_URL: 'https://api.guildwars2.com/v2',
        API_GW_BASE_OPTIONS: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
}

module.exports = nextConfig
