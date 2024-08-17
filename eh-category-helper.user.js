// ==UserScript==
// @name         EH Category Helper
// @namespace    nasu
// @version      1.0.0
// @description  Adds some helpful category shortcuts to E-H.
// @author       nasu
// @include      /https?:\/\/e[-x]hentai\.org\/*/
// @exclude      /https?:\/\/e[-x]hentai\.org\/g\/*/
// @exclude      /https?:\/\/e[-x]hentai\.org\/*.php
// @grant        none
// ==/UserScript==

(() => {
    // category buttons

    const sb = document.querySelectorAll('#searchbox > * > div')[1];
    sb.style.display = 'flex';
    sb.style.alignItems = 'center';
    sb.style.justifyContent = 'center';
    
    const invisibleElem = document.createElement('span');
    invisibleElem.style.marginLeft = 'auto';

    const allCategoriesLink = document.createElement('a');
    allCategoriesLink.href = '#';
    allCategoriesLink.textContent = '[All]';
    allCategoriesLink.id = 'allcats';

    const clearCategoriesLink = document.createElement('a');
    clearCategoriesLink.href = '#';
    clearCategoriesLink.textContent = '[Clear]';
    clearCategoriesLink.id = 'nocats';

    sb.insertBefore(invisibleElem, sb.firstChild);

    sb.appendChild(document.createTextNode('\u00A0 \u00A0'));
    sb.appendChild(allCategoriesLink);
    sb.appendChild(document.createTextNode('\u00A0 \u00A0'));
    sb.appendChild(clearCategoriesLink);

    const toggleCategories = (toggleOn) => (e) => {
        e.preventDefault();

        if (typeof toggle_category !== 'function') return;

        for (let i = 0; i < 10; i++) {
            const binaryNumber = Math.pow(2, i).toString();
            const { dataset: { disabled: dis } } = document.querySelector(`#cat_${binaryNumber}`);

            if ((toggleOn && dis) || (!toggleOn && !dis)) {
                toggle_category(binaryNumber);
            }
        }
    };

    allCategoriesLink.addEventListener('click', toggleCategories(true));
    clearCategoriesLink.addEventListener('click', toggleCategories(false));

    // open all galleries button

    const allGalleriesLink = document.createElement('a');
    allGalleriesLink.href = '#';
    allGalleriesLink.textContent = '[Open All]';
    allGalleriesLink.id = 'allgalleries';
    allGalleriesLink.style.color = 'red';
    allGalleriesLink.style.marginLeft = 'auto';
    allGalleriesLink.style.justifyContent = 'flex-end';

    sb.appendChild(allGalleriesLink);

    const openAllGalleries = () => (e) => {
        e.preventDefault();

        const links = document.querySelectorAll('.glink');
        if (window.confirm(`Open all ${links.length} galleries?`)) {
            links.forEach(link => window.open(link.parentElement.href, '_blank').focus());
        }
    };

    allGalleriesLink.addEventListener('click', openAllGalleries());
})();
