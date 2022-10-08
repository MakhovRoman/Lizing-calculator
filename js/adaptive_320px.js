export default function checkMinWidth(query) {
    let meta = document.querySelector('meta[name=viewport]');
    if (query.matches) {
        console.log(meta);
        meta.content = 'width=320';
    } else {
        meta.content = 'width=device-width, initial-scale=1';
    };
}
