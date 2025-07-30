// vite.config.js

export default {
  server: {
    port: 9000, // 你项目运行的端口
    host: true, // 允许外部访问
    allowedHosts: ['fegernas.dpdns.org'], // 允许 Cloudflare Tunnel 的访问
  },
}
