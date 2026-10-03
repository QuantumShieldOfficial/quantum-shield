// Public integration example; no backend implementation or credentials included.
// Usage: node example-wallet.mjs <public-wallet-address> [ethereum|base|bnb|arbitrum|polygon]
const [address, chain = 'ethereum'] = process.argv.slice(2);
if (!/^0x[0-9a-f]{40}$/i.test(address || '')) throw new Error('Provide a public 0x address.');
if (!['ethereum','base','bnb','arbitrum','polygon'].includes(chain)) throw new Error('Unsupported network.');
const query = new URLSearchParams({address, chain});
const response = await fetch('https://quantumsshield.com/api/public/wallet?' + query, {signal: AbortSignal.timeout(45000)});
const report = await response.json();
if (!response.ok) throw new Error(report.error || 'Check unavailable; retry later.');
console.log(JSON.stringify(report, null, 2));
// Read the returned source and limitations. No result guarantees wallet safety.
