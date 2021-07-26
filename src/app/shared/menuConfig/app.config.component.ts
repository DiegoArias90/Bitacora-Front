import {Component, OnInit} from '@angular/core';
import { AppComponent } from '../../app.component';
import { AppMainComponent } from '../../pages/app.main.component';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html',
})
export class AppConfigComponent implements OnInit {

    themes: any[];

    theme = 'denim';

    constructor(public appMain: AppMainComponent, public app: AppComponent) {}

    ngOnInit() {
        this.themes = [
            {name: 'denim', color: '#2f8ee5'},
            {name: 'sea-green', color: '#30A059'},
            {name: 'amethyst', color: '#834CA8'},
            {name: 'wedgewood', color: '#557DAA'},
            {name: 'tapestry', color: '#A74896'},
            {name: 'cape-palliser', color: '#A46B3E'},
            {name: 'apple', color: '#52A235'},
            {name: 'gigas', color: '#5751A9'},
            {name: 'jungle-green', color: '#2B9F9C'},
            {name: 'camelot', color: '#A54357'},
            {name: 'amber', color: '#D49341'},
            {name: 'cyan', color: '#399DB2'}
        ];
    }

    

    changeTheme(theme) {
        this.theme = theme;

        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        const themeHref = 'assets/theme/' + theme + '/theme-' + this.app.layoutMode + '.css';
        this.replaceLink(themeLink, themeHref, this.appMain['refreshTrafficChart']);
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    replaceLink(linkElement, href, callback?) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
            if (callback) {
                callback();
            }
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);

                if (callback) {
                    callback();
                }
            });
        }
    }

    onConfigButtonClick(event) {
        this.appMain.configActive = !this.appMain.configActive;
        this.appMain.configClick = true;
        event.preventDefault();
    }
}
