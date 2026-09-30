/** Unsplash URL helpers — smaller payloads for cards vs heroes */

export function unsplashCard(url: string): string {
    // strip existing size params and apply card-sized crop
    const base = url.split("?")[0];
    return `${base}?auto=format&fit=crop&w=800&q=75`;
}

export function unsplashHero(url: string): string {
    const base = url.split("?")[0];
    return `${base}?auto=format&fit=crop&w=1600&q=75`;
}

export function unsplashThumb(url: string): string {
    const base = url.split("?")[0];
    return `${base}?auto=format&fit=crop&w=160&q=70`;
}
