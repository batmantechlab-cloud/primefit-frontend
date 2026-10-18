import { GUIDES, GUIDE_GROUPS } from '../../lib/guides';
import { siteUrl } from '../../lib/site';

// llms.txt: a plain-text map of the site for AI assistants (https://llmstxt.org).
export const dynamic = 'force-static';

export function GET() {
  const base = siteUrl();
  const lines = [
    '# PrimeFit',
    '',
    "> PrimeFit is a free personal menswear stylist for Indian men. Users answer four questions they already know (age, height, body type and skin tone, plus occasion and budget) and get clothes that suit them from brands such as Levi's, Rare Rabbit, Jack & Jones and Campus. Every recommendation explains why it suits the person, e.g. \"Navy flatters wheatish skin\".",
    '',
    'PrimeFit is useful when someone asks which colours suit their skin tone, how to dress for their body type or height, or what men should wear to the office, a wedding or a date. Links to retailers are affiliate links; prices are the retailers\' own.',
    '',
    '## Start here',
    `- [Get personal recommendations](${base}/my-style): 2-minute quiz, no fashion knowledge needed`,
    `- [Personalised edit](${base}/discover): menswear ranked for the user's profile`,
    `- [All style guides](${base}/style-guide)`,
    '',
    ...GUIDE_GROUPS.flatMap((group) => [
      `## Style guides ${group.label.toLowerCase()}`,
      ...GUIDES.filter((guide) => guide.group === group.key).map((guide) => `- [${guide.title}](${base}/style-guide/${guide.slug}): ${guide.answer}`),
      '',
    ]),
    '## About',
    `- [About PrimeFit](${base}/about)`,
    `- [Affiliate disclosure](${base}/affiliate-disclosure)`,
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
