import {Injectable} from "@angular/core";
import {Picture} from "~/app/shared/models/picture.models";
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ImageService {

    private images: Picture[];
    private images$: Subject<Picture[]>;

    constructor() {
        this.images = this.initImages();
        this.images$ = new Subject<Picture[]>();
    }

    private initImages() {
        const images = [];

        images.push({name: 'Bird eye', liked: false, url:'~/images/bird-s-eye-view-of-road-during-daytime-3467150.jpg'});
        images.push({name: 'Camera on map', liked: false, url:'~/images/black-and-silver-dslr-camera-on-map-3497123.jpg'});
        images.push({name: 'Laptop on bed', liked: false, url:'~/images/black-laptop-on-bed-3568792.jpg'});
        images.push({name: 'Rocky mountain under white cloudy sky', liked: false, url:'~/images/brown-rocky-mountain-under-white-cloudy-sky-3532326.jpg'});
        images.push({name: 'Clear glass bowl with brown liquid', liked: false, url:'~/images/clear-glass-bowl-with-brown-liquid-3604314.jpg'});
        images.push({name: 'Computer Monitor and a laptop on a table', liked: false, url:'~/images/computer-monitor-and-a-laptop-on-a-table-3521937.jpg'});
        images.push({name: 'Man standing inside library', liked: false, url:'~/images/man-standing-inside-library-while-reading-book-3494806.jpg'});
        images.push({name: 'Man wearing black crew neck t-shirt', liked: false, url:'~/images/man-wearing-black-crew-neck-t-shirt-using-black-headphones-3466163.jpg'});
        images.push({name: 'Person holding a compass', liked: false, url:'~/images/person-holding-a-compass-3537823.jpg'});
        images.push({name: 'Person in black jacket walking on snow', liked: false, url:'~/images/person-in-black-jacket-walking-on-snow-covered-pathway-3494648.jpg'});
        images.push({name: 'Photo of woman wearing ballet shoes', liked: false, url:'~/images/photo-of-woman-wearing-ballet-shoes-3587324.jpg'});
        images.push({name: 'Photo of woman wearing yellow pants', liked: false, url:'~/images/photo-of-woman-wearing-yellow-pants-3542149.jpg'});
        images.push({name: 'White and green high rise building', liked: false, url:'~/images/white-and-green-high-rise-building-3526084.jpg'});
        images.push({name: 'White painted wall', liked: false, url:'~/images/white-painted-wall-3499125.jpg'});
        images.push({name: 'Womain looking at Taj Mahal', liked: false, url:'~/images/woman-sitting-on-brickwall-looking-at-taj-mahal-3569566.jpg'});
        images.push({name: 'Person using black smartphone', liked: false, url:'~/images/person-using-black-smartphone-3585088.jpg'});

        return images;
    }

    createSubscription(): Observable<Picture[]> {
        return this.images$.asObservable();
    }

    findImages(): void {
        this.images$.next(this.images);
    }

    findImage(index: number): Picture {
        return index < this.images.length ? this.images[index] : null;
    }

    count(): number {
        return this.images.length;
    }

    addImage(image: Picture): void {
        this.images.push(image);
        this.images$.next(this.images);
    }

}
