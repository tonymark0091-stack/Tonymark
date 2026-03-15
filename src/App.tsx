import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronDown, 
  ChevronRight, 
  Layers, 
  Users, 
  Shield, 
  FileText, 
  Lightbulb, 
  GraduationCap,
  ArrowRight,
  Search,
  ExternalLink,
  Info,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  X,
  CheckCircle
} from 'lucide-react';

// --- Types ---
interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  content: React.ReactNode;
}

type Page = 'home' | 'summaries' | 'guides' | 'concepts' | 'ideas' | 'about';

// --- Mock Data ---
const CONCEPTS: Article[] = [
  {
    id: 'what-is-blockchain',
    title: 'What is Blockchain?',
    summary: 'A fundamental look at distributed ledger technology, exploring how it enables trustless coordination through cryptography and consensus.',
    date: 'Feb 27, 2026',
    readTime: '6 min read',
    author: 'Verse Education',
    category: 'Fundamentals',
    content: (
      <>
        <p>At its core, a blockchain is a distributed, immutable ledger that records transactions across a network of computers. Unlike a traditional database managed by a central authority, a blockchain is maintained by a decentralized network of participants, often referred to as nodes.</p>
        
        <h2>The Architecture of Trust</h2>
        <p>The term "blockchain" comes from the way data is structured: into "blocks" that are "chained" together. Each block contains a list of transactions, a timestamp, and a unique cryptographic signature called a hash. Crucially, each block also contains the hash of the previous block, creating a chronological and tamper-evident chain.</p>
        <p>If anyone attempts to alter a transaction in an earlier block, the hash of that block changes. This, in turn, invalidates the hashes of all subsequent blocks. To successfully tamper with the ledger, an attacker would need to recalculate the hashes for the entire chain across a majority of the network simultaneously—a feat that is computationally and economically prohibitive in a well-decentralized network.</p>
        
        <h2>Consensus Mechanisms</h2>
        <p>How does a decentralized network agree on which transactions are valid without a central arbiter? This is achieved through consensus mechanisms. The two most prominent are Proof of Work (PoW) and Proof of Stake (PoS).</p>
        <p>In Proof of Work, participants (miners) compete to solve complex mathematical puzzles to earn the right to add a new block. In Proof of Stake, participants (validators) are chosen to create new blocks based on the number of tokens they "stake" or lock up as collateral. Both systems are designed to make it costly to act maliciously and rewarding to act honestly.</p>
        
        <h2>Why It Matters</h2>
        <p>Blockchain technology enables "trustless" coordination. This doesn't mean trust is absent, but rather that trust is shifted from fallible human institutions to transparent, verifiable code. This has profound implications for finance, supply chain management, digital identity, and any system that currently relies on centralized intermediaries to verify truth.</p>
      </>
    )
  },
  {
    id: 'what-is-dao',
    title: 'What is a DAO?',
    summary: 'Understanding Decentralized Autonomous Organizations: how they replace traditional hierarchy with code-enforced community governance.',
    date: 'Feb 27, 2026',
    readTime: '7 min read',
    author: 'Verse Education',
    category: 'Governance',
    content: (
      <>
        <p>A DAO, or Decentralized Autonomous Organization, is a new type of organizational structure that exists entirely on a blockchain. It is "decentralized" because it has no central leadership, "autonomous" because its core rules are enforced by smart contracts, and an "organization" because it coordinates a group of people toward a common goal.</p>
        
        <h2>The Smart Contract Foundation</h2>
        <p>In a traditional organization, rules are written in legal documents and enforced by courts and managers. In a DAO, the rules are written in code—specifically, smart contracts. These contracts define how the organization’s treasury is spent, how new members are admitted, and how decisions are made.</p>
        <p>Because these rules are on-chain, they are transparent and immutable. No one can unilaterally change the rules or spend the organization's funds without following the process defined in the code. This reduces the need for trust between participants who may be strangers located anywhere in the world.</p>
        
        <h2>Token-Based Governance</h2>
        <p>Most DAOs use tokens to represent membership and voting power. Holders of the DAO’s native token can submit proposals for the organization to consider—such as funding a new project or changing a protocol parameter—and vote on those proposals. The weight of a member's vote is typically proportional to the number of tokens they hold.</p>
        
        <h2>Benefits and Challenges</h2>
        <p>DAOs offer several advantages over traditional organizations, including global accessibility, extreme transparency, and a more democratic distribution of power. However, they also face significant challenges. Governance can be slow, voter apathy is common, and the "code is law" philosophy can be dangerous if a smart contract contains a bug or vulnerability.</p>
        <p>Despite these hurdles, DAOs represent a radical experiment in human coordination, enabling communities to manage billions of dollars in assets and build complex software without a single CEO or board of directors.</p>
      </>
    )
  },
  {
    id: 'token-utility-concept',
    title: 'What is Token Utility?',
    summary: 'Moving beyond speculation: an analysis of how tokens provide functional value and align incentives within a decentralized network.',
    date: 'Feb 27, 2026',
    readTime: '5 min read',
    author: 'Verse Education',
    category: 'Economics',
    content: (
      <>
        <p>In the early days of the blockchain industry, many people viewed tokens primarily as speculative assets. However, for a decentralized ecosystem to be sustainable, its native token must have "utility"—it must provide a functional value or serve a specific purpose within the network.</p>
        
        <h2>Types of Utility</h2>
        <p>Token utility can take many forms, often categorized into several key areas:</p>
        <ul>
          <li><strong>Governance:</strong> The right to vote on protocol changes, treasury allocations, and other key decisions.</li>
          <li><strong>Access:</strong> The token acts as a "key" to access specific services, features, or content within the ecosystem.</li>
          <li><strong>Staking:</strong> Locking up tokens to secure the network, earn rewards, or gain priority access.</li>
          <li><strong>Medium of Exchange:</strong> Using the token to pay for transaction fees or services within the protocol.</li>
          <li><strong>Reward:</strong> Incentivizing desired behaviors, such as providing liquidity, contributing code, or participating in research.</li>
        </ul>
        
        <h2>Aligning Incentives</h2>
        <p>The primary goal of token utility is to align the incentives of all participants—developers, users, and investors. When a token has clear, well-designed utility, it creates a "flywheel effect": as the protocol becomes more useful, the demand for the token increases, which in turn provides more resources to further improve the protocol.</p>
        
        <h2>Sustainability vs. Speculation</h2>
        <p>Ecosystems that rely solely on speculative demand are inherently fragile. Sustainable ecosystems focus on building "intrinsic utility"—value that exists regardless of the token's market price. By ensuring that tokens have a clear and necessary role in the protocol's operation, developers can build more resilient and long-lasting decentralized systems.</p>
      </>
    )
  },
  {
    id: 'on-chain-governance-concept',
    title: 'What is On-Chain Governance?',
    summary: 'An exploration of automated decision-making systems where protocol changes are proposed, voted on, and executed directly by code.',
    date: 'Feb 27, 2026',
    readTime: '8 min read',
    author: 'Verse Education',
    category: 'Governance',
    content: (
      <>
        <p>On-chain governance is a system for managing and implementing changes to a blockchain protocol where the rules for decision-making are encoded directly into the protocol itself. This is in contrast to off-chain governance, where decisions are made through social consensus and implemented manually by developers.</p>
        
        <h2>The Process of Automation</h2>
        <p>In an on-chain governance system, the process typically follows a structured path:</p>
        <ol>
          <li><strong>Proposal:</strong> A community member submits a proposal to change a protocol parameter or upgrade the code.</li>
          <li><strong>Voting:</strong> Token holders vote on the proposal using their digital signatures. The rules for what constitutes a "pass" (e.g., a simple majority or a supermajority) are defined in the code.</li>
          <li><strong>Execution:</strong> If the proposal passes, the changes are automatically executed by the protocol. There is no need for a central authority to "approve" or "implement" the result.</li>
        </ol>
        
        <h2>Advantages of On-Chain Systems</h2>
        <p>On-chain governance offers several key benefits. It is highly transparent, as every proposal and vote is recorded on the public ledger. It is also highly efficient, as it removes the need for manual intervention and reduces the risk of "governance capture" by a small group of developers or miners. Furthermore, it provides a clear and predictable path for protocol evolution.</p>
        
        <h2>Potential Drawbacks</h2>
        <p>However, on-chain governance is not without its risks. It can be rigid, making it difficult to respond quickly to emergencies or unforeseen circumstances. It can also lead to "plutocracy," where a few large token holders (whales) have disproportionate influence over the network's future. Finally, it relies heavily on the quality of the code; a bug in the governance contract could have catastrophic consequences for the entire ecosystem.</p>
        <p>As the industry matures, many protocols are exploring hybrid models that combine the transparency of on-chain voting with the flexibility and safety checks of off-chain coordination.</p>
      </>
    )
  }
];

const ARTICLES: Article[] = [
  {
    id: 'blockchain-governance',
    title: 'Blockchain Governance Models: A Comparative Analysis',
    summary: 'An in-depth look at how decentralized protocols make decisions, comparing on-chain voting systems with off-chain rough consensus models.',
    date: 'Feb 24, 2026',
    readTime: '12 min read',
    author: 'Research Team',
    category: 'Governance',
    content: (
      <>
        <p>Decentralized governance is one of the most complex challenges in the blockchain space. Unlike traditional corporate structures, blockchain protocols must find ways to coordinate thousands of independent actors without a central authority.</p>
        <h2>The Spectrum of Governance</h2>
        <p>Governance models typically fall into two categories: on-chain and off-chain. On-chain governance involves voting mechanisms that are hard-coded into the protocol itself. When a proposal passes, the code updates automatically.</p>
        <p>Off-chain governance, popularized by Bitcoin and Ethereum, relies on social consensus among developers, miners, and users. While slower, it is often argued to be more resilient against hostile takeovers.</p>
        <h2>Key Metrics for Success</h2>
        <p>We evaluate these models based on three primary metrics: participation rate, resistance to plutocracy, and decision-making speed. Our research indicates that hybrid models are emerging as the most sustainable path forward.</p>
      </>
    )
  },
  {
    id: 'community-growth',
    title: 'Decentralized Community Growth: Scaling Without Dilution',
    summary: 'Strategies for scaling Web3 communities while maintaining high signal-to-noise ratios and preserving core cultural values.',
    date: 'Feb 20, 2026',
    readTime: '8 min read',
    author: 'Verse Analyst',
    category: 'Community',
    content: (
      <>
        <p>As communities grow, they often face the "evaporative cooling" effect, where high-value contributors leave as the noise level increases. In Web3, this is exacerbated by financial incentives that can attract short-term speculators over long-term builders.</p>
        <h2>The Role of Curation</h2>
        <p>Successful scaling requires intentional curation. This doesn't mean exclusion, but rather creating structured pathways for different levels of involvement. We call this the "Concentric Circles" model of community design.</p>
        <h2>Incentive Alignment</h2>
        <p>Tokens are a powerful tool, but they are not a substitute for culture. Our research shows that communities with strong non-financial mission statements tend to survive market volatility better than those driven purely by APY.</p>
      </>
    )
  },
  {
    id: 'token-utility',
    title: 'Token Utility & Ecosystem Design',
    summary: 'Exploring the evolution of tokenomics from simple medium-of-exchange models to complex multi-utility frameworks.',
    date: 'Feb 15, 2026',
    readTime: '15 min read',
    author: 'Ecosystem Lead',
    category: 'Economics',
    content: (
      <>
        <p>The first generation of tokens focused primarily on being "digital money." Today, we see a shift toward tokens as coordination tools, governance rights, and access keys.</p>
        <h2>The Multi-Utility Framework</h2>
        <p>A robust token design should address three pillars: security, governance, and utility. Security involves staking mechanisms that protect the network. Governance gives holders a voice in the future of the protocol. Utility provides a reason for the token to be held and used within the application layer.</p>
        <h2>Avoiding the "Velocity Problem"</h2>
        <p>If a token is only used to pay for a service and immediately sold by the provider, it has high velocity and low value capture. We explore sink mechanisms that create sustainable demand.</p>
      </>
    )
  },
  {
    id: 'research-strengthens-ecosystems',
    title: 'Why Research Strengthens Decentralized Ecosystems',
    summary: 'An exploration of how structured inquiry and evidence-based reasoning serve as the foundation for sustainable blockchain networks.',
    date: 'Feb 27, 2026',
    readTime: '18 min read',
    author: 'Verse Research',
    category: 'Ecosystem',
    content: (
      <>
        <p>The rapid evolution of decentralized technologies has introduced a paradigm shift in how digital systems are governed, secured, and expanded. At the heart of this shift lies the concept of decentralization—a move away from monolithic, centralized authorities toward distributed, peer-to-peer networks. However, as these ecosystems grow in complexity and scale, they face a unique set of challenges that threaten their long-term viability. One of the most significant, yet often overlooked, tools for addressing these challenges is structured research.</p>
        <p>Research serves as the intellectual foundation upon which sustainable decentralized systems are built. It provides the necessary clarity to navigate technical complexities, the framework to align diverse community interests, and the evidence-based reasoning required to move beyond the transient cycles of market sentiment.</p>
        
        <h2>The Problem of Hype in Web3</h2>
        <p>The Web3 space has frequently been characterized by periods of intense speculation and "hype." While initial excitement can drive rapid capital influx and user adoption, it often lacks the depth required for long-term stability. Hype-driven growth is fundamentally fragile; it relies on the continuous escalation of expectations rather than the incremental improvement of protocol utility or social coordination.</p>
        <p>When the primary driver of participation is the anticipation of rapid financial gain, the underlying technical and social foundations of the ecosystem are often neglected. This neglect creates a "technical debt" and a "social debt" that eventually come due. Hype often obscures the real-world limitations and trade-offs inherent in blockchain technology. For instance, the "blockchain trilemma"—the challenge of achieving decentralization, security, and scalability simultaneously—is frequently glossed over in favor of marketing narratives that promise all three without compromise.</p>
        <p>This leads to a misalignment between user expectations and protocol reality. When the hype inevitably subsides, the resulting disillusionment can cause significant damage to the ecosystem's reputation and its ability to attract serious contributors. Research acts as a vital counterweight to this phenomenon. By prioritizing objective analysis over promotional rhetoric, research helps set realistic expectations and focuses the community's energy on solving genuine technical and structural problems.</p>
        
        <h2>The Role of Research in Community Growth</h2>
        <p>In a decentralized ecosystem, the "community" is not just a group of users; it is a distributed workforce of developers, governors, and advocates. The growth of such a community is not merely a numbers game but a process of intellectual and social integration. Research plays a pivotal role in this process by providing a common language and a shared set of facts.</p>
        <p>When a community is grounded in research, its members can engage in more productive debates and make more informed decisions. Structured research helps identify the specific needs and pain points of different community segments. For example, research into onboarding frameworks can reveal why certain types of contributors struggle to find their place in a DAO, leading to more effective integration strategies.</p>
        <p>Furthermore, research into governance models can provide the evidence needed to transition from simple, easily manipulated voting systems to more robust, multi-faceted decision-making processes. By documenting successes, failures, and best practices, research creates an institutional memory that allows the community to learn from its past rather than repeating the same mistakes. This cumulative knowledge is a powerful driver of sustainable growth, as it attracts individuals who are looking for depth, stability, and the opportunity to make a meaningful, lasting contribution.</p>
        
        <h2>How Education Reduces Misinformation</h2>
        <p>Misinformation is a pervasive threat in decentralized networks, where information is often fragmented and distributed across various social media platforms and forums. Without a central authority to verify facts, ecosystems are vulnerable to the spread of half-truths, outdated information, and outright falsehoods. This environment is particularly challenging for newcomers, who may lack the context required to distinguish between high-quality analysis and low-quality speculation.</p>
        <p>Education, powered by research, is the most effective defense against misinformation. By translating complex technical concepts into accessible, evidence-based guides, research platforms empower users to think critically about the information they encounter. When a user understands the fundamentals of how a smart contract works or the trade-offs involved in a particular consensus mechanism, they are much less likely to be misled by oversimplified or biased narratives.</p>
        <p>Moreover, a culture of research-backed education encourages transparency. When protocol changes or governance proposals are accompanied by detailed research reports, it becomes much harder for bad actors to push through self-serving agendas. The community can scrutinize the data, question the assumptions, and arrive at a more objective conclusion. In this way, education does more than just inform; it creates a more resilient social layer that is capable of self-correcting and resisting manipulation.</p>
        
        <h2>Conclusion</h2>
        <p>The transition from a hype-driven environment to a research-driven one is essential for the maturity of the decentralized space. While hype may provide the spark that ignites an ecosystem, research is the fuel that keeps it burning steadily over the long term. By providing a rigorous framework for analysis, fostering informed community growth, and creating a robust defense against misinformation, research strengthens the very foundations of decentralization.</p>
        <p>As we look toward the future, the most successful ecosystems will likely be those that prioritize intellectual depth and Web3 literacy. These "thinking" ecosystems will be better equipped to handle technical challenges, more resilient in the face of market volatility, and more capable of attracting the high-quality contributors needed to build a truly decentralized future. The Verse Research Library is committed to this vision, serving as a hub for the structured inquiry and educational excellence that will define the next era of blockchain technology.</p>
      </>
    )
  }
];

// --- Components ---

const NavLink = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button 
    onClick={onClick}
    className={`nav-link ${active ? 'active' : ''}`}
  >
    {children}
  </button>
);

const ArticleCard = ({ article, onClick }: { article: Article; onClick: () => void; key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="journal-card group cursor-pointer"
    onClick={onClick}
  >
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
        <span className="text-verse-accent">{article.category}</span>
        <span>•</span>
        <span>{article.date}</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author}</span>
      </div>
    </div>
    <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 group-hover:text-verse-accent transition-colors leading-tight">
      {article.title}
    </h3>
    <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mb-6">
      {article.summary}
    </p>
    <div className="flex items-center text-sm font-medium text-white group-hover:gap-3 transition-all">
      Read Article <ArrowRight className="ml-2 w-4 h-4 text-verse-accent" />
    </div>
  </motion.div>
);

const ArticleView = ({ article, onBack, backLabel }: { article: Article; onBack: () => void; backLabel: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="max-w-3xl mx-auto py-20 px-6"
  >
    <button 
      onClick={onBack}
      className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to {backLabel}
    </button>
    
    <header className="mb-16">
      <div className="text-xs font-mono text-verse-accent uppercase tracking-widest mb-4">
        {article.category}
      </div>
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
        {article.title}
      </h1>
      <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 border-y border-verse-border py-6">
        <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {article.date}</span>
        <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime}</span>
        <span className="flex items-center gap-2"><User className="w-4 h-4" /> {article.author}</span>
      </div>
    </header>

    <div className="article-content">
      {article.content}
    </div>

    <footer className="mt-20 pt-12 border-t border-verse-border">
      <div className="p-8 bg-white/[0.01] rounded-none border border-verse-border">
        <h4 className="font-display font-bold mb-4">About the Research</h4>
        <p className="text-sm text-slate-400 leading-relaxed">
          This article is part of the Verse Research Library's ongoing commitment to Web3 literacy. Our research is independent and peer-reviewed by community contributors.
        </p>
      </div>
    </footer>
  </motion.div>
);

// --- Page Views ---

const HomeView = ({ onNavigate, onArticleClick }: { onNavigate: (page: Page) => void; onArticleClick: (a: Article) => void }) => (
  <div className="max-w-5xl mx-auto py-20 px-6">
    <header className="mb-24 border-l-4 border-verse-accent pl-8">
      <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">Verse Research Library</h1>
      <p className="text-xl text-slate-400 max-w-2xl leading-relaxed font-light">
        An independent educational hub dedicated to structured research, Web3 literacy, and blockchain knowledge.
      </p>
    </header>
    
    <div className="grid md:grid-cols-2 gap-12 mb-24">
      <div className="p-10 border border-verse-border bg-white/[0.01] hover:border-verse-accent/30 transition-colors cursor-pointer" onClick={() => onNavigate('summaries')}>
        <h3 className="text-2xl font-display font-bold mb-4">Research Summaries</h3>
        <p className="text-slate-400 mb-6">In-depth analysis of decentralized governance, economics, and community scaling.</p>
        <span className="text-xs font-mono uppercase tracking-widest text-verse-accent">Explore Research →</span>
      </div>
      <div className="p-10 border border-verse-border bg-white/[0.01] hover:border-verse-accent/30 transition-colors cursor-pointer" onClick={() => onNavigate('guides')}>
        <h3 className="text-2xl font-display font-bold mb-4">Beginner Guides</h3>
        <p className="text-slate-400 mb-6">Structured pathways for those starting their journey in the decentralized space.</p>
        <span className="text-xs font-mono uppercase tracking-widest text-verse-accent">Start Learning →</span>
      </div>
    </div>

    <section>
      <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500 mb-12">Latest Publications</h2>
      <div className="space-y-4">
        {ARTICLES.slice(0, 2).map(article => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            onClick={() => onArticleClick(article)} 
          />
        ))}
      </div>
    </section>
  </div>
);

const SummariesView = ({ onArticleClick }: { onArticleClick: (a: Article) => void }) => (
  <div className="max-w-5xl mx-auto py-20 px-6">
    <header className="mb-16">
      <h1 className="text-4xl font-display font-bold mb-4">Research Summaries</h1>
      <p className="text-slate-400">Analytical deep-dives into the mechanics of decentralized ecosystems.</p>
    </header>
    <div className="space-y-4">
      {ARTICLES.map(article => (
        <ArticleCard 
          key={article.id} 
          article={article} 
          onClick={() => onArticleClick(article)} 
        />
      ))}
    </div>
  </div>
);

const GuidesView = () => (
  <div className="max-w-5xl mx-auto py-20 px-6">
    <header className="mb-16">
      <h1 className="text-4xl font-display font-bold mb-4">Web3 Beginner Guides</h1>
      <p className="text-slate-400">Step-by-step educational resources for navigating the blockchain landscape.</p>
    </header>
    <div className="grid gap-8">
      {[
        { step: "Step 1 – Foundations", desc: "Understand the core principles of decentralization, digital ownership, and the history of blockchain technology." },
        { step: "Step 2 – Participation", desc: "Learn how to interact with decentralized applications, manage digital assets, and participate in community governance." },
        { step: "Step 3 – Contribution", desc: "Discover pathways for contributing to open-source projects, publishing research, and supporting ecosystem growth." }
      ].map((item, i) => (
        <div key={i} className="glass-card">
          <h3 className="text-2xl font-bold mb-4">{item.step}</h3>
          <p className="text-slate-400 mb-6">{item.desc}</p>
          <button className="text-xs font-mono uppercase tracking-widest text-verse-accent hover:underline">View Guide</button>
        </div>
      ))}
    </div>
  </div>
);

const ConceptsView = ({ onArticleClick }: { onArticleClick: (a: Article) => void }) => (
  <div className="max-w-5xl mx-auto py-20 px-6">
    <header className="mb-16">
      <h1 className="text-4xl font-display font-bold mb-4">Blockchain Concepts</h1>
      <p className="text-slate-400">Fundamental definitions and technical explanations for the modern researcher.</p>
    </header>
    <div className="space-y-4">
      {CONCEPTS.map(concept => (
        <ArticleCard 
          key={concept.id} 
          article={concept} 
          onClick={() => onArticleClick(concept)} 
        />
      ))}
    </div>
  </div>
);

interface Idea {
  title: string;
  status: 'Proposed' | 'In Review' | 'Drafting';
  summary: string;
  talkingPoints: string[];
  researchAngles: string[];
  headlines: string[];
}

const IDEAS: Idea[] = [
  { 
    title: "The Ethics of MEV", 
    status: "Proposed", 
    summary: "Exploring the impact of Maximal Extractable Value on network fairness and user experience.",
    talkingPoints: [
      "Definition of MEV and its technical origins",
      "The 'Dark Forest' analogy and its implications for retail users",
      "Flashbots and the move toward transparency",
      "Ethical considerations for validators and searchers"
    ],
    researchAngles: [
      "Economic: Impact on transaction cost and slippage",
      "Technical: Protocol-level solutions to mitigate harmful MEV",
      "Social: The perception of fairness in decentralized systems"
    ],
    headlines: [
      "Beyond the Dark Forest: The Future of MEV Ethics",
      "Is MEV a Feature or a Bug? A Technical Analysis",
      "The Hidden Tax: How MEV Shapes User Experience"
    ]
  },
  { 
    title: "Privacy in Public Ledgers", 
    status: "In Review", 
    summary: "Analyzing zero-knowledge proofs and their role in preserving user sovereignty in a transparent world.",
    talkingPoints: [
      "The paradox of transparency vs. privacy",
      "Zero-Knowledge Proofs (ZKP) as a privacy-preserving layer",
      "Regulatory challenges for private transactions",
      "The trade-off between compliance and anonymity"
    ],
    researchAngles: [
      "Legal: Navigating global AML/KYC requirements",
      "Technical: Comparing zk-SNARKs vs. zk-STARKs",
      "Philosophical: Privacy as a fundamental human right in Web3"
    ],
    headlines: [
      "The Invisible Ledger: The Rise of ZK-Privacy",
      "Sovereignty in Public: The Case for On-Chain Privacy",
      "ZK-Proofs: The Final Frontier of Blockchain Scalability"
    ]
  },
  { 
    title: "DAO Legal Frameworks", 
    status: "Proposed", 
    summary: "A study on the intersection of smart contracts and traditional corporate law across global jurisdictions.",
    talkingPoints: [
      "The 'Legal Wrapper' problem for decentralized entities",
      "Liability of DAO members in the absence of legal status",
      "Case studies: Wyoming, Marshall Islands, and Switzerland",
      "Enforcement of smart contract outcomes in physical courts"
    ],
    researchAngles: [
      "Legal: Comparative analysis of international DAO laws",
      "Governance: How legal status affects decentralization",
      "Operational: Tax implications for global DAO contributors"
    ],
    headlines: [
      "Code vs. Court: The Legal Evolution of DAOs",
      "Wrapping the DAO: A Guide to Legal Recognition",
      "The Liability Gap: Protecting Decentralized Contributors"
    ]
  },
  { 
    title: "Sustainable Tokenomics", 
    status: "Drafting", 
    summary: "Researching long-term value capture mechanisms for utility tokens beyond inflationary rewards.",
    talkingPoints: [
      "The failure of 'Liquidity Mining' as a long-term strategy",
      "Real Yield: Distributing protocol revenue to holders",
      "Burn mechanisms vs. buy-back-and-make models",
      "Aligning token velocity with protocol growth"
    ],
    researchAngles: [
      "Economic: Mathematical models for sustainable emission",
      "Game Theory: Incentivizing long-term holding over dumping",
      "Case Study: Successful vs. failed tokenomic pivots"
    ],
    headlines: [
      "Beyond the Ponzi: Building Sustainable Tokenomics",
      "The Real Yield Revolution: A New Era of Value Capture",
      "Tokenomics 2.0: Moving from Inflation to Utility"
    ]
  }
];

const IdeasView = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [claimingIdea, setClaimingIdea] = useState<Idea | null>(null);

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      <header className="mb-16">
        <h1 className="text-4xl font-display font-bold mb-4">Article Ideas Hub</h1>
        <p className="text-slate-400">A collaborative space for identifying and refining future research topics.</p>
      </header>
      <div className="grid gap-6">
        {IDEAS.map((idea, i) => {
          const isExpanded = expandedIndex === i;
          return (
            <div 
              key={i} 
              className={`border transition-all duration-300 ${isExpanded ? 'border-verse-accent/40 bg-white/[0.02]' : 'border-verse-border bg-white/[0.01] hover:border-verse-accent/20'} cursor-pointer`}
              onClick={() => setExpandedIndex(isExpanded ? null : i)}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-verse-accent uppercase tracking-widest">{idea.status}</span>
                    <h3 className="text-2xl font-bold">{idea.title}</h3>
                  </div>
                  <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-6 h-6 text-slate-500" />
                  </div>
                </div>
                <p className="text-slate-400 mb-0">{idea.summary}</p>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 mt-8 border-t border-verse-border grid md:grid-cols-2 gap-12">
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">Key Talking Points</h4>
                          <ul className="space-y-3">
                            {idea.talkingPoints.map((point, idx) => (
                              <li key={idx} className="text-sm text-slate-300 flex gap-3">
                                <span className="text-verse-accent">•</span> {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">Research Angles</h4>
                          <ul className="space-y-3">
                            {idea.researchAngles.map((angle, idx) => (
                              <li key={idx} className="text-sm text-slate-300 flex gap-3">
                                <span className="text-verse-accent">/</span> {angle}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:col-span-2">
                          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">Headline Variations</h4>
                          <div className="grid sm:grid-cols-3 gap-4">
                            {idea.headlines.map((headline, idx) => (
                              <div key={idx} className="p-4 border border-verse-border bg-white/[0.01] text-xs italic text-slate-400">
                                "{headline}"
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="md:col-span-2 pt-4">
                          <button 
                            className="w-full py-4 border border-verse-accent/20 text-xs font-mono uppercase tracking-widest text-verse-accent hover:bg-verse-accent hover:text-black transition-all"
                            onClick={(e) => { e.stopPropagation(); setClaimingIdea(idea); }}
                          >
                            Claim this Topic for Research
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      <ClaimModal 
        idea={claimingIdea} 
        isOpen={!!claimingIdea} 
        onClose={() => setClaimingIdea(null)} 
      />
    </div>
  );
};

const ClaimModal = ({ idea, isOpen, onClose }: { idea: Idea | null; isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    telegram: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({ 
        fullName: '', 
        telegram: '', 
        email: '', 
        message: '' 
      });
      setStatus('idle');
    }
  }, [isOpen]);

  if (!isOpen || !idea) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
      
      // If no webhook URL is provided, we'll simulate success for the demo
      if (!webhookUrl) {
        console.warn('VITE_WEBHOOK_URL is not defined. Simulating success.');
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors', // Standard for Google Apps Script webhooks
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            topic: idea.title,
            submittedAt: new Date().toISOString()
          }),
        });
      }
      setStatus('success');
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-verse-bg border border-verse-border p-8 relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-verse-accent/20 rounded-none flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-verse-accent w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">Request Received</h3>
            <p className="text-slate-400 mb-8">Topic request submitted for review. We will contact you via Telegram shortly.</p>
            <button 
              onClick={onClose}
              className="px-8 py-3 border border-verse-border hover:border-verse-accent/40 transition-colors text-xs font-mono uppercase tracking-widest"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <span className="text-[10px] font-mono text-verse-accent uppercase tracking-widest mb-2 block">Research Application</span>
              <h3 className="text-2xl font-display font-bold">Claim: {idea.title}</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Full Name</label>
                <input 
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-white/[0.02] border border-verse-border p-3 text-sm focus:border-verse-accent/40 outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Telegram Username</label>
                  <input 
                    required
                    type="text"
                    value={formData.telegram}
                    onChange={e => setFormData({...formData, telegram: e.target.value})}
                    className="w-full bg-white/[0.02] border border-verse-border p-3 text-sm focus:border-verse-accent/40 outline-none transition-colors"
                    placeholder="@username"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Email (Optional)</label>
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/[0.02] border border-verse-border p-3 text-sm focus:border-verse-accent/40 outline-none transition-colors"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Why do you want to research this?</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/[0.02] border border-verse-border p-3 text-sm focus:border-verse-accent/40 outline-none transition-colors resize-none"
                  placeholder="Briefly describe your interest and background..."
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-verse-accent text-black text-xs font-mono uppercase tracking-widest font-bold hover:bg-white transition-colors disabled:opacity-50"
              >
                {status === 'submitting' ? 'Submitting...' : 'Submit Claim Request'}
              </button>
              
              {status === 'error' && (
                <p className="text-xs text-red-400 text-center">An error occurred. Please try again.</p>
              )}
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

const AboutView = () => (
  <div className="max-w-3xl mx-auto py-20 px-6">
    <h1 className="text-4xl font-display font-bold mb-8">About Verse Research</h1>
    <p className="text-xl text-slate-400 leading-relaxed mb-8">
      Verse Research Library is an independent educational initiative focused on simplifying blockchain concepts and encouraging structured contribution.
    </p>
    <p className="text-slate-400 leading-relaxed mb-12">
      Our goal is to transform curiosity into understanding and participation into meaningful impact. This platform is built for thinkers, analysts, and long-term contributors.
    </p>
    
    <div className="mb-16">
      <h2 className="text-2xl font-display font-bold mb-6">Lead Researcher & Owner</h2>
      <div className="p-8 border border-verse-border bg-white/[0.01] flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-16 h-16 bg-verse-accent/20 flex items-center justify-center">
          <User className="text-verse-accent w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-1">Tony Mark</h3>
          <p className="text-sm text-slate-500 mb-4">Independent Web3 Researcher & Ecosystem Analyst</p>
          <div className="flex flex-wrap gap-4">
            <a href="https://t.me/tonymark009" target="_blank" rel="noreferrer" className="text-xs font-mono text-verse-accent hover:underline">@tonymark009</a>
            <a href="mailto:tonymark0091@gmail.com" className="text-xs font-mono text-verse-accent hover:underline">tonymark0091@gmail.com</a>
          </div>
        </div>
      </div>
    </div>

    <div className="p-8 bg-white/[0.01] border border-verse-border rounded-none">
      <h4 className="font-bold mb-4">Disclaimer</h4>
      <p className="text-sm text-slate-500 leading-relaxed">
        Verse Research Library is an independent educational initiative. This platform does not provide financial advice and is not officially affiliated with the Verse team.
      </p>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Simple Hash-Based Routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      if (['home', 'summaries', 'guides', 'concepts', 'ideas', 'about'].includes(hash)) {
        setCurrentPage(hash);
        setSelectedArticle(null);
      } else if (!hash) {
        setCurrentPage('home');
        setSelectedArticle(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedArticle]);

  const navigateTo = (page: Page) => {
    window.location.hash = page;
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const renderContent = () => {
    if (selectedArticle) {
      const isConcept = CONCEPTS.some(c => c.id === selectedArticle.id);
      return (
        <ArticleView 
          article={selectedArticle} 
          onBack={() => setSelectedArticle(null)} 
          backLabel={isConcept ? "Concepts" : "Research"}
        />
      );
    }

    switch (currentPage) {
      case 'home': return <HomeView onNavigate={navigateTo} onArticleClick={handleArticleClick} />;
      case 'summaries': return <SummariesView onArticleClick={handleArticleClick} />;
      case 'guides': return <GuidesView />;
      case 'concepts': return <ConceptsView onArticleClick={handleArticleClick} />;
      case 'ideas': return <IdeasView />;
      case 'about': return <AboutView />;
      default: return <HomeView onNavigate={navigateTo} onArticleClick={handleArticleClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-verse-bg">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 border-b border-verse-border bg-verse-bg/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigateTo('home')}
          >
            <div className="w-8 h-8 bg-verse-accent rounded-none flex items-center justify-center">
              <BookOpen className="text-black w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight hidden sm:inline">VERSE <span className="text-verse-accent font-light">RESEARCH</span></span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar">
            <NavLink active={currentPage === 'home' && !selectedArticle} onClick={() => navigateTo('home')}>Home</NavLink>
            <NavLink active={currentPage === 'summaries' || (selectedArticle && ARTICLES.some(a => a.id === selectedArticle.id))} onClick={() => navigateTo('summaries')}>Research Summaries</NavLink>
            <NavLink active={currentPage === 'guides'} onClick={() => navigateTo('guides')}>Beginner Guides</NavLink>
            <NavLink active={currentPage === 'concepts' || (selectedArticle && CONCEPTS.some(c => c.id === selectedArticle.id))} onClick={() => navigateTo('concepts')}>Concepts</NavLink>
            <NavLink active={currentPage === 'ideas'} onClick={() => navigateTo('ideas')}>Ideas Hub</NavLink>
            <NavLink active={currentPage === 'about'} onClick={() => navigateTo('about')}>About</NavLink>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedArticle ? selectedArticle.id : currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-verse-border mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-verse-accent rounded-none flex items-center justify-center">
              <BookOpen className="text-black w-4 h-4" />
            </div>
            <span className="font-display font-bold text-sm tracking-tight">VERSE RESEARCH</span>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-xs text-slate-600">© {new Date().getFullYear()} Verse Research Library. Curated by Tony Mark.</p>
            <div className="flex gap-4 text-[10px] font-mono text-verse-accent uppercase tracking-widest">
              <a href="https://t.me/tonymark009" target="_blank" rel="noreferrer" className="hover:underline">@tonymark009</a>
              <a href="mailto:tonymark0091@gmail.com" className="hover:underline">tonymark0091@gmail.com</a>
            </div>
          </div>
          <div className="flex gap-6 text-xs text-slate-600">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
