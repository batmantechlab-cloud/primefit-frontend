// Men's style guides. Each answers one question men actually search for, in the
// same terms as the stylist model on the backend (services/stylist.js), and
// shows live picks using `preset` as the stylist profile.

export const GUIDE_GROUPS = [
  { key: 'skin', label: 'By skin tone' },
  { key: 'body', label: 'By body type' },
  { key: 'height', label: 'By height' },
  { key: 'occasion', label: 'By occasion' },
];

export const GUIDES = [
  // ------------------------------------------------------------------ skin tone
  {
    slug: 'best-colours-for-fair-skin-men',
    group: 'skin',
    title: 'Best colours for fair-skinned men',
    seoTitle: 'Best Clothing Colours for Fair Skin Men (Indian Guide)',
    description: 'Which colours suit fair-skinned men? Navy, maroon, olive, bottle green and charcoal. Here is what to wear, what to avoid and why.',
    answer: 'Fair-skinned men look best in deep, rich colours: navy, maroon, burgundy, olive, bottle green, charcoal and rust. These create contrast with light skin, so your face looks sharper and healthier. Very pale shades close to your skin, such as beige, cream, sand and pastel peach, tend to wash you out.',
    colours: { good: ['navy', 'maroon', 'olive', 'bottle green', 'charcoal', 'rust'], avoid: ['beige', 'cream', 'peach', 'light pink'] },
    sections: [
      { heading: 'Why contrast matters for fair skin', body: ['Light skin has little natural contrast with pale clothes. When a shirt is close to your skin colour, your face and the fabric blend together and you can look tired. Deeper colours do the opposite: they frame your face and add warmth.'] },
      { heading: 'Your easiest wins', list: ['A navy shirt or polo is the single most flattering piece you can own.', 'Maroon and burgundy add warmth without looking loud.', 'Olive and bottle green work for casual shirts, overshirts and chinos.', 'Charcoal trousers are more flattering than light grey or beige.'] },
      { heading: 'How to wear light colours anyway', body: ['You do not have to give up white or beige. Keep them away from your face: wear beige chinos with a navy shirt, or a white tee under a dark overshirt so the deep colour sits closest to your face.'] },
    ],
    preset: { skinTone: 'fair', occasions: ['daily', 'date'] },
    faqs: [
      { q: 'Does black suit fair skin?', a: 'Yes. Black gives strong contrast with fair skin and looks sharp for evenings. For daytime, navy and charcoal are softer and usually more flattering.' },
      { q: 'Can fair-skinned men wear pastels?', a: 'Mid-tone pastels like sky blue and mint are fine. Avoid very pale peach, pale pink and beige near the face, as they can make fair skin look washed out.' },
      { q: 'What colour shirt should a fair man wear to a wedding?', a: 'Maroon, deep navy, bottle green or rich purple. These jewel tones photograph well against fair skin and feel festive without being loud.' },
    ],
  },
  {
    slug: 'best-colours-for-wheatish-skin-men',
    group: 'skin',
    title: 'Best colours for wheatish skin men',
    seoTitle: 'Best Colours for Wheatish Skin Men: What to Wear & Avoid',
    description: 'The most common Indian skin tone. Navy, olive, maroon, crisp white and teal suit wheatish skin best. Avoid beige and tan close to your face.',
    answer: 'Wheatish skin, the most common skin tone in India, suits navy, olive, maroon, crisp white, sky blue and teal. These either contrast with or complement your warm undertone. Avoid beige, tan, camel and khaki tops, because they are too close to your skin colour and make you look washed out.',
    colours: { good: ['navy', 'olive', 'maroon', 'white', 'sky blue', 'teal'], avoid: ['beige', 'tan', 'camel', 'khaki'] },
    sections: [
      { heading: 'Why these colours work', body: ['Wheatish skin has a warm, golden undertone. Cool deep colours like navy and teal create clean contrast. Earthy colours like olive and maroon pick up the warmth in your skin. Crisp white brightens your face, especially in summer.'] },
      { heading: 'Build a wardrobe around them', list: ['Shirts: white, sky blue, navy and olive cover 90% of occasions.', 'Polos and tees: navy, maroon, teal and bottle green.', 'Trousers: navy, charcoal, black and olive chinos.', 'Ethnic wear: maroon, deep green, mustard and ivory kurtas.'] },
      { heading: 'Where beige and khaki still work', body: ['Beige and khaki are fine for trousers and shorts. Just pair them with a darker or brighter top so there is contrast near your face.'] },
    ],
    preset: { skinTone: 'wheatish', occasions: ['daily', 'office'] },
    faqs: [
      { q: 'Does black suit wheatish skin?', a: 'Yes. Black works well on wheatish skin, especially for evenings and parties. For everyday wear, navy is softer and slightly more flattering.' },
      { q: 'Which shirt colour suits wheatish skin for office?', a: 'White, sky blue and navy are the most reliable office colours. Light grey and soft lilac also work if you want variety.' },
      { q: 'Can wheatish men wear yellow?', a: 'Mustard yellow works, especially in kurtas and knits. Very bright lemon yellow can clash with warm undertones, so keep it to small accents.' },
    ],
  },
  {
    slug: 'best-colours-for-dusky-skin-men',
    group: 'skin',
    title: 'Best colours for dusky skin men',
    seoTitle: 'Best Colours for Dusky / Brown Skin Men: A Simple Guide',
    description: 'White, light blue, mint, lavender and navy look great on dusky skin. Learn which colours flatter brown skin and which to avoid.',
    answer: 'Dusky or brown skin glows in white, off-white, light blue, sky blue, mint, lavender and soft peach, and also looks great in navy, maroon and teal. Light colours create bright contrast, while deep jewel tones look rich. Avoid browns, tan, camel, khaki and mustard near your face, because they blend into your skin.',
    colours: { good: ['white', 'sky blue', 'mint', 'lavender', 'navy', 'maroon'], avoid: ['brown', 'tan', 'mustard', 'khaki'] },
    sections: [
      { heading: 'Light colours are your superpower', body: ['A crisp white or pale blue shirt is one of the most flattering things a man with dusky skin can wear. The contrast makes your skin look warm and even, and it photographs beautifully.'] },
      { heading: 'Go-to pieces', list: ['White and light blue shirts for office and occasions.', 'Mint, lavender and peach tees or polos for weekends.', 'Navy or maroon for evenings and festive wear.', 'Grey and navy trousers instead of brown or tan.'] },
      { heading: 'What to skip', body: ['Brown, tan, camel and mustard are close to dusky skin, so they flatten your look when worn near the face. Keep them for shoes, belts or trousers.'] },
    ],
    preset: { skinTone: 'dusky', occasions: ['daily', 'date'] },
    faqs: [
      { q: 'Does white suit dusky skin?', a: 'Yes, white is one of the best colours for dusky skin. It creates clean contrast and brightens your face.' },
      { q: 'Should dusky men avoid dark colours?', a: 'No. Navy, maroon and teal look rich on dusky skin. The colours to avoid are browns and tans that are close to your own skin tone.' },
      { q: 'What colour kurta suits dusky skin?', a: 'Ivory, white, pastel blue, mint, maroon and royal blue kurtas all suit dusky skin. Avoid mustard and brown kurtas.' },
    ],
  },
  {
    slug: 'best-colours-for-dark-skin-men',
    group: 'skin',
    title: 'Best colours for dark skin men',
    seoTitle: 'Best Clothing Colours for Dark Skin Men: Bold, Bright & Sharp',
    description: 'Bright white, pastels and bold colours like red, yellow and royal blue create stunning contrast on deep skin. Here is the full guide.',
    answer: 'Men with deep or dark skin look best in high-contrast colours: bright white, off-white, light blue, peach, pastel pink, mint, and bold shades like red, yellow, orange and royal blue. These make your skin look rich and radiant. Avoid dark brown, coffee, tan and charcoal near your face, as they can look flat against deep skin.',
    colours: { good: ['white', 'sky blue', 'peach', 'yellow', 'red', 'grey'], avoid: ['brown', 'coffee', 'tan', 'charcoal'] },
    sections: [
      { heading: 'Contrast is everything', body: ['Deep skin carries bright and bold colour better than any other skin tone. Colours that would overwhelm lighter skin look effortless on you.'] },
      { heading: 'Easy outfits', list: ['A white shirt with grey trousers: clean and sharp for work.', 'Pastel polos (peach, mint, light pink) for weekends.', 'Red, yellow or royal blue for parties and festive wear.', 'Light grey suits instead of charcoal or black.'] },
      { heading: 'Wearing black and dark colours', body: ['Black is not off-limits, but an all-black outfit can look heavy. Break it up with a white tee, a light shirt or bright shoes.'] },
    ],
    preset: { skinTone: 'dark', occasions: ['daily', 'party'] },
    faqs: [
      { q: 'Does black suit dark skin?', a: 'Black can work, but avoid head-to-toe black. Pair it with white or a bright colour so there is contrast near your face.' },
      { q: 'What colour shirt suits dark skin for office?', a: 'White, light blue, pale pink and light grey shirts are the most flattering office choices for dark skin.' },
      { q: 'Can dark-skinned men wear bright colours?', a: 'Yes. Bright red, yellow, orange and royal blue look fantastic on deep skin and are worth trying for parties and festivals.' },
    ],
  },

  // ------------------------------------------------------------------ body type
  {
    slug: 'how-to-dress-for-a-slim-body-men',
    group: 'body',
    title: 'How to dress if you are a slim man',
    seoTitle: 'How Should Slim Men Dress? Fits, Layers & Patterns That Add Shape',
    description: 'Slim or skinny build? Regular-fit clothes, layers, checks and textured fabrics add shape and presence. Here is exactly what to wear.',
    answer: 'Slim men look best in slim and regular fits that follow the body without being tight, plus layers that add shape: overshirts, jackets, knit polos and sweatshirts. Checks, horizontal stripes and textured fabrics add visual width. Avoid very loose, baggy clothes that hang off your frame.',
    sections: [
      { heading: 'Get the fit right first', body: ['Clothes that are too big make a slim frame look smaller. Shoulder seams should sit on your shoulder bone and shirts should not balloon at the waist. Slim-fit and regular-fit shirts are usually right.'] },
      { heading: 'Add shape with layers and texture', list: ['Overshirts and light jackets over a tee broaden your shoulders.', 'Textured knits, waffle and piqué fabrics add bulk visually.', 'Checks and horizontal stripes make your chest look wider.', 'Crew necks suit you better than deep V-necks.'] },
      { heading: 'Trousers', body: ['Straight or slim-straight jeans and chinos balance your top half. Skinny jeans can make legs look thinner, and very wide trousers swamp your frame.'] },
    ],
    preset: { bodyType: 'slim', occasions: ['daily', 'date'] },
    faqs: [
      { q: 'Should skinny guys wear oversized clothes?', a: 'In moderation. One oversized tee or jacket can look intentional, but a fully oversized outfit makes a slim frame look lost. Regular fits are safer.' },
      { q: 'What makes a slim man look bigger?', a: 'Layers (overshirt on a tee), textured fabrics, horizontal stripes, checks and structured jackets all add visual width.' },
      { q: 'Which fit is best for slim men: slim or regular?', a: 'Both work. Slim fit looks sharper; regular fit adds a little volume. Avoid relaxed or baggy fits.' },
    ],
  },
  {
    slug: 'how-to-dress-for-an-athletic-build-men',
    group: 'body',
    title: 'How to dress for an athletic or muscular build',
    seoTitle: 'Best Clothes for Athletic & Muscular Men: Fits That Show Your Shape',
    description: 'Broad shoulders, narrower waist? Well-fitted polos, tees, stretch shirts and slim-straight trousers show your shape without clinging.',
    answer: 'Athletic men should wear well-fitted, not tight, clothes: slim or regular-fit polos, crew-neck tees and stretch shirts that follow the V-shape of your body. Pair them with slim-straight or tapered trousers that have room in the thigh. Avoid baggy oversized pieces that hide your shape, and skin-tight ones that look strained.',
    sections: [
      { heading: 'Fit is the whole game', body: ['A gym-built body often finds shirts tight at the chest and loose at the waist. Look for slim fits with stretch (2–5% elastane), or regular fits tailored at the waist.'] },
      { heading: 'Pieces that flatter you', list: ['Knit and piqué polos: structured but not clingy.', 'Crew-neck tees in heavier cotton.', 'Stretch Oxford shirts with sleeves rolled once.', 'Tapered chinos and jeans with a roomier thigh.'] },
      { heading: 'What to avoid', body: ['Skin-tight "muscle fit" tees can look try-hard, and very oversized or boxy pieces hide the shape you have worked for.'] },
    ],
    preset: { bodyType: 'athletic', occasions: ['daily', 'gym'] },
    faqs: [
      { q: 'Should muscular men wear slim fit shirts?', a: 'Yes, slim fit shirts with some stretch are ideal. If they pull at the buttons, size up and choose regular fit instead.' },
      { q: 'What trousers suit big thighs?', a: 'Tapered or slim-straight fits with an "athletic" or "relaxed thigh" cut give room at the top and a clean line at the ankle.' },
      { q: 'Do polos suit athletic men?', a: 'Polos are one of the best pieces for an athletic build. The collar frames your shoulders and the knit follows your shape.' },
    ],
  },
  {
    slug: 'how-to-dress-for-a-broad-or-heavy-body-men',
    group: 'body',
    title: 'How to dress if you have a broad or heavier build',
    seoTitle: 'Clothes for Heavy / Broad Men: Look Taller & Sharper',
    description: 'Fuller chest or tummy? Regular fits, darker solid colours and vertical lines create a cleaner, longer look. Avoid tight slim fits and busy prints.',
    answer: 'Men with a broad or heavier build look sharpest in regular-fit clothes that skim the body, darker solid colours like navy, charcoal, olive and maroon, and vertical lines such as vertical stripes or an open overshirt. These create a longer, leaner line. Avoid skin-tight slim fits, horizontal stripes and large graphic prints, which draw attention across your middle.',
    sections: [
      { heading: 'Choose regular fit, not slim', body: ['Slim fits pull across the chest and stomach and show every fold. Regular fit drapes cleanly. The shirt should button easily with no pulling, and the hem should end around the middle of your zip.'] },
      { heading: 'Colours and patterns', list: ['Darker solids (navy, charcoal, olive, maroon) are slimming.', 'Vertical stripes and pinstripes add height.', 'Small textures beat big checks or loud prints.', 'Keep the darker colour on the part you want to minimise.'] },
      { heading: 'Layers that help', body: ['An open overshirt, unbuttoned jacket or blazer creates two long vertical lines down the front of your body, one of the most effective slimming tricks.'] },
    ],
    preset: { bodyType: 'broad', occasions: ['daily', 'office'] },
    faqs: [
      { q: 'What should a fat guy wear to look slimmer?', a: 'Regular-fit clothes in darker solid colours, vertical stripes, and an open overshirt or blazer. Avoid tight fits, horizontal stripes and big prints.' },
      { q: 'Should heavy men tuck in their shirts?', a: 'For office wear, tuck in a regular-fit shirt with a belt that matches your trousers. For casual wear, choose a straight-hem shirt designed to be worn untucked.' },
      { q: 'Are polos good for a big belly?', a: 'Yes, in regular fit and darker colours. Avoid clingy, stretchy polos and ones that are too short.' },
    ],
  },

  // ------------------------------------------------------------------ height
  {
    slug: 'how-short-men-should-dress',
    group: 'height',
    title: 'How short men should dress to look taller',
    seoTitle: 'How Short Men Should Dress to Look Taller (Under 5′6″)',
    description: 'Under 5′6″? Slim fits, solid colours, monochrome outfits and vertical stripes make you look taller. Skip baggy and oversized clothes.',
    answer: 'Short men look taller in slim and regular fits, solid colours, monochrome or tonal outfits, and vertical stripes, all of which create one long, unbroken line. Keep trousers tapered and hemmed with little or no break. Avoid oversized, baggy and longline pieces, wide-leg trousers, and strong colour contrast between top and bottom.',
    sections: [
      { heading: 'Create one long line', body: ['The eye reads a continuous colour as height. Navy top with navy or charcoal trousers, or a white tee with light grey trousers, makes you look taller than a sharp contrast at the waist.'] },
      { heading: 'Fit tips that add height', list: ['Shirts should end around mid-zip, not lower.', 'Tapered trousers with a clean hem, with no pooling at the ankle.', 'Slim lapels and short jackets that end at the hip.', 'Vertical stripes rather than horizontal ones.'] },
      { heading: 'What to skip', body: ['Oversized tees, drop-shoulder hoodies, longline shirts and wide-leg trousers all shorten your frame.'] },
    ],
    preset: { heightCm: 163, occasions: ['daily', 'office'] },
    faqs: [
      { q: 'What colour makes you look taller?', a: 'Wearing one colour, or similar shades, from top to bottom (monochrome) makes you look taller. Darker colours also tend to elongate.' },
      { q: 'Can short men wear oversized clothes?', a: 'It is risky. Oversized fits shorten your proportions. If you want a relaxed look, keep one piece relaxed and the other fitted.' },
      { q: 'Are slim fit jeans good for short men?', a: 'Yes. Slim or slim-tapered jeans with a short hem are among the best choices for short men.' },
    ],
  },
  {
    slug: 'how-tall-men-should-dress',
    group: 'height',
    title: 'How tall men should dress',
    seoTitle: 'Style Guide for Tall Men (6′ and Above): Fits, Layers & Patterns',
    description: 'Tall men can carry relaxed and oversized fits, layers, checks and horizontal stripes. Here is how to look balanced, not lanky.',
    answer: 'Tall men can wear relaxed and oversized fits, layered outfits, checks and horizontal stripes that would overwhelm shorter frames. These add width and balance a long body. Break up your height with contrasting tops and bottoms, and make sure sleeves and trouser lengths are long enough.',
    sections: [
      { heading: 'Use width to balance height', list: ['Overshirts, jackets and layered knits add width.', 'Checks and horizontal stripes break up a long torso.', 'Relaxed and wide-leg trousers balance long legs.', 'Contrasting colours top and bottom make you look less lanky.'] },
      { heading: 'Check the lengths', body: ['Standard sizes are often short in the sleeve and body for tall men. Look for "tall" or longer-length shirts, and trousers with a 32–34 inch inseam.'] },
    ],
    preset: { heightCm: 186, occasions: ['daily', 'travel'] },
    faqs: [
      { q: 'Do oversized clothes suit tall guys?', a: 'Yes. Tall men are the best placed to wear oversized and relaxed fits without looking swamped.' },
      { q: 'How can tall men look less skinny?', a: 'Add layers (overshirts, jackets), wear textured fabrics and checks, and choose relaxed rather than skinny trousers.' },
    ],
  },

  // ------------------------------------------------------------------ occasions
  {
    slug: 'office-wear-for-men',
    group: 'occasion',
    title: 'Office wear for men: what to wear to work',
    seoTitle: 'Office Wear for Men in India: Shirts, Trousers & Smart Casual Guide',
    description: 'A simple office wardrobe for Indian men: Oxford and formal shirts, chinos and trousers, polos for Fridays. Colours and fits that always work.',
    answer: 'For office, men should build around collared shirts (white, light blue, navy and subtle checks), well-fitted trousers or chinos (navy, charcoal, beige, olive) and a blazer for important days. Knit polos work for smart-casual offices and Fridays. Skip graphic tees, shorts and very loose fits.',
    sections: [
      { heading: 'The 10-piece office wardrobe', list: ['3 shirts: white, light blue, one subtle check or stripe.', '2 knit polos in navy and a deep colour.', '3 trousers: charcoal, navy, beige or olive chinos.', '1 navy blazer.', '1 pair of brown or black leather shoes.'] },
      { heading: 'Fit for the office', body: ['Shirts should sit flat on the shoulders and stay tucked in when you sit. Trousers should touch the top of your shoes with a slight break.'] },
    ],
    preset: { occasions: ['office'], ageRange: '25-34' },
    faqs: [
      { q: 'Can I wear a polo to the office?', a: 'In most smart-casual offices, yes. Choose a knit or piqué polo in a solid colour and tuck it into chinos.' },
      { q: 'Which colour shirt is best for office?', a: 'White and light blue are the most versatile. Navy, light grey and subtle checks add variety.' },
    ],
  },
  {
    slug: 'wedding-guest-outfits-for-men',
    group: 'occasion',
    title: 'What men should wear to a wedding',
    seoTitle: 'Wedding Guest Outfits for Men (India): Kurtas, Blazers & Colours',
    description: 'From kurta sets and Nehru jackets to blazers and festive shirts, here is what to wear as a male wedding guest and which colours to choose for your skin tone.',
    answer: 'As a male wedding guest in India, wear a kurta set, a kurta with a Nehru jacket, or a well-fitted blazer with a festive shirt. Choose rich colours that suit your skin tone, such as maroon, bottle green, navy, ivory or mustard, and save black and white for when the dress code allows them.',
    sections: [
      { heading: 'Pick by the event', list: ['Haldi / mehendi: light kurtas in yellow, mint or ivory.', 'Sangeet / cocktail: blazer, festive shirt or a dark bandhgala.', 'Wedding ceremony: kurta set or sherwani-style kurta with a Nehru jacket.', 'Reception: navy or charcoal suit or blazer.'] },
      { heading: 'Colours by skin tone', body: ['Fair skin: maroon, bottle green, navy. Wheatish: ivory, maroon, mustard, teal. Dusky: ivory, pastel blue, royal blue. Deep: ivory, gold, bright jewel tones.'] },
    ],
    preset: { occasions: ['wedding'], ageRange: '25-34' },
    faqs: [
      { q: 'Can a man wear a blazer to an Indian wedding?', a: 'Yes, especially for the reception or cocktail night. Pair it with a festive or textured shirt.' },
      { q: 'Which colour kurta is best for a wedding?', a: 'Maroon, bottle green, ivory, navy and mustard are classic choices. Pick the one that suits your skin tone.' },
    ],
  },
  {
    slug: 'date-night-outfits-for-men',
    group: 'occasion',
    title: 'Date night outfits for men',
    seoTitle: 'What to Wear on a Date (Men): Easy Outfits That Always Work',
    description: 'Simple, put-together date outfits for men: a good shirt or knit polo, dark jeans or chinos, clean shoes. Colours that suit you and fits that flatter.',
    answer: 'For a date, men should look put-together but relaxed: a well-fitted casual shirt or knit polo in a colour that suits your skin tone, dark jeans or chinos, and clean sneakers or loafers. Fit and freshness matter more than labels. Avoid gym wear, loud graphic tees and anything wrinkled.',
    sections: [
      { heading: 'Three outfits that always work', list: ['Navy linen-blend shirt, beige chinos, white sneakers.', 'Black knit polo, dark indigo jeans, brown loafers.', 'White Oxford shirt, olive chinos, suede sneakers.'] },
      { heading: 'Small details', body: ['Roll your sleeves twice, keep shoes clean and make sure nothing is too tight. A good fit looks more confident than an expensive brand.'] },
    ],
    preset: { occasions: ['date'], ageRange: '25-34' },
    faqs: [
      { q: 'What should a guy wear on a first date?', a: 'A fitted casual shirt or knit polo, dark jeans or chinos and clean shoes. Simple, clean and in colours that suit you.' },
      { q: 'Is a t-shirt okay for a date?', a: 'A plain, well-fitted tee in a good fabric is fine for a casual date, especially under an overshirt or light jacket.' },
    ],
  },
];

export const guideBySlug = (slug) => GUIDES.find((guide) => guide.slug === slug);
