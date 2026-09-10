# True Finds: Project Context

Platform: TrueFinds.ai, AI shopping companion and consumer protection agent for the US market.

Strategy: extension-first acquisition (Verify Badge, Amazon-only v1, no login).

Path B locked: extension routes 'Get this deal' clicks to TrueFinds.ai deal pages carrying compliant Associates links; deal pages follow four rules (CTA primacy, speed, ambient capture, related products below fold).

Free line: truth is free, the relationship is paid.

Stack: Next.js 14, Supabase (Postgres), Tailwind CSS, Chrome Extension (Manifest V3), n8n Cloud, Beehiiv, Posthog, Vercel, ElevenLabs, HeyGen API, Stripe, Cloudflare, Keepa API, Amazon PA API.

Brand colors: Navy #1A3C5E, Emerald Green #1A9E6E, White #FFFFFF.

Tone: trusted, clear, never salesy.

Currency: all pricing is US dollars (USD) everywhere: product prices, verdicts, charts, plans. Amazon US marketplace only (Keepa domain: com). Never display another currency.

Social: @gotruefinds. US English only. No double hyphens in copy. No em dashes ever.

Agents: Sinclair (lead), Scout (watchlist), Gifted (gifts), Vault (savings), Verify (price truth), Travel (Month 5-6).

KPI to instrument from day one: deal page continue-through rate (target 70-80%+).

Current build phase: Phase 2 COMPLETE 2026-08-04 (PR #3 merged: /api/price-check with provider isolation + token accounting, /deal/[asin] live at truefinds.ai via landing rewrite, /api/subscribe + email_captures, CORS allowlist, Associates tags wired, extension live-mode verified end to end). KEEPA LIVE 2026-08-06: first real verdict verified end to end (GENUINE_DEAL, eero B0866YH121, $99.99 twelve-month low; extension badge, panel, and truefinds.ai deal page all confirmed on real data; /_next asset rewrite added to landing repo). PHASE 3 COMPLETE 2026-08-12 (PR #4 merged: 17 tables live in production, service-role-only write model after cold-review exploit fix, 47/47 RLS checks passed in production, contract dev approved; Phase 4/8 unblocked). EXTENSION UX + VERDICT CLARITY COMPLETE 2026-08-13 (PRs #5 and #6 merged: popup default flow with screen clamp and both badge affordances, verdict-aware post-click states and CTA labels, claimed-price stat on INFLATED, TYPICAL truth-sentence fix, NOT_ENOUGH_DATA stat suppression; all verified live on production). SUBMITTED TO CHROME WEB STORE 2026-08-20: item "Sinclair by True Finds", ID aihgijjpngfknihpkmiapndkpigdogni, status Pending review, DEFERRED PUBLISH selected (approval stages it; Jon presses Publish on his chosen launch day). US-only distribution, free of charge, no remote code, five screenshots, privacy policy live at truefinds.ai/privacy (counsel-reviewed 2026-08-17), store ID added to ALLOWED_EXTENSION_IDS and deployed. Pre-store audit complete (contract dev approved PRs #5/#6/#7); PostHog KPI live 2026-08-18 (deal_page_view + continue_to_amazon with surface and entry_point).

Launch checklist remaining: repoint the store Support URL to truefinds.ai/support AFTER approval (a listing field editable without re-review; editing during a pending review can reset it), landing footer link contrast fix (footer links are too dark on navy; match the top nav link color and meet WCAG AA 4.5:1 for text, an accessibility item for the 62-71 ICP, bundle into the next landing PR), Beehiiv key when available (physical mailing address must be set there before any marketing send; sending follows the Option C taxonomy locked 2026-08-17), Cloudflare AI crawler observe mode at launch (zero cost, demand instrument for Parked Ideas B2B file; 2026-08-11), first weekly Top Products loop per its operating plan (the crank that earns the first qualifying Associates sales and unlocks the PA API).

---

## Key Decisions Locked (do not change without updating TRUEFINDS_DECISIONS.md)

**Hero headline:** "Know the truth before you buy." (approved, do not change)

**Sinclair framing:** "AI price protector" in all consumer copy (changed from "AI price guard" 2026-07-31; planned widening to "AI shopping protector" when review intelligence ships). First mention of Sinclair always carries the label ("Sinclair, our free AI price protector"). Never use "agent" in consumer-facing copy. "AI shopping companion" is acceptable in hero sub only. The finder/discovery story belongs to the agent team (Scout, Gifted, Sage, Travel), never to Sinclair's label.

**Verdict states:** GENUINE DEAL (green), INFLATED (red), TYPICAL PRICE (gray), NOT ENOUGH DATA. INFLATED uses red #FEE2E2/#991B1B, not amber.

**Founding member offer:** $8.97/month locked for life, capped at 500 members, no payment at signup. Compare against estimated $18.97-$29.97 premium plans.

**Privacy (locked):** Free extension reads only the current page. Premium requires explicit user approval for any expanded access. This is a product promise, not a policy.

**Path B (locked):** Extension never rewrites or injects affiliate links on Amazon. Only routes to truefinds.ai deal pages. Violating this risks the Associates account.

**How to handle constraints (locked 2026-08-20):** know precisely where the fence is, then use every inch of the field inside it. Before writing "we cannot, the terms forbid it", state the restriction's exact wording and scope, research what is adjacent and permitted, and present legitimate options with their real risks. Example that produced this rule: "Amazon images need the PA API" is not "no product images"; licensed manufacturer catalogs, barcode databases whose terms permit display, brand press kits, and open licensed datasets were permitted all along. The fence itself is short and absolute: Path B (the extension never carries or injects an Associates tag on Amazon), no cookie stuffing or auto-redirect to tagged URLs, no Amazon page scraping, and the consumer privacy promises. Never launder a violation through an intermediary; Amazon scraper APIs return Amazon's Product Advertising Content no matter who fetches it, and the easiest technical path is often the one that ends the business. And the larger rule this sits inside: existing rules describe the world before this product existed. The goal is not to evade them but to build outcomes good enough that new rules get written positively (a citable manufactured-discount index that shapes pricing-transparency norms, Amazon's software-application approval once traction and a clean record exist, defining the verdict-API category for shopping agents, proving a profitable consumer product built without surveillance). Treat current rules as a snapshot, not a ceiling.

**RLS write model (locked 2026-08-11):** Browsers read their own rows only; ALL database writes are service-role. Never re-add UPDATE policies or browser write grants, even though the Phase 3 spec text says "users can only select and update their own row" (superseded; a row policy cannot restrict columns, and the escalation this prevents is reproduced in the decisions log). Phase 4 signup uses a security definer trigger on auth.users, not an insert policy. Browser writes return only as narrow column-level grants owned by the phase shipping the UI that needs them.

---

## Hosting and Infrastructure (as of July 2026)

**Landing page:** truefinds-landing.html hosted on Vercel (Hobby), github.com/truefinds-ai/true-finds (public repo), domain truefinds.ai via Cloudflare (CNAME, DNS only).

**Next.js app:** Vercel (separate project), private repo true-finds-app (created in Phase 0).

**Email:** hello@truefinds.ai and ask@truefinds.ai via Cloudflare Email Routing (free forwarding). Destinations: jagluck@gmail.com and jon.gluck@icloud.com.

**Email marketing:** Beehiiv. Publication ID: b15e8e4f-21bf-43cf-8e76-45bfcd50caba. API key pending Stripe identity verification.

**Form notifications:** formsubmit.co (activated). Both forms have honeypot spam protection.

**DNS:** truefinds.ai on Cloudflare. Two CNAME records pointing to Vercel (DNS only, no proxy). MX/SPF/DKIM records for email routing.

---

## Repo Structure

- `truefinds-ai/true-finds` (public): landing page only
- `truefinds-ai/true-finds-app` (private): Next.js app, all backend, all credentials (created in Phase 0)

TRUEFINDS_DECISIONS.md lives in true-finds-app (private repo). CLAUDE.md lives in both.

---

## Developer Notes

Developer collaboration guide: /docs/strategy/TrueFinds_Developer_Collaboration_Guide_v1_0.md

TRUEFINDS_DECISIONS.md must be created in Phase 0 before any phase begins. Template exists at project root.

Two Amazon Associates tracking IDs required: AMAZON_PARTNER_TAG_EXT (extension) and AMAZON_PARTNER_TAG_WEB (web). Never hardcode either.

---

## Session start: read these before answering anything

Three memory layers already exist and none of them read themselves. Read all three before the first substantive answer of a session, not after a mistake:

1. **Project memory.** The `MEMORY.md` index, then every `feedback_*.md` file. Those files are Jon's corrections, written down after they cost him something. `feedback_constraints_are_narrower.md` and `feedback_review_instructions.md` are the two most often needed and the two most often skipped.
2. **TRUEFINDS_CANON.md** at this folder root. Current state only, outranks every strategy document.
3. **Personal memory**, `/preferences.md` first.

On 2026-09-01 a whole session ran without any of them being read, and two errors that day were already written down as rules in files that were sitting there unopened. Memory that is not read is not memory.

Then run the guards before delivering anything: `scripts/copy_guard.py` for documents in this folder, and `npm run verify` in the app repo, which includes the US English check. Neither runs itself.

**Known and deliberate:** `copy_guard.py` reports 20 em dashes in `TRUEFINDS_DECISIONS.md`, all between lines 14 and 95. Those are the July 2026 entries, written before the rule was locked, and Jon decided on 2026-09-01 that they stay as record. Do not tidy them. A clean run of that file is 20 hits inside that range and none outside it.

---

## Evidence, not conclusions

- **Every claim about state carries how it was checked, in the sentence.** "PR #19 has 11 commits (read from the API just now)", never "PR #19 has 11 commits". If no check was run, the sentence says so: "not verified".
- **One failed command is evidence, never a finding.** Before reporting anything blocked, missing, unavailable or impossible, try a second route and name both. On 2026-09-01 a push failed because a branch had no upstream set, and that single failure was reported to Jon as having no GitHub access at all. Three pushes had already succeeded that day.
- **A skip, a default, an empty result and a silence are not passes.** Two tests reported "ok" for weeks while never executing.
- **Never report system state from a document.** Read the system. Four claims on 2026-08-30 were wrong because a document was trusted over the thing it described.
- **Estimates carry their arithmetic** or they are not given. "30 to 40 minutes" with nothing behind it was padding, and was called out as such.

Jon audits this by scanning for the evidence tag. A claim with no tag means no check was run.

---

## Git in this folder from a Claude session

The session shell runs in a sandboxed Linux VM, not on the Mac. That sandbox permits `rename` inside a connected folder but not `unlink`. Git takes a lock, then either renames it into place on success or deletes it on rollback. The rename path works here. The delete path fails, the lock is left behind, and every later git command refuses with "Another git process seems to be running."

`git status` is the usual culprit. It refreshes the index under a lock and then rolls back, and that rollback is a delete. One status check silently jams the repo for the next command, which is why this looked like a permanent breakage rather than a lock.

Two rules:

- **Read with `git --no-optional-locks status | log | diff`.** It takes no index lock and leaves nothing behind.
- **Never try to delete a stale lock. Rename it aside:** `mv .git/index.lock .git/ZZZ_DELETE_ME_stale_locks/`

`add`, `commit` and `reset` work normally once no stale lock is in the way.

Parked locks and the `tmp_obj_*` files git cannot clean up collect in `.git/ZZZ_DELETE_ME_stale_locks/`. Nothing in there is used by git. Clear it from the Mac with `rm -rf .git/ZZZ_DELETE_ME_stale_locks && git gc --prune=now`.

**Pushing needs the Mac.** The VM has no gitconfig, no ssh key, no credential helper and no GitHub environment variables, so `git push` from a session fails with "could not read Username for 'https://github.com'" (verified 2026-09-10). Commit from the session, push from Terminal. `.github-token` sits in the Truefinds folder and could back a local credential helper, but that is not wired up and needs a fine-grained repo-scoped token first.
