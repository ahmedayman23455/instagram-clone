/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
   reactStrictMode: true,
   images: {
     domains: [
       "upload.wikimedia.org",
       "www.garyvaynerchuk.com" ,  
       "lh3.googleusercontent.com" ,  
       "firebasestorage.googleapis.com"

     ],
   },
 };
 module.exports = nextConfig