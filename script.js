// --- 1. THEME TOGGLE LOGIC ---
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const getTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

setTheme(getTheme());

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// --- 2. NAVIGATION LOGIC ---
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navigation is always sticky - no scroll hide behavior

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// --- 3. SCROLL ANIMATIONS ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.section').forEach(section => observer.observe(section));

// Update year in footer
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Add active state to navigation links based on scroll position
const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveNavLink);

// --- 4. PARCHMENT TYPEWRITER ANIMATION ---
document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('typewriter-text');
    if (!textElement) return;
    
    const snippets = [
        // JSON Snippet (Easter Egg - Developer Profile)
        [
            "{",
            "    <span class='keyword'>\"developer\"</span>: {",
            "        <span class='keyword'>\"name\"</span>: <span class='string'>\"Belteshazzar Marquez\"</span>,",
            "        <span class='keyword'>\"handle\"</span>: <span class='string'>\"@biiieem\"</span>,",
            "        <span class='keyword'>\"title\"</span>: <span class='string'>\"Computer Engineer\"</span>,",
            "        <span class='keyword'>\"location\"</span>: {",
            "            <span class='keyword'>\"country\"</span>: <span class='string'>\"Philippines\"</span>,",
            "            <span class='keyword'>\"timezone\"</span>: <span class='string'>\"PHT\"</span>",
            "        },",
            "        <span class='keyword'>\"tagline\"</span>: <span class='string'>\"always building\"</span>",
            "    },",
            "    <span class='keyword'>\"skills\"</span>: {",
            "        <span class='keyword'>\"frontend\"</span>: [<span class='string'>\"React\"</span>, <span class='string'>\"Vue\"</span>, <span class='string'>\"TypeScript\"</span>],",
            "        <span class='keyword'>\"backend\"</span>: [<span class='string'>\"Node.js\"</span>, <span class='string'>\"Python\"</span>, <span class='string'>\"PostgreSQL\"</span>],",
            "        <span class='keyword'>\"tools\"</span>: [<span class='string'>\"Git\"</span>, <span class='string'>\"Docker\"</span>, <span class='string'>\"AWS\"</span>]",
            "    },",
            "    <span class='keyword'>\"workflow\"</span>: {",
            "        <span class='keyword'>\"ai_enabled\"</span>: <span class='keyword'>true</span>,",
            "        <span class='keyword'>\"approach\"</span>: <span class='string'>\"AI-powered development\"</span>,",
            "        <span class='keyword'>\"philosophy\"</span>: <span class='string'>\"Leverage AI as a force multiplier\"</span>",
            "    },",
            "    <span class='keyword'>\"status\"</span>: <span class='string'>\"available_for_opportunities\"</span>,",
            "    <span class='keyword'>\"last_updated\"</span>: <span class='string'>\"2024\"</span>",
            "}"
        ],
        // HTML Snippet (Easter Egg - About Me)
        [
            "<span class='tag'>&lt;!DOCTYPE</span> <span class='attr'>html</span><span class='tag'>&gt;</span>",
            "<span class='tag'>&lt;html</span> <span class='attr'>lang</span>=<span class='string'>\"en\"</span><span class='tag'>&gt;</span>",
            "<span class='tag'>&lt;head&gt;</span>",
            "    <span class='tag'>&lt;meta</span> <span class='attr'>charset</span>=<span class='string'>\"UTF-8\"</span><span class='tag'>&gt;</span>",
            "    <span class='tag'>&lt;title&gt;</span>Belteshazzar Marquez | Portfolio<span class='tag'>&lt;/title&gt;</span>",
            "    <span class='tag'>&lt;meta</span> <span class='attr'>name</span>=<span class='string'>\"description\"</span> <span class='attr'>content</span>=<span class='string'>\"Computer Engineer from Philippines\"</span><span class='tag'>&gt;</span>",
            "<span class='tag'>&lt;/head&gt;</span>",
            "<span class='tag'>&lt;body&gt;</span>",
            "    <span class='tag'>&lt;header</span> <span class='attr'>class</span>=<span class='string'>\"nav\"</span><span class='tag'>&gt;</span>",
            "        <span class='tag'>&lt;nav&gt;</span>",
            "            <span class='tag'>&lt;a</span> <span class='attr'>href</span>=<span class='string'>\"#home\"</span><span class='tag'>&gt;</span>@biiieem<span class='tag'>&lt;/a&gt;</span>",
            "        <span class='tag'>&lt;/nav&gt;</span>",
            "    <span class='tag'>&lt;/header&gt;</span>",
            "    <span class='tag'>&lt;main&gt;</span>",
            "        <span class='tag'>&lt;section</span> <span class='attr'>class</span>=<span class='string'>\"hero\"</span><span class='tag'>&gt;</span>",
            "            <span class='tag'>&lt;h1&gt;</span>always building<span class='tag'>&lt;/h1&gt;</span>",
            "            <span class='tag'>&lt;p</span> <span class='attr'>class</span>=<span class='string'>\"tagline\"</span><span class='tag'>&gt;</span>",
            "                Computer Engineer • Philippines",
            "            <span class='tag'>&lt;/p&gt;</span>",
            "            <span class='tag'>&lt;div</span> <span class='attr'>class</span>=<span class='string'>\"skills\"</span><span class='tag'>&gt;</span>",
            "                <span class='tag'>&lt;span&gt;</span>AI-Powered Development<span class='tag'>&lt;/span&gt;</span>",
            "                <span class='tag'>&lt;span&gt;</span>Full Stack<span class='tag'>&lt;/span&gt;</span>",
            "                <span class='tag'>&lt;span&gt;</span>Problem Solver<span class='tag'>&lt;/span&gt;</span>",
            "            <span class='tag'>&lt;/div&gt;</span>",
            "        <span class='tag'>&lt;/section&gt;</span>",
            "        <span class='tag'>&lt;section</span> <span class='attr'>class</span>=<span class='string'>\"about\"</span><span class='tag'>&gt;</span>",
            "            <span class='tag'>&lt;p&gt;</span>",
            "                Leveraging AI tools to accelerate development",
            "                while maintaining engineering excellence.",
            "            <span class='tag'>&lt;/p&gt;</span>",
            "        <span class='tag'>&lt;/section&gt;</span>",
            "    <span class='tag'>&lt;/main&gt;</span>",
            "<span class='tag'>&lt;/body&gt;</span>",
            "<span class='tag'>&lt;/html&gt;</span>"
        ],
        // Python Snippet (Easter Egg - Developer Class)
        [
            "<span class='keyword'>from</span> datetime <span class='keyword'>import</span> datetime",
            "<span class='keyword'>from</span> typing <span class='keyword'>import</span> List, Dict",
            "",
            "<span class='keyword'>class</span> <span class='function'>Developer</span>:",
            "    <span class='string'>\"\"\"Computer Engineer - always building\"\"\"</span>",
            "    ",
            "    <span class='keyword'>def</span> <span class='function'>__init__</span>(<span class='keyword'>self</span>, name: str, handle: str):",
            "        <span class='keyword'>self</span>.name = name",
            "        <span class='keyword'>self</span>.handle = handle",
            "        <span class='keyword'>self</span>.title = <span class='string'>\"Computer Engineer\"</span>",
            "        <span class='keyword'>self</span>.location = <span class='string'>\"Philippines\"</span>",
            "        <span class='keyword'>self</span>.tagline = <span class='string'>\"always building\"</span>",
            "        <span class='keyword'>self</span>.ai_enabled = <span class='keyword'>True</span>",
            "        <span class='keyword'>self</span>.projects = []",
            "    ",
            "    <span class='keyword'>def</span> <span class='function'>build_project</span>(<span class='keyword'>self</span>, name: str, tech_stack: List[str]):",
            "        <span class='string'>\"\"\"Create a new project using AI-powered workflow\"\"\"</span>",
            "        project = {",
            "            <span class='string'>\"name\"</span>: name,",
            "            <span class='string'>\"tech\"</span>: tech_stack,",
            "            <span class='string'>\"created_at\"</span>: datetime.now()",
            "        }",
            "        <span class='keyword'>self</span>.projects.append(project)",
            "        <span class='function'>print</span>(f<span class='string'>\"Built: {name} with {', '.join(tech_stack)}\"</span>)",
            "    ",
            "    <span class='keyword'>def</span> <span class='function'>leverage_ai</span>(<span class='keyword'>self</span>, task: str) -> str:",
            "        <span class='string'>\"\"\"Use AI tools to accelerate development\"\"\"</span>",
            "        <span class='keyword'>return</span> f<span class='string'>\"AI-enhanced: {task}\"</span>",
            "",
            "dev = <span class='function'>Developer</span>(<span class='string'>\"Belteshazzar Marquez\"</span>, <span class='string'>\"@biiieem\"</span>)",
            "dev.build_project(<span class='string'>\"Portfolio\"</span>, [<span class='string'>\"HTML\"</span>, <span class='string'>\"CSS\"</span>, <span class='string'>\"JS\"</span>])",
            "dev.leverage_ai(<span class='string'>\"code generation\"</span>)"
        ]
    ];

    let snippetIndex = 0;
    let lineIndex = 0;
    let currentHTML = ""; 

    function typeWriter() {
        const currentSnippet = snippets[snippetIndex];

        if (lineIndex < currentSnippet.length) {
            const line = currentSnippet[lineIndex];
            currentHTML += line + "\n";
            textElement.innerHTML = currentHTML;
            lineIndex++;
            setTimeout(typeWriter, 50);
        } else {
            setTimeout(() => {
                lineIndex = 0;
                currentHTML = "";
                textElement.innerHTML = "";
                snippetIndex = (snippetIndex + 1) % snippets.length;
                typeWriter();
            }, 5000); 
        }
    }
    
    typeWriter();
});
