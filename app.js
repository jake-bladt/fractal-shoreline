window.addEventListener("load", () => {
    let draw = SVG('newSvg');
    draw.size(120, 120);
    let square = draw.rect(100, 100);
    square.attr({ fill: 'green' });
});
