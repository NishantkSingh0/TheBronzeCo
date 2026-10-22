const image = (filename) => `/Collections/${encodeURI(filename)}.webp`;

export const collections = [
  {
    id: 'drinkware',
    title: 'Drinkware & Jugs',
    label: 'The everyday ritual',
    subtitle: 'A little beauty in every sip.',
    description:
      'Discover sculptural tumblers and elegant pouring jugs designed to bring warmth and character to everyday dining. From understated matte surfaces to intricate engraved details, each design combines functional form with a refined metal aesthetic.',
    cover: image('DrinkWare and Jugs Profile'),
    icon: 'everyday',
    products: [
      {
        id: 'vase',
        name: 'Wave-Line Sculptural Vase',
        image: image('Vass 1'),
        desc:
          'A pear-shaped vase with a slender concave neck, asymmetric pouring-style lip and low foot ring. A single sinuous groove travels around the lower body, giving the brushed metallic surface an elegant, flowing accent.',
        highlight:
          'The tilted lip and sweeping wave line introduce movement into an otherwise restrained vessel.',
        finish: 'Asymmetric lip · Single wave groove · Brushed body',
        material: 'Bronze-coloured metal (verify alloy)',
        purity:
          'Confirm the vessel’s actual material composition and water-holding suitability before recommending it for fresh flowers.',
        use: 'Dried stems, console styling and standalone display',
      },
      {
        id: 'curvy-matte-glass',
        name: 'Contour Matte Tumbler',
        image: image('Curvy Matt Glass'),
        desc:
          'A softly contoured tumbler with a rounded profile and understated matte surface. Its flowing silhouette brings a contemporary touch to traditional metal drinkware, creating an elegant companion for everyday rituals.',
        highlight:
          'The curved body gives an everyday drinking vessel a distinctly sculptural presence.',
        finish: 'Soft matte · Curved profile',
        material: 'Kansa (verify alloy composition)',
        purity:
          'Confirm the alloy composition through supplier specifications or batch-level testing. The matte appearance describes the surface finish, not the metal purity.',
        use: 'Everyday table settings and considered gifting',
      },
      {
        id: 'designed-matte-glass',
        name: 'Leaf-Engraved Matte Tumbler',
        image: image('Designed Matte Glass'),
        desc:
          'A gently tapered tumbler featuring a delicate leafy vine between two slender engraved lines. The softly brushed surface catches the light, while the rounded base balances botanical detailing with a clean, contemporary form.',
        highlight:
          'A continuous leaf garland adds botanical detail without interrupting the clean, brushed form.',
        finish: 'Leaf-vine engraving · Brushed matte finish',
        material: 'Kansa (verify alloy composition)',
        purity:
          'Verify the underlying metal composition through reliable supplier records or material testing. The decorative finish does not independently establish purity.',
        use: 'Statement place settings and personal gifts',
      },
      {
        id: 'drinking-glass-01',
        name: 'Fine-Textured Kansa Tumbler',
        image: image('Drinking Glass 1'),
        desc:
          'A gently tapered tumbler wrapped in fine horizontal textures, complemented by a slim polished rim and softly rounded base. Its detailed surface creates subtle highlights, giving this everyday essential a distinctive handcrafted character.',
        highlight:
          'Fine horizontal striations bring a tactile quality to a minimal drinking form.',
        finish: 'Fine horizontal texture · Smooth rim',
        material: 'Kansa (verify alloy composition)',
        purity:
          'Confirm the actual alloy composition through supplier specifications or appropriate material testing.',
        use: 'Daily dining and coordinated table settings',
      },
      {
        id: 'drinking-glass-02',
        name: 'Faceted Kansa Tumbler',
        image: image('Drinking Glass 2'),
        desc:
          'Broad vertical facets give this tumbler a softly angular silhouette beneath a circular rim. Fine surface texturing creates alternating bands of light and shadow, adding depth and sculptural character to the design.',
        highlight:
          'Vertical facets create alternating bands of light and shadow around the vessel.',
        finish: 'Vertical facets · Fine-grained surface',
        material: 'Kansa (verify alloy composition)',
        purity:
          'Confirm the metal composition through supplier documentation or appropriate testing before making specific purity claims.',
        use: 'Everyday meals and coordinated table settings',
      },
      {
        id: 'drinking-glass-03',
        name: 'Sway Wave-Detail Tumbler',
        image: image('Drinking Glass 3'),
        desc:
          'A gently waisted tumbler featuring a flowing wave motif across its brushed surface, complemented by three circular accents. The combination creates a playful sense of movement while preserving the vessel’s understated elegance.',
        highlight:
          'A single undulating line and three circular accents create a distinctive visual rhythm.',
        finish: 'Wave-line detail · Three circular accents · Brushed surface',
        material: 'Kansa (verify alloy composition)',
        purity:
          'Verify the underlying alloy through supplier records or material testing. Surface colour alone cannot establish composition or purity.',
        use: 'Family dining and welcoming guests',
      },
      {
        id: 'drinking-glass-04',
        name: 'Oval Engraved Tumbler',
        image: image('Drinking Glass 4'),
        desc:
          'A softly tapered tumbler distinguished by an off-centre oval motif filled with delicate curved lines. The detailed engraving contrasts with the brushed surface, creating a subtle signature that feels both tactile and contemporary.',
        highlight:
          'An off-centre, finely lined oval gives the vessel its distinctive signature.',
        finish: 'Lined oval motif · Brushed surface · Rounded base',
        material: 'Kansa (verify alloy composition)',
        purity:
          'Confirm the actual metal composition with supplier specifications or appropriate material testing.',
        use: 'Daily table rituals and mix-and-match dining',
      },
      {
        id: 'pouring-jug',
        name: 'Flow Engraved Table Jug',
        image: image('Jusg 1'),
        desc:
          'A sculptural pear-shaped jug with a flared pouring lip, tall teardrop handle and narrow foot ring. Sweeping diagonal grooves follow the curves of its body, bringing movement and visual continuity to this elegant serving piece.',
        highlight:
          'Flowing diagonal grooves echo the curve of the tall handle for a cohesive profile.',
        finish: 'Sweeping groove detail · Brushed body · Teardrop handle',
        material: 'Kansa (verify alloy composition)',
        purity:
          'Confirm the vessel’s alloy composition through supplier documentation or appropriate material testing.',
        use: 'Table service and coordinated drinkware gifting',
      },
    ],
  },

  {
    id: 'dining',
    title: 'Dining & Bowls',
    label: 'Gather around the table',
    subtitle: 'Every meal, thoughtfully served.',
    description:
      'Bring warmth and thoughtful design to every meal with dining plates, shallow bowls and decorative dessert bowls. Fine textures, sculptural silhouettes and carefully considered details make each piece suitable for everyday dining and special gatherings.',
    cover: image('Dining & Bowls Profile'),
    icon: 'vivaah',
    products: [
      {
        id: 'flat-plate',
        name: 'Classic Kansa Dining Plate',
        image: image('Flat Plate 1'),
        desc:
          'A broad, round dining plate with a shallow raised rim and fine concentric surface detailing. Its uncluttered centre keeps the focus on the meal, while the subtle texture adds warmth and character to the table.',
        highlight:
          'Concentric surface texture and a gently lifted rim create a quietly crafted character.',
        finish: 'Concentric brushed texture · Shallow raised rim',
        material: 'Kansa (verify alloy composition)',
        purity:
          'Confirm the actual alloy composition through supplier specifications or material testing before making specific purity claims.',
        use: 'Daily meals, thali settings and entertaining',
      },
      {
        id: 'dessert-bowl-01',
        name: 'Lotus Petal Dessert Bowl',
        image: image('Icecream Bowl 1'),
        desc:
          'Inspired by the shape of an open lotus, this footed dessert bowl features deep vertical petals rising into a softly scalloped rim. A smooth interior and low pedestal balance its decorative exterior, creating an elegant setting for individual desserts.',
        highlight:
          'Petal-shaped fluting continues into the scalloped rim, creating a complete flower-like silhouette.',
        finish: 'Lotus fluting · Scalloped rim · Pedestal foot',
        material: 'Kansa (verify alloy composition)',
        purity:
          'Verify the bowl’s underlying alloy through supplier specifications or appropriate material testing.',
        use: 'Dessert presentation and individual servings',
      },
      {
        id: 'dessert-bowl-02',
        name: 'Ripple-Rim Dessert Bowl',
        image: image('Icecream Bowl 2'),
        desc:
          'A broad, rounded dessert bowl with a gently rippling rim and low stepped pedestal. Fine horizontal texturing complements the flowing outline, creating a balanced design for desserts, festive servings and thoughtful table settings.',
        highlight:
          'The undulating rim adds a decorative accent while keeping the rounded body beautifully simple.',
        finish: 'Waved rim · Fine horizontal texture · Pedestal foot',
        material: 'Kansa (verify alloy composition)',
        purity:
          'Confirm the metal composition through supplier documentation. The decorative finish does not independently establish purity.',
        use: 'Individual desserts and festive table settings',
      },
      {
        id: 'flat-bowl-01',
        name: 'Textured Shallow Kansa Bowl',
        image: image('Small Flat Bowl 1'),
        desc:
          'A broad, low bowl with softly rounded walls and fine horizontal texturing across its interior and exterior. A narrow polished rim adds a crisp outline, balancing the understated profile with a refined finish.',
        highlight:
          'A gently rounded profile and all-over fine texture give this bowl its tactile character.',
        finish: 'Fine horizontal texture · Narrow polished rim',
        material: 'Kansa (verify alloy composition)',
        purity:
          'Confirm the underlying alloy through supplier records or appropriate material testing.',
        use: 'Small accompaniments and coordinated dining',
      },
      {
        id: 'flat-bowl-02',
        name: 'Diamond-Band Shallow Bowl',
        image: image('Small Flat bowl 2'),
        desc:
          'A shallow round bowl featuring a decorative band of repeating diamonds and short horizontal strokes. Fine surface texturing and parallel borders frame the geometric pattern, giving the compact silhouette a distinctive handcrafted character.',
        highlight:
          'A continuous diamond-and-dash border brings a measured, graphic rhythm to the low silhouette.',
        finish: 'Diamond-and-dash band · Fine textured surface',
        material: 'Kansa (verify alloy composition)',
        purity:
          'Verify the actual metal composition before making specific purity or alloy-ratio claims.',
        use: 'Accompaniments, small portions and table styling',
      },
    ],
  },

  {
    id: 'serveware',
    title: 'Serveware',
    label: 'Made for sharing',
    subtitle: 'The heart of a generous table.',
    description:
      'Designed for generous meals and shared moments, this collection brings together rounded casserole designs and sculptural serving essentials. Coordinated forms and considered details create an inviting presentation for family dining, entertaining and festive occasions.',
    cover: image('Serveware Profile'),
    icon: 'gifting',
    products: [
      {
        id: 'casserole-01',
        name: 'Rounded Glass-Lid Casserole Trio',
        image: image('Casselor 1'),
        desc:
          'Three rounded casserole vessels feature softly curved bodies, low loop handles and transparent glass lids with coordinating metallic details. Their gently bellied profiles create a cohesive serving arrangement while allowing the contents to remain visible.',
        highlight:
          'Softly rounded bodies distinguish this trio from straighter-sided casserole designs.',
        finish: 'Rounded bodies · Glass lids · Loop handles',
        material: 'Bronze-coloured metal bodies · Glass lids (verify body alloy)',
        purity:
          'Confirm the body metal, lid fittings and food-contact suitability with the supplier. Cooking compatibility must be verified before use.',
        use: 'Covered table service; confirm set contents and cooking compatibility',
      },
      {
        id: 'casserole-set',
        name: 'Glass-Lid Bronze Casserole Set',
        image: image('Casselor 2'),
        desc:
          'A coordinated set of three graduated casserole vessels with brushed metallic bodies, loop handles and transparent glass lids. Matching lid details unify the different sizes, creating a considered presentation for serving meals at the table.',
        highlight:
          'Clear lids keep the contents visible while the graduated forms create a unified arrangement.',
        finish: 'Brushed bodies · Glass lids · Loop handles',
        material: 'Bronze-coloured metal bodies · Glass lids (verify body alloy)',
        purity:
          'Verify the body alloy and separate fittings through supplier documentation. Confirm food-contact suitability and intended use before publishing.',
        use: 'Coordinated table service; confirm sizes and set contents',
      },
      {
        id: 'serving-spoon',
        name: 'Petal-Edge Serving Spoon',
        image: image('Serving Spoon 1'),
        desc:
          'A broad, teardrop-shaped scoop with delicate scalloped edges and fine directional brushing. Its long open-loop handle flows into the spoon bowl, creating a graceful, leaf-like silhouette that brings decorative character to everyday serving.',
        highlight:
          'A scalloped petal edge and sculptural open handle turn a serving essential into a decorative detail.',
        finish: 'Scalloped scoop · Open-loop handle · Brushed finish',
        material: 'Kansa (verify alloy composition)',
        purity:
          'Confirm the spoon’s actual metal composition and food-contact suitability through supplier specifications.',
        use: 'Serving alongside matching bowls and casseroles',
      },
    ],
  },

  {
    id: 'sacred',
    title: 'Sacred & Ritual',
    label: 'Objects with meaning',
    subtitle: 'A place for tradition at home.',
    description:
      'Explore meaningful objects inspired by Indian rituals and traditions, from traditional kalash vessels to sculptural Ganesha figures. Thoughtful forms and distinctive finishes make these pieces suitable for devotional spaces, ceremonial arrangements and memorable gifts.',
    cover: image('Sacred & Rituals Profile'),
    icon: 'grihapravesh',
    products: [
      {
        id: 'kalash-01',
        name: 'Full-Bellied Ritual Kalash',
        image: image('Kalash 1'),
        desc:
          'A traditional kalash with a full, rounded body, deeply curved neck, flared mouth and narrow foot ring. Fine horizontal texturing across the body contrasts with the polished lip and simple base, creating a balanced and timeless silhouette.',
        highlight:
          'The generous spherical body and dramatic inward curve of the neck create a distinctive traditional form.',
        finish: 'Textured rounded body · Flared lip · Plain foot ring',
        material: 'Bronze (verify alloy composition)',
        purity:
          'Confirm the actual alloy composition through supplier specifications or appropriate material testing.',
        use: 'Puja spaces, ceremonial arrangements and housewarming gifts',
      },
      {
        id: 'kalash-02',
        name: 'Ring-Neck Ritual Kalash',
        image: image('Kalash 2'),
        desc:
          'An upright, rounded kalash defined by twin engraved rings at the shoulder and a stepped circular foot. Its flared mouth and finely textured body preserve the familiar traditional form while introducing distinctive details around the neck and base.',
        highlight:
          'Paired neck rings and a stepped foot distinguish this design from a simpler full-bellied kalash.',
        finish: 'Twin neck rings · Fine texture · Stepped foot',
        material: 'Bronze (verify alloy composition)',
        purity:
          'Verify the underlying alloy through supplier records or material testing before making specific purity claims.',
        use: 'Ceremonial settings and meaningful new-home gifting',
      },
      {
        id: 'ganesha',
        name: 'Seated Ganesha on Veined Marble',
        image: image('Ganesha 1 decor'),
        desc:
          'A serene, cross-legged Ganesha figure with broad fan-like ears, closed eyes and an upward-curled trunk. A geometric crown adds definition to the figure, while the dark, gold-veined marble plinth provides a contrasting foundation for devotional display.',
        highlight:
          'Flowing ears and a curled trunk bring expressive softness to the crisp geometry of the stone base.',
        finish: 'Warm-toned figure · Dark veined marble plinth',
        material: 'Bronze-coloured figure · Marble base (verify figure alloy)',
        purity:
          'The figure and plinth are separate components. Confirm the figure’s metal composition and the base material with the supplier.',
        use: 'Devotional display and occasion gifting',
      },
    ],
  },

  {
    id: 'decor',
    title: 'Sculptures & Décor',
    label: 'Collected, not ordinary',
    subtitle: 'Character for the spaces you love.',
    description:
      'Discover expressive animal sculptures, nature-inspired forms and decorative pieces with distinctive surface treatments. Rich textures, contrasting finishes and natural stone accents bring character to consoles, shelves and thoughtfully curated interiors.',
    cover: image('Sculptures & Decor Profile'),
    icon: 'festive',
    products: [
      {
        id: 'golden-fish',
        name: 'Golden Fish Sculpture',
        image: image('Golden Fish Decor'),
        desc:
          'An ornamental goldfish featuring layered scales, rounded eyes and dramatically flowing fins. Raised golden highlights contrast with darker recesses, while the sweeping, ribbon-like tail creates a sense of movement and intricate detail.',
        highlight:
          'The oversized, rippling tail contrasts with precisely layered scales for a richly detailed animal study.',
        finish: 'Golden highlights · Dark recesses · Flowing ridged fins',
        material: 'Bronze-coloured sculpture (verify alloy)',
        purity:
          'Golden describes the visible colour and finish, not solid gold content. Confirm the underlying material and any applied coatings with the supplier.',
        use: 'Console styling, shelves and decorative gifting',
      },
      {
        id: 'ornamental-rhino',
        name: 'Botanical Armour Rhinoceros',
        image: image('Hypo decor'),
        desc:
          'An expressive rhinoceros featuring a prominent leaf-patterned horn and layered, armour-like plates. Raised decorative dots and branching botanical motifs contrast with the darker surface, bringing together wildlife-inspired form and intricate ornamental detailing.',
        highlight:
          'Leaf motifs across the horn and body unite the animal silhouette with intricate botanical detail.',
        finish: 'Raised dot texture · Leaf motifs · Golden-toned highlights',
        material: 'Bronze-coloured sculpture (verify alloy)',
        purity:
          'The dark and golden-toned areas describe the surface finish. Confirm the underlying alloy and any applied coatings with the supplier.',
        use: 'Bookshelves, side tables and animal-art collections',
      },
      {
        id: 'owl',
        name: 'Good-Luck Owl Sculpture',
        image: image('Owl Decor (Goodluck)'),
        desc:
          'A striking owl sculpture featuring sunburst-inspired eyes, a raised V-shaped brow and intricately patterned, leaf-like feathers. Golden-toned detailing contrasts with darker recesses, bringing depth and character to its expressive form. Traditionally associated with wisdom, prosperity and good fortune, the owl makes a meaningful decorative accent for homes and workspaces.',
        highlight:
          'Intricate feather patterns and radiant eyes give this owl a distinctive presence, symbolising wisdom and good fortune.',
        finish: 'Leaf-pattern feathers · Sunburst eyes · Golden highlights · Dark recesses',
        material: 'Bronze-coloured sculpture (verify alloy)',
        purity:
          'The good-fortune symbolism reflects traditional associations and is not a guarantee of outcomes. Confirm the sculpture’s actual metal composition with the supplier.',
        use: 'Good-luck gifting · Office desks · Bookshelves · Home décor',
      },
      {
        id: 'parrot',
        name: 'Crested Parrot on Dark Marble',
        image: image('Parrot Decor'),
        desc:
          'A stylised parrot with a sweeping crest, hooked beak and angular, layered wings. Alternating smooth and textured surfaces create visual depth, while the circular dark marble base with golden veining grounds the figure in a contrasting natural material.',
        highlight:
          'The swept crest creates a striking silhouette, balanced by the circular stone plinth.',
        finish: 'Swept crest · Faceted wings · Veined marble base',
        material: 'Bronze-coloured bird · Marble base (verify bird alloy)',
        purity:
          'The bird and marble base are separate components. Confirm the bird’s alloy and the stone specification with the supplier.',
        use: 'Vertical shelf accents and nature-inspired interiors',
      },
      {
        id: 'bronze-tree',
        name: 'Patinated Tree on Blue Marble',
        image: image('Patinated Bronze Tree on Blue Marble'),
        desc:
          'A windswept, leafless tree with a twisting trunk, deeply textured bark and branching tips. Blue-green patina and golden-toned highlights emphasise the sculptural details, while a round blue marble base adds a contrasting natural accent.',
        highlight:
          'The sideways sweep of the bare branches creates movement, balanced by a broad disc of blue marble.',
        finish: 'Blue-green patina · Golden-toned edges · Blue marble disc',
        material: 'Bronze-coloured tree · Marble base (verify tree alloy)',
        purity:
          'Patina describes a surface treatment, not a change in the base material. Confirm the tree’s alloy and marble specification with the supplier.',
        use: 'Console centrepieces and art-led housewarming gifts',
      },
      {
        id: 'patinated-rhino',
        name: 'Patinated Rhinoceros Sculpture',
        image: image('Patinated Hypo Decor'),
        desc:
          'A naturalistic rhinoceros in a grounded stance, featuring twin horns and pronounced shoulder folds. Mottled turquoise patina contrasts with the darker body, while golden-toned highlights reveal the horn tips, ears and toes.',
        highlight:
          'Turquoise surface treatments against a dark body create a vivid, timeworn appearance.',
        finish: 'Mottled turquoise patina · Golden-toned horn and toe highlights',
        material: 'Bronze-coloured sculpture (verify alloy)',
        purity:
          'The aged appearance is a decorative finish. Confirm the underlying metal composition and surface treatments with supplier documentation.',
        use: 'Wildlife-art displays, desks and statement shelves',
      },
      {
        id: 'toucan',
        name: 'Patinated Toucan on Marble',
        image: image('Patinated Toucan Sculpture on Marble'),
        desc:
          'A richly detailed toucan perched on a textured branch above a round white marble base. Turquoise surface treatments contrast with golden-toned feather edges and the oversized beak, while slender claws curl around the branch.',
        highlight:
          'Layered featherwork, a patterned beak and a leafy perch create a complete tropical vignette.',
        finish: 'Turquoise patina · Golden-toned feather edges · White marble base',
        material: 'Bronze-coloured bird · Marble base (verify bird alloy)',
        purity:
          'The bird and marble base are separate components. Confirm the bird’s alloy and the marble specification with the supplier.',
        use: 'Artful shelves, console styling and collector gifting',
      },
      {
        id: 'playful-cat',
        name: 'Playful Cat & Ball Sculpture',
        image: image('Playful Bronze Cat Sculpture and Ball'),
        desc:
          'A crouching cat stretches from a pale stone block to place both front paws on a ball. A raised curling tail and faceted, hammered-looking surface capture a playful moment, contrasting with the lightly pitted stone support.',
        highlight:
          'The downward stretch, curled tail and separate ball turn a familiar feline gesture into a dynamic tabletop story.',
        finish: 'Faceted metallic surface · Curled tail · Pale stone support',
        material: 'Bronze-coloured cat · Stone support (verify alloy)',
        purity:
          'Confirm the cat’s underlying metal composition, stone specification and included pieces with the supplier.',
        use: 'Animal-lover gifts, side tables and characterful shelves',
      },
    ],
  },
];

export const whyBronze = [
  {
    title: 'A Tradition of Metal Craft',
    body:
      'Across generations, metal vessels and sculptural objects have held a meaningful place in Indian craft and household traditions. Their forms, finishes and uses reflect the diversity of regional artistry.',
  },
  {
    title: 'The Sound of Temple Bells',
    body:
      'Metal bells are an enduring part of many Indian temple traditions. Their resonant tones accompany prayers and ceremonies, reflecting the cultural and devotional significance of sound in sacred spaces.',
  },
  {
    title: 'A Heritage of Traditional Dining',
    body:
      'Traditional metal utensils remain part of India’s diverse dining heritage. Choosing a vessel for food use should also take account of its exact alloy, finish, condition and suitability for the intended food.',
  },
  {
    title: 'Griha Pravesh Traditions',
    body:
      'The kalash is used in many Hindu ceremonies, including house-entry rituals. Its presence in a ceremonial arrangement reflects traditions of auspicious beginnings, welcome and blessing.',
  },
  {
    title: 'The Dhanteras Tradition',
    body:
      'Purchasing metal utensils and other household items on Dhanteras is a widely observed custom in many Indian communities. The practice is traditionally associated with prosperity and auspicious new beginnings.',
  },
  {
    title: 'Material and Care',
    body:
      'Metal composition and surface treatment affect how a product should be cleaned, maintained and used. Follow product-specific care instructions and confirm food-contact suitability with the manufacturer.',
  },
];

export const differentiators = [
  {
    tag: 'Purity Passport',
    heading: 'Know the Material. Know Its Origin.',
    body:
      'Where batch-level testing and artisan records are available, a QR code can connect customers to the relevant material specifications, test results and production provenance.',
  },
  {
    tag: 'Starter Kansa Kit',
    heading: 'Your First Piece Under ₹999.',
    body:
      'Explore an accessible entry into traditional kansa tableware with a thoughtfully selected starter piece. Confirm the current price, material specifications and included items before publishing this offer.',
  },
  {
    tag: 'HoReCa & Wellness',
    heading: 'Serveware for Hospitality.',
    body:
      'Explore serving solutions for boutique hotels, restaurants and hospitality spaces, with product selection tailored to presentation, handling, maintenance and intended use.',
  },
  {
    tag: 'Gifting as a Service',
    heading: 'A Gift, Thoughtfully Curated.',
    body:
      'Create considered corporate and festive gifting experiences with customisation, engraving and curated packaging options, subject to availability and order requirements.',
  },
];

export const stats = [
  {
    value: '78% / 22%',
    label:
      'A commonly cited copper–tin composition for bell metal. Verify the actual alloy of each product before applying this ratio to the collection.',
  },
  {
    value: '3000+',
    label:
      'A historical claim about the use of kansa should be published only with a reliable source that supports the specific date range and context.',
  },
  {
    value: 'Batch-tested',
    label:
      'Display batch-level material verification only when the relevant laboratory reports and traceability records are available.',
  },
  {
    value: 'Artisan-made',
    label:
      'Publish artisan-cluster names and provenance details only when supported by supplier or production records.',
  },
];