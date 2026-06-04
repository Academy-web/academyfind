import { prisma } from "../lib/prisma";

const categories = [
  {
    name: "Academic Coaching",
    slug: "academic-coaching",
    children: [
      {
        name: "Engineering",
        slug: "engineering",
        children: [
          { name: "JEE Coaching", slug: "jee-coaching" },
          { name: "Foundation Courses", slug: "foundation-courses" },
          { name: "Olympiad Coaching", slug: "olympiad-coaching" },
        ],
      },
      {
        name: "Medical",
        slug: "medical",
        children: [{ name: "NEET Coaching", slug: "neet-coaching" }],
      },
      {
        name: "University Entrance",
        slug: "university-entrance",
        children: [{ name: "CUET Coaching", slug: "cuet-coaching" }],
      },
    ],
  },

  {
    name: "Government Exams",
    slug: "government-exams",
    children: [
      {
        name: "Civil Services",
        slug: "civil-services",
        children: [{ name: "UPSC Coaching", slug: "upsc-coaching" }],
      },
      {
        name: "SSC",
        slug: "ssc",
        children: [{ name: "SSC Coaching", slug: "ssc-coaching" }],
      },
      {
        name: "Banking",
        slug: "banking",
        children: [{ name: "Banking Coaching", slug: "banking-coaching" }],
      },
      {
        name: "Railway",
        slug: "railway",
        children: [{ name: "Railway Coaching", slug: "railway-coaching" }],
      },
      {
        name: "Defence",
        slug: "defence",
        children: [{ name: "Defence Coaching", slug: "defence-coaching" }],
      },
    ],
  },

  {
    name: "Higher Education & Professional",
    slug: "higher-education-professional",
    children: [
      {
        name: "Management",
        slug: "management",
        children: [{ name: "CAT Coaching", slug: "cat-coaching" }],
      },
      {
        name: "Engineering",
        slug: "engineering-professional",
        children: [{ name: "GATE Coaching", slug: "gate-coaching" }],
      },
      {
        name: "Law",
        slug: "law",
        children: [{ name: "CLAT Coaching", slug: "clat-coaching" }],
      },
      {
        name: "Commerce",
        slug: "commerce",
        children: [
          { name: "CA Coaching", slug: "ca-coaching" },
          { name: "CS Coaching", slug: "cs-coaching" },
        ],
      },
    ],
  },

  {
    name: "Study Abroad",
    slug: "study-abroad",
    children: [
      {
        name: "Language Tests",
        slug: "language-tests",
        children: [
          { name: "IELTS Coaching", slug: "ielts-coaching" },
          { name: "TOEFL Coaching", slug: "toefl-coaching" },
        ],
      },
      {
        name: "Graduate Admissions",
        slug: "graduate-admissions",
        children: [
          { name: "GRE Coaching", slug: "gre-coaching" },
          { name: "GMAT Coaching", slug: "gmat-coaching" },
        ],
      },
      {
        name: "Consulting",
        slug: "consulting",
        children: [
          {
            name: "Study Abroad Consultants",
            slug: "study-abroad-consultants",
          },
        ],
      },
    ],
  },

  {
    name: "Computer & Technology",
    slug: "computer-technology",
    children: [
      {
        name: "Programming",
        slug: "programming",
        children: [
          { name: "Coding Classes", slug: "coding-classes" },
          { name: "Web Development", slug: "web-development" },
        ],
      },
      {
        name: "Data & AI",
        slug: "data-ai",
        children: [
          {
            name: "Data Science Training",
            slug: "data-science-training",
          },
          {
            name: "AI & ML Courses",
            slug: "ai-ml-courses",
          },
        ],
      },
      {
        name: "Security",
        slug: "security",
        children: [
          {
            name: "Cyber Security Training",
            slug: "cyber-security-training",
          },
        ],
      },
    ],
  },

  {
    name: "Language Learning",
    slug: "language-learning",
    children: [
      {
        name: "English",
        slug: "english",
        children: [
          {
            name: "English Speaking",
            slug: "english-speaking",
          },
        ],
      },
      {
        name: "European Languages",
        slug: "european-languages",
        children: [
          { name: "French Classes", slug: "french-classes" },
          { name: "German Classes", slug: "german-classes" },
          { name: "Spanish Classes", slug: "spanish-classes" },
        ],
      },
      {
        name: "Asian Languages",
        slug: "asian-languages",
        children: [
          { name: "Japanese Classes", slug: "japanese-classes" },
        ],
      },
    ],
  },

  {
    name: "Arts & Creativity",
    slug: "arts-creativity",
    children: [
      {
        name: "Performing Arts",
        slug: "performing-arts",
        children: [
          { name: "Dance Classes", slug: "dance-classes" },
          { name: "Music Classes", slug: "music-classes" },
          { name: "Singing Classes", slug: "singing-classes" },
          { name: "Guitar Classes", slug: "guitar-classes" },
        ],
      },
      {
        name: "Visual Arts",
        slug: "visual-arts",
        children: [
          {
            name: "Drawing & Painting",
            slug: "drawing-painting",
          },
        ],
      },
    ],
  },

  {
    name: "Sports & Fitness",
    slug: "sports-fitness",
    children: [
      {
        name: "Water Sports",
        slug: "water-sports",
        children: [
          {
            name: "Swimming Classes",
            slug: "swimming-classes",
          },
        ],
      },
      {
        name: "Team Sports",
        slug: "team-sports",
        children: [
          {
            name: "Cricket Academy",
            slug: "cricket-academy",
          },
          {
            name: "Football Academy",
            slug: "football-academy",
          },
        ],
      },
      {
        name: "Racquet Sports",
        slug: "racquet-sports",
        children: [
          {
            name: "Badminton Academy",
            slug: "badminton-academy",
          },
          {
            name: "Tennis Academy",
            slug: "tennis-academy",
          },
        ],
      },
      {
        name: "Wellness",
        slug: "wellness",
        children: [
          { name: "Yoga Classes", slug: "yoga-classes" },
          { name: "Martial Arts", slug: "martial-arts" },
        ],
      },
    ],
  },

  {
    name: "Kids & Hobby Learning",
    slug: "kids-hobby-learning",
    children: [
      {
        name: "Skill Development",
        slug: "skill-development",
        children: [
          { name: "Abacus Classes", slug: "abacus-classes" },
          { name: "Vedic Maths", slug: "vedic-maths" },
          { name: "Robotics Classes", slug: "robotics-classes" },
        ],
      },
      {
        name: "Mind Sports",
        slug: "mind-sports",
        children: [
          { name: "Chess Academy", slug: "chess-academy" },
        ],
      },
      {
        name: "Personality Growth",
        slug: "personality-growth",
        children: [
          {
            name: "Personality Development",
            slug: "personality-development",
          },
          {
            name: "Public Speaking",
            slug: "public-speaking",
          },
        ],
      },
    ],
  },
];


async function createCategory(
  category: any,
  parentId: string | null = null,
  level = 0
) {
  const created = await prisma.category.upsert({
    where: {
      slug: category.slug,
    },
    update: {
      parentId,
      level,
    },
    create: {
      name: category.name,
      slug: category.slug,
      parentId,
      level,
    },
  });

  if (category.children?.length) {
    for (const child of category.children) {
      await createCategory(
        child,
        created.id,
        level + 1
      );
    }
  }
}

async function main() {
  for (const category of categories) {
    await createCategory(category);
  }

  const count = await prisma.category.count();

  console.log(`✅ Categories Seeded (${count} categories)`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });