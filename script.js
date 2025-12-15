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

// --- 4. PARCHMENT TYPEWRITER ANIMATION (HERO) ---
document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('typewriter-text');
    if (!textElement) return;
    
    const snippets = [
        // JSON Snippet (Developer Profile)
        [
            "{",
            "    <span class='keyword'>\"developer\"</span>: {",
            "        <span class='keyword'>\"name\"</span>: <span class='string'>\"Belteshazzar Marquez\"</span>,",
            "        <span class='keyword'>\"handle\"</span>: <span class='string'>\"@biiieem\"</span>,",
            "        <span class='keyword'>\"title\"</span>: <span class='string'>\"Computer Engineer\"</span>,",
            "        <span class='keyword'>\"location\"</span>: <span class='string'>\"Philippines\"</span>,",
            "        <span class='keyword'>\"tagline\"</span>: <span class='string'>\"always building\"</span>",
            "    },",
            "    <span class='keyword'>\"skills\"</span>: {",
            "        <span class='keyword'>\"frontend\"</span>: [<span class='string'>\"React\"</span>, <span class='string'>\"Vue\"</span>, <span class='string'>\"TypeScript\"</span>],",
            "        <span class='keyword'>\"backend\"</span>: [<span class='string'>\"Node.js\"</span>, <span class='string'>\"Python\"</span>, <span class='string'>\"PostgreSQL\"</span>],",
            "        <span class='keyword'>\"tools\"</span>: [<span class='string'>\"Git\"</span>, <span class='string'>\"Docker\"</span>, <span class='string'>\"AWS\"</span>]",
            "    },",
            "    <span class='keyword'>\"workflow\"</span>: {",
            "        <span class='keyword'>\"ai_enabled\"</span>: <span class='keyword'>true</span>,",
            "        <span class='keyword'>\"philosophy\"</span>: <span class='string'>\"Accelerate development, enhance quality\"</span>",
            "    },",
            "    <span class='keyword'>\"status\"</span>: <span class='string'>\"Available for opportunities\"</span>",
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
        // Python Snippet (Developer Class)
        [
            "<span class='keyword'>import</span> datetime",
            "",
            "<span class='keyword'>class</span> <span class='function'>Developer</span>:",
            "    <span class='string'>\"\"\"Computer Engineer - always building\"\"\"</span>",
            "    <span class='keyword'>def</span> <span class='function'>__init__</span>(<span class='keyword'>self</span>, name, handle, title, location, tagline):",
            "        <span class='keyword'>self</span>.name = name",
            "        <span class='keyword'>self</span>.handle = handle",
            "        <span class='keyword'>self</span>.title = title",
            "        <span class='keyword'>self</span>.location = location",
            "        <span class='keyword'>self</span>.tagline = tagline",
            "        <span class='keyword'>self</span>.ai_enabled = <span class='keyword'>True</span>",
            "        <span class='keyword'>self</span>.skills = {",
            "            <span class='string'>\"frontend\"</span>: [<span class='string'>\"React\"</span>, <span class='string'>\"Vue\"</span>, <span class='string'>\"TypeScript\"</span>],",
            "            <span class='string'>\"backend\"</span>: [<span class='string'>\"Node.js\"</span>, <span class='string'>\"Python\"</span>, <span class='string'>\"PostgreSQL\"</span>],",
            "            <span class='string'>\"tools\"</span>: [<span class='string'>\"Git\"</span>, <span class='string'>\"Docker\"</span>, <span class='string'>\"AWS\"</span>]",
            "        }",
            "",
            "    <span class='keyword'>def</span> <span class='function'>build_project</span>(<span class='keyword'>self</span>, project_name, tech_stack):",
            "        <span class='function'>print</span>(f<span class='string'>\"{self.name} is building {project_name} with {', '.join(tech_stack)}.\"</span>)",
            "        <span class='keyword'>if</span> <span class='keyword'>self</span>.ai_enabled:",
            "            <span class='function'>print</span>(<span class='string'>\"AI tools are accelerating development!\"</span>)",
            "        <span class='keyword'>return</span> {<span class='string'>\"project\"</span>: project_name, <span class='string'>\"status\"</span>: <span class='string'>\"completed\"</span>}",
            "",
            "    <span class='keyword'>def</span> <span class='function'>leverage_ai</span>(<span class='keyword'>self</span>, task):",
            "        <span class='function'>print</span>(f<span class='string'>\"{self.name} is leveraging AI for {task} to enhance efficiency.\"</span>)",
            "        <span class='keyword'>return</span> <span class='keyword'>True</span>",
            "",
            "biiieem = <span class='function'>Developer</span>(",
            "    name=<span class='string'>\"Belteshazzar Marquez\"</span>,",
            "    handle=<span class='string'>\"@biiieem\"</span>,",
            "    title=<span class='string'>\"Senior Fullstack Dev\"</span>,",
            "    location=<span class='string'>\"Philippines\"</span>,",
            "    tagline=<span class='string'>\"always building\"</span>",
            ")",
            "",
            "biiieem.build_project(<span class='string'>\"Personal Portfolio\"</span>, biiieem.skills[<span class='string'>\"frontend\"</span>] + biiieem.skills[<span class='string'>\"backend\"</span>])",
            "biiieem.leverage_ai(<span class='string'>\"code generation and refactoring\"</span>)"
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

// --- 5. LED PANEL ANIMATION (ABOUT) ---
document.addEventListener('DOMContentLoaded', function() {
    const leds = document.querySelectorAll('.led');
    if (leds.length === 0) return;
    
    let activeIndex = 0;
    
    function animateLEDs() {
        // Turn off all
        leds.forEach(led => led.classList.remove('active'));
        
        // Turn on current
        leds[activeIndex].classList.add('active');
        
        // Advance index
        activeIndex = (activeIndex + 1) % leds.length;
        
        setTimeout(animateLEDs, 200); // Speed: 200ms per step
    }
    
    animateLEDs();
});

// --- 6. CONNECTED CIRCUIT ANIMATION FOR ABOUT SECTION ---
function initCircuitAnimation() {
    const canvas = document.getElementById('circuit-canvas');
    const container = document.querySelector('.led-panel-container');
    const aboutSection = document.getElementById('about');

    if (!canvas || !container || !aboutSection) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let wires = [];
    let packets = [];

    function resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentNode.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        createPaths();
    }

    function createPaths() {
        wires = [];
        packets = [];
        // Check if panel is visible (not on mobile)
        if (window.getComputedStyle(container).display === 'none') return;

        const aboutRect = aboutSection.getBoundingClientRect();
        const panelRect = container.getBoundingClientRect();
        
        // Start connection from the panel's left border
        const endX = panelRect.left - aboutRect.left;
        
        const ledItems = container.querySelectorAll('.led-item');
        
        ledItems.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            // Align Y with the LED item center
            const endY = itemRect.top - aboutRect.top + (itemRect.height / 2);
            
            // Generate Path
            // From random point on far left -> To LED Panel
            const startX = Math.random() * (width * 0.3); // Start in left 30% of screen
            const startY = Math.random() * height;
            
            const path = [];
            path.push({x: startX, y: startY});
            
            // Simple Manhattan routing (Horizontal -> Vertical -> Horizontal)
            // Midpoint for turn
            const midX = (startX + endX) * 0.6; // Turn 60% of the way there
            
            path.push({x: midX, y: startY});
            path.push({x: midX, y: endY});
            path.push({x: endX, y: endY}); // Connect to panel
            
            wires.push({
                path: path,
                components: generateComponents(path)
            });
        });
    }

    function generateComponents(path) {
        const comps = [];
        // Chance to add a resistor or capacitor on horizontal segments
        for (let i = 0; i < path.length - 1; i++) {
            const p1 = path[i];
            const p2 = path[i+1];
            const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
            
            // Only on long horizontal lines
            if (p1.y === p2.y && dist > 50 && Math.random() < 0.5) {
                const cx = (p1.x + p2.x) / 2;
                const cy = p1.y;
                const type = Math.random() > 0.5 ? 'resistor' : 'capacitor';
                comps.push({x: cx, y: cy, type: type});
            }
        }
        return comps;
    }

    function drawComponent(comp) {
        const style = getComputedStyle(document.documentElement);
        const strokeColor = style.getPropertyValue('--circuit-stroke').trim();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        if (comp.type === 'resistor') {
            // Zigzag
            ctx.moveTo(comp.x - 15, comp.y);
            ctx.lineTo(comp.x - 10, comp.y - 5);
            ctx.lineTo(comp.x - 5, comp.y + 5);
            ctx.lineTo(comp.x, comp.y - 5);
            ctx.lineTo(comp.x + 5, comp.y + 5);
            ctx.lineTo(comp.x + 10, comp.y - 5);
            ctx.lineTo(comp.x + 15, comp.y);
        } else if (comp.type === 'capacitor') {
            // Parallel plates
            ctx.moveTo(comp.x - 5, comp.y - 8);
            ctx.lineTo(comp.x - 5, comp.y + 8);
            ctx.moveTo(comp.x + 5, comp.y - 8);
            ctx.lineTo(comp.x + 5, comp.y + 8);
        }
        ctx.stroke();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        const style = getComputedStyle(document.documentElement);
        const colorStroke = style.getPropertyValue('--circuit-stroke').trim();
        const colorActive = style.getPropertyValue('--circuit-active').trim();
        
        // Draw Wires & Components
        ctx.strokeStyle = colorStroke;
        ctx.lineWidth = 2;
        
        wires.forEach(wire => {
            // Draw Path
            ctx.beginPath();
            ctx.moveTo(wire.path[0].x, wire.path[0].y);
            for(let i=1; i<wire.path.length; i++) {
                ctx.lineTo(wire.path[i].x, wire.path[i].y);
            }
            ctx.stroke();
            
            // Connection Dots
            ctx.fillStyle = colorStroke;
            ctx.beginPath(); 
            ctx.arc(wire.path[0].x, wire.path[0].y, 3, 0, Math.PI*2); // Start
            ctx.fill();
            ctx.beginPath(); 
            ctx.arc(wire.path[wire.path.length-1].x, wire.path[wire.path.length-1].y, 3, 0, Math.PI*2); // End (at panel)
            ctx.fill();
            
            // Draw Components on this wire
            wire.components.forEach(c => drawComponent(c));
        });
        
        // Spawn Packets
        if (Math.random() < 0.05 && wires.length > 0) {
            const wireIndex = Math.floor(Math.random() * wires.length);
            packets.push({
                path: wires[wireIndex].path,
                segment: 0,
                t: 0,
                speed: 0.02
            });
        }
        
        // Animate Packets (Flow towards panel)
        ctx.fillStyle = colorActive;
        for (let i = packets.length - 1; i >= 0; i--) {
            let p = packets[i];
            p.t += p.speed;
            
            if (p.t >= 1) {
                p.t = 0;
                p.segment++;
            }
            
            if (p.segment >= p.path.length - 1) {
                packets.splice(i, 1);
                continue;
            }

            const p1 = p.path[p.segment];
            const p2 = p.path[p.segment+1];
            const cx = p1.x + (p2.x - p1.x) * p.t;
            const cy = p1.y + (p2.y - p1.y) * p.t;

            ctx.beginPath();
            ctx.arc(cx, cy, 4, 0, Math.PI*2);
            ctx.fill();
        }
        
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    createPaths(); // Initial build
    animate();
}

// Init All Animations
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initCircuitAnimation();
    });
} else {
    initCircuitAnimation();
}
