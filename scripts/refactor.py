import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace <section className="scroll-section ..."> with <motion.section ...>
    # There are multiple sections, so we need a robust regex.
    # We will use regex to find <section className="scroll-section ..."> and replace with <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={sectionVariant} className="...">
    
    # We'll just replace 'scroll-section' with nothing and wrap the section in motion.section
    content = re.sub(
        r'<section\s+([^>]*?)className="(.*?)scroll-section(.*?)"',
        r'<motion.section \1initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={sectionVariant} className="\2\3"',
        content
    )
    # The ending tag </section> needs to become </motion.section> but only for the ones that were changed.
    # To be safe, I'll just change all </section> to </motion.section> and change all <section to <motion.section
    # Wait, the hero section is <section id="accueil" ... it was changed but maybe didn't have scroll-section?
    # Let's check original page.tsx: the hero section didn't have scroll-section!
    # OK, let's just do:
    content = content.replace('<section', '<motion.section')
    content = content.replace('</section>', '</motion.section>')
    content = content.replace('scroll-section ', '')
    content = content.replace(' scroll-section', '')
    
    # For scroll-reveal
    content = content.replace('scroll-reveal ', '')
    content = content.replace(' scroll-reveal', '')
    
    # Let's manually write the file changes for the sections that need specific stagger/animations.
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    process_file("c:/Users/disfra/Desktop/EngiGrowth/app/page.tsx")
