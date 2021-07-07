const dns = require("dns");

// family表示它是ipv4,ipv6, 值为4/6
dns.lookup("www.google.com", (err, address, family) => {
  if (err) throw err;

  console.log("Google域名的IP:", address, family);
});

// 同一个域名可能对应多个ip,如何获取全部对应的ip
dns.lookup("www.google.com", { all: true }, (err, address, family) => {
  if (err) throw err;

  console.log("多个IP:", address); // => [{address: string, family: 4 | 6}]
});
