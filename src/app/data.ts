import imgImage from "../assets/6d9373bf8007ceb4582f0039aafba600504b8e9a.png";
import imgImage1 from "../assets/67fda4d003ce7d97cd5510ff30af95756a01447b.png";
import img44 from "../assets/4435f1f011413a09fd556f36409cc5868f7b419e.png";
import imgImage2 from "../assets/09003042cdb3ea96779e5f490867810a7a10ad9c.png";
import imgImage3 from "../assets/92fe7c7a065cfa5df2a8265fcbddcf2fa915d345.png";
import imgImage4 from "../assets/d0da4f4370fdbda3cead0fb48538cdb07861254b.png";
import imgImage5 from "../assets/aca96d2cfa99440b037b21eca5ce0057d3bb6ddb.png";
import imgImage6 from "../assets/fc0c8c319d7d3d8ed020642540057e268d029f12.png";
import imgImage7 from "../assets/a465b7e9104ffb250fbb0ff1e4dbeded146bae47.png";
import imgHoverImage from "../assets/31700d7a9cecd643ca9b3301ef8834e779e2270c.png";
import imgHoverImage1 from "../assets/6ed8085af55d46d4cbd04fa912387ace65ad84a4.png";
import imgPlaceholder from "../assets/98ab4e54017e37df1cb24e1c550f3c6f515fdf60.png";

export const data = {
  header: {
    query: "Whale images",
    deepSearch: "Deep search",
    signIn: "Sign in",
    rewards: "5",
    scopes: [
      { label: "All", active: false },
      { label: "Images", active: true }, // Assuming Images is active based on context, though design has "All" underlined. Wait, looking at code: HeaderTabButton has "All" blue. So "All" is active.
      { label: "Videos", active: false },
      { label: "Maps", active: false },
      { label: "News", active: false },
      { label: "Shopping", active: false },
    ]
  },
  copilot: {
    title: "Copilot Search",
    grid: [
      { src: imgImage, alt: "Whale breaching", large: false }, // Row 1 Col 1
      { src: imgImage1, alt: "Whale tail", large: false },     // Row 1 Col 2
      { src: img44, alt: "Whale underwater", large: false },   // Row 1 Col 3
      { src: imgImage2, alt: "People with whale", large: false }, // Row 1 Col 4
      { src: imgImage3, alt: "Whale head", large: false },     // Row 2 Col 1
      { src: imgImage4, alt: "Dolphin", large: false },        // Row 2 Col 2
      { src: imgImage5, alt: "Orca", large: false },           // Row 2 Col 3
      { src: imgImage6, alt: "Whale shark", large: false, seeMore: true }, // Row 2 Col 4
    ]
  },
  webResult: {
    title: "Title Lorem Ipsum Dolor Consectatur",
    url: "www.algoloremipsum-attribution.com",
    snippet: "Snippet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ipsum nostrud exercitation ullamco laboris sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Snippet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. Snippet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Oct 26, 2018",
    tabs: ["Overview", "History", "Geography", "Demographics", "Economy", "Culture"],
    footerLink: "See more on demo-url.com"
  },
  relatedRail: {
    title: "Related search",
    items: [
      { title: "Beautiful", subtitle: "Paris", image: imgImage2 },
      { title: "Louvre", subtitle: "Paris", image: imgImage7 },
      { title: "Where to Stay", subtitle: "in Paris", image: imgImage1 },
      { title: "Paris", subtitle: "Postcard", image: img44 },
      { title: "Paris", subtitle: "Artwork", image: imgImage3 },
      { title: "Paris", subtitle: "Sightseeing", image: imgImage5 },
    ]
  },
  textRail: {
    title: "Related searches for title",
    items: [
      "Link title",
      "Link title",
      "Link title",
      "Link title"
    ]
  },
  footer: {
    title: "Related searches for title",
    links: [
      "Link title",
      "Link title",
      "Link title",
      "Link title"
    ]
  },

  // === IMAGE SCENARIO DATA ===
  
  // Timeline Gallery (Blue Period style)
  timelineGallery: {
    title: "Blue Period",
    description: "Pablo Picasso's Blue Period was a period of time between 1901 and 1904 when the Spanish painter created monochromatic paintings in shades of blue and blue-green.",
    periods: ["Blue period", "Cubism", "Neoclassism", "Surrealism", "See more"],
    activePeriod: "Blue period",
    yearRange: [1890, 1960] as [number, number],
    currentYear: 1902,
    images: [
      "https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=200&h=260&fit=crop",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=260&fit=crop",
      "https://images.unsplash.com/photo-1549887534-1541e9326642?w=200&h=260&fit=crop",
      "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=200&h=260&fit=crop"
    ]
  },

  // Location Card (Kyoto style)
  locationCard: {
    name: "Kyoto",
    description: "Kyoto, once the imperial capital of Japan, is renowned for its historic temples, traditional wooden houses, and vibrant cultural heritage, offering a multitude of experiences for visitors.",
    heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop",
    places: [
      { name: "Kinkaku-ji (Golden Pavilion)", image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=120&h=80&fit=crop" },
      { name: "Kiyomizu-dera Temple", image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=120&h=80&fit=crop" },
      { name: "Fushimi Inari Taisha", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=120&h=80&fit=crop" },
      { name: "Arashiyama Bamboo Grove", image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=120&h=80&fit=crop" },
      { name: "Kyoto Tower", image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=120&h=80&fit=crop" }
    ]
  },

  // Step Card (Recipe style)
  stepCard: {
    stepNumber: 1,
    totalSteps: 4,
    title: "Step 1: Prepare the Crust",
    content: "Mix Dry Ingredients: In a large mixing bowl, whisk together flour, sugar, and salt. Cut in Butter: Add cold butter and blend until the mixture resembles coarse crumbs. Add Water: Gradually add cold water until the dough comes together. Divide into two discs, wrap in plastic, and refrigerate for at least 1 hour.",
    tags: ["Gluten free dough", "Cooking Skills", "Necessary Ingredients"],
    images: [
      { url: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=200&h=160&fit=crop", isVideo: true },
      { url: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=200&h=100&fit=crop", isVideo: false }
    ]
  },

  // Entity Detail (Helicopter style)
  entityDetail: {
    title: "Bell cobra helicopter",
    description: "The Bell AH-1 Cobra (company designation Model 209) is a single-engine, twin-blade, single- and dual-seat attack helicopter and the world's first purpose-built helicopter gunship, developed by Bell Helicopters using the engine transmission and rotor system of the Bell UH-1 Iroquois (\"Huey\").",
    mainImage: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400&h=300&fit=crop",
    source: "Getty • https://getty.com",
    wikiSource: true,
    topics: [
      { label: "Operational Intro", image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=100&h=70&fit=crop" },
      { label: "Flight Operations", image: "https://images.unsplash.com/photo-1534481016-c1a9a3e5f6a6?w=100&h=70&fit=crop" },
      { label: "Cockpit & Controls", image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=100&h=70&fit=crop" },
      { label: "Weapon Systems", image: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=100&h=70&fit=crop" },
      { label: "Airframe Details", image: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=100&h=70&fit=crop" }
    ]
  },

  // Visual Explorer (Japanese roof style)
  visualExplorer: {
    title: "Explore Japanese roof visually",
    categories: [
      {
        name: "Kirizuma (切妻屋根) - Gabled Roof",
        description: "The simplest historically used for rice storage and musing at a ridge. Simple and common in traditional to build up.",
        hasWiki: true,
        images: [
          "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=100&h=80&fit=crop",
          "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=100&h=80&fit=crop",
          "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=100&h=80&fit=crop",
          "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=100&h=80&fit=crop",
          "https://images.unsplash.com/photo-1528164344705-47542687000d?w=100&h=80&fit=crop"
        ]
      },
      {
        name: "Yosemune (寄棟屋根) - Hipped Roof",
        description: "This four-sided roof has two gently sloped, it handles heavy rain and wind well, and its wide eaves provide shade.",
        hasWiki: true,
        images: [
          "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=100&h=80&fit=crop",
          "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=100&h=80&fit=crop",
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=100&h=80&fit=crop",
          "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=100&h=80&fit=crop",
          "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=100&h=80&fit=crop"
        ]
      }
    ]
  },

  // City Grid (Los Angeles style)
  cityGrid: {
    title: "Images of Famous cities to visit",
    intro: "Explore famous cities to visit, such as",
    outro: "through curated images highlighting their landmarks, neighborhoods, and unique cultural energy.",
    cities: ["Los Angeles", "Hong Kong", "Tokyo"],
    activeCity: "Los Angeles",
    images: [
      "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1515896769750-31548aa180ed?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1478860409698-8707f313ee8b?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1460881680093-7c8e4eb3b0b3?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1581351123004-757df051db8e?w=200&h=150&fit=crop"
    ]
  }
};
