import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ImageService {

    findImages(): string[] {
        const images = [];

        images.push('~/images/bird-s-eye-view-of-road-during-daytime-3467150.jpg');
        images.push('~/images/black-and-silver-dslr-camera-on-map-3497123.jpg');
        images.push('~/images/black-laptop-on-bed-3568792.jpg');
        images.push('~/images/brown-rocky-mountain-under-white-cloudy-sky-3532326.jpg');
        images.push('~/images/clear-glass-bowl-with-brown-liquid-3604314.jpg');
        images.push('~/images/computer-monitor-and-a-laptop-on-a-table-3521937.jpg');
        images.push('~/images/man-standing-inside-library-while-reading-book-3494806.jpg');
        images.push('~/images/man-wearing-black-crew-neck-t-shirt-using-black-headphones-3466163.jpg');
        images.push('~/images/person-holding-a-compass-3537823.jpg');
        images.push('~/images/person-in-black-jacket-walking-on-snow-covered-pathway-3494648.jpg');
        images.push('~/images/photo-of-woman-wearing-ballet-shoes-3587324.jpg');
        images.push('~/images/photo-of-woman-wearing-yellow-pants-3542149.jpg');
        images.push('~/images/white-and-green-high-rise-building-3526084.jpg');
        images.push('~/images/white-painted-wall-3499125.jpg');
        images.push('~/images/woman-sitting-on-brickwall-looking-at-taj-mahal-3569566.jpg');
        images.push('~/images/person-using-black-smartphone-3585088.jpg');

        return images;
    }

    findImage(index: number): string {
        const images = this.findImages();

        return index < images.length ? images[index] : null;
    }

    count(): number {
        return this.findImages().length;
    }

}
