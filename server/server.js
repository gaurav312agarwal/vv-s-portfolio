const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5001;

// Configure CORS for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || '*'
    : '*',
  credentials: true
};

app.use(cors(corsOptions));
app.use('/data', express.static(path.join(__dirname, 'data')));
app.use('/images/scripts', express.static(path.join(__dirname, 'data/scripts')));

// Data extracted from PDF
const portfolioData = {
  header: {
    name: "Vaibhav Vinayak",
    role: "Director | Writer | Producer",
    year: "2026"
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      content: "Vaibhav Vinayak"
    },
    {
      id: "toc",
      type: "list",
      title: "Table of Contents",
      items: [
        { num: "01", text: "ABOUT ME" },
        { num: "02", text: "CREATIVE" },
        { num: "03", text: "EXPERIENCE" },
        { num: "04", text: "PROCESS" },
        { num: "05", text: "PROJECT" },
        { num: "06", text: "NEXT STEPS" },
        { num: "07", text: "CONTACT" }
      ]
    },
    {
      id: "about",
      title: "About Me",
      subtitle: "Who is Vaibhav Vinayak?",
      content: [
        "Visual storyteller driven by the belief that every brand, idea, and human experience deserves to be told with depth and purpose.",
        "As a filmmaker, scriptwriter, and creative producer, I specialize in crafting narrative-driven films, branded content, and digital campaigns that connect emotionally while delivering measurable impact.",
        "My work is rooted in strong concepts, authentic storytelling, and cinematic execution. From scripting and direction to post-production and campaign strategy, I approach every project with the same philosophy: clarity of vision, honesty in emotion, and excellence in detail.",
        "Drawing inspiration from masters like James Cameron, Park Chan-wook, Christopher Nolan, and Satyajit Ray, I am constantly studying the substance of cinematic narrative.",
        "For me, filmmaking is not just about visuals; it is about shaping perspectives, capturing moments that matter, and building stories that stay with the audience long after the screen fades to black."
      ]
    },
    {
      id: "philosophy",
      title: "Creative Philosophy",
      content: [
        "Vaibhav Vinayak believes that every design should tell a story not just through visuals, but through meaning and intent.",
        "His creative process begins with research and concept exploration, always grounded in understanding the client, audience, and message.",
        "By balancing originality with clarity and purpose, Vaibhav's goal is to create work that isn't only visually striking, but also resonates on a deeper level and communicates effectively."
      ]
    },
    {
      id: "experience",
      title: "Work Experience",
      intro: "As an Art Director, Vaibhav Vinayak has led creative projects from initial concept through to final delivery, ensuring that each piece aligns with the client's vision and audience needs.",
      jobs: [
        {
          role: "ART DIRECTION",
          desc: "Leading creative projects from initial concept through final execution, ensuring each design stays true to the client's vision and audience expectations."
        },
        {
          role: "BRANDING",
          desc: "Developing cohesive brand systems - including logos, color palettes, and typography that help brands communicate clearly and memorably."
        },
        {
          role: "ILLUSTRATION",
          desc: "Creating custom visuals for digital platforms, editorial content, and print media, adapting style and tone to fit each project's unique needs."
        }
      ]
    },
    {
      id: "process",
      title: "Process",
      steps: [
        { title: "RESEARCH & DISCOVERY", desc: "Start by understanding the client's goals, audience, and the story behind the project. This stage helps build a strong creative foundation." },
        { title: "BRAINSTORM & SKETCH", desc: "Explore different ideas and directions through rough sketches and notes. This creative phase turns abstract concepts into possible visual solutions." },
        { title: "DEVELOP & PROTOTYPE", desc: "Translate sketches into digital mockups or prototypes, testing layout, colors, and visual flow to see how ideas work in practice." },
        { title: "REFINE & FINALIZE", desc: "Gather feedback and make thoughtful adjustments. The design is refined until it clearly communicates the intended message and feels polished." }
      ]
    },
    {
      id: "projects",
      title: "Project Highlights",
      subtitle: "RAYNA",
      description: "Blending thoughtful design, storytelling, and practical problem-solving.",
      intro: "This selection of projects represents Vaibhav Vinayak's approach to creative direction."
    },
    {
      id: "next-steps",
      title: "Next Steps",
      content: [
        "Each project in this portfolio has been a chance to learn and grow - from refining technical design skills to leading creative direction and collaborating across teams.",
        "These experiences have shaped a thoughtful approach that values both concept and craft.",
        "Looking ahead, Shawn is excited to keep exploring new techniques, tools, and creative collaborations that challenge ideas, expand perspective, and bring fresh energy to future projects."
      ]
    },
    {
      id: "contact",
      title: "Contact",
      content: "To Explore Ideas Together!",
      details: [
        "+91-7761910979",
        "vaibhavvinayak2003@gmail.com",
        "Instagram: @vaibhavvinayak47"
      ]
    }
  ]
};

const blogsData = [
  {
    id: 1,
    title: "The Art of Visual Storytelling",
    date: "Dec 28, 2025",
    excerpt: "Exploring how design can communicate complex narratives through thoughtful visual choices.",
    content: "Visual storytelling is at the heart of modern design. Every color choice, every typeface selection, and every layout decision tells a story about the brand, product, or message. In this piece, we explore how art directors can harness the power of visual communication to create designs that not only look beautiful but also resonate deeply with audiences. From color psychology to compositional hierarchy, every element plays a role in the narrative. When done well, visual storytelling transcends language barriers and creates emotional connections that words alone cannot achieve."
  },
  {
    id: 2,
    title: "Building Brand Identity from Scratch",
    date: "Dec 20, 2025",
    excerpt: "A deep dive into the process of creating cohesive and meaningful brand systems.",
    content: "Building a strong brand identity requires more than just a logo. It's about creating a complete visual language that communicates the brand's values, personality, and mission. This journey begins with extensive research into the market, competitors, and target audience. Then comes the creative exploration phase where designers sketch, iterate, and refine ideas. The final identity includes logos, color palettes, typography, imagery styles, and usage guidelines. A well-executed brand system ensures consistency across all touchpoints and builds recognition over time. The best brands are those that feel authentic, memorable, and strategically aligned with their business goals."
  },
  {
    id: 3,
    title: "Design Trends vs Timeless Design",
    date: "Dec 10, 2025",
    excerpt: "Balancing current design trends with creating work that stands the test of time.",
    content: "As designers, we're constantly exposed to the latest trends—from minimalism to maximalism, from flat design to skeuomorphism. But the question remains: should we follow trends or create timeless designs? The answer lies in balance. Trends can inspire and evolve our work, but the core principles of good design—clarity, balance, and purpose—never go out of style. The most successful designers know when to embrace trends and when to stick with fundamentals. They understand that a design's longevity depends on its ability to communicate effectively, not on whether it follows the current aesthetic. By combining strategic thinking with creative exploration, we can create work that feels contemporary yet stands the test of time."
  }
];

const scriptsData = [
  {
    id: 1,
    title: "My Friends",
    genre: "Drama/Thriller",
    image: "Script-7.jpeg",
    description: "A lonely boy grows up believing his imaginary friend is the only one who truly understands him until that voice convinces him to commit an unforgivable crime. What follows is a heartbreaking courtroom battle that blurs the line between madness, friendship, and guilt.",
  },
  {
    id: 2,
    title: "My Bad",
    genre: "Sci-Fi/Drama",
    image: "Script-9.jpeg",
    description: "Alice, a struggling writer, meets a scientist who offers him a chance to change his reality using a machine, leading to an exploration of whether we can truly rewrite our stories or are merely characters within them.",
  },
  {
    id: 3,
    title: "Afterall It_s You",
    genre: "Drama",
    image: "Script-1.jpeg",
    description: "A monologue reflecting on the uncertainty of life and the superficiality of modern social interaction, exploring the chemical reactions of toxic relationships and the search for authentic connection.",
  },
  {
    id: 4,
    title: "Asesinato_de_amigos",
    genre: "Thriller",
    image: "Script-5.jpeg",
    description: "A thriller exploring the dark turns of friendship and betrayal. (Content not accessible for detailed summary).",
  },
  {
    id: 5,
    title: "Delusions",
    genre: "Drama",
    image: "Script-8.png",
    description: "A tense encounter in a cab on a foggy night reveals a dark past, as a passenger and driver engage in a conversation that uncovers hidden truths about the people we walk past every day.",
  },
  {
    id: 6,
    title: "Ghar Ghar Ki kahani",
    genre: "Drama",
    image: "Script-3.jpeg",
    description: "A slice-of-life drama capturing the daily squabbles and affectionate bickering of a household, featuring Aarti and Pandey in a humorous exchange about chores, marriage, and the neighbors.",
  },
  {
    id: 7,
    title: "Helix",
    genre: "Sci-Fi",
    image: "Script-2.jpeg",
    description: "A sci-fi narrative exploring the spirals of time and existence. (Content not accessible for detailed summary).",
  },
  {
    id: 8,
    title: "Karun & Me",
    genre: "Drama",
    image: "Script-4.jpeg",
    description: "A drama focused on the relationship dynamics between the protagonist and Karun. (Content not accessible for detailed summary).",
  },
  {
    id: 9,
    title: "Maroon...My Life!!",
    genre: "Comedy/Drama",
    image: "Script-11.jpeg",
    description: "A comedy-drama reflecting on the colorful and chaotic moments of life. (Content not accessible for detailed summary).",
  },
  {
    id: 10,
    title: "Simply You",
    genre: "Drama",
    image: "Script-6.jpeg",
    description: "A touching narrative following Dhruv's observation of Sakshi's journey as an artist—from the struggles of sleepless nights and financial worry to the triumph of landing a dream role at DC Comics.",
  },
  {
    id: 11,
    title: "Verse 1",
    genre: "Experimental",
    image: "Script-10.jpeg",
    description: "An experimental script exploring visual poetry and abstract storytelling. (Content not accessible for detailed summary).",
  }
];

const shortFilmsData = [
  {
    id: 1,
    title: "Between the Lines",
    year: "2024",
    duration: "10 min",
    description: "A visual meditation on typography and meaning in modern communication.",
    content: "In our digital age, we communicate through words more than ever, yet understanding often feels lost. 'Between the Lines' explores the gap between what we write and what we truly mean. The film juxtaposes typography, handwritten notes, texts, and spoken words, revealing the beauty and complexity in how humans express themselves. Each scene is a different medium of communication—a love letter, a resignation email, graffiti on a wall, whispered secrets. The narrative asks: what gets lost in translation, and what can we reclaim?"
  },
  {
    id: 2,
    title: "Light Studies",
    year: "2023",
    duration: "6 min",
    description: "A photographic exploration of how light transforms spaces and emotions.",
    content: "'Light Studies' is a visual essay celebrating the interplay of light and shadow. Shot over several seasons, the film documents how changing light conditions affect our perception of the same spaces. From a minimalist apartment to an industrial warehouse, from a forest path to an urban street—light is the protagonist here. The film demonstrates how art directors can use lighting as a storytelling tool, creating mood and directing viewer attention. No dialogue, just pure visual narrative through the language of light."
  },
  {
    id: 3,
    title: "Geometric Dreams",
    year: "2023",
    duration: "7 min",
    description: "An animated exploration of form, space, and the mathematics of beauty.",
    content: "'Geometric Dreams' is an abstract animated film that celebrates the intersection of mathematics and art. Through elegant geometric transformations and three-dimensional space, the film creates a world where shapes dance, transform, and interact. The visual journey explores balance, symmetry, and the golden ratio—principles that underpin beautiful design. The accompanying sound design creates a meditative experience that reminds us that art and science are not opposites but complementary forces in creating meaning and beauty."
  }
];

const contentBrandingData = [
  {
    id: 1,
    brand: "LUXORA BEAUTY",
    category: "Beauty & Cosmetics",
    year: "2024",
    description: "Complete brand identity and content strategy for luxury beauty brand.",
    learning: "Understanding the intersection of aspiration and authenticity in luxury markets. Through extensive market research, we discovered that modern luxury consumers value transparency and sustainability as much as exclusivity. This shaped our content approach to highlight both premium craftsmanship and ethical sourcing.",
    content: "Developed a comprehensive visual identity including logo, color palette, and imagery guidelines. Created a year-long content calendar featuring product launches, behind-the-scenes manufacturing stories, and educational content about ingredients. The partnership resulted in 300% increase in brand engagement and strong positioning in the luxury beauty space."
  },
  {
    id: 2,
    brand: "SUSTAINABLE VENTURES",
    category: "Eco-Technology",
    year: "2023",
    description: "Brand positioning and content creation for sustainability-focused startup.",
    learning: "Communicating complex sustainability concepts in visually compelling ways. We learned that impact-driven audiences respond best to storytelling that connects environmental action to human stories. Data visualization became a powerful tool for making sustainability metrics feel real and urgent.",
    content: "Created a cohesive brand narrative that made sustainability accessible without sacrificing scientific credibility. Produced educational content series, interactive infographics, and case studies documenting real environmental impact. The content strategy helped the brand secure strategic partnerships and increased media mentions by 250%."
  },
  {
    id: 3,
    brand: "CULTURAL COLLECTIVE",
    category: "Art & Community",
    year: "2023",
    description: "Identity and community-driven content strategy for arts organization.",
    learning: "Building brand identity around community values rather than corporate messaging. We discovered that authentic representation and inclusive storytelling creates deeper audience loyalty. The most powerful content came from amplifying community voices rather than corporate narratives.",
    content: "Designed a flexible brand system that allowed for creative expression while maintaining visual consistency. Developed content that celebrated community artists and cultural events. Built a platform that generated user-created content and fostered community engagement. The initiative attracted over 5,000 active community members and secured ongoing funding from cultural institutions."
  },
  {
    id: 4,
    brand: "MINDWELL WELLNESS",
    category: "Health & Wellness",
    year: "2022",
    description: "Visual branding and content marketing for digital wellness platform.",
    learning: "Wellness audiences demand authenticity and science-backed claims. We learned to balance aspirational imagery with realistic representation, showing that wellness journeys are personal and non-linear. Vulnerability in content builds trust more effectively than perfection.",
    content: "Created a warm, inclusive brand identity featuring diverse representation and real people (not models). Produced content including expert interviews, user testimonials, educational wellness guides, and community success stories. Established the brand as a trusted voice in the wellness space, resulting in 1M+ app downloads and strong user retention rates."
  }
];

app.get('/api/portfolio', (req, res) => {
  res.json(portfolioData);
});

app.get('/api/blogs', (req, res) => {
  try {
    const blogsDir = path.join(__dirname, 'data', 'blogs');
    const blogs = [];
    let id = 1;

    const blogFolders = fs.readdirSync(blogsDir);

    blogFolders.forEach(folder => {
      const folderPath = path.join(blogsDir, folder);
      const stat = fs.statSync(folderPath);

      if (stat.isDirectory()) {
        // Look for .txt files in the folder
        const files = fs.readdirSync(folderPath);
        const txtFile = files.find(f => f.endsWith('.txt'));
        const imgFile = files.find(f => /\.(jpg|jpeg|png|gif)$/i.test(f));

        if (txtFile) {
          let fullContent = fs.readFileSync(path.join(folderPath, txtFile), 'utf-8');
          
          // Parse title and subtitle
          let title = null;
          let subtitle = null;
          let content = fullContent;
          
          const titleMatch = content.match(/^TITLE\s*-\s*(.+?)$/m);
          if (titleMatch) {
            title = titleMatch[1].trim();
            content = content.replace(/^TITLE\s*-\s*.+?$/m, '');
          }
          
          const subtitleMatch = content.match(/^SUBTITLE\s*-\s*(.+?)$/m);
          if (subtitleMatch) {
            subtitle = subtitleMatch[1].trim();
            content = content.replace(/^SUBTITLE\s*-\s*.+?$/m, '');
          }
          
          // Clean up extra whitespace and newlines
          content = content.trim().replace(/\n\n+/g, '\n\n');
          
          const excerpt = content.trim().split('\n')[0].substring(0, 150);

          blogs.push({
            id: id++,
            title: title || folder.replace(/[-_]/g, ' '),
            subtitle: subtitle,
            date: new Date(fs.statSync(path.join(folderPath, txtFile)).mtime).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            excerpt: excerpt,
            content: content,
            image: imgFile ? `/data/blogs/${folder}/${imgFile}` : null
          });
        }
      }
    });

    res.json(blogs);
  } catch (err) {
    console.error('Error reading blogs:', err);
    res.json(blogsData); // Fallback to hardcoded data
  }
});

app.get('/api/scripts', (req, res) => {
  res.json(scriptsData);
});

app.get('/api/short-films', (req, res) => {
  res.json(shortFilmsData);
});

app.get('/api/content-branding', (req, res) => {
  res.json(contentBrandingData);
});

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    let ipAddress = 'localhost';
    
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          ipAddress = iface.address;
          break;
        }
      }
    }
    
    console.log(`Server running on http://${ipAddress}:${PORT}`);
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;