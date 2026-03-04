/**
 * Loader - Carga dinámica de secciones HTML
 * Carga cada sección desde archivos separados en la carpeta sections/
 */
(function () {
    const sections = [
        { id: 'section-navbar', file: 'sections/navbar.html' },
        { id: 'section-hero', file: 'sections/hero.html' },
        { id: 'section-about', file: 'sections/about.html' },
        { id: 'section-skills', file: 'sections/skills.html' },
        { id: 'section-projects', file: 'sections/projects.html' },
        { id: 'section-footer', file: 'sections/footer.html' }
    ];

    async function loadSections() {
        const promises = sections.map(async (section) => {
            try {
                const response = await fetch(section.file);
                if (!response.ok) throw new Error(`Error cargando ${section.file}`);
                const html = await response.text();
                document.getElementById(section.id).innerHTML = html;
            } catch (error) {
                console.error(error.message);
            }
        });

        await Promise.all(promises);

        // Disparar evento personalizado cuando todas las secciones estén cargadas
        document.dispatchEvent(new Event('sectionsLoaded'));
    }

    // Cargar secciones al iniciar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadSections);
    } else {
        loadSections();
    }
})();
