# Quantum Shield Documentation

Version 1.0 | 4 October 2026 | Main-domain public beta

## Start with the public tools

Use [Wallet Scanner, Token Check, and Wallet Compare](https://quantumsshield.com/tools) for read-only Ethereum, Base, BNB Chain, Arbitrum, and Polygon checks. Paste a public address or select one through a compatible browser wallet. No owner login, payment, or signing request is required for these checks.

Use the [Safety Center](https://quantumsshield.com/safety) for website code review, domain reputation, recent wallet activity, and local image-format inspection. Each report states its coverage. A missing warning is not proof that a site, wallet, token, or file is safe.

The [white paper](https://quantumsshield.com/whitepaper) describes the product and planned QUS/x402 utility. The [roadmap](https://quantumsshield.com/roadmap) distinguishes delivered features from release gates. [Download the white paper PDF](https://quantumsshield.com/downloads/quantum-shield-whitepaper-v1.pdf).

## Website code and AI review

Submit a public HTTPS page through the first form in the Safety Center. The server requests one page and up to three same-origin script references, capped at 200 KB per source. Redirects and destinations are checked. Scripts are read as text, not executed. External script origins, dynamic imports, authenticated pages, and server-side code are not inspected.

Rules flag possible secret-recovery requests, approval/signature references, wallet transaction calls, and selected obfuscation patterns. Cloudflare Workers AI additionally reviews the first 10,000 characters of each inspected source. AI findings require an exact source quote and cannot remove rule-based warnings. A reference can occur in legitimate libraries and must be reviewed in context.

Report verdicts are `red_flags`, `review_required`, or `unverified`. AI states include `reviewed`, `unavailable`, `invalid_response`, `not_run`, and `not_configured`. `reviewed` means the selected excerpts were processed, not that a website passed a security audit. Inspect `coverage` and `limitations` together with `findings`. Wallet interaction and transaction simulation are not performed.

Free beta capacity is 3 deep scans per IP per hour and 20 per day across the service. Quota exhaustion returns an error without a safety assessment. Do not submit secret-bearing or private login links: the target receives the URL request and selected returned code is processed by the AI provider.

## Domain reputation

The separate domain form checks URL patterns and a PhishDestroy hostname lookup. The full URL is not submitted to that reputation provider. The browser may retry the hostname lookup directly if the server cannot reach the provider. A reported threat is distinct from a suspicious pattern; `not_listed` does not mean safe. The beta endpoint allows 30 checks per IP per hour.

## Wallet and token results

Wallet Scanner reports native balance, nonce, account classification, and block evidence. Token Check reads available token metadata. Wallet Compare examines two addresses on the same network at a common block. Contract names and symbols are untrusted metadata, not endorsements. Public-key exposure, asset safety, and identity are not established by these tools.

Public RPC availability varies. The browser can read through its connected wallet or configured public providers when the shared server is unavailable. Each completed report carries its source and limitations; unavailable or inconsistent data must not be converted to a fabricated result.

Wallet Activity is a different browser feature. It requests recent transaction and token-event pages directly from the Ethereum and Base Blockscout explorers and combines them by UTC time. It does not expose a Quantum Shield history API. More pages, internal transfers, bridge tracing, other chains, and exchange-internal activity are not loaded. Available explorer public tags may identify a destination; an unlabeled address remains unlabeled. No transaction hashes appear in this timeline.

## Image file check

The image form reads the first 32 bytes locally and compares PNG, JPEG, GIF, or WebP signatures with the filename. It accepts files up to 20 MB and does not upload or preview them. This is a file-format check, not antivirus, QR decoding, phone exploit detection, or proof of safety.

## Public endpoint reference

The machine-readable [public API schema](https://quantumsshield.com/openapi.json) describes the main-domain beta. These interfaces are experimental and have no paid service-level commitment.

| Endpoint | Method | Input and behavior |
| --- | --- | --- |
| `/api/public/wallet` | GET | `chain`, `address`; account snapshot |
| `/api/public/token` | GET | `chain`, `address`; token metadata |
| `/api/public/compare` | GET | `chain`, `address`, `other`; same-chain comparison |
| `/api/public/link-check` | POST | JSON `url`; same-origin browser request |
| `/api/public/deep-scan` | POST | JSON `url`; same-origin browser request with bounded code/AI review |

`chain` is `ethereum`, `base`, `bnb`, `arbitrum`, or `polygon`; omitted chain defaults to Base. Addresses must have 0x followed by 40 hexadecimal characters. The three GET tools share a 30-check-per-IP hourly server allowance. They may return 503 when the provider cannot complete a check. They do not silently substitute a different chain.

POST routes require `Content-Type: application/json` and an Origin matching the requesting site. They are intended for the current web interface. Origin checking is not a substitute for customer authentication, and no public agent integration contract is promised for these routes. A production agent API with payment policy is planned separately.

```javascript
// Read-only public beta request. No secret or payment required.
const url = new URL('https://quantumsshield.com/api/public/wallet');
url.searchParams.set('chain', 'ethereum');
url.searchParams.set('address', '0x0000000000000000000000000000000000000000');
const response = await fetch(url);
const report = await response.json();
if (!response.ok) throw new Error(report.error || 'Provider unavailable');
console.log(report);
```

Errors from these public routes use `{ "error": "message" }`. Relevant statuses include 400 invalid input, 403 origin rejected, 405 method rejected, 413 oversized input, 415 wrong content type, 422 unsupported analysis input, 429 quota exhausted, and 503 service/provider failure. A 200 deep-scan response can still contain unavailable coverage: always inspect the body. Provider failures are not evidence that an address is inactive or a site is clean.

## Owner workspace and development SDK

The main-domain workspace at `/app` is owner-only. Customer onboarding, invitations, external application keys, automatic monitoring, and email delivery are not enabled. Public users should use `/tools` and `/safety`; no owner credentials should be shared.

The existing [JavaScript SDK source package](https://quantumsshield.com/downloads/quantum-shield-sdk.zip) is a development/reference client for the earlier workspace API, with TypeScript declarations. It is not published to npm, does not implement these public safety routes or x402, and cannot grant access to the main-domain owner workspace. Its examples require a separately configured compatible deployment. Do not place its secret-bearing credentials in a browser or present this package as a ready public customer SDK.

A future public SDK will expose versioned public methods, coverage types, payment budgets, supported-asset validation, safe retries, and receipts. It must be released and documented alongside the production agent API.

## QUS and payments: planned, not active

The planned token ticker is QUS and the planned total supply is 1,000,000,000 QUS. Its intended use is payment for selected future paid services. No contract/network details or active QUS payment address are published in this release. The white paper deliberately omits tokenomics.

x402 is a planned agent micropayment integration. Lightweight checks may target US$0.01-equivalent pricing after cost validation; no current endpoint charges that amount. QUS acceptance depends on contract, network, and facilitator compatibility. XPay is an integration candidate, not a verified live connection. Free tools remain free in this release; no token balance or payment is required.

## Versions and operations

This documentation describes the Cloudflare main domain, not the older private Sites deployment. Version 1.0 replaces earlier instructions that implied customer API-key creation or platform sign-in was available on the public website. The [operations guide](https://quantumsshield.com/operations.html) records deployment boundaries and the [roadmap](https://quantumsshield.com/roadmap) records requirements for commercial operation.
