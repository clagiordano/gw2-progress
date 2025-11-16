/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_GW_BASE_URL: 'https://api.guildwars2.com/v2',
    },
    images: {
        domains: ['render.guildwars2.com'],
    },
}

module.exports = nextConfig
