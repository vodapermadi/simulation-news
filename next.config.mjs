/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname:"asset.kompas.com"
            }
        ]
    }
};

export default nextConfig;
