import type { NextConfig } from "next";

const nextConfig: NextConfig = {
async headers() {
return [
{
source: "/unity/gamedev/Build/:path*.wasm.br",
headers: [
{ key: "Content-Type", value: "application/wasm" },
{ key: "Content-Encoding", value: "br" },
],
},
{
source: "/unity/gamedev/Build/:path*.js.br",
headers: [
{ key: "Content-Type", value: "application/javascript" },
{ key: "Content-Encoding", value: "br" },
],
},
{
source: "/unity/gamedev/Build/:path*.data.br",
headers: [
{ key: "Content-Type", value: "application/octet-stream" },
{ key: "Content-Encoding", value: "br" },
],
},
];
},
};


export default nextConfig;
